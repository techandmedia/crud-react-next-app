import { useEffect, useReducer, useContext, useState } from "react";
import { Row, Col, Input, Button } from "antd";
import TambahDosen from "./FormTambahDosen";
import { Modal, Table } from "components";
import { UserContext } from "context/Global-Context";
import modalReducer from "utils/reducers/modal-reducer";
import usePostData from "api/usePostData";

let tempUsers = [];

export default function Dosen() {
  const [modal, dispatchModal] = useReducer(modalReducer, {
    isModalVisible: false
  });
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState(null);
  const profile = user.detail[0];
  const isAdmin = profile.group_name === "admin" ? true : false;

  const [results, postData] = usePostData();

  useEffect(() => {
    postData("api/dosen");
  }, []);

  useEffect(() => {
    // console.log(user);
    if (results.code === 200) {
      console.log("UPDATE", results);
      console.log("UPDATE", results.data);
      setUsers(results.data);
      tempUsers = results.data;
    }
    if (results.code === 200 && results.status === "Dosen") {
      dispatchModal({ type: "success", results });
    }

    if (results.code > 200) {
      dispatchModal({ type: "success", results });
    }
  }, [results]);

  useEffect(() => {
    console.log(users);
  }, [users]);

  const columns = [
    {
      title: "ID Dosen",
      dataIndex: "indx",
      key: "indx",
      editable: isAdmin,
      width: 100,
      sorter: (a, b) => a.indx - b.indx
      // fixed: "left"
    },
    {
      title: "Nama Dosen",
      dataIndex: "nama_dosen",
      key: "nama_dosen",
      editable: isAdmin
      // width: 200,
      // fixed: "left"
    },
    {
      title: "Date",
      children: [
        {
          title: "Created",
          dataIndex: "created",
          key: "created",
          width: 150
        },
        {
          title: "Modified",
          dataIndex: "modified",
          key: "modified",
          width: 150
        }
      ]
    }
  ];

  function findDosen(e) {
    console.log(e.target.value);
    let temp = tempUsers.filter(item =>
      item.nama_dosen.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setUsers(temp);
  }

  return (
    <Row type="flex" justify="center" style={{ paddingRight: 50 }} gutter={16}>
      <Modal modal={modal} dispatchModal={dispatchModal}>
        <TambahDosen postData={postData} />
      </Modal>
      <Col span={24}>
        <h1 style={{ textAlign: "center" }}>Daftar Dosen</h1>
        <Col span={6}>
          <Button onClick={() => dispatchModal({ type: "modal-show" })}>
            Tambah Dosen
          </Button>
          <hr />
          Cari Dosen
          <Input onChange={findDosen} />
        </Col>
        <Col span={18}>
          <Table
            key={users}
            dataSource={users}
            columns={columns}
            size="small"
            scroll={{ x: "calc(700px + 50%)", y: 240 }}
            rowKey="indx"
            postData={postData}
          />
        </Col>
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
