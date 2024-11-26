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
                <h1 className="header-title text-menu animation-slide-in">
                    {
                        location.pathname.includes('/top-artists') ? 'Top Artists' :
                        location.pathname.includes('/top-tracks') ? 'Top Tracks' :
                        location.pathname.includes('/dig') ? 'Dig Deeper' :
                        location.pathname.includes('/ai') ? 'AI' :
                        location.pathname.includes('/about') ? 'About' :
                        "Recent"
                    }
                </h1>
            </div>
        </div>
    )
}

export default Header