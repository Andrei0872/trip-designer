import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import TripPlanner from './pages/TripPlanner';
import Test from './pages/Test';
import Main from './pages/Main';
import MyTrips from './pages/MyTrips';
import { UserAuthProvider } from './context/userAuthContext';
import UserAuthenticatedGuard from './guards/UserAuthenticatedGuard';
import UserUnAuthenticatedGuard from './guards/UserUnauthenticatedGuard';

const root = createRoot(document.getElementById('root')!);
root.render(
  // <React.StrictMode>
    <BrowserRouter>
        <UserAuthProvider>
          <Routes>
              <Route path="/" element={ <UserUnAuthenticatedGuard><Main /></UserUnAuthenticatedGuard> }
              />
              <Route path="test" element={<Test />} />
              <Route path="trip-planner" element={ <TripPlanner />} />
              <Route path="my-trips" element={<UserAuthenticatedGuard><MyTrips /></UserAuthenticatedGuard> } />
              <Route path='*' element={ <Navigate to='my-trips' /> } />
          </Routes>
        </UserAuthProvider>
    </BrowserRouter>
  // </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
