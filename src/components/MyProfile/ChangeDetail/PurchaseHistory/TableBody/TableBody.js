import axios from "../../../../../config/axios";
import { useEffect, useState } from "react";
import "./styleTableBody.css";
function TableBody({ item }) {
  console.log("item: ", item);
  const { createdAt, id, price } = item;
  const [courseName, setCourseName] = useState("");
  const changeToMoney = price => {
    return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
  useEffect(() => {
    const fetchDataCourseName = async () => {
      try {
        const response = await axios.get(`/course/${id}`);
        console.log(`response ------->`, response.data.courseResult.courseName);
        setCourseName(response.data.courseResult.courseName);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataCourseName();
  }, []);
  console.log(`courseName`, item.Course.courseName);
  // console.log(changeToMoney(price));
  // console.log(item);

  return (
    <div className="tableBodyPurchaseHistory">
      <div className="tableBody1">{createdAt.slice(0, 10)}</div>
      <div className="tableBody2">#{id}</div>
      <div className="tableBody3">{item.Course.courseName}</div>
      <div className="tableBody4">${changeToMoney(price)}</div>
    </div>
  );
}
export default TableBody;
