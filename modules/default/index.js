import { useEffect, useReducer, useContext } from "react";
import { Row, Col } from "antd";
import { Table } from "components";
import { UserContext } from "context/Global-Context";
import usePostData from "api/usePostData";

export default function Default() {
  const { user } = useContext(UserContext);
  const users = user.data;
  const profile = user.detail[0];
  const isAdmin = profile.group_name === "admin" ? true : false;

  const [results, postData] = usePostData();

  useEffect(() => {
    console.log("UPDATE", results);
    console.log(user);
  });

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
        <h1 style={{ textAlign: "center" }}>User List</h1>
        <Table
          dataSource={users}
          columns={columns}
          size="small"
          scroll={{ x: "calc(700px + 50%)", y: 240 }}
          rowKey="indx"
          postData={postData}
        />
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
