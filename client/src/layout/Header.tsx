import './Header.scss'

import { Link, useNavigate } from "react-router-dom"
import { useUserAuth } from '../context/userAuthContext'

function Header () {
  const { user, logOutUser } = useUserAuth();
  const navigate = useNavigate();

  const doesUserExist = !!user;

  const doLogout = () => {
    logOutUser();
    navigate('/');
  }

  return (
    <header className="header">
      <div className='header__title'>TripDesigner</div>

      {
        doesUserExist
          ? <nav className='header__nav'>
              <ul className='header__tabs'>
                <li className='header__tab'><Link to="/test">Create a trip</Link></li>
                <li className='header__tab'><Link to="/my-trips">My trips</Link></li>
                <li className='header__tab'><Link to="/settings">Settings</Link></li>
                <li className='header__tab' onClick={doLogout}><span>Log out</span></li>
              </ul>
            </nav>
          : null
      }
    </header>
  )
}

export default Header