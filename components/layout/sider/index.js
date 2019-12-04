import { useContext, useState } from "react";
import { MenuContext } from "context/Global-Context";
import { Layout, Menu } from "antd";

import { subMenu } from "../../../modules/";

const { SubMenu } = Menu;
const { Sider } = Layout;

export default function SideMenu() {
  const { dispatchMenu } = useContext(MenuContext);
  const [collapsed, setCollapsed] = useState(true);

  function toggleCollapsed(coll) {
    setCollapsed(coll);
  }

  function handleMenuClick(e) {
    console.log("SIDEBAR", e);
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
        defaultSelectedKeys={["default"]}
        // defaultOpenKeys={["sub-menu-1"]}
        style={{ height: "100%" }}
        onClick={handleMenuClick}
        // inlineCollapsed={collapsed}
      >
        {subMenu.map(item => {
          return (
            <SubMenu key={item.key} title={item.title}>
              {item.children.map(el => (
                <Menu.Item key={el.key}>{el.title}</Menu.Item>
              ))}
            </SubMenu>
          );
        })}
      </Menu>
    </Sider>
  );
}
