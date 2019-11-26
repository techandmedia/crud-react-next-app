import { useContext, useState } from "react";
import { MenuContext } from "../../../utils/context/Global-Context";
import { Layout, Menu, Icon, Button } from "antd";

const { SubMenu } = Menu;
const { Sider } = Layout;

export default function SideMenu() {
  const { dispatchMenu } = useContext(MenuContext);
  const [collapsed, setCollapsed] = useState(true);

  function toggleCollapsed(coll) {
    setCollapsed(coll);
  }

  function handleMenuClick(e) {
    dispatchMenu({ key: e.key });
  }

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={toggleCollapsed}
      width={200}
      style={{ background: "#fff" }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%" }}
        onClick={handleMenuClick}
        // inlineCollapsed={collapsed}
      >
        <SubMenu
          key="sub-menu-1"
          title={
            <span>
              <Icon type="user" />
              Your Dashboard
            </span>
          }
        >
          <Menu.Item key="default">User List</Menu.Item>
          <Menu.Item key="2">option2</Menu.Item>
          <Menu.Item key="3">option3</Menu.Item>
          <Menu.Item key="4">option4</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="laptop" />
              subnav 2
            </span>
          }
        >
          <Menu.Item key="5">option5</Menu.Item>
          <Menu.Item key="6">option6</Menu.Item>
          <Menu.Item key="7">option7</Menu.Item>
          <Menu.Item key="8">option8</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub3"
          title={
            <span>
              <Icon type="notification" />
              User Profile
            </span>
          }
        >
          <Menu.Item key="profile">Profile Page</Menu.Item>
          <Menu.Item key="preference">Preference</Menu.Item>
          <Menu.Item key="change-password">Change Password</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
}
