import { Avatar } from 'primereact/avatar'
import { FileUpload } from 'primereact/fileupload'
import { UserService } from '../../../services/Service.User';
import { useToast } from '../../../context/Context.Toast';
import { useAuthContext } from '../../../context/Context.Auth';

export const ProfilePictureComponent = ({ profilePicture, userInformation, setIsLoading }: any) => {


    const userService = new UserService();
    const toast = useToast();
    const { updateProfilePicture } = useAuthContext()!;

    const chooseOptions = {
        icon: 'pi pi-pencil',
        iconOnly: true,
        className: 'chooseBtn'
    };

    const handleFileChange = (event: any) => {
        handleSave(event.files[0]);
    };

    const handleSave = async (pic: any) => {
        if (!pic) {
            return toast?.toast('warn', 'Error', 'Por favor selecciona una Imagen')
        }

        const formData = new FormData();
        formData.append("profilePicture", pic);
        setIsLoading(true)

        const resp = await userService.updateProfilePicture(formData);

        if (resp.status === 200) {
            toast?.toast('success', 'Exito', 'Foto de Perfil Cambiada!');

            const timestamp = new Date().getTime();
            const updatedProfilePicture = `${resp.data.message.profilePicture}?timestamp=${timestamp}`;

            updateProfilePicture(updatedProfilePicture);
            window.location.reload();
        }
    }

    return (
        <div className="profile-picture-container">
            <div className="picture pt-2">
                <Avatar
                    image={`${profilePicture}`}
                    size="xlarge"
                    shape="circle"
                    className='img'
                />

                <FileUpload
                    mode="basic"
                    name="profilePicture"
                    chooseOptions={chooseOptions}
                    accept="image/*"
                    onSelect={handleFileChange} />
            </div>
            <div className="user-name">
                <h3>{userInformation.name} {userInformation.lastName}</h3>
            </div>
        </div>
    )
}
