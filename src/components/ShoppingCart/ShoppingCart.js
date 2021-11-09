import "./styleShoppingCart.css";
import Avatar from "@mui/material/Avatar";
import John from "../../public/images/john.jpg";
import {
  imageConfig,
  FormControlConfig,
  FormShortControlConfig,
} from "./muiConfig";
import { useContext, useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import CourseCard from "../CourseCard/CourseCard";
import { publicKey } from "../../confidential/keys";
import axios from "../../config/axios";
import { PaymentContext } from "../../contexts/paymentContext";
import { AuthContext } from "../../contexts/authContext";
import { useHistory } from "react-router";
import { UserContext } from "../../contexts/userContext";
import Swal from "sweetalert2";

function ShoppingCart() {
  const { paymentCon, setPaymentCon } = useContext(PaymentContext);
  const { user } = useContext(AuthContext);
  const [image, setImage] = useState({ profileImage: "" });
  const [payment, setPayment] = useState("Visa");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [ccv, setCcv] = useState("");
  console.log(paymentCon.id);
  // console.log(paymentCon);
  const { userById } = useContext(UserContext);
  console.log("userById: ", userById);
  const history = useHistory();
  const amount =
    paymentCon.price - (paymentCon.price * paymentCon.discountRate) / 100;
  // console.log(user);
  let OmiseCard;

  OmiseCard = window.OmiseCard;
  OmiseCard.configure({
    publicKey,
    frameLabel: "Clone Camp",
    submitLabel: "PAY NOW",
    currency: "thb",
  });

  useEffect(() => {
    OmiseCard.configure({
      defaultPaymentMethod: "credit_card",
      otherPaymentMethods: [],
    });
    OmiseCard.attach();
  }, []);
  const handleClick = e => {
    // console.log('Click');
    e.preventDefault();
    OmiseCard.open({
      amount: amount * 100,
      submitFormTarget: "#credit-card",
      onCreateTokenSuccess: async nonce => {
        // console.log('nonce: ', nonce);
        const res = await axios.post("/checkout", {
          token: nonce,
          courseId: paymentCon.id,
        });
        // console.log(res);
        if (res.status === 200) {
          Swal.fire({
            title: `Payment Successful`,

            confirmButtonText: "Ok",
          }).then(result => {
            history.push("/");
            window.location.reload();
          });
        } else {
          alert("Payment Fail");
        }
      },
      onFormClosed: () => {},
    });
    // omiseCardHandler();
  };
  return (
    <>
      <div className="mainDivShoppingCartController">
        <div className="ShoppingCartConTroller">
          <div className="ShoppingCartTop">
            <Avatar
              className="ShoppingCartAvatar"
              alt="Remy Sharp"
              src={userById.profileImage}
              sx={imageConfig}
            />
            <h1 className="ShoppingCartH1">{user.username}</h1>
          </div>
          <div className="grayLine"></div>
        </div>

        <div className="shoppingCartBottom">
          <div className="CoursesInCart">
            <div className="CoursesInCartHeader">
              <h2>Shopping Cart</h2>
            </div>
            <CourseCard item={paymentCon} />
          </div>
          <div className="inputPayment">
            <div className="inputPaymentCalculate">
              <h2>Total:</h2>
              <div className="inputPaymentCalculateAmount">
                <h1>{amount}</h1>
                <h1>&nbsp;THB</h1>
              </div>
              <div className="grayLine"></div>
            </div>
            <div className="divFormAddPayment">
              <form className="formPayment">
                <Button
                  id="credit-card"
                  variant="contained"
                  type="submit"
                  sx={{
                    marginTop: "10px",
                  }}
                  onClick={e => {
                    handleClick(e);
                  }}
                >
                  Check Out
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShoppingCart;
