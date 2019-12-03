import { Icon } from "antd";
import Default from "./default";
import Profile from "./profile/";
import Preference from "./preference";
import UserList from './user-list'
import LoginFailed from "./login-failed";

// DEMO
import DaftarDosen from "./daftar-dosen";

/**
 * Additional Pages is for pages that do not have menu but usefull like
 * error page, login failed pages, etc
 */
const additional_pages = [
  {
    key: "login-failed",
    component: <LoginFailed />
  }
];

const subMenu = [
  {
    key: "sub-menu-1",
    title: (
      <span>
        <Icon type="user" />
        Your Dashboard
      </span>
    ),
    children: [
      {
        key: "default",
        title: "Tasks List",
        component: <Default />
      },
      {
        key: "user-list",
        title: "User List",
        component: <UserList />
      },
      // {
      //   key: "work-list",
      //   title: "Work List"
      // }
    ]
  },
  // {
  //   key: "sub-menu-2",
  //   title: (
  //     <span>
  //       <Icon type="laptop" />
  //       Tambahan
  //     </span>
  //   ),
  //   children: [
  //     {
  //       key: "dosen",
  //       title: "Daftar Dosen",
  //       component: <DaftarDosen />
  //     },
  //     {
  //       key: "21",
  //       title: "User List"
  //     },
  //     {
  //       key: "22",
  //       title: "Work List"
  //     }
  //   ]
  // },
  {
    key: "sub-menu-3",
    title: (
      <span>
        <Icon type="notification" />
        User Profile
      </span>
    ),
    children: [
      {
        key: "profile",
        title: "Profile",
        component: <Profile />
      },
      {
        key: "preference",
        title: "Preference",
        component: <Preference />
      },
      {
        key: "change-password",
        title: "Change Password"
      }
    ]
  }
];

const pages = [...additional_pages];

subMenu.forEach(item => {
  item.children.forEach(el =>
    pages.push({ key: el.key, component: el.component })
  );
});

export { subMenu };
export default pages;
