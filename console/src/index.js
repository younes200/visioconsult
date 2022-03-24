import React from 'react'
import { render } from 'react-dom'
import { Router } from 'react-router-dom'
import App from '~/components/App'
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import main from 'react-chat-elements/dist/main.css';
import FB from './facebook';
import './css/style.css'
require("moment-duration-format")

const renderApp = Component => {
  render(
    <MuiPickersUtilsProvider utils={MomentUtils}>
     <Component />
     </MuiPickersUtilsProvider>
 ,document.getElementById('content')
  )
}
document.body.classList.remove('loading')
 renderApp(App)


var OneSignal = window.OneSignal || [];
OneSignal.push(function() {
  OneSignal.init({
    appId: process.env.ONESIGNAL_APP_ID,
    autoRegister: true,
    notifyButton: {
      enable: false,
    },
    welcomeNotification: {
      disable: true
    }
  });

  OneSignal.sendTag("admin", true);
});




if (module.hot) {
  module.hot.accept("./components/App", () => renderApp(require('./components/App').default))
}