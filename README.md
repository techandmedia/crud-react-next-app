# Web Application with React - Next - MySQL

Crud application

## Last Update: December 4, 2019 - 16:36
#### Feature
1. Basic CRUD - ALL working properly
2. Update - see the known bugs at the end of this readme

#### What can be better
1. Design a better and comprehensive system 
2. Using NestJs / Or at this point, probably GraphQL at the backend
3. Better component composition and make use of reducer more

#### Feature not available
1. Exporting to html / excel
2. No testing

#### How to run the app
1. Clone this repo
2. CD into the folder just created, and run yarn
3. For the development, run yarn dev
4. For the API Server, CD into api-server folder, and run yarn
5. Run yarn server
6. Configure database as defined in my-sql.js in config folder
7. A sql file is available for testing


===============================================================

## The Structure of The APP

#### Framework

1. ReactJs
2. NextJs: React Framework for file routing and server side rendering
3. Ant Design: for styling (CSS)
4. Express: Node Framework for serving Restful API

I am using some features of the NextJs Framework:

1. Built-in File Name Routing: tldr; the file name is the routing as you type and see in the address bar, for instance, index.js is a homepage (a root domain, "/"), while about.js is translated to "/about" and contact.js to "/contact"
2. Exporting to a static html, so it's partially SSR

#### New User Default Setting when registering

1. Working Hour per Day: 8
2. Not set to any user group, must contact admin to do so
3. Not activated, must contact admin to be activated

There are 3 Context used in this App

1. UserContext: as a global user data after a user logged in
2. MenuContext: a a global dispatcher to change Menu and the content of the Dashboard. The Content of the Dasboard is called "Modules" and they are placed inside a modules folder
3. LoginContext: a local context just to pass down a single "logout" props

#### Folder & File Structure

I will start explain the structure of this application from a root folder of this application, and just for the importance files and folders.

Files in root folder:

1. next.config.js: next configuration for defining styling, folder aliasing and files exporting to static html
2. .babelrc: babel configuration for defining Ant Design

Folder "pages"

1. \_app : is called first to define the initial state, which one of it is login state, which is false at first
2. index.js : usually, this file is called first in the Next File System, but since we now have \_app, this file is rendered second as a home page ("/"). Homepage will be used as Landing Page
3. contact.js: Will be used for Contact Page
4. about.js: Will be used for About Page
5. login.js: Will be used for Login Page
6. register.js: Will be used for Register Page
7. dashboard.js: Will be used for Content Page. This is the page that will be loaded when the user successfully logged in. And since the state of the user can not be exposed, I decided to render the content page as a "React Component" instead of "file-routing", so there's no way that a user can access the content of the page by typing "/content" or "/user-profile" and etc in the address bar

For API Server
Added index in table login for field: user_name
Added index in table users for field: user_name

Added Protection in the backend to prevent unactivated user log in
"Your Profile is not activated, please contact Admin!"

1.

#### How to use custom component

1. Custom Modal

```js
import { useReducer } from "react";
import { Modal } from "components";
import modalReducer from "utils/reducers/modal-reducer";

function YourComponent() {
  const [modal, dispatchModal] = useReducer(modalReducer, {
    isModalVisible: false
  });

  /**
   * When you call modal and want to send some attributs
   * this is inside a modal reducer
   * const { status, message } = results;
   * this result is coming from the backend
   *
   * isModalVisible: true,
   * modalTitle: status, // This could be Warning, Success, whatever
   * modalMessage: message // Message is the body of the modal
   *
   */
  dispatchModal({ type: "success", results });

  /**
   * If you only want to display Modal, don't use the "success" type
   * as it requires results
   */
  dispatchModal({ type: "modal-show" });

  /**
   * Call this when you want to close the modal
   * Currently, pressing ok doesn't do additional function
   */
  dispatchModal({ type: "modal-ok" });
  dispatchModal({ type: "modal-cancel" });

  /**
   * Calling Modal to respon from a server, use it like this
   */
  <Modal modal={modal} dispatchModal={dispatchModal} />;

  /**
   * If you want to render other component, do it like this
   */
  <Modal modal={modal} dispatchModal={dispatchModal}>
    <YourComponent />
  </Modal>;
}
```

2. Custom Sider Menu. Menu is now stateless, which now only received state from modules. Modules are what I called "pages" that rendered in the dashboard. Example of these pages are: User List, Report Table, User Profile, User Preference, Change Password and so on.
   This makes the App highly flexible, where you can just add or remove "pages" easily from an array. Example is below

```js
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
        title: "Main Dashboard",
        component: <Default />
      },
      {
        key: "user-list",
        title: "User List"
      }
    ]
  },
  {
    key: "sub-menu-2",
    title: (
      <span>
        <Icon type="laptop" />
        Tambahan
      </span>
    ),
    children: [
      {
        key: "20",
        title: "Main Dashboard"
      }
    ]
  },
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
```

#### Known Bugs and Fixed

1. To use Ant Design Editable Table, make sure you have unique key in your data. Since I don't have key column, and I can't alias a column table name to "key", MySQL won't let me, instead I alias it with indx. And, you pass it through a rowKey props as indx. Find item.key or record.key and replace it with item.indx or record.indx

#### Known Bugs and Not Fixed

1. Updating task do not update the table immediately, have to refresh or login/logout
