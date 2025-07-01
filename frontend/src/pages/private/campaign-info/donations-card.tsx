import {
  Button,
  Input,
  InputNumber,
  Progress,
  message as antdMessage,
} from "antd";
import { CampaignTypeProps } from "../../../interfaces";
import { useState } from "react";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./checkout-form";

const stripePublicKey =
  "pk_test_51Rfn1HPkcWIWcasjBjhZHKaQ7EcWh4EG7VN3kFBqLNG2aoov9q3rUV2YpJqn8DPkBxlSETC3IWk2Fbyw63GV13t400OrfWQCv8";
const stripePromise = loadStripe(stripePublicKey);

console.log(stripePublicKey);

function DonationsCard({
  campaignData,
  reloadCampaignData,
}: {
  campaignData: CampaignTypeProps;
  reloadCampaignData: () => void;
}) {
  const [amount, setAmount] = useState(1);
  const [message, setMessage] = useState("");
  const [clientSecretToken, setClientSecretToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  const getClientSecretToken = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/payments/create-payment-intent", {
        amount,
      });
      setClientSecretToken(response.data.clientSecret);
      setShowCheckoutForm(true);
    } catch (error: any) {
      antdMessage.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const options = {
    clientSecret: clientSecretToken,
  };

  return (
    <div className="p-5 border border-solid border-gray-300">
      <div className="px-2 pb-2">
        <Progress
          percent={Number(
            (
              (campaignData.collectedAmount / campaignData.targetAmount) *
              100
            ).toFixed(2)
          )}
        />
        <h1 className="text-sm text-black mt-1">
          $ {campaignData.collectedAmount} raised of ${" "}
          {campaignData.targetAmount}
        </h1>

        <div className="flex flex-col mt-7">
          <label htmlFor="" className="text-sm text-gray-600">
            Amount
          </label>
          <InputNumber
            className="w-full"
            type="number"
            value={amount}
            onChange={(value) => setAmount(value as number)}
            min={1}
          />
        </div>

        <div className="flex flex-col mt-5">
          <label htmlFor="" className="text-sm text-gray-600">
            Message
          </label>
          <Input.TextArea
            className="w-full"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <Button
          type="primary"
          block
          className="mt-7"
          onClick={getClientSecretToken}
          loading={loading}
        >
          Donate
        </Button>
      </div>

      {clientSecretToken && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm
            open={showCheckoutForm}
            onClose={() => {
              setClientSecretToken("");
              setShowCheckoutForm(false);
            }}
            campaignData={campaignData}
            message={message}
            amount={amount}
            reloadCampaignData={() => {
              reloadCampaignData();
              setMessage("");
              setAmount(1);
            }}
          />
        </Elements>
      )}
    </div>
  );
}

export default DonationsCard;
