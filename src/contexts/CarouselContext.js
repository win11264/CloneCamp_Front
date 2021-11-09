import { createContext, useState, useEffect } from 'react';
import React from 'react';
import axios from '../config/axios';

const CarouselContext = createContext();

function CarouselContextProvider({ children }) {
  const [carouselImage, setCarouselImage] = useState([]);
  const [bannerImage, setBannerImage] = useState([]);
  const [bannerLinkTo, setBannerLinkTo] = useState([]);
  //   console.log('bannerImage: ', bannerImage);
  //   console.log('bannerLinkTo: ', bannerLinkTo);
  useEffect(() => {
    try {
      const fetchDataBanner = async () => {
        const response = await axios.get('/banner');
        // console.log(response.data.result);
        setCarouselImage(response.data.result);
        setBannerImage(response.data.result.map(item => item.image));
        setBannerLinkTo(response.data.result.map(item => item.link));
      };
      fetchDataBanner();
    } catch (error) {}
  }, []);
  const bannerByIndex = index => bannerImage[index % bannerImage.length];
  return (
    <CarouselContext.Provider
      value={{ carouselImage, bannerImage, bannerLinkTo, bannerByIndex }}>
      {children}
    </CarouselContext.Provider>
  );
}

export { CarouselContext, CarouselContextProvider };
