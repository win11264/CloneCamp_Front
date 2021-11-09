import { createContext, useState } from 'react';

const PaymentContext = createContext();
function PaymentContextProvider({ children }) {
  const [paymentCon, setPaymentCon] = useState({});
  return (
    <PaymentContext.Provider
      value={{
        paymentCon,
        setPaymentCon,
      }}>
      {children}
    </PaymentContext.Provider>
  );
}

export { PaymentContextProvider, PaymentContext };
