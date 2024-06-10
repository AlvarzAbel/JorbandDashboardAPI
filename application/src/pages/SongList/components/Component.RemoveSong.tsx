import { Dialog } from "primereact/dialog"
import { DataTableContainer } from "./DataTableContainer"
import { useState } from "react"
import { Button } from "primereact/button";
import { useToast } from "../../../context/Context.Toast";
import { SongService } from "../../../services/Service.Song";

export const RemoveComponent = ({ visible, setVisibe }: any) => {

    const service = new SongService();
    const toast = useToast();
    const [selectedSong, setSelectedSong] = useState([]);

    const onSelectionChange = (event: any) => {
        const value = event.value;
        console.log(event);
        setSelectedSong(value);
    }

    const renderFooterButton = () => {
        return (
            <Button label="Eliminar" severity="danger" onClick={handleRemove} />
        )
    }
    const handleRemove = () => {
        if (!selectedSong || selectedSong.length === 0) {
            return toast?.toast('error', 'Error', 'No hay canción seleccionada.')
        }
        removeSong();
    }

    const removeSong = async () => {
        try {
            const response = await service.removeSong({song: selectedSong});
            if(response.status !== 200){
                return toast?.toast('error', 'Error','Error al eliminar canción');
            }
            toast?.toast('success','Exito!','Canción eleminada Exitosamente');
            setSelectedSong([]);
            window.location.reload();
            
        } catch (error) {

        }
    }
    return (
        <Dialog
            visible={visible}
            onHide={() => setVisibe(false)}
            header="Eliminar Cancion"
            footer={renderFooterButton}>
            <DataTableContainer
                data={selectedSong}
                seletable={true}
                onSelectionChange={onSelectionChange} />
        </Dialog>
    )
}
