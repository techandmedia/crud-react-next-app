import { Layout, Menu, Dropdown, Icon } from "antd";
import Link from "next/link";

const { Header } = Layout;
const LoginContext = React.createContext(null);

export default function TopNavigation({ isLoggedIn, logout }) {
  return (
    <Header className="header">
      <Link href="/">
        <div className="logo" />
      </Link>
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="1">
          <Link href="/about">
            <a>About</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link href="/contact">
            <a> Contact</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="3" style={{ float: "right" }}>
          <LoginContext.Provider value={logout}>
            {isLoggedIn ? <Dashboard /> : <Login />}
          </LoginContext.Provider>
        </Menu.Item>
      </Menu>
    </Header>
  );
}

const loginMenu = (
  <Menu>
    <Menu.Item>
      <Link href="/login">
        <a>Login</a>
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link href="/register">
        <a>Register</a>
      </Link>
    </Menu.Item>
  </Menu>
);

function Login() {
  return (
    <Dropdown overlay={loginMenu}>
      <a className="ant-dropdown-link" href="#">
        <Icon type="setting" />
      </a>
    </Dropdown>
  );
}

const dashboardMenu = (
  <LoginContext.Consumer>
    {logout => (
      <Menu>
        <Menu.Item onClick={() => logout()}>Logout</Menu.Item>
        <Menu.Item>
          <Link href="/dashboard">
            <a>Dashboard</a>
          </Link>
        </Menu.Item>
      </Menu>
    )}
  </LoginContext.Consumer>
);

function Dashboard() {
  return (
    <Dropdown overlay={dashboardMenu}>
      <a className="ant-dropdown-link" href="#">
        <Icon type="setting" />
      </a>
    </Dropdown>
  );
}
