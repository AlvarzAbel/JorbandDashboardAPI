import { Button } from "primereact/button";
import { onChangeFunc } from "../../../utils/Util.HandleOnchange";
import { useState } from "react";
import { Calendar } from "primereact/calendar";
import { UserMember } from "../../../models/Model.RegularUser";
import { useToast } from "../../../context/Context.Toast";
import { UserService } from "../../../services/Service.User";

interface Props {
    userInformation: UserMember;
    setUserInformation: any;
    service: UserService;
}
export const UserInformation = ({ userInformation, setUserInformation, service }: Props) => {

    const [disabled, setDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const handleOnchange = (event: any) => {
        onChangeFunc(event, userInformation, setUserInformation)
    }

    const handleEmpty = () => {
        if (!userInformation.name || !userInformation.lastName || !userInformation.email) {
            return toast?.toast('error', 'Error', 'Los campos Nombre, Apellido y Email no pueden estar vacios.')
        }
        handleUpdate();
    }

    const handleUpdate = async () => {
        try {
            setLoading(true);
            const resp = await service.updateUserInformation(userInformation);
            setLoading(false);

            if (resp.status === 200) {
                setDisabled(true)
                return toast?.toast('success', 'Success', 'Actualizado exitosamente!');
            }
        } catch (error) {

        }
    }

    return (
        <div className="user-information pb-5">
            <form action="" onSubmit={(e) => e.preventDefault()}>
                <div className="section-1">
                    <div className="form-field">
                        <label htmlFor="name">Nombre</label>
                        <input type="text" name='name' value={userInformation.name} disabled={disabled} onChange={handleOnchange} />
                    </div>
                    <div className="form-field">
                        <label htmlFor="lastName">Apellidos</label>
                        <input type="text" name="lastName" value={userInformation.lastName} disabled={disabled} onChange={handleOnchange} />
                    </div>
                </div>
                <div className="section-1">
                    <div className="form-field">
                        <label htmlFor="email">Email</label>
                        <input type="text" name='email' value={userInformation.email} disabled={disabled} onChange={handleOnchange} />
                    </div>
                    <div className="form-field">
                        <label htmlFor="birthDate">Fecha de Nacimiento</label>
                        <Calendar name='birthDate' maxDate={new Date()} value={userInformation.birthDate ? new Date(userInformation.birthDate) : null} dateFormat="dd/mm/yy" disabled={disabled} onChange={handleOnchange} />
                    </div>
                    <div className="form-field">
                        <label htmlFor="status">Estado</label>
                        <input type="text" value={userInformation.status} disabled onChange={handleOnchange} />
                    </div>
                </div>
                <div className="flex justify-content-center mt-5">
                    {
                        disabled ? (
                            <Button label="Editar" icon='pi pi-pencil' onClick={() => setDisabled(false)} />
                        ) : (
                            <Button label="Guardar " severity='success' icon='pi pi-check' loading={loading} onClick={handleEmpty} />
                        )
                    }
                </div>
            </form>
        </div>
    )
}
