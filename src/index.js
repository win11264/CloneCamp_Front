import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { AuthContextProvider } from './contexts/authContext';
import { CourseContextProvider } from './contexts/courseContext';
import { PaymentContextProvider } from './contexts/paymentContext';
import { LoginRegisStatusContextProvider } from './contexts/loginRegisStatus';
import { ToggleContextProvider } from './contexts/toggleContext';
import { UserContextProvider } from './contexts/userContext';
import { CarouselContextProvider } from './contexts/CarouselContext';
import { CategoryContextProvider } from './contexts/categoryContext';
import { TogglePageContextProvider } from './contexts/togglePageContext';

ReactDOM.render(
  <React.StrictMode>
    <ToggleContextProvider>
      <AuthContextProvider>
        <UserContextProvider>
          <CategoryContextProvider>
            <PaymentContextProvider>
              <CarouselContextProvider>
                <CourseContextProvider>
                  <LoginRegisStatusContextProvider>
                    <TogglePageContextProvider>
                      <App />
                    </TogglePageContextProvider>
                  </LoginRegisStatusContextProvider>
                </CourseContextProvider>
              </CarouselContextProvider>
            </PaymentContextProvider>
          </CategoryContextProvider>
        </UserContextProvider>
      </AuthContextProvider>
    </ToggleContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
