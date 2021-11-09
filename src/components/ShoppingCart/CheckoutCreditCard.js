import React from 'react';
import Script from 'react-load-script';

function checkOutCreditCard() {
  const handleLoadScript = () => {
    // console.log(window.OmiseCard);
  };
  return (
    <div>
      <form action=''>
        <Script
          url='https://cdn.omise.co/omise.js'
          onLoad={this.handleLoadScript}
        />
        <button>Pay with Credit Card</button>
      </form>
    </div>
  );
}

export default checkOutCreditCard;
