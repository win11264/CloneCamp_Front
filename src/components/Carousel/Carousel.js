import React, { useState, useEffect, useCallback, useContext } from 'react';
import { PrevButton, NextButton } from './CarouselButton';
import useEmblaCarousel from 'embla-carousel-react';
import './embla.css';
import { CarouselContext } from '../../contexts/CarouselContext';
import { useHistory } from 'react-router-dom';
function Carousel({ slides }) {
  const [viewportRef, embla] = useEmblaCarousel({
    loop: true,
    skipSnaps: false,
  });
  const history = useHistory();
  const carouselContext = useContext(CarouselContext);
  const { carouselImage, bannerImage, bannerLinkTo, bannerByIndex } =
    carouselContext;

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on('select', onSelect);
    onSelect();
  }, [embla, onSelect]);
  const handleClickLinkToPage = index => {
    // history.push(bannerLinkTo[index]);
    window.open(bannerLinkTo[index], '_blank');
  };
  // console.log('slides', slides);
  return (
    <>
      <div className='embla'>
        <div className='embla__viewport' ref={viewportRef}>
          <div className='embla__container'>
            {slides.map(index => (
              <div className='embla__slide' key={index}>
                <div className='embla__slide__inner'>
                  <img
                    className='embla__slide__img'
                    onClick={() => handleClickLinkToPage(index)}
                    src={bannerByIndex(index)}
                    alt='banner'
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
        <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
      </div>
    </>
  );
}

export default Carousel;
