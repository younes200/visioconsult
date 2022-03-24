// Copyright Interactive Object. 2016. All Rights Reserved.


module.exports = function (Picture) {



  Picture.signature = function () {

    const timestamp = ((Date.now() / 1000) | 0).toString();

    const query = Object.assign({
      token: req.token
    }, req.query)
 
    const notification_url = `${ENDPOINT}/picture/webhook?${querystring.stringify(query)}`;
    req.body.notification_url = notification_url
    req.body.timestamp = timestamp

    let hashString = Object.keys(req.body)
      .sort()
      .reduce((res, key) =>
        res + (res ? "&" : "") + `${key}=${req.body[key]}`, "");

    const shasum = crypto.createHash("sha1");
    shasum.update(hashString + CLOUDINARY_API_SECRET);
    const signature = shasum.digest("hex");

    return {
      signature,
      timestamp,
      notification_url,
      api_key: process.env.CLOUDINARY_API_KEY
    }

  }

  Picture.webhook = function (body) {

    if (body.notification_type == "upload") {

      if (req.query.moderated && !req.body.moderation || req.body.moderation[0].status == 'rejected') {
        // skip rejected photos
        return
      }

      //TODO: set the picture as profile
      // const photo = await albumController.addToDefault(req.user._id, req.body)
      // if (req.query.type == "avatar") {

      //   await userController.editUser(req.user._id, {
      //     picture: photo._id
      //   })
      //   return
      // }

    } else {
      return
    }
    //

  }

  Picture.disableRemoteMethodByName('delete')
  Picture.disableRemoteMethodByName('replaceById')

  Picture.disableRemoteMethodByName('createChangeStream')
  Picture.disableRemoteMethodByName('updateAll')

  Picture.disableRemoteMethodByName('upsertWithWhere')
  Picture.disableRemoteMethodByName('replaceOrCreate')
  Picture.disableRemoteMethodByName('findOne')


}