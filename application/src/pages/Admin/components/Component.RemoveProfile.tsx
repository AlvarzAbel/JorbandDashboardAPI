import { MultiSelect } from "primereact/multiselect"
import { SelectUser } from "../../Contributions/components/Component.SelectUser"
import { Button } from "primereact/button"
import { onChangeFunc } from "../../../utils/Util.HandleOnchange"
import { useEffect, useState } from "react"
import { UserService } from "../../../services/Service.User"
import { ProfileManager } from "../../../services/Service.ProfileManager"
import { useToast } from "../../../context/Context.Toast"
import { PrimaryTitle } from "../../../styled-components/PrimaryTitle"

export const RemoveProfileComponent = () => {

    const userService = new UserService();
    const profilesService = new ProfileManager();
    const toast = useToast();

    const initialState = {
        userId: '',
        profile: ''
    }

    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState(initialState);
    const [profiles, setProfiles] = useState(undefined);


    useEffect(() => {
        userData.userId && getUserProfiles();
    }, [userData.userId])

    const getUserProfiles = async () => {

        const resp = await userService.getUserProfiles(userData.userId);
        if (resp.status === 200) {
            setProfiles(resp.data.result.profile)
        }
    }

    const handleOnchange = (event: any) => {
        onChangeFunc(event, userData, setUserData)
    }

    const handleEmpty = () => {

        if (!userData.userId || userData.profile.length === 0) {
            return toast?.toast('warn', 'Error', 'Todos los campos deben de estar llenos')
        }

        handleRemove();
    }

    const handleRemove = async () => {
        setLoading(true);

        const resp = await profilesService.removeProfile(userData)
        setLoading(false)
        if (resp.status === 200) {
            setUserData(initialState)
            return toast?.toast('success', 'Exito!', 'Perfil removido Exitosamente!')
        }
    }

    return (
        <div className="card mb-5" >
            <PrimaryTitle title='Eliminar Perfile' />
            <div className="col-12">
                <div className="field ">
                    <label htmlFor="">Usuario: </label>
                    <SelectUser onChange={handleOnchange} selectedUser={userData.userId} name="userId" />
                </div>
                <div className="field block">
                    <label htmlFor="">Perfil a Eliminar: </label>
                    <MultiSelect
                        value={userData.profile}
                        name="profile"
                        onChange={handleOnchange}
                        options={profiles}
                        className="w-full"
                    />
                </div>
                <div className="field flex justify-content-end">
                    <Button label="Guardar" severity='success' icon="pi pi-check" onClick={handleEmpty} loading={loading} />
                </div>
            </div>
        </div>
    )
}
