import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useAuthContext } from '../context/Context.Auth';
import { RoutesData } from '../config/Config.Routes';
import { HeaderComponent } from './Component.Header';

export const BarNavigation = () => {

    const { loggedUserData } = useAuthContext()!;

    const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);

    const profiles = loggedUserData.user.profile

    return (
        <>
            <HeaderComponent
                setIsMenuVisible={setIsMenuVisible}
                isMenuVisible={isMenuVisible} />

            {loggedUserData.isLoggedIn && (
                <>
                    {
                        <div className={
                            !isMenuVisible ? 'nav-container' : 'nav-container active'}>
                            <div className="nav-menu">

                                <ul>
                                    {
                                        profiles.map((profile) => (
                                            RoutesData[`${profile}`].routes.map((route, index) => {
                                                return route.title && <li key={index}>
                                                    <Link className='link' to={route.path}>
                                                        <span className='route-icon'>
                                                            {route.icon}
                                                        </span>
                                                        {route.title}
                                                    </Link>
                                                </li>

                                            })
                                        ))
                                    }

                                </ul>
                            </div>
                        </div>
                    }
                </>
            )}
        </>


    )
}
