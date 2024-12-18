import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SpotifyLogin } from './';
import { logo } from '../assets/img/img';

const Login = () => {
    const navigate = useNavigate();
    const { user } = useSelector(state => state.user);


    useEffect(() => {
        if (user) {
            navigate('/top-artists');
        }
    }, [navigate, user]);

    return (
        <>
        <div 
            className="px-1 text-center bg-gradient relative overflow-hidden"
        >
            <div className="mx-w-sm mx-auto h-screen flex flex-col justify-center">
                <h1 className="title-1 filter-shadow">
                    Your Ai Spotify
                </h1>
                <h5 className="title-3 mt-3 filter-shadow">
                    Discover, share and get to know your music taste
                </h5>
            <div className="mt-2">
                <SpotifyLogin />
            </div>
            <h6 className="fs-4 mt-1 filter-shadow">
                <Link to="/about">What is Thallify.com?</Link>
            </h6>
            </div>
        </div>
        </>
    )
}

export default Login