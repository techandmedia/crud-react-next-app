import { useEffect, useReducer, useContext, useState } from "react";
import { Row, Col, Button } from "antd";
import { Table, Modal, FormNewTask } from "components";
import { UserContext } from "context/Global-Context";
import usePostData from "api/usePostData";
import modalReducer from "utils/reducers/modal-reducer";
import dataReducer from "./reducers";

export default function TaskList() {
  const { user } = useContext(UserContext);
  const [dataUser, dispatchData] = useReducer(dataReducer, { columns: [] });
  const [results, postData] = usePostData();
  const [data, refetch] = usePostData("", "");
  const [modal, dispatchModal] = useReducer(modalReducer, {
    isModalVisible: false
  });

  useEffect(() => {
    dispatchData({ type: "init", user });
  }, []);

  useEffect(() => {
    const { isLoading, API_FOR_ALL_TASKS } = dataUser;
    if (isLoading) {
      const { id_group, user_name } = dataUser;
      refetch(API_FOR_ALL_TASKS, { id_group, user_name });
    }
    if (!isLoading) {
      console.log("RESULTS datauser", dataUser);
    }
  }, [dataUser]);

  useEffect(() => {
    console.log("RESULTS RESULTS", results);
    if (results.code === 200 && results.data !== "") {
      const { id_group, user_name, API_FOR_ALL_TASKS } = dataUser;
      refetch(API_FOR_ALL_TASKS, { id_group, user_name });
      dispatchModal({ type: "modal-ok" });
    }
  }, [results]);

  useEffect(() => {
    // console.log("RESULTS DATA", data);
    if (data.code === 200 && !data.isLoading) {
      dispatchData({ type: "fetch", data });
    }
  }, [data]);

  return (
    <Row type="flex" justify="center" style={{ paddingRight: 50 }}>
      <Col span={24}>
        <Modal modal={modal} dispatchModal={dispatchModal}>
          <FormNewTask
            id_group={dataUser.id_group}
            user_name={dataUser.user_name}
            postData={postData}
            API={dataUser.API_FOR_NEW_TASK}
          />
        </Modal>
        ;
        <div style={{ float: "left", marginBottom: 5 }}>
          <Button
            icon="file-add"
            onClick={() => dispatchModal({ type: "modal-show" })}
          >
            New Task
          </Button>
        </div>
        <h1 style={{ textAlign: "center" }}>User Tasks List</h1>
        <Table
          key={dataUser.data}
          dataSource={dataUser.data}
          columns={dataUser.columns}
          size="small"
          scroll={{ x: "calc(700px + 50%)", y: 240 }}
          rowKey="indx"
          postData={postData}
          API_UPDATE={dataUser.API_FOR_UPDATE_TASK}
          API_DELETE={dataUser.API_TO_DELETE_TASK}
          loading={dataUser.isLoading}
          rowClassName={(record, index) => {
            // console.log("RECORD", record, index);
            return record.isUnderWorkingHour
              ? "row-same-working"
              : "row-under-working";
          }}
        />
      </Col>
    </Row>
  );
}
