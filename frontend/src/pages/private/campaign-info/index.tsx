import { Button, Image, message, Spin } from "antd";
import PageTitle from "../../../components/page-title";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CampaignTypeProps } from "../../../interfaces";
import axios from "axios";
import DonationsCard from "./donations-card";

function CampaignInfoPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [campaignData, setCampaignData] = useState<CampaignTypeProps | null>(
    null
  );
  const params = useParams();

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/campaigns/get/${params.id}`);
      setCampaignData(response.data);
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
      <Button onClick={() => navigate("/")}>Back To Campaigns</Button>
      {loading && (
        <div className="flex justify-center items-center h-96">
          <Spin />
        </div>
      )}
      {campaignData && (
        <div className="mt-5">
          <PageTitle title={campaignData.name} />

          <div className="grid grid-cols-1 md:grid-cols-3 mt-5 gap-5">
            <div className="col-span-2">
              <img
                src={campaignData.images[0]}
                alt={campaignData.name}
                className="rounded w-full md:h-[500px] object-cover"
              />

              <div className="flex gap-5 mt-5">
                {campaignData.images.map((image, index) => (
                  <Image
                    src={image}
                    key={index}
                    className="w-24 h-24 rounded"
                    height={80}
                    width={100}
                  />
                ))}
              </div>

              <p className="text-sm mt-5">{campaignData.description}</p>
            </div>
            <div className="col-span-1">
              <DonationsCard
                campaignData={campaignData}
                reloadCampaignData={getData}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CampaignInfoPage;
