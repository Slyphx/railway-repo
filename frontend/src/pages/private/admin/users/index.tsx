import { useEffect, useState } from "react";
import PageTitle from "../../../../components/page-title";
import { UserTypeProps } from "../../../../interfaces";
import { message, Table } from "antd";
import axios from "axios";
import dayjs from "dayjs";

function UsersList() {
  const [users, setUsers] = useState<UserTypeProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/users/all-users");
      setUsers(response.data.users);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Is Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean) => (isActive ? "Active" : "Inactive"),
    },
    {
      title: "Joined At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) =>
        dayjs(createdAt).format("MMM DD YYYY , hh:mm A"),
    },
  ];

  return (
    <div>
      <PageTitle title="Users" />
      <Table
        dataSource={users}
        columns={columns}
        loading={loading}
        rowKey="_id"
      />
    </div>
  );
}

export default UsersList;
