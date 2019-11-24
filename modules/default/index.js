import { useEffect, useReducer } from "react";
import { Row, Col } from "antd";
import { Form, Modal } from "components";

export default function Default() {
  return (
    <Row type="flex" justify="center" style={{ paddingRight: 50 }}>
      <Col>This is Default Page</Col>
    </Row>
  );
}
