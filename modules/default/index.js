import { useEffect, useReducer, useContext } from "react";
import { Row, Col } from "antd";
import { Table } from "components";
import { UserContext } from "context/Global-Context";

export default function Default() {
  const { user } = useContext(UserContext);
  const users = user.data;
  const profile = user.detail[0];
  const isAdmin = profile.group_name === "admin" ? true : false;

  const columns = [
    {
      title: "Full Name",
      dataIndex: "user_full_name",
      key: "user_full_name",
      editable: isAdmin
    },
    {
      title: "User Name",
      dataIndex: "user_name",
      key: "user_name",
      editable: isAdmin
    },
    {
      title: "Notes 1",
      dataIndex: "notes_one",
      key: "notes_one",
      editable: true
    },
    {
      title: "Notes 1",
      dataIndex: "notes_two",
      key: "notes_two",
      editable: true
    },
    {
      title: "Notes 1",
      dataIndex: "notes_three",
      key: "notes_three",
      editable: true
    },
    {
      title: "Grup",
      dataIndex: "group_name",
      key: "group_name",
      editable: isAdmin
    },
    {
      title: "Date Created",
      dataIndex: "created",
      key: "created"
    },
    {
      title: "Date Modified",
      dataIndex: "modified",
      key: "modified"
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

// const columns = [
//   {
//     title: "Full Name",
//     dataIndex: "user_full_name",
//     key: "user_full_name",
//     editable: true
//   },
//   {
//     title: "User Name",
//     dataIndex: "user_name",
//     key: "user_name",
//     editable: true
//   },
//   {
//     title: "Address",
//     dataIndex: "user_address",
//     key: "user_address",
//     editable: true
//   },
//   {
//     title: "Phone Number",
//     dataIndex: "user_phone_number",
//     key: "user_phone_number",
//     editable: true
//   },
//   {
//     title: "User Group",
//     dataIndex: "",
//     key: "",
//     editable: true
//   }
// ];
