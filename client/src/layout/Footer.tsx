import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Footer.scss'
function Footer () {
  return (
    <footer className="footer">
      <div className='footer__info'>
        <div className='footer__contact'>
          <p><b>CONTACT:</b></p>
          <p><FontAwesomeIcon fontSize={'.9rem'} icon={faEnvelope} /> Email: <a href="mailto:tripDesigner@gmail.com">tripDesigner@gmail.com</a></p>
          <p><FontAwesomeIcon fontSize={'.9rem'} icon={faPhone} /> Phone: +40767309799</p>
        </div>

        <div className='footer__social__media'>
          <p><b>CONNECT WITH US:</b></p>
          <p><a href="http://www.facebook.com/TripDesigner"><FontAwesomeIcon fontSize={'1.2rem'} icon={faFacebook} /></a> <a href="http://www.instagram.com/TripDesigner"><FontAwesomeIcon fontSize={'1.2rem'} icon={faInstagram} /></a> <a href="https://www.youtube.com/channel/TripDesigner"><FontAwesomeIcon fontSize={'1.2rem'} icon={faYoutube} /></a></p>
        </div> 

        <div className='footer__about'>
          <p><b>ABOUT US:</b></p>
          <p>We are a group of young programmers passionate about travel, <br/>who try to simplify the process of organizing the trip using technology.</p>
        </div>
      </div>

      <div className='footer__details'>
        <p>Created on 15 April 2022</p>  
        <p>This website has learning purposes only!</p>
        <p>Copyright <FontAwesomeIcon fontSize={'.9rem'} icon={faCopyright} /> 2022 TripDesigner </p>
      </div>
        
    </footer>
  )
}

export default Footer;