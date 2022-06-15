import './TripPlanner.scss'

import Activities from "../components/Activities"
import DailyPlanner from "../components/DailyPlanner"
import Details from "../components/Details"
import { ActivitiesProvider } from '../context/activities'
import MainLayout from '../layout/MainLayout'
import { useRef, useState } from 'react'
import { ExportData } from '../types/utils'
import { saveTrip } from '../api/trip'
import { useUserAuth } from '../context/userAuthContext'
import { DayActivity } from '../types/activity'
import { RawTripData } from '../types/trip'
import Login from "../components/login-register/Login";
import Register from "../components/login-register/Register";
import Popup from 'reactjs-popup';

function LoginToSave () {
  const [isShownLogin, setIsShownLogin] = useState(true);
  const [isShownRegister, setIsShownRegister] = useState(false);
  const handleClickLog = (e: any) => {
    e.preventDefault();
    if (!isShownLogin) {
      setIsShownLogin(true);
      setIsShownRegister(false);
    }
  }
  const handleClickReg = (e: any) => {
    e.preventDefault();
    if (!isShownRegister) {
      setIsShownRegister(true);
      setIsShownLogin(false);
      
    }
  }
  const activeButtonStyle = {
    color: "#2988BC",
    backgroundColor: "#F4EADE"
  }
  const inactiveButtonStyle = {
    color: "#F4EADE",
    backgroundColor: "#2988BC"
  }
  return (
    <div className="mainp__right" id='mytrips_loginregister'> 
            <div className="mainp__right__buttons">
              <button onClick={handleClickLog} className="mainp__right__buttons__login" style={isShownLogin ? activeButtonStyle : inactiveButtonStyle}>Login</button>
              <button onClick={handleClickReg} className="mainp__right__buttons__register" style={isShownRegister ? activeButtonStyle : inactiveButtonStyle}>Register</button>
            </div>

            <div className="mainp__right__form">
              {isShownLogin && <Login/>}
            </div>
            <div className="mainp__right__form">
              {isShownRegister && <Register/>}
            </div>
          </div>
  )
}

function TripPlanner () {
  const detailsRef = useRef<ExportData<{ otherDetails: RawTripData['otherDetails'] }>>();
  const dailyPlannerRef = useRef<ExportData<{ dailyActivities: DayActivity[] }>>();

  const { user } = useUserAuth();

  const sendPlannedTripData = () => {
    console.log(detailsRef.current?.exportData());
    console.log(dailyPlannerRef.current?.exportData());
    saveTrip({
      userId: user.id,
      dailyActivities: dailyPlannerRef.current?.exportData().dailyActivities,
      otherDetails: detailsRef.current?.exportData().otherDetails
    });
  }

  return (
    <MainLayout>
      <section className="trip-planner">
        <div className="trip-planner__header">
          { user === null ?
            <Popup trigger={<button className='trip-planner__save'>Login/Register to Save</button>} modal>
              <LoginToSave/>
            </Popup>
            :
            <button onClick={sendPlannedTripData} className="trip-planner__save">Save trip</button>
          }
          
        </div>

        <div className="trip-planner__body">
          <Details ref={detailsRef} />
          <ActivitiesProvider>
            <DailyPlanner ref={dailyPlannerRef} />
            <Activities />
          </ActivitiesProvider>
        </div>
      </section>
    </MainLayout>
    
    
  )
}

export default TripPlanner