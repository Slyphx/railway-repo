import { useEffect, useState } from "react";
import PageTitle from "../../../components/page-title";
import { CampaignTypeProps } from "../../../interfaces";
import axios from "axios";
import { message, Progress, Spin } from "antd";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const [campaigns, setCampaigns] = useState<CampaignTypeProps[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/campaigns/get-all");
      setCampaigns(response.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <PageTitle title="Campaigns..." />
      {loading && (
        <div className="flex justify-center items-center h-96">
          <Spin />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
        {campaigns.map((campaign) => (
          <div
            className="rounded border border-solid hover:border-primary cursor-pointer"
            key={campaign._id}
            onClick={() => navigate(`/campaign/${campaign._id}`)}
          >
            <img
              src={campaign.images[0]}
              alt={campaign.name}
              className="rounded-t w-full h-52 object-cover"
            />

            <div className="flex flex-col gap-1 p-3">
              <h1 className="text-sm font-semibold">{campaign.name}</h1>
            </div>

            <div className="px-2 pb-2">
              <Progress
               percent={Number(
                (
                  (campaign.collectedAmount / campaign.targetAmount) *
                  100
                ).toFixed(2)
              )}
              />
              <h1 className="text-xs text-black">
                $ {campaign.collectedAmount} raised of $ {campaign.targetAmount}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Homepage;
