import React from "react";
import App from "next/app";
import Router from "next/router";
import Layout from "components";
import "../utils/style/ant-style.css";
import "../utils/style/index.css";

/**
 * Preparing to use reducer here
*/
export default function Tes(props) {
  return <MyApp {...props}/>;
}

class MyApp extends App {
  state = {
    isLoggedIn: true,
    user: "andri",
    password: "123"
  };

  login = () => {
    this.setState({ isLoggedIn: true });
    Router.push("/dashboard");
  };

  logout = () => {
    this.setState({ isLoggedIn: false });
  };

  render() {
    const { Component, pageProps, router } = this.props;
    const currentRoute = router.route;
    return (
      <Layout {...this.state} currentRoute={currentRoute} {...this}>
        <Component
          {...pageProps}
          {...this.state}
          {...this}
          currentRoute={currentRoute}
        />
      </Layout>
    );
  }
}
