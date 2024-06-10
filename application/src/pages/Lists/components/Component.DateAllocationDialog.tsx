import { Dialog } from "primereact/dialog";
import { useToast } from "../../../context/Context.Toast";
import { SongListService } from "../../../services/Service.ListService";
import { onChangeFunc } from "../../../utils/Util.HandleOnchange";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";


export const DateAllocationDialog = ({ listData, setListData, setIsVisible, isVisible, setIsLoading }: any) => {
    const toast = useToast();
    const listService = new SongListService();

    const handleSave = async () => {
        
        if (!listData.date)
            return toast?.toast('warn', 'Error', 'Debes ingresar una fecha');

        setIsLoading(true);
        const resp = await listService.createList(listData);

        if (resp.status === 200) {
            toast?.toast('success', 'Exito', 'Listado creado exitosamente!')
            setIsVisible(false)
        }

        setIsLoading(false)
    }

    const handleOnchange = (e: any) => {
        onChangeFunc(e, listData, setListData);
    }

    return (
        <Dialog header="Asignar Fecha"
            visible={isVisible}
            onHide={() => setIsVisible(false)}>

            <div>
                <div className="pt-3 mb-3 flex justify-content-between align-items-center">
                    <label> Seleccionar Fecha: </label>
                    <Calendar
                        value={listData.date}
                        onChange={handleOnchange}
                        locale='es'
                        name="date"
                    />
                </div>
                <Button label="Cancelar" icon="pi pi-times" onClick={() => setIsVisible(false)} className="p-button-text" severity="danger" />
                <Button label="Guardar" icon="pi pi-check" onClick={handleSave} autoFocus severity="success" />
            </div>
        </Dialog>
    )
}
