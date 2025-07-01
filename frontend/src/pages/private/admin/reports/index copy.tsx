import { useEffect, useState } from "react";
import PageTitle from "../../../../components/page-title";
import { message, Spin, Table } from "antd";
import axios from "axios";
import ReportCard from "./report-card";
import { DonationTypeProps } from "../../../../interfaces";
import dayjs from "dayjs";

function AdminReportsPage() {
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState({
    totalUsers: 0,
    totalCampaigns: 0,
    totalDonations: 0,
    totalAmount: 0,
    lastFiveDonations: [],
  });

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/reports/admin-reports");
      setReports(response.data);
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
      render: (_text: string, record: DonationTypeProps) => record.campaign.name,
    },
    {
      title: "Donor",
      dataIndex: "donor",
      render: (_text: string, record: DonationTypeProps) => record.user.name,
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
      <PageTitle title="Reports" />

      {loading && (
        <div className="flex justify-center items-center h-96">
          <Spin />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-7">
        <ReportCard title="Total Users" value={reports.totalUsers} />
        <ReportCard title="Total Campaigns" value={reports.totalCampaigns} />
        <ReportCard title="Total Donations" value={reports.totalDonations} />
        <ReportCard
          title="Amount Collected"
          value={reports.totalAmount}
          showCurrency
        />
      </div>

      <div className="mt-7">
        <h1 className="text-lg font-bold">Last 5 Donations</h1>
        <Table columns={columns} dataSource={reports.lastFiveDonations} />
      </div>
    </div>
  );
}

export default AdminReportsPage;
