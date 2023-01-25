import React from "react";
import UsersTable from "../components/UsersTable";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config.json";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { ToastContainer, toast } from "react-toastify";

const Cabinet = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios
      .get(config.baseUrl + "/", { withCredentials: true })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        toast(err?.response?.data?.message);
        navigate("/login");
      });
  };

  const handleLogout = () => {
    axios
      .get(config.baseUrl + "/auth/logout", { withCredentials: true })
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="cabinet">
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
      <div className="header">
        <h1>Admin Panel</h1>
        <Button onClick={handleLogout} style={{}} type="primary" size="large">
          Log out
        </Button>
      </div>

      <div className="table-wrapper">
        <UsersTable getUsers={getUsers} users={users} />
      </div>
    </div>
  );
};

export default Cabinet;
