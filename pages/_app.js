import React from "react";
import App from "next/app";
import GlobalProvider from "../utils/context/Global-Context";
import Router from "next/router";
import Layout from "components";
import "../utils/style/ant-style.css";
import "../utils/style/index.css";

/**
 * Preparing to use reducer here
 */
export default function CustomApp(props) {
  return (
    <GlobalProvider>
      <MyApp {...props} />
    </GlobalProvider>
  );
}

class MyApp extends App {
  state = {
    isLoggedIn: false,
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
