import { Button } from "primereact/button"
import { Calendar } from "primereact/calendar"
import { InputText } from "primereact/inputtext"
import { Password } from "primereact/password"
import { PrimaryTitle } from "../../../styled-components/PrimaryTitle"
import { useToast } from "../../../context/Context.Toast"
import { useState } from 'react';
import { onChangeFunc } from "../../../utils/Util.HandleOnchange"
import { AuthFormHeader } from "../../../components/Component.AuthFormHeader"
import { PasswordManagerService } from "../../../services/Service.PasswordManager"
import { Link, useNavigate } from "react-router-dom"

export const ForgoPasswordContainer = () => {

    const toast = useToast();
    const service = new PasswordManagerService();
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        email: '',
        birthdate: '',
        password: ''
    })

    const handleOnchange = (e: any) => {
        onChangeFunc(e, userData, setUserData)
    }

    const handleEmptyFields = (e: any) => {
        e.preventDefault();

        if (!userData.email || !userData.password || !userData.birthdate)
            return toast?.toast('warn', 'Error', 'Todos los campos deben estar llenos');
        if (!userData.email.includes('@'))
            return toast?.toast('warn', 'Error', 'El email no es valido');
        handleChangePassword();
    }

    const handleChangePassword = async () => {
        try {
            const resp = await service.changePassword(userData);
            if (resp.status === 200) {
                toast?.toast('success', 'Exito!', 'Contraseña cambiada Exitosamente!')
                navigate('/login')
            }
        } catch (error: any) {
            if (error.code === 'ERR_BAD_REQUEST')
                return toast?.toast('error', 'Error', 'La informacion Ingresada es incorrecta.');
            return toast?.toast('error', 'Error', 'No se Pudo Realizar el Cambio de Contraseña');
        }
    }

    return (
        <div className='component-container' style={{ marginTop: '0%' }}>
            <div className="login-card-container">
                <AuthFormHeader />
                <div className="form-header-container m-0">
                    <PrimaryTitle title='¿Olvidaste tu Contraseña?' />
                    <small>Ingresa tus datos para Cambiar la contraseña.</small>
                </div>
                <form action="" className='form' onSubmit={handleEmptyFields}>
                    <div className="flex-auto mb-3">
                        <label htmlFor="email" className="block mb-2">
                            Email
                        </label>
                        <InputText type="email" name="email" className="w-full" onChange={handleOnchange} />
                    </div>
                    <div className="flex-auto mb-3">
                        <label htmlFor="email" className="block mb-2">
                            Fecha de Nacimiento
                        </label>
                        <Calendar locale='es' name='birthdate' className="w-full" onChange={handleOnchange} />
                    </div>
                    <div className="flex-auto mb-5">
                        <div className="flex justify-content-between">
                            <label htmlFor="password" className=" block mb-2">
                                Nueva Contraseña
                            </label>
                        </div>
                        <Password style={{ width: '100%' }} inputStyle={{ width: '100%' }} value={userData.password} name='password' onChange={handleOnchange} toggleMask />
                    </div>
                    <div className='flex justify-content-center mb-2'>
                        <Button label='CAMBIAN CONTRASEÑA'  />
                    </div>
                </form>
            </div>
            <div className='flex justify-content-center mb-2'>
                <small style={{ color: '#fff' }}>Regresar a
                    <Link to="/login" style={{ color: '#fff' }} className="bold ml-2">
                        Iniciar Sesión
                    </Link>
                </small>
            </div>
        </div>
    )
}
