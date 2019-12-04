import { useEffect, useReducer, useContext, useState } from "react";
import { Row, Col, Modal } from "antd";
import { Table } from "components";
import { UserContext } from "context/Global-Context";
import useFecthData from "api/useFetchData";
import usePostData from "api/usePostData";

export default function UserList() {
  const { user } = useContext(UserContext);
  // const users = user.data;
  const profile = user.detail[0];
  const isAdmin = profile.group_name === "admin" ? true : false;
  const id_group =
    profile.group_name === "admin"
      ? 10001
      : profile.group_name === "manager"
      ? 10005
      : 10010;
  const user_name = profile.user_name;
  const API_TO_CHANGE_USER_GROUP = "api/users/update-group";
  const API_USER_LIST = "api/users/list";

  const [results, refetch] = usePostData();
  const [responds, postData] = usePostData();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const group = [
    {
      id_group: 10001,
      group_name: "Administrator"
    },
    {
      id_group: 10005,
      group_name: "Manager"
    },
    {
      id_group: 10010,
      group_name: "User"
    }
  ];

  useEffect(() => {
    refetch(API_USER_LIST, { id_group, user_name });
  }, []);

  useEffect(() => {
    if (!results.isLoading && results.code === 200) {
      console.log(results);
      let temp = results.data.map(item => ({
        indx: item.indx,
        created: item.created,
        group_name:
          group.find(el => item.id_group === el.id_group) === undefined
            ? "User is not activated"
            : group.find(el => item.id_group === el.id_group).group_name,
        modified: item.modified,
        user_full_name: item.user_full_name,
        user_name: item.user_name
      }));
      setData(temp);
      setLoading(false);
    }
  }, [results]);

  // useEffect(() => {
  //   console.log(responds);
  // }, [user]);

  const columns = [
    {
      title: "Full Name",
      dataIndex: "user_full_name",
      key: "user_full_name",
      // editable: isAdmin,
      width: 250,
      fixed: "left"
    },
    {
      title: "User Name",
      dataIndex: "user_name",
      key: "user_name",
      width: 250
      // editable: isAdmin
    },
    {
      title: "Grup",
      dataIndex: "group_name",
      key: "group_name",
      width: 150,
      editable: isAdmin
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

  return (
    <Row type="flex" justify="center" style={{ paddingRight: 50 }}>
      <Col span={24}>
        <h1 style={{ textAlign: "center" }}>
          User List - All Users - Change User Group
        </h1>
        <Table
          key={loading}
          dataSource={data}
          columns={columns}
          size="small"
          scroll={{ x: 700, y: 240 }}
          rowKey="indx"
          loading={loading}
          API={API_TO_CHANGE_USER_GROUP}
          postData={postData}
        />
      </Col>
    </Row>
  );
}
