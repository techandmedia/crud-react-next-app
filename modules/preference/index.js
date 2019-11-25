import { useEffect, useContext } from "react";
import { Row, Col } from "antd";
import { Form, Modal } from "components";
import { UserContext } from "context/Global-Context";

export default function Preference() {
  const { user } = useContext(UserContext);

  console.log("login-success Preference", user);
  // useEffect(() => {
  // }, [user]);

  return (
    <Row type="flex" justify="center" style={{ paddingRight: 50 }}>
      <Col>This is Preference Page</Col>
    </Row>
  );
}
