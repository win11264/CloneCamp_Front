import './styleCourseCard.css';
import axios from '../../config/axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import courseImage from '../../public/images/javascript-training-120620.jpg';

function CourseCard({ item }) {
  const {
    id,
    courseName,
    rating,
    price,
    ratingAmount,
    level,
    duration,
    discountRate,
    courseImage,
    status,
  } = item.Course ? item.Course : item;
  // console.log('item: ', status);
  // console.log('item: ', item.Course);
  // const result = item.CourseCats.map(item => item.categoryId);
  const history = useHistory();
  // console.log('item: ', item);
  // console.log('item: ', item.CourseCats);
  const handleClickToCourseCardDetail = () => {
    history.push(`/shopping-card/${id}`);
  };
  return (
    <>
      {status !== 'notReady' && (
        <div className='cardBody' onClick={handleClickToCourseCardDetail}>
          <div className='divCourseImage'>
            <img src={courseImage} alt='' />
          </div>
          <div className='divCourseDetail'>
            <div className='divDiscountRateTag'>
              <h1 className='divCourseName'>{courseName}</h1>
              {discountRate !== 0 && (
                <div className='discount-label red'>
                  <span>-{discountRate}%</span>
                </div>
              )}
            </div>
            <div className='divDetailCourseCard'>
              <h2 className='h2CourseCard'>{rating}/5</h2>&nbsp;&nbsp;
              <p className='pCourseCard'>({ratingAmount} Reviews)</p>
            </div>
            <div className='divDetailCourseCard'>
              <h2 className='h2CourseCard'>Level : </h2>&nbsp;&nbsp;
              <p className='pCourseCard'>{level}</p>
            </div>
            <div className='divDetailCourseCard'>
              <h2 className='h2CourseCard'>Duration : </h2>&nbsp;&nbsp;
              <p className='pCourseCard'>{duration} day</p>
            </div>
            <div className='divDetailCourseCard'>
              <h2 className='h2CourseCard'>Price : </h2>&nbsp;&nbsp;
              <div className='saleRedLineController2'>
                <div className='saleRedLineController'>
                  <p className='pCourseCard'>{price} THB</p>
                  {discountRate !== 0 && <div className='saleLineRed'></div>}
                </div>
                {discountRate !== 0 && (
                  <p className='pCourseCard divRed'>
                    {/* {(price * discountRate) / 100} THB */}
                    {(price * (100 - discountRate)) / 100} THB
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* <div className='threeTagControl'>
        {(result[0] === 1 || result[1] === 1 || result[2] === 1) && (
          <div className='frontEnd'>Front End</div>
        )}
        {(result[0] === 2 || result[1] === 2 || result[2] === 2) && (
          <div className='backEnd'>Back End</div>
        )}
        {(result[0] === 3 || result[1] === 3 || result[2] === 3) && (
          <div className='uxUi'>UX/UI</div>
        )}
      </div> */}
        </div>
      )}
    </>
  );
}

export default CourseCard;
