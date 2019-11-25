import { UserContext } from "context/Global-Context";
import { Layout, Breadcrumb } from "antd";
import Header from "./header";
import SideMenu from "./sider";

const { Content, Footer } = Layout;

export default function CustomLayout(props) {
  const { user } = React.useContext(UserContext);
  const { isLoggedIn, currentRoute, logout } = props;
  const route = isLoggedIn && currentRoute === "/dashboard" ? true : false;
  const fullName = route && user.detail[0].user_full_name;

  return (
    <Layout>
      <Header isLoggedIn={isLoggedIn} logout={logout} />
      <Content style={{ padding: route && "0 50px" }}>
        {route && <h1 style={{ marginTop: 10 }}>Welcome {fullName}!</h1>}
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
