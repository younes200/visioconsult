var OneSignal = require('onesignal-node');
const logger = require('winston');
var i18n = require("i18n");
// first we need to create a client
var client = new OneSignal.Client({
  userAuthKey: process.env.ONESIGNAL_USER_AUTH_KEY,
  app: {
    appAuthKey: process.env.ONESIGNAL_API_KEY,
    appId: process.env.ONESIGNAL_APP_ID
  }
});

module.exports = function (Push) {



  Push.send = (contents, to, data, buttons) => {
    // we need to create a notification to send
    var notification = new OneSignal.Notification({
      headings: {
        "en": "{{firstname}} :wave:",
        "fr": "{{firstname}} :wave:",
      },
      contents,
      content_available: true,
    });

    // set target users
    //notification.setIncludedSegments(['All']);
    //notification.setExcludedSegments(['Inactive Users']);

    // set notification parameters
    notification.setParameter('data', data);
    //firstNotification.setParameter('send_after', 'Thu Sep 24 2015 14:00:00 GMT-0700 (PDT)');

    if (buttons) {
      notification.postBody["buttons"] = buttons;
    }

    notification.postBody["ios_badgeType"] = "Increase"
    notification.postBody["ios_badgeCount"] = 1

    notification.setFilters([{
      "field": "tag",
      "key": "userId",
      "relation": "=",
      "value": to
    }]);

    // send this notification to All Users except Inactive ones
    return client.sendNotification(notification).catch(function (err) {
      logger.error('OneSigna send error %s', err);
    });

  }





}