import { Navigate } from "react-router-dom";
import { HomePage } from "../pages/Home/Page.SongList";
import { LoginPage } from "../pages/Login/Page.Login";
import { SongListPage } from "../pages/SongList/Page.SongList";
import { ListPage } from "../pages/Lists/Page.List";
import { ContributionsPage } from "../pages/Contributions/Page.Finances";
import { AiOutlineContainer, AiOutlineHome } from 'react-icons/ai';
import { BsMusicNoteBeamed, BsMusicNoteList } from 'react-icons/bs'
import { FcMoneyTransfer } from 'react-icons/fc';
import { ProfilePage } from "../pages/Profile/Page.Profile";
import { UserFinancesPage } from "../pages/UserFinances/Page.UserFinances";
import { UserListPage } from "../pages/UserLists/Page.UserLists";
import { FinancesPage } from "../pages/Finances/Page.Finances";
import { RegisterPage } from "../pages/Register/Page.Register";
import { ForgotPasswordPage } from "../pages/ForgotPassword/Page.ForgotPassword";
import { AdminPage } from "../pages/Admin/Page.Admin";

import { TiSpannerOutline } from "react-icons/ti";

interface RouteModel {
    title?: string;
    icon?: React.ReactNode;
    path: string;
    element: React.ReactNode;
}
interface RouterModel {
    [key: string]: {
        routes: RouteModel[];
    }
}

const commonRoutes = [
    {
        title: 'Inicio',
        path: '/',
        element: <HomePage />,
        icon: <AiOutlineHome />
    },
    {
        title: 'Canciones',
        path: '/songs',
        element: <SongListPage />,
        icon: <BsMusicNoteBeamed />
    },
    {
        title: 'Listados',
        path: '/songList',
        element: <ListPage />,
        icon: <BsMusicNoteList />
    },
    {
        title: 'Finanzas',
        path: '/finances',
        element: <FinancesPage />,
        icon: <FcMoneyTransfer />
    }
]

const profileRoutes = [
    {
        path: '/myFinances',
        element: <UserFinancesPage />,
    },
    {
        path: '/profile',
        element: <ProfilePage />,
    },
    {
        path: '*', element: <Navigate to="/" />
    }
]

const adminRoutes = [
    {
        path: '/admin',
        element: <AdminPage/>,
        title: 'Admin',
        icon: <TiSpannerOutline />
    }
]

export const RoutesData: RouterModel = {
    'MUSICIAN': {
        routes: [
            ...commonRoutes,
            ...profileRoutes
        ]
    },
    'SINGER': {
        routes: [
            {
                path: '/myLists',
                element: <UserListPage />
            }
        ]
    },
    'TREASURER': {
        routes: [
            {
                title: 'Aportes',
                path: '/contributions',
                element: <ContributionsPage />,
                icon: <AiOutlineContainer />
            },
        ]
    },
    'SECRETARY': {
        routes: [
            {
                title: 'Aportes',
                path: '/contributions',
                element: <ContributionsPage />,
                icon: <AiOutlineContainer />
            },
        ]
    },
    'ADMIN': {
        routes: [
            ...adminRoutes
        ]
    },
    'default': {
        routes: [
            {
                path: '/login',
                element: <LoginPage />
            },
            {
                path: '/register',
                element: <RegisterPage />
            },
            {
                path: '/forgotPassword',
                element: <ForgotPasswordPage />
            },
            {
                path: '*', element: <Navigate to="/login" />
            }
        ]
    }
}