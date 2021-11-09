import "./styleBaner.css";
// import banner from "../../../public/images/banner.PNG";

function Banner({ imgLink }) {
  return (
    <div className="homeBannerAdmin">
      <img src={imgLink} alt="Please complete the form" />
    </div>
  );
}

export default Banner;
