import { useState, useEffect } from 'react';
import { UserMember } from '../../models/Model.RegularUser';
import { STORAGE_URL } from '../../config/Config.EndPoints';
import { UserService } from '../../services/Service.User';
import { ProfilePictureComponent } from './components/ProfilePictureComponent';
import { UserInformation } from './components/UserInformation';
import './theme/style.css'

const initalUserInformation: UserMember = {
    name: '',
    lastName: '',
    email: '',
    profile: '',
    profilePicture: '',
    status: '',
    birthDate: null,
}

export const ProfilePage = () => {

    const userService = new UserService();

    const [userInformation, setUserInformation] = useState<UserMember>(initalUserInformation);
    const [profilePicture, setProfilePicture] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchUserInformation();
    }, [isLoading])

    const fetchUserInformation = async () => {
        const resp = await userService.getUsersById();

        if (resp.status === 200) {
            setUserInformation(resp.data.result);
            setProfilePicture(`${STORAGE_URL}/${resp.data.result.profilePicture}`)
        }
    }

    return (
        <div className="page-container">
            <ProfilePictureComponent
                profilePicture={profilePicture}
                userInformation={userInformation}
                setIsLoading={setIsLoading}
            />
            <UserInformation
                userInformation={userInformation}
                setUserInformation={setUserInformation}
                service={userService}
            />

        </div>
    )
}
