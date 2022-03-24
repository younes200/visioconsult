const cheerio = require('cheerio');
const urlObj = require('url');
const request =  require('request-promise-native');
var url = require('url');

const  REGEX_VALID_URL = new RegExp(
    "^" +
      // protocol identifier
      "(?:(?:https?|ftp)://)" +
      // user:pass authentication
      "(?:\\S+(?::\\S*)?@)?" +
      "(?:" +
        // IP address exclusion
        // private & local networks
        "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
        "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
        "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
        // IP address dotted notation octets
        // excludes loopback network 0.0.0.0
        // excludes reserved space >= 224.0.0.0
        // excludes network & broacast addresses
        // (first & last IP address of each class)
        "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
        "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
        "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
      "|" +
        // host name
        "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
        // domain name
        "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
        // TLD identifier
        "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
        // TLD may end with dot
        "\\.?" +
      ")" +
      // port number
      "(?::\\d{2,5})?" +
      // resource path
      "(?:[/?#]\\S*)?" +
    "$", "i"
  );
  
  const REGEX_CONTENT_TYPE_IMAGE = new RegExp("image\/.*", "i");
  
  const REGEX_CONTENT_TYPE_AUDIO = new RegExp("audio\/.*", "i");
  
  const  REGEX_CONTENT_TYPE_VIDEO = new RegExp("video\/.*", "i");
  
  const REGEX_CONTENT_TYPE_TEXT = new RegExp("text\/.*", "i");
  
  const REGEX_CONTENT_TYPE_APPLICATION = new RegExp("application\/.*", "i");

exports.getPreview = function(text, options) {
  return new Promise((resolve, reject) => {
    if (!text) {
      reject({
        error: 'Link-Preview did not receive either a url or text'
      });
    }

    let detectedUrl = null;

    text.split(' ').forEach(token => {
      if (REGEX_VALID_URL.test(token) && !detectedUrl) {
        detectedUrl = token;
      }
    });

    if (detectedUrl) {
    request({uri:detectedUrl,transform: function (body, response, resolveWithFullResponse) {
        return {body, response}
    }})
        .then(({body, response}) => {
          // get final URL (after any redirects)
          const finalUrl = response.request.uri.href;
          
          // get content type of response
          let contentType = findById(response.headers, 'content-type');
          if (!contentType) {
            return reject({ error: 'Link-Preview: Could not extract content type for URL.' });
          }
          if (contentType instanceof Array) {
            contentType = contentType[0];
          }

          // parse response depending on content type
          if (contentType && REGEX_CONTENT_TYPE_IMAGE.test(contentType)) {
            resolve(parseImageResponse(finalUrl, contentType));
          } else if (contentType && REGEX_CONTENT_TYPE_AUDIO.test(contentType)) {
            resolve(parseAudioResponse(finalUrl, contentType));
          } else if (contentType && REGEX_CONTENT_TYPE_VIDEO.test(contentType)) {
            resolve(parseVideoResponse(finalUrl, contentType));
          } else if (contentType && REGEX_CONTENT_TYPE_TEXT.test(contentType)) {
            resolve(parseTextResponse(response.body, finalUrl, options || {}, contentType));
          } else if (contentType && REGEX_CONTENT_TYPE_APPLICATION.test(contentType)) {
            resolve(parseApplicationResponse(finalUrl, contentType));
          } else {
            reject({ error: 'Link-Preview: Unknown content type for URL.' });
          }
        })
        .catch(error => reject({ error }));
    } else {
      reject({
        error: 'Link-Preview did not find a link in the text'
      });
    }
  });
};

// recursively search through object to find property with given id
// returns value if found, undefined if not found
const findById = function (object, key) {
  let value;

  Object.keys(object).some(k => {
      
    if (k.toLowerCase() === key) {
      value = object[k];
      return true;
    }
    if (object[k] && typeof object[k] === 'object') {
      value = findById(object[k], key);
      return value !== undefined;
    }
    return false;
  });
  return value;
};

const parseImageResponse = function (url, contentType) {
  return {
    url,
    mediaType: 'image',
    contentType,
    favicons: [getDefaultFavicon(url)],
    domain: getDomain(url)
  };
};

const parseAudioResponse = function (url, contentType) {
  return {
    url,
    mediaType: 'audio',
    contentType,
    favicons: [getDefaultFavicon(url)],
    domain: getDomain(url)
  };
};

const parseVideoResponse = function (url, contentType) {
  return {
    url,
    mediaType: 'video',
    contentType,
    favicons: [getDefaultFavicon(url)],
    domain: getDomain(url)
  };
};

