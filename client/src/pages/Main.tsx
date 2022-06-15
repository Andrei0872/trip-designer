import MainLayout from "../layout/MainLayout";
import "./Main.scss";
import Login from "../components/login-register/Login";
import Register from "../components/login-register/Register";
import { useState } from "react";
import { Link } from "react-router-dom";

function Main() {
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
    <MainLayout>
        <div className="mainp">
          <video playsInline autoPlay muted loop id="backgroundVideo">
            <source src="/background_video_1.mp4" type="video/mp4"/>
          </video>
          <div className="mainp__inspirational"> 
            <h1 className="mainp__inspirational__sentence">Dare to live <br/> <i> the life </i> <br/> you've always wanted</h1>
            <Link to="/trip-planner"><button className="mainp__inspirational__startbutton">Start the adventure!</button></Link>
          </div>

          <div className="mainp__right"> 
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
        </div>
    </MainLayout>
  )
}

export default Main;