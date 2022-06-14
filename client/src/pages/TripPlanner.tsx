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

function LoginToSave (props: {onUserReady: (arg:any) => void}) {
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

  const saveTripForUser = (user:any) => {
    props.onUserReady(user);

  }

  return (
    <div className="mainp__right" id='mytrips_loginregister'> 
            <div className="mainp__right__buttons">
              <button onClick={handleClickLog} className="mainp__right__buttons__login" style={isShownLogin ? activeButtonStyle : inactiveButtonStyle}>Login</button>
              <button onClick={handleClickReg} className="mainp__right__buttons__register" style={isShownRegister ? activeButtonStyle : inactiveButtonStyle}>Register</button>
            </div>

            <div className="mainp__right__form">
              {isShownLogin && <Login onUserLogin={saveTripForUser}/>}
            </div>
            <div className="mainp__right__form">
              {isShownRegister && <Register onUserRegister={saveTripForUser}/>}
            </div>
          </div>
  )
}

const DAY_IN_MS = 1000 * 60 * 60 * 24;

const computeNrDays = (startDate: string, endDate: string) => {
  const diffMilliseconds = new Date(endDate).getTime() - new Date(startDate).getTime();
  
  return diffMilliseconds / DAY_IN_MS;
}

function TripPlanner () {
  const detailsRef = useRef<ExportData<{ otherDetails: RawTripData['otherDetails'] }>>();
  const dailyPlannerRef = useRef<ExportData<{ dailyActivities: DayActivity[] }>>();

  const [nrDays, setNrDays] = useState(0);

  const { user } = useUserAuth();

  const sendPlannedTripData = (barelyReadyUser:any) => {
    console.log(detailsRef.current?.exportData());
    console.log(dailyPlannerRef.current?.exportData());
    saveTrip({
      userId: (user || barelyReadyUser).id,
      dailyActivities: dailyPlannerRef.current?.exportData().dailyActivities,
      otherDetails: detailsRef.current?.exportData().otherDetails
    });
  }

  const onDatesChanged = ({ startDate, endDate }) => {
    setNrDays(computeNrDays(startDate, endDate));
  };

  return (
    <MainLayout>
      <section className="trip-planner">
        <div className="trip-planner__header">
          { user === null ?
            <Popup trigger={<button className='trip-planner__save'>Login/Register to Save</button>} modal>
              <LoginToSave onUserReady={(user) => sendPlannedTripData(user)}/>
            </Popup>
            :
            <button onClick={sendPlannedTripData} className="trip-planner__save">Save trip</button>
          }
          
        </div>

        <div className="trip-planner__body">
          <Details onDatesChanged={onDatesChanged} ref={detailsRef} />
          <ActivitiesProvider>
            <DailyPlanner nrDays={nrDays} ref={dailyPlannerRef} />
            <Activities />
          </ActivitiesProvider>
        </div>
      </section>
    </MainLayout>
    
    
  )
}

export default TripPlanner