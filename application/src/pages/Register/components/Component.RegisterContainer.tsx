import { useToast } from '../../../context/Context.Toast';
import { useState } from 'react';
import { onChangeFunc } from '../../../utils/Util.HandleOnchange';
import { PrimaryTitle } from '../../../styled-components/PrimaryTitle';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { AuthFormHeader } from '../../../components/Component.AuthFormHeader';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterService } from '../../../services/Service.Register';

export const RegisterContainer = () => {
    const toast = useToast();
    const service = new RegisterService();
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        name: '',
        lastName: '',
        birthdate: '',
        email: '',
        password: ''
    })

    const handleOnchange = (e: any) => {
        onChangeFunc(e, userData, setUserData)
    }

    const handleEmptyFields = (e: any) => {
        e.preventDefault();

        if (!userData.name ||
            !userData.lastName ||
            !userData.birthdate ||
            !userData.email ||
            !userData.password)
            return toast?.toast('warn', 'Error', 'Todos los campos deben estar llenos');
        if (!userData.email.includes('@'))
            return toast?.toast('warn', 'Error', 'El email no es valido');
        handleRegister();
    }

    const handleRegister = async () => {
        try {
            const resp = await service.createUser(userData);
            if (resp.status === 200) {
                toast?.toast('success', 'Exito!', 'Te haz registrado Exitosamente!')
                navigate('/login')
            }
        } catch (error: any) {
            if (error.code === 'ERR_BAD_REQUEST')
                return toast?.toast('error', 'Error', 'La información ingresada no es valida.');
            toast?.toast('error', 'Error', 'No se pudo completar el Registro.');
        }
    }

    return (
        <div className='component-container' style={{ marginTop: '-5%' }}>
            <div className="login-card-container register-card-container">
                <AuthFormHeader />
                <div className="form-header-container m-0">
                    <PrimaryTitle title='Registrarse' />
                    <small>Registrate para poder acceder a nuestra plataforma.</small>
                </div>
                <form action="" className='form' onSubmit={handleEmptyFields}>
                    <div className="name-container">
                        <div className="flex-auto mb-3 md:mr-2">
                            <label htmlFor="name" className="block mb-2">
                                Nombre
                            </label>
                            <InputText name='name' className="w-full" onChange={handleOnchange} />
                        </div>
                        <div className="flex-auto mb-3">
                            <label htmlFor="lastName" className="block mb-2">
                                Apellido
                            </label>
                            <InputText name='lastName' className="w-full" onChange={handleOnchange} />
                        </div>
                    </div>
                    <div className="flex-auto mb-3">
                        <label htmlFor="birthdate" className="block mb-2">
                            Fecha de Nacimiento
                        </label>
                        <Calendar locale='es' name='birthdate' className="w-full" onChange={handleOnchange} />
                    </div>

                    <div className="flex-auto mb-3">
                        <label htmlFor="email" className="block mb-2">
                            Email
                        </label>
                        <InputText keyfilter="email" name='email' className="w-full" onChange={handleOnchange} />
                    </div>
                    <div className="flex-auto mb-3">
                        <div className="flex justify-content-between">
                            <label htmlFor="password" className=" block mb-2">
                                Contraseña
                            </label>
                        </div>
                        <Password style={{ width: '100%' }} inputStyle={{ width: '100%' }} value={userData.password} name='password' onChange={handleOnchange} toggleMask />
                    </div>

                    <div className='flex justify-content-center mb-2'>
                        <Button label='REGISTRARME' />
                    </div>
                    <div className='flex md:justify-content-end justify-content-center'>
                        <small className="flex block mb-2" style={{ color: '#fff' }}>
                            ¿Ya tienes una cuenta?
                            <Link to='/login' style={{ color: '#fff', marginLeft: '5px' }}>
                                Iniciar Sesión
                            </Link>
                        </small>
                    </div>
                </form>
            </div>

        </div>
    )
}