const parseApplicationResponse = function (url, contentType) {
  return {
    url,
    mediaType: 'application',
    contentType,
    favicons: [getDefaultFavicon(url)],
    domain: getDomain(url)
  };
};

const parseTextResponse = function (body, url, options, contentType) {
  const doc = cheerio.load(body);

  return {
    url,
    title: getTitle(doc),
    description: getDescription(doc),
    mediaType: getMediaType(doc) || 'website',
    contentType,
    images: getImages(doc, url, options.imagesPropertyType),
    videos: getVideos(doc),
    favicons: getFavicons(doc, url),
    domain: getDomain(url)
  };
};

const getDomain = function(finalUrl) {
  return url.parse(finalUrl).hostname
};

const getTitle = function(doc) {
  let title = doc("meta[property='og:title']").attr('content');

  if (!title) {
    title = doc('title').text();
  }

  return title;
};

const getDescription = function(doc) {
  let description = doc('meta[name=description]').attr('content');

  if (description === undefined) {
    description = doc('meta[name=Description]').attr('content');
  }

  if (description === undefined) {
    description = doc("meta[property='og:description']").attr('content');
  }

  return description;
};

const getMediaType = function(doc) {
  const node = doc('meta[name=medium]');

  if (node.length) {
    const content = node.attr('content');
    return content === 'image' ? 'photo' : content;
  } else {
    return doc("meta[property='og:type']").attr('content');
  }
};

const getImages = function(doc, rootUrl, imagesPropertyType) {
  let images = [],
    nodes,
    src,
    dic;

  nodes = doc(`meta[property='${imagesPropertyType || 'og'}:image']`);

  if (nodes.length) {
    nodes.each((index, node) => {
      src = node.attribs.content;
      if (src) {
        src = urlObj.resolve(rootUrl, src);
        images.push(src);
      }
    });
  }

  if (images.length <= 0 && !imagesPropertyType) {
    src = doc('link[rel=image_src]').attr('href');
    if (src) {
      src = urlObj.resolve(rootUrl, src);
      images = [src];
    } else {
      nodes = doc('img');

      if (nodes.length) {
        dic = {};
        images = [];
        nodes.each((index, node) => {
          src = node.attribs.src;
          if (src && !dic[src]) {
            dic[src] = 1;
            // width = node.attribs.width;
            // height = node.attribs.height;
            images.push(urlObj.resolve(rootUrl, src));
          }
        });
      }
    }
  }

  return images;
};

const getVideos = function(doc) {
  const videos = [];
  let nodeTypes;
  let nodeSecureUrls;
  let nodeType;
  let nodeSecureUrl;
  let video;
  let videoType;
  let videoSecureUrl;
  let width;
  let height;
  let videoObj;
  let index;

  const nodes = doc("meta[property='og:video']");
  const length = nodes.length;

  if (length) {
    nodeTypes = doc("meta[property='og:video:type']");
    nodeSecureUrls = doc("meta[property='og:video:secure_url']");
    width = doc("meta[property='og:video:width']").attr('content');
    height = doc("meta[property='og:video:height']").attr('content');

    for (index = 0; index < length; index++) {
      video = nodes[index].attribs.content;

      nodeType = nodeTypes[index];
      videoType = nodeType ? nodeType.attribs.content : null;

      nodeSecureUrl = nodeSecureUrls[index];
      videoSecureUrl = nodeSecureUrl ? nodeSecureUrl.attribs.content : null;

      videoObj = {
        url: video,
        secureUrl: videoSecureUrl,
        type: videoType,
        width,
        height
      };
      if (videoType.indexOf('video/') === 0) {
        videos.splice(0, 0, videoObj);
      } else {
        videos.push(videoObj);
      }
    }
  }

  return videos;
};

// returns an array of URL's to favicon images
const getFavicons = function(doc, rootUrl) {
  let images = [],
    nodes = [],
    src;

  const relSelectors = ['rel=icon', 'rel="shortcut icon"', 'rel=apple-touch-icon'];

  relSelectors.forEach((relSelector) => {
    // look for all icon tags
    nodes = doc(`link[${relSelector}]`);

    // collect all images from icon tags
    if (nodes.length) {
      nodes.each((index, node) => {
        src = node.attribs.href;
        if (src) {
          src = urlObj.resolve(rootUrl, src);
          images.push(src);
        }
      });
    }
  });

  // if no icon images, use default favicon location
  if (images.length <= 0) {
    images.push(getDefaultFavicon(rootUrl));
  }

  return images;
};

// returns default favicon (//hostname/favicon.ico) for a url
const getDefaultFavicon = function (rootUrl) {
  return urlObj.resolve(rootUrl, '/favicon.ico');
};
