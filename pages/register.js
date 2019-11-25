import { useEffect, useReducer } from "react";
import { Row, Col } from "antd";
import { Form, Modal } from "components";
import modalReducer from "../utils/reducers/modal-reducer";

import usePostData from "api/usePostData";

export default function Registration() {
  const [results, postData] = usePostData();
  const [modal, dispatchModal] = useReducer(modalReducer, {
    isModalVisible: false
  });

  useEffect(() => {
    // console.log(results);
    if (results.code !== "") {
      dispatchModal({ type: "success", results });
    }
  }, [results]);

  return (
    <Row type="flex" justify="center" style={{ paddingRight: 50 }}>
      <Col span={12}>
        <div style={{ textAlign: "center" }}>
          <h1>Account Registration</h1>
        </div>
        <Modal modal={modal} dispatchModal={dispatchModal} />
        <Form postData={postData} />
      </Col>
    </Row>
  );
}
