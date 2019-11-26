# Web Application with React - Next - MySQL
 Crud application


Added index in table login for field: user_name
Added index in table users for field: user_name

Added Protection in the backend to prevent unactivated user log in
"Your Profile is not activated, please contact Admin!"

New User Default Setting when registering
1. Working Hour per Day: 8
2. Not set to any user group, must contact admin to do so
3. Not activated, must contact admin to be activated

There are 3 Context used in this App
1. UserContext: as a global user data after a user logged in
2. MenuContext: a a global dispatcher to change Menu and the content of the Dashboard
The Content of the Dasboard is called "Modules" and they are resides inside a modules folder
3. LoginContext: a local context just to pass down a single "logout" props

## The Structure of The APP

#### Framework
1. ReactJs
2. NextJs: React Framework for file routing and server side rendering
3. Ant Design: for styling (CSS)
4. Express: Node Framework for serving Restful API

I am using some features of the NextJs Framework:
1. Built-in File Name Routing: tldr; the file name is the routing as you type and see in the address bar, for instance, index.js is a homepage (a root domain, "/"), while about.js is translated to "/about" and contact.js to "/contact"
2. Exporting to a static html, so it's partially SSR

#### Folder & File Structure

I will start explain the structure of this application from a root folder of this application, and just for the importance files and folders.

Files in root folder:
1. next.config.js: next configuration for defining styling, folder aliasing and files exporting to static html
2. .babelrc: babel configuration for defining Ant Design


Folder "pages"
1. _app : is called first to define the initial state, which one of it is login state, which is false at first
2. index.js : usually, this file is called first in the Next File System, but since we now have _app, this file is rendered second as a home page ("/"). Homepage will be used as Landing Page
3. contact.js: Will be used for Contact Page
4. about.js: Will be used for About Page
5. login.js: Will be used for Login Page
6. register.js: Will be used for Register Page
7. dashboard.js: Will be used for Content Page. This is the page that will be loaded when the user successfully logged in. And since the state of the user can not be exposed, I decided to render the content page as a "React Component" instead of "file-routing", so there's no way that a user can access the content of the page by typing "/content" or "/user-profile" and etc in the address bar


For API Server
1. 