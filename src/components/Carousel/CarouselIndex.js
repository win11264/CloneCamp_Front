import React, { useContext, useEffect, useState } from "react";
import { CarouselContext } from "../../contexts/CarouselContext";
import Carousel from "./Carousel";

function CarouselIndex() {
  const { carouselImage } = useContext(CarouselContext);
  const [slideCount, setSlideCount] = useState(5);
  // const SLIDE_COUNT = carouselImage.length;
  useEffect(() => {
    if (carouselImage.length > 0) {
      setSlideCount(carouselImage.length);
    } else {
      setSlideCount(3);
    }
  }, [carouselImage.length]);
  // const SLIDE_COUNT = slideCount;
  const slides = Array.from(Array(slideCount).keys());
  // console.log('slides: ', slides);
  return (
    <div>
      <Carousel slides={slides} />
    </div>
  );
}

export default CarouselIndex;
