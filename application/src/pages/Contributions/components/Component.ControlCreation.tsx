import { Dialog } from 'primereact/dialog';
import { SelectUser } from './Component.SelectUser';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { useState } from 'react';
import { useToast } from '../../../context/Context.Toast';
import { Dropdown } from 'primereact/dropdown';
import { onChangeFunc } from '../../../utils/Util.HandleOnchange';
import { FinanceControlService } from '../../../services/Service.FinanceControl';

const types = [
    { name: 'Plan 5', value: 'contribution' },
    { name: 'Promesas', value: 'promises' },
    { name: 'Diezmo', value: 'tithe' }
]

const months = [
    { name: 'Diciembre', value: 'Diciembre' },
    { name: 'Noviembre', value: 'Noviembre' },
    { name: 'Octubre', value: 'Octubre' },
    { name: 'Septiembre', value: 'Septiembre' },
    { name: 'Agosto', value: 'Agosto' },
    { name: 'Julio', value: 'Julio' },
    { name: 'Junio', value: 'Junio' },
    { name: 'Mayo', value: 'Mayo' },
    { name: 'Abril', value: 'Abril' },
    { name: 'Marzo', value: 'Marzo' },
    { name: 'Febrero', value: 'Febrero' },
    { name: 'Enero', value: 'Enero' },
]

export const CreateControl = ({ setDialogVisibility, dialogVisibility, setIsLoading }: any) => {
    const service = new FinanceControlService();
    const toast = useToast();

    const initialControlData = {
        userId: '',
        type: 'contribution',
        month: '',
        dates: []
    }

    const [controlData, setControlData] = useState(initialControlData)

    const handleEmptyField = () => {

        console.log(controlData)

        if (controlData.type === 'contribution') {
            if (!controlData.userId || controlData.dates.length === 0)
                return toast?.toast('warn', 'Error', 'Debes de llenar todos lo campos.')
        } else {
            if (!controlData.userId || !controlData.month || !controlData.type)
                return toast?.toast('warn', 'Error', 'Debes de llenar todos lo campos. ')
        }

        handleSave();
    }

    const handleSave = async () => {

        setIsLoading(true)

        const response = await service.createFinanceControl(controlData)
        if (response.status === 200) {
            console.log(response);
            toast?.toast('success', 'Exito', 'Guardado exitosamente.')
            setDialogVisibility(false)
            setIsLoading(false)
            setControlData(initialControlData)
        }
    }

    const handleOnchange = (e: any) => {
        onChangeFunc(e, controlData, setControlData);
    }

    return (
        <Dialog
            header="Crear Aporte"
            visible={dialogVisibility}
            onHide={() => setDialogVisibility(false)}
            style={{ minWidth: '50%' }}>

            <div className="card flex align-items-center col-11">
                <label className='col-4' htmlFor="">Integrantes: </label>
                <SelectUser
                    selectedUser={controlData.userId}
                    onChange={handleOnchange}
                    name="userId"
                />
            </div>
            <div className="card flex align-items-center col-11">
                <label className='col-4' htmlFor="">Tipo: </label>
                <Dropdown
                    value={controlData.type}
                    onChange={handleOnchange}
                    options={types}
                    name='type'
                    optionLabel={'name'}
                    placeholder="Seleccionar"
                    className="w-full "
                />
            </div>

            {
                controlData.type === 'contribution' ? (
                    <div className="card flex align-items-center mt-2 col-11">
                        <label className='col-4' htmlFor="">Fecha: </label>
                        <Calendar
                            value={controlData.dates}
                            name='dates'
                            onChange={handleOnchange}
                            selectionMode="multiple"
                            dateFormat='dd/MM'
                            readOnlyInput
                            locale='es'
                            className="w-full "
                        />
                    </div>
                ) : (
                    <div className="card flex align-items-center col-11">
                        <label className='col-4' htmlFor="">Mes: </label>
                        <Dropdown
                            value={controlData.month}
                            name='month'
                            onChange={handleOnchange}
                            options={months}
                            optionLabel={'name'}
                            placeholder="Seleccionar"
                            className="w-full "
                        />
                    </div>
                )
            }

            <div className='card flex flex-row-reverse col-11'>
                <Button label='Guardar' severity='success' onClick={() => handleEmptyField()} />
            </div>
        </Dialog >

    )
}
