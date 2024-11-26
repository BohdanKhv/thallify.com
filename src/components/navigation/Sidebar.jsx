import { NavLink, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux/es/exports'
import { logo } from '../../assets/img/img'
import { peopleIcon, audioIcon, historyIcon, digIcon, peopleFillIcon, audioFillIcon, historyFillIcon } from '../../assets/icons/icons'
import "./styles/Sidebar.css"


const Sidebar = () => {
  const location = useLocation()
  const { user } = useSelector(state => state.user)

  return (
    user ? 
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
        </div>
        <div className="text-center footer border-top">
          <p className="fs-6">
            2025
          </p>
        </div>
      </div>
    </div>
    : null
  )
}

export default Sidebar