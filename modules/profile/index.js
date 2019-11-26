import { useEffect, useReducer, useContext } from "react";
import { Row, Col } from "antd";
import { Form, Modal } from "components";
import { UserContext } from "context/Global-Context";

import usePostData from "api/usePostData";

let profile = true;

export default function Profile() {
  const { user } = useContext(UserContext);

  // useEffect(() => {
  //   console.log("login-success Profile", user);
  // }, [user]);

  return (
    <Row type="flex" justify="center" gutter={16}>
      <Col span={12}>
        {/* <Modal modal={modal} dispatchModal={dispatchModal} /> */}
        <Form
          // postData={postData}
          defaultValue={user.detail[0]}
          profile={profile}
        />
      </Col>
      <Col span={12}>TES</Col>
    </Row>
  );
}
