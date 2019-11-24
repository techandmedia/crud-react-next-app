import { useEffect, useReducer } from "react";
import { Row, Col } from "antd";
import { Form, Modal } from "components";

export default function LoginFailed() {
  return (
    <Row type="flex" justify="center" style={{ paddingRight: 50 }}>
      <Col>Please Login to access the dashboard</Col>
    </Row>
  );
}
