import { useEffect, useState } from 'react'
import { SelectUser } from '../../Contributions/components/Component.SelectUser'
import { MultiSelect } from 'primereact/multiselect'
import { Button } from 'primereact/button'
import { onChangeFunc } from '../../../utils/Util.HandleOnchange'
import { useToast } from '../../../context/Context.Toast'
import { ProfileManager } from '../../../services/Service.ProfileManager'
import { PrimaryTitle } from '../../../styled-components/PrimaryTitle'

export const AddProfileComponent = () => {
    const toast = useToast();
    const service = new ProfileManager();

    const initialUserData = {
        userId: '',
        profile: ''

    }
    const [profiles, setProfiles] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState(initialUserData)

    useEffect(() => {
        handleGetProfiles();
    }, [])

    const handleOnchange = (event: any) => {
        onChangeFunc(event, userData, setUserData);
    }

    const handleEmpty = () => {
        if (!userData.userId || !userData.profile)
            return toast?.toast('warn', 'Error', 'Debes de llenar todos los campos.')

        handleSaveProfile()
    }

    const handleSaveProfile = async () => {
        try {
            setLoading(true)
            const resp = await service.addProfile(userData);

            setLoading(false)
            if (resp.status === 200) {
                setUserData(initialUserData)
                return toast?.toast('success', 'Exito!', 'Usuario Actualizado con Exito!');
            }

            toast?.toast('error', 'Error', 'Error al realizar el Cambio.');
        } catch (error) {
            return toast?.toast('error', 'Error', 'Error al realizar el Proceso.');
        }
    }

    const handleGetProfiles = async () => {
        try {
            const rep = await service.getProfiles();
            if (rep.status === 200) {
                setProfiles(rep.data.result)
            }
        } catch (error) {

        }
    }
    return (
        <div className="card mb-5" >
            <PrimaryTitle title='Agregar Perfile'/>
            <div className="col-12">
                <div className="field ">
                    <label htmlFor="">Usuario: </label>
                    <SelectUser onChange={handleOnchange} selectedUser={userData.userId} name="userId" />
                </div>
                <div className="field block">
                    <label htmlFor="">Perfil a Agregar: </label>
                    <MultiSelect
                        value={userData.profile}
                        name="profile"
                        onChange={handleOnchange}
                        options={profiles}
                        optionLabel="name"
                        className="w-full"
                        optionValue="value"
                    />
                </div>
                <div className="field flex justify-content-end">
                    <Button severity='success' label="Guardar" icon="pi pi-check" onClick={handleEmpty} loading={loading} />
                </div>
            </div>
        </div>
    )
}
