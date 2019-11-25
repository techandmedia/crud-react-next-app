import { useEffect, useReducer, useContext } from "react";
import { Row, Col } from "antd";
import { PreferenceForm, Modal } from "components";
import modalReducer from "../../utils/reducers/modal-reducer";
import { UserContext } from "context/Global-Context";

import usePostData from "api/usePostData";

export default function Preference() {
  const { user } = useContext(UserContext);
  const [results, postData] = usePostData();
  const [modal, dispatchModal] = useReducer(modalReducer, {
    isModalVisible: false
  });

  console.log(user[0]);
  useEffect(() => {
    if (results.code !== "") {
      dispatchModal({ type: "success", results });
    }
  }, [results]);

  return (
    <Row type="flex" justify="center" style={{ paddingRight: 50 }}>
      <Col span={13}>
        <div style={{ textAlign: "center" }}>
          <h1>Change Your Preference</h1>
        </div>
        <Modal modal={modal} dispatchModal={dispatchModal} />
        <PreferenceForm
          postData={postData}
          user={user}
          defaultValue={
            user.preference[0] === undefined
              ? user.preferredWorkingHour
              : user.preference[0].working_hour_per_day
          }
        />
      </Col>
      <Col span={11}></Col>
    </Row>
  );
}
