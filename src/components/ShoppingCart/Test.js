import { useEffect } from 'react';
import { publicKey } from '../../confidential/keys';
function Test() {
  let OmiseCard;
  OmiseCard = window.OmiseCard;
  OmiseCard.configure({
    publicKey,
    frameLabel: 'TEST',
    submitLabel: 'PAY NOW',
    currency: 'thb',
  });
  //   const creditCardConfigure = () => {
  //     console.log('Click2');
  //     OmiseCard.configure({
  //       defaultPaymentMethod: 'credit_card',
  //       otherPaymentMethods: [],
  //     });
  //     OmiseCard.configureButton('#credit-card');
  //     OmiseCard.attach();
  //   };
  useEffect(() => {
    OmiseCard.configure({
      defaultPaymentMethod: 'credit_card',
      otherPaymentMethods: [],
    });
    OmiseCard.configureButton('#credit-card');
    OmiseCard.attach();
  }, []);

  const handleClick = e => {
    // console.log('Click');
    e.preventDefault();
    // creditCardConfigure();
  };
  return (
    <div>
      <form action=''>
        <button id='credit-card' onClick={handleClick}>
          Click
        </button>
      </form>
    </div>
  );
}

export default Test;
