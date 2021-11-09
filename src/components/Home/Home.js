import axios from "../../config/axios";
import { useContext, useEffect, useState } from "react";
import Banner from "./Banner/Banner";
import Body from "./Body/Body";
import { CarouselContext } from "../../contexts/CarouselContext";

function Home() {
  const [getImg, setGetImg] = useState();
  const carouselContext = useContext(CarouselContext);

  useEffect(() => {
    const getImg = async () => {
      const resGetImg = await axios.get("/banner");
      // console.log("@resGetImg:", resGetImg);
      setGetImg(resGetImg.data.result[0]?.image);
    };
    getImg();
  }, []);

  return (
    <div style={{ minHeight: "600px" }}>
      {carouselContext.bannerImage && <Banner getImg={getImg} />}
      <Body />
    </div>
  );
}

export default Home;
