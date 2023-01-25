import { DeleteOutlined, LockOutlined, UnlockOutlined } from "@ant-design/icons";
import { Button, Table, Tag } from "antd";
import axios from "axios";
import config from "../config.json";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
const columns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "Username",
    dataIndex: "username",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Last login date",
    dataIndex: "login_date",
  },
  {
    title: "Registration date",
    dataIndex: "register_date",
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (status) => (
      <Tag color={status === 1 ? "green" : "red"}>{status === 1 ? "active" : "blocked"}</Tag>
    ),
  },
];

const UsersTable = ({ users, getUsers }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [blockLoading, setBlockLoading] = useState(false);
  const [unBlockLoading, setUnBlockLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const data = users.map((item) => ({
    key: item.id,
    id: item.id,
    username: item.username,
    email: item.email,
    login_date:
      item.login_time !== "0000-00-00 00:00:00" && new Date(item.login_time).toLocaleString(),
    register_date:
      item.register_time !== "0000-00-00 00:00:00" && new Date(item.register_time).toLocaleString(),
    status: item.status,
  }));

  const blockUser = () => {
    setBlockLoading(true);

    axios
      .put(config.baseUrl + "/update/block", selectedRowKeys, { withCredentials: true })
      .then((res) => {
        toast(res.data.message);
        getUsers();
      })
      .catch((err) => console.log(err));

    setTimeout(() => {
      setSelectedRowKeys([]);
      setBlockLoading(false);
    }, 1000);
  };

  const unBlockUser = () => {
    setUnBlockLoading(true);

    axios
      .put(config.baseUrl + "/update/unblock", selectedRowKeys, { withCredentials: true })
      .then((res) => {
        toast(res.data.message);
        getUsers();
      })
      .catch((err) => console.log(err));

    setTimeout(() => {
      setSelectedRowKeys([]);
      setUnBlockLoading(false);
    }, 1000);
  };

  const deleteUser = () => {
    setDeleteLoading(true);

    axios
      .put(config.baseUrl + "/update/delete", selectedRowKeys, { withCredentials: true })
      .then((res) => {
        toast(res.data.message);
        getUsers();
      })
      .catch((err) => console.log(err));

    setTimeout(() => {
      setSelectedRowKeys([]);
      setDeleteLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          gap: "8px",
          alignItems: "center",
        }}
      >
        <Button
          icon={<LockOutlined />}
          size="medium"
          style={{ border: "1px solid #ffa39e", color: "#cf1322" }}
          onClick={blockUser}
          disabled={!hasSelected}
          loading={blockLoading}
        >
          Block
        </Button>
        <Button
          icon={<UnlockOutlined />}
          size="medium"
          style={{ border: "1px solid #b7eb8f", color: "#389e0d" }}
          onClick={unBlockUser}
          disabled={!hasSelected}
          loading={unBlockLoading}
        >
          Unblock
        </Button>
        <Button
          icon={<DeleteOutlined />}
          size="medium"
          style={{ border: "1px solid red", color: "red" }}
          onClick={deleteUser}
          disabled={!hasSelected}
          loading={deleteLoading}
        >
          Delete
        </Button>
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <Table pagination={false} rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );
};
export default UsersTable;
