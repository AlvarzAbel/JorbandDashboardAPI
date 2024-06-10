import { MenuItem } from "primereact/menuitem";
import { STORAGE_URL } from "../config/Config.EndPoints";
import { useAuthContext } from "../context/Context.Auth";
import { AiOutlineAlignLeft } from "react-icons/ai";
import { Menu } from "primereact/menu";
import { Avatar } from "primereact/avatar";
import { useRef } from 'react';
import logo from '../assets/jorbandorange.png'
import { useNavigate } from "react-router-dom";

interface Props {
    setIsMenuVisible: any;
    isMenuVisible: boolean;
}

export const HeaderComponent = ({ setIsMenuVisible, isMenuVisible }: Props) => {

    const { loggedUserData, handleLogout } = useAuthContext()!;
    const navigate = useNavigate();

    const menu = useRef<Menu>(null);

    const picture = localStorage.getItem('PROFILE_PICTURE');
    const profilePicture = `${STORAGE_URL}/${picture}`

    const commonRoutes = [
        {
            label: 'Perfil',
            icon: 'pi pi-user',
            url: '/profile'
        },
        {
            label: 'Mis Aportes',
            icon: 'pi pi-money-bill',
            url: '/myFinances'
        }
    ]
    
    const singerRoutes = [
        ...loggedUserData.user.profile.includes('SINGER') ? [
            {
                label: 'Mis Listados',
                icon: 'pi pi-list',
                url: '/myLists'
            }
        ] : []
    ]

    const menuItems: MenuItem[] = [
        {
            label: `${loggedUserData.user.name}`,
            items: [
                ...commonRoutes,
                ...singerRoutes,
                {
                    label: 'Cerrar Sesión',
                    icon: 'pi pi-power-off',
                    command: () => {
                        logoutHandling()
                    }
                }
            ]
        }
    ];

    const logoutHandling = () => {
        handleLogout();
        window.location.reload();
    }

    return (
        <>
            {loggedUserData.isLoggedIn && (

                <div className='header-container'>
                    <div className="header-content">
                        <div className="open-closeMenu" onClick={() => setIsMenuVisible(!isMenuVisible)}>
                            <AiOutlineAlignLeft />
                        </div>
                        <div className="logo">
                            <img src={logo} alt="" style={{ height: '8vh', cursor: 'pointer' }} onClick={() => navigate('/')} />
                        </div>
                        <div className="p-0 flex justify-content-center align-items-center" style={{ backgroundColor: 'transparent' }}>

                            <Menu model={menuItems}
                                popup
                                ref={menu}
                                popupAlignment="right" />
                            <Avatar
                                image={profilePicture}
                                size="large"
                                shape="circle"
                                onClick={(event) => menu.current?.toggle(event)} />

                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
