import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";

const Payment = () => {
    //todo add publishable api key
    const stripePromise = loadStripe(import.meta.env.VITE_Payment)
    return (
        <div>
            <SectionTitle heading={"Payment Naw"} subHeading={"Please conform your payment for complete your order"}></SectionTitle>
            <h1 className="text-4xl">Taka age dea jaw</h1>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckOutForm></CheckOutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;