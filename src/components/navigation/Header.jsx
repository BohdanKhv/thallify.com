import { useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { infoIcon, arrowLeftShortIcon } from '../../assets/icons/icons';
import "./styles/Header.css"

const Header = () => {
    const location = useLocation();
    const { user } = useSelector(state => state.user);

    return (
        <div className="header">
            <div className="flex gap-1 align-center">
                {location.pathname.includes('/about') ? (
                    <Link to={user ? "/top-artists" : "/"} className="icon-lg icon-btn" title="Home">
                        {arrowLeftShortIcon}
                    </Link>
                ) : (
                    null
                )}
                <h1 className="header-title text-menu">
                    {
                        location.pathname.includes('/top-artists') ? 'Top Artists' :
                        location.pathname.includes('/top-tracks') ? 'Top Tracks' :
                        location.pathname.includes('/dig') ? 'Dig Deeper' :
                        location.pathname.includes('/about') ? 'About' :
                        "Recent"
                    }
                </h1>
            </div>
        </div>
    )
}

export default Header