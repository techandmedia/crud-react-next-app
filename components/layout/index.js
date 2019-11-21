import { Layout, Breadcrumb } from "antd";
import Header from "./header";
import SideMenu from "./sider";

const { Content, Footer } = Layout;

export default function CustomLayout(props) {
  const { isLoggedIn, currentRoute, logout } = props;
  const route = isLoggedIn && currentRoute === "/dashboard" ? true : false;

  return (
    <Layout>
      <Header isLoggedIn={isLoggedIn} logout={logout} />
      <Content style={{ padding: route && "0 50px" }}>
        {route && (
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
        )}
        <Layout style={{ padding: "24px 0", background: "#fff" }}>
          {route && <SideMenu />}

          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            {props.children}
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
}
