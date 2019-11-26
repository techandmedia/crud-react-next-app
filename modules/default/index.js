import { useEffect, useReducer, useContext } from "react";
import { Row, Col } from "antd";
import { Table } from "components";
import { UserContext } from "context/Global-Context";

export default function Default() {
  const { user } = useContext(UserContext);
  const users = user.allUsers;

  const columns = [
    {
      title: "Full Name",
      dataIndex: "user_full_name",
      key: "user_full_name",
      editable: true
    },
    {
      title: "User Name",
      dataIndex: "user_name",
      key: "user_name",
      editable: true
    },
    {
      title: "Address",
      dataIndex: "user_address",
      key: "user_address",
      editable: true
    },
    {
      title: "Phone Number",
      dataIndex: "user_phone_number",
      key: "user_phone_number",
      editable: true
    },
    {
      title: "User Group",
      dataIndex: "",
      key: "",
      editable: true
    }
  ];

  return (
    <Row type="flex" justify="center" style={{ paddingRight: 50 }}>
      <Col span={24}>
        <h1 style={{ textAlign: "center" }}>User List</h1>
        <Table dataSource={users} columns={columns} />
      </Col>
    </Row>
  );
}
