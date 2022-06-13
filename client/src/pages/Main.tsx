import MainLayout from "../layout/MainLayout";
import "./Main.scss";
import Login from "../components/login-register/Login";
import Register from "../components/login-register/Register";
import { useState } from "react";

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
  return (
    <MainLayout>
        <div className="mainp">
          <video playsInline autoPlay muted loop id="backgroundVideo">
            <source src="/background_video_1.mp4" type="video/mp4"/>
          </video>
          <div className="mainp__inspirational"> 
            <h1 className="mainp__inspirational__sentence">Dare to live <br/> <i> the life </i> <br/> you've always wanted</h1>
            <button className="mainp__inspirational__startbutton">Start the adventure!</button> 
          </div>

          <div className="mainp__right"> 
            <div className="mainp__right__button">
              <button onClick={handleClickLog} className="mainp__right__button__login">Login</button>
              <button onClick={handleClickReg} className="mainp__right__button__register">Register</button>
            </div>

            <div>
              {isShownLogin && <Login/>}
            </div>
            <div>
              {isShownRegister && <Register/>}
            </div>
          </div>
        </div>
    </MainLayout>
  )
}

export default Main;