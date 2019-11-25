import { useReducer, useEffect, useContext } from "react";
import Link from "next/link";
import { Form, Icon, Input, Button, Checkbox, Row, Col } from "antd";
import { Modal } from "components";

import { UserContext } from "context/Global-Context";
import modalReducer from "../utils/reducers/modal-reducer";
import usePostData from "api/usePostData";

function NormalLoginForm(props) {
  const { validateFields, getFieldDecorator } = props.form;
  const [modal, dispatchModal] = useReducer(modalReducer, {
    isModalVisible: false
  });
  const [results, postData] = usePostData();
  const { dispatchUser } = useContext(UserContext);

  useEffect(() => {
    if (results.code === 200) {
      console.log("login-success rendering");
      dispatchModal({ type: "success", results });
      dispatchUser({ type: "login-success", results });
      setTimeout(() => {
        props.login();
      }, 1000);
    }
    if (results.code > 200) {
      dispatchModal({ type: "success", results });
    }
  }, [results]);

  function handleSubmit(e) {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        postData("api/users/login", {
          username: values.username,
          password: values.password
        });
      }
    });
  }

  return (
    <Row type="flex" justify="center">
      <Col>
        <Modal modal={modal} dispatchModal={dispatchModal} />
        <div style={{ textAlign: "center" }}>
          <h1>Create Account</h1>
        </div>
        <Form onSubmit={handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [
                { required: true, message: "Please input your username!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Username"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)}
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or
            <Link href="/register">
              <a> Register Now!</a>
            </Link>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  NormalLoginForm
);

export default WrappedNormalLoginForm;
