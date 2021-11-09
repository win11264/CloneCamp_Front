import { Button } from '@mui/material';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { AuthContext } from '../../../contexts/authContext';
import { LoginRegisStatusContext } from '../../../contexts/loginRegisStatus';
import { PaymentContext } from '../../../contexts/paymentContext';

import '../styleShoppingCard.css';
function ShoppingCardFixed({ item }) {
  const { paymentCon, setPaymentCon } = useContext(PaymentContext);
  const { user } = useContext(AuthContext);
  const { setLoginStatus } = useContext(LoginRegisStatusContext);
  const history = useHistory();
  const chapter = item.Topics;
  // console.log('item', item);
  const handleClickPayment = () => {
    if (user === null) {
      setLoginStatus(true);
      return;
    }
    setPaymentCon(item);
    history.push('/shopping-cart');
  };
  // console.log('paymentCon', paymentCon);
  return (
    <div className='ShoppingCardFixed'>
      <div className='ShoppingCardIframeControl'>
        <iframe
          width='100%'
          height='100%'
          src={item.clip}
          title='YouTube video player'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen></iframe>
      </div>
      <div className='ShoppingCardPrice'>
        {item.discountRate ? (
          <>
            <div
              className='PriceControl'
              // style={{alignItems.center}}
            >
              <h2 className='ShoppingCardPriceH2'>
                {item.price - (item.price * item.discountRate) / 100} THB
              </h2>
              <div className='PriceDetail'>
                <p className='PriceDetailP'>{item.price} THB</p>
                <div className='grayLineMini'></div>
                <p className='PriceDetailP'>({item.discountRate}% off)</p>
              </div>
            </div>
            <div className='SellOffDurationDate'>
              <p className='SellOffDurationDateP'>
                This price until {item.discountUntil}
              </p>
            </div>
          </>
        ) : (
          <div className='PriceControl'>
            <h2 className='ShoppingCardPriceH2' style={{ color: 'gray' }}>
              {item.price} THB
            </h2>
          </div>
        )}
        <div
          className='ShoppingCardPriceButton'
          style={{ alignItems: 'center' }}>
          <Button
            sx={{ margin: 'auto' }}
            variant='contained'
            color='success'
            onClick={handleClickPayment}>
            Buy Now
          </Button>
        </div>
      </div>
      <div className='ThisCourseIncludes'>
        <h4 className='ThisCourseIncludesH4'>This course includes :</h4>
        <p className='ThisCourseIncludesP'>{item.totalStage} chapters</p>
        {/* <p className='ThisCourseIncludesP'>50 hours on-demand video</p> */}
        {/* <p className='ThisCourseIncludesP'>24 downloadable resource</p> */}
        <p className='ThisCourseIncludesP'>{item.duration} days access</p>
        <p className='ThisCourseIncludesP'>Certificate of completion</p>
      </div>
    </div>
  );
}

export default ShoppingCardFixed;
