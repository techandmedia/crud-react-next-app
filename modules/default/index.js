import { useEffect, useReducer, useContext, useState } from "react";
import { Row, Col, Button } from "antd";
import { Table, Modal, FormNewTask } from "components";
import { UserContext } from "context/Global-Context";
import usePostData from "api/usePostData";
import useFetchData from "api/useFetchData";
import modalReducer from "utils/reducers/modal-reducer";

export default function TaskList() {
  const { user } = useContext(UserContext);
  const users = user.data;
  const profile = user.detail[0];
  const isAdmin = profile.group_name === "admin" ? true : false;
  const id_group =
    profile.group_name === "admin"
      ? 10001
      : profile.group_name === "manager"
      ? 10005
      : 10010;
  const user_name = profile.user_name;
  const preffered_working_hours = user.preferredWorkingHour * 60 * 60 * 1000;

  const API_FOR_NEW_TASK = "api/task/new-task";
  const API_FOR_ALL_TASKS = "api/users/tasks";
  const [results, postData] = usePostData();
  const [data, refetch] = usePostData(API_FOR_ALL_TASKS, {
    id_group,
    user_name
  });
  const [modal, dispatchModal] = useReducer(modalReducer, {
    isModalVisible: false
  });
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    refetch(API_FOR_ALL_TASKS, { id_group, user_name });
  }, []);

  useEffect(() => {
    if (results.code === 200 && results.data !== "") {
      refetch(API_FOR_ALL_TASKS, { id_group, user_name });
      dispatchModal({ type: "modal-ok" });
    }
  }, [results]);

  useEffect(() => {
    if (data.code === 200 && !data.isLoading) {
      // console.log(data);
      let temp = [];
      data.data.map(item => {
        const created = new Date(item.created);
        const modified = new Date(item.modified);
        const result =
          (modified.getTime() - created.getTime()) * 60 * 60 * 1000;

        temp.push({
          ...item,
          isUnderWorkingHour: result >= preffered_working_hours ? true : false
        });
      });
      setUserData(temp);
      // console.log(temp);
    }
  }, [data]);

  const columns = [
    {
      title: "Full Name",
      dataIndex: "user_full_name",
      key: "user_full_name",
      editable: isAdmin,
      width: 200,
      fixed: "left"
    },
    {
      title: "User Name",
      dataIndex: "user_name",
      key: "user_name",
      width: 200,
      editable: isAdmin
    },
    {
      title: "Notes 1",
      dataIndex: "notes_one",
      key: "notes_one",
      width: 200,
      editable: true
    },
    {
      title: "Notes 2",
      dataIndex: "notes_two",
      key: "notes_two",
      width: 200,
      editable: true
    },
    {
      title: "Notes 3",
      dataIndex: "notes_three",
      key: "notes_three",
      width: 200,
      editable: true
    },
    {
      title: "Grup",
      dataIndex: "group_name",
      key: "group_name",
      width: 100,
      editable: isAdmin
    },
    {
      title: "Date",
      children: [
        {
          title: "Created",
          dataIndex: "created",
          key: "created",
          width: 100
        },
        {
          title: "Modified",
          dataIndex: "modified",
          key: "modified",
          width: 100
        }
      ]
    }
  ];

  return (
    <Row type="flex" justify="center" style={{ paddingRight: 50 }}>
      <Col span={24}>
        <Modal modal={modal} dispatchModal={dispatchModal}>
          <FormNewTask
            id_group={id_group}
            user_name={user_name}
            postData={postData}
            API={API_FOR_NEW_TASK}
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
          key={userData}
          dataSource={userData}
          columns={columns}
          size="small"
          scroll={{ x: "calc(700px + 50%)", y: 240 }}
          rowKey="indx"
          postData={postData}
          loading={data.isLoading}
          rowClassName={(record, index) => {
            console.log("RECORD", record, index);
            return record.isUnderWorkingHour ? "row-same-working" : "row-under-working"
          }}
        />
      </Col>
    </Row>
  );
}
