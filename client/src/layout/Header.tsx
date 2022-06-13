import './Header.scss'

import { Link } from "react-router-dom"

function Header () {
  return (
    <header className="header">
      <Link className='header__title' to='/'>TripDesigner</Link>

      <nav className='header__nav'>
        <ul className='header__tabs'>
          <li className='header__tab'><Link to="/test">Create a trip</Link></li>
          <li className='header__tab'><Link to="/my-trips">My trips</Link></li>
          <li className='header__tab'><Link to="/settings">Settings</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header