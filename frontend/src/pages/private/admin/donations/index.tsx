import { useEffect, useState } from "react";
import PageTitle from "../../../../components/page-title";
import { DonationTypeProps } from "../../../../interfaces";
import { message, Table } from "antd";
import axios from "axios";
import dayjs from "dayjs";

function AdminDonationsPage() {
  const [donations, setDonations] = useState<DonationTypeProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/donations/get-all`);
      setDonations(response.data);
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
      title: "Campaign",
      dataIndex: "campaign",
      render: (_text: string, record: DonationTypeProps) => 
        record.campaign?.name || "Campaign Unavailable", // ✅ Fixed line 32
    },
    {
      title: "Donor",
      dataIndex: "donor",
      render: (_text: string, record: DonationTypeProps) => 
        record.user?.name || "User Unavailable", // ✅ Fixed line 36
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (_text: string, record: DonationTypeProps) => `$${record.amount}`,
    },
    {
      title: "Payment Id",
      dataIndex: "paymentId",
      key: "paymentId",
    },
    {
      title: "Date & Time",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_text: string, record: DonationTypeProps) =>
        dayjs(record.createdAt).format("MMMM DD, YYYY h:mm A"),
    },
  ];

  return (
    <div>
      <PageTitle title="Donations" />
      <Table 
        columns={columns} 
        dataSource={donations} 
        loading={loading}
        rowKey="_id" // ✅ Added to fix the missing key warning
      />
    </div>
  );
}

export default AdminDonationsPage;