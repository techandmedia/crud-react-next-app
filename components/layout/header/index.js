import { Layout, Menu, Dropdown, Icon } from "antd";
import Link from "components/link";

const { Header } = Layout;
const ContohContext = React.createContext(null);

export default function TopNavigation({ isLoggedIn, logout }) {
  // console.log("Header", logout);
  // console.log("Header", thislogout);
  return (
    <Header className="header">
      <Link href="/">
        <div className="logo" />
      </Link>
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="1">
          <Link href="/about">About</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link href="/contact">Contact</Link>
        </Menu.Item>
        <Menu.Item key="3" style={{ float: "right" }}>
          <ContohContext.Provider value={logout}>
            {isLoggedIn ? <CustomDropDown /> : <Link href="/login">Login</Link>}
          </ContohContext.Provider>
        </Menu.Item>
      </Menu>
    </Header>
  );
}

const menu = (
  <ContohContext.Consumer>
    {logout => (
      <Menu>
        <Menu.Item onClick={() => logout()}>
          Logout
        </Menu.Item>
        <Menu.Item>
          <Link href="/dashboard">Dashboard</Link>
        </Menu.Item>
      </Menu>
    )}
  </ContohContext.Consumer>
);

function CustomDropDown() {
  return (
    <Dropdown overlay={menu}>
      <a className="ant-dropdown-link" href="#">
        <Icon type="setting" />
      </a>
    </Dropdown>
  );
}
