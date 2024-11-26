import { NavLink, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux/es/exports'
import { logo } from '../../assets/img/img'
import { peopleIcon, audioIcon, historyIcon, digIcon, peopleFillIcon, audioFillIcon, historyFillIcon, starsIcon, infoIcon } from '../../assets/icons/icons'
import "./styles/Sidebar.css"


const Sidebar = () => {
  const location = useLocation()
  const { user } = useSelector(state => state.user)

  return (
    user ? 
    <div className="sidebar-wrapper">
      <div className="sidebar">
        <div className="flex flex-col justify-between flex-grow">
          <div className="sidebar-top">
            <NavLink to="/about" className="logo">
              <p className="mt-4 fs-20 pb-2 bold">
                THALLIFY
              </p>
            </NavLink>
            <NavLink to="/top-artists" className="sidebar-item">
              {location.pathname === "/top-artists" ? peopleFillIcon : peopleIcon}
              <span>Top Artists</span>
            </NavLink>
            <NavLink to="/top-tracks" className="sidebar-item">
              {location.pathname === "/top-tracks" ? audioFillIcon : audioIcon}
              <span>Top Tracks</span>
            </NavLink>
            <NavLink to="/recently-played" className="sidebar-item">
              {location.pathname === "/recently-played" ? historyFillIcon : historyIcon}
              <span>Recent</span>
            </NavLink>
            <NavLink to="/dig" className="sidebar-item">
              {digIcon}
              <span>Dig</span>
            </NavLink>
            <NavLink to="/ai" className="sidebar-item">
              {starsIcon}
              <span>AI</span>
            </NavLink>
            {window.innerWidth > 800 ?
            <NavLink to="/about" className="sidebar-item">
              {infoIcon}
              <span>About</span>
            </NavLink>
            : null}
          </div>
          <div className="footer">
            <p className="fs-6 p-1">
              <a href="https://khvorostovskyi.com" target="_blank" rel="noreferrer">
                More projects
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
    : null
  )
}

export default Sidebar