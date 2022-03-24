import NavigationStore from "react-navigation-mobx-helpers";
import Session from "./Session";
import Springboard from "./views/Springboard";
import EditProfile from "./views/EditProfile";
import Profile from "./views/Profile";
import Login from "./views/Login";
import VideoCall from "./views/VideoCall";
import Robot from "./Robot";
import Gateway from "./Gateway";
import App from "./App";
import Notification from "./Notification";

export const navigation = new NavigationStore();
export const app = new App();
export const session = new Session();
export const springboard = new Springboard();
export const login = new Login();
export const profile = new Profile();
export const editProfile = new EditProfile();
export const notification = new Notification();
export const videoCall = new VideoCall();
export const gateway = new Gateway();
export const robot = new Robot();

export default {
  app,
  notification,
  session,
  springboard,
  login,
  navigation,
  profile,
  editProfile,
  robot,
  videoCall,
  gateway
};
