import { Button } from "primereact/button"
import { Calendar } from "primereact/calendar"
import { InputText } from "primereact/inputtext"
import { useState } from 'react';
import { SelectUser } from './Component.SelectUser';
import { ContributionService } from "../../../services/Service.Contribution";
import { useToast } from "../../../context/Context.Toast";
import { Dialog } from "primereact/dialog";
import { onChangeFunc } from "../../../utils/Util.HandleOnchange";

export const ContributionCreation = ({ setDialogVisibility, dialogVisibility }: any) => {

    const service = new ContributionService();
    const toast = useToast();
    
    const initialContributionData = {
        userId: '',
        dates: [],
        amount: '',
    }

    const [contributionData, setContributionData]= useState(initialContributionData);

    const handleEmptyField = () => {
        if (!contributionData.userId || !contributionData.amount || contributionData.dates.length === 0) {
            return toast?.toast('warn', 'Error', 'Debes de llenar todos lo campos.')
        }
        handleSave();
    }

    const handleSave = async () => {
        const response = await service.createContribution(contributionData)
        if (response.status === 200) {
            toast?.toast('success', 'Exito', 'Aporte Guardado exitosamente.')
            setDialogVisibility(false)
        }
    }

    const handleOnchange = (e:any)=>{
        onChangeFunc(e, contributionData, setContributionData);
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
                    selectedUser={contributionData.userId}
                    name='userId'
                    onChange={handleOnchange}
                />
            </div>

            <div className="card flex align-items-center mt-2 col-11">
                <label className='col-4' htmlFor="">Fecha: </label>
                <Calendar
                    value={contributionData.dates}
                    onChange={handleOnchange}
                    selectionMode="multiple"
                    dateFormat='dd/MM'
                    readOnlyInput
                    name="dates"
                    locale='es'
                    className="w-full "
                />
            </div>

            <div className="card flex align-items-center mt-2 col-11">
                <label className='col-4' htmlFor="">Aporte Total: </label>
                <InputText value={contributionData.amount} name="amount" onChange={handleOnchange} className="w-full" />
            </div>

            <div className='card flex flex-row-reverse col-11'>
                <Button label='Guardar' severity='success' onClick={() => handleEmptyField()} />
            </div>
        </Dialog >

    )
}
