import Default from "./default";
import Profile from "./profile/";
import Preference from "./preference";
import LoginFailed from "./login-failed";

const pages = [
  {
    menu: "login-failed",
    component: <LoginFailed />
  },
  {
    menu: "default",
    component: <Default />
  },
  {
    menu: "profile",
    component: <Profile />
  },
  {
    menu: "preference",
    component: <Preference />
  }
];

export default pages;
