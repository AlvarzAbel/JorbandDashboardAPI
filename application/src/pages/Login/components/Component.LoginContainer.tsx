import { InputText } from 'primereact/inputtext';
import { PrimaryTitle } from '../../../styled-components/PrimaryTitle';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useState } from 'react';
import { onChangeFunc } from '../../../utils/Util.HandleOnchange';
import { useToast } from '../../../context/Context.Toast';
import { LoginService } from '../../../services/Service.Login';
import { useAuthContext } from '../../../context/Context.Auth';
import { AuthFormHeader } from '../../../components/Component.AuthFormHeader';
import { Link } from 'react-router-dom';

export const LoginContainer = () => {

    const toast = useToast();
    const service = new LoginService();
    const { handleLogin, handleLogout } = useAuthContext()!;

    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    const handleOnchange = (e: any) => {
        onChangeFunc(e, userData, setUserData)
    }

    const handleEmptyFields = (e: any) => {
        e.preventDefault();

        if (!userData.email || !userData.password)
            return toast?.toast('warn', 'Error', 'Todos los campos deben estar llenos');
        if (!userData.email.includes('@'))
            return toast?.toast('warn', 'Error', 'El email no es valido');
        handleLoginProcess();
    }

    const handleLoginProcess = async () => {
        try {
            const resp = await service.login(userData);
            handleLogin(resp.data);
            // toast?.toast('success', 'Bienvenido', 'Haz Iniciado sesión Exitosamente!')
            window.location.reload();
        } catch (error: any) {
            handleLogout();
            if (error.code === 'ERR_BAD_REQUEST')
                return toast?.toast('error', 'Error', 'Email o Contraseña son incorrectos');
            toast?.toast('error', 'Error', 'No se Pudo iniciar Sesión');
        }
    }


    return (
        <div className='component-container'>
            <div className="login-card-container">
                <AuthFormHeader />
                <div className="form-header-container">
                    <PrimaryTitle title='Iniciar Sesión' />
                    <small>Ingresa tu email y contraseña para acceder a tu cuenta</small>
                </div>
                <form action="" className='form' onSubmit={handleEmptyFields}>
                    <div className="flex-auto mb-3">
                        <label htmlFor="email" className="block mb-2">
                            Email
                        </label>
                        <InputText id="email" keyfilter="email" name='email' className="w-full" onChange={handleOnchange} />
                    </div>
                    <div className="flex-auto mb-5">
                        <div className="flex justify-content-between">
                            <label htmlFor="password" className=" block mb-2">
                                Contraseña
                            </label>
                            <small className="block mb-2">
                                <Link to="/forgotPassword" style={{ color: '#fff' }}>¿Olvidaste tu Contraseña?</Link>
                            </small>
                        </div>
                        <Password style={{ width: '100%' }} inputStyle={{ width: '100%' }} value={userData.password} name='password' onChange={handleOnchange} toggleMask />
                    </div>

                    <div className='flex justify-content-center mb-3'>
                        <Button label='INGRESAR' />
                    </div>
                    <div className='flex justify-content-end '>
                        <small className="flex block mb-2" style={{ color: '#fff' }}>
                            ¿No estás registrado aún?
                            <Link to='/register' style={{ color: '#fff', marginLeft: '5px' }}>
                                Registrate
                            </Link>
                        </small>
                    </div>
                </form>
            </div>

        </div>
    )
}
