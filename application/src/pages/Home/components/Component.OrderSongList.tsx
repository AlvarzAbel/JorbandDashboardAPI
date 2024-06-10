import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import { SongModel } from '../../../models/Model.Song';
import { useToast } from '../../../context/Context.Toast';
import { SongListService } from '../../../services/Service.ListService';
import { useState } from 'react';
import { Nullable } from 'primereact/ts-helpers';
import { OrdenarList } from './Component.OrderList';

interface Props {
    setIsVisibleSongList: any;
    isVisibleSongList: any;
    songList: any;
    setSongList: any;
    setIsVisible: any;
}

export const OrdenarListComponent = ({ setIsVisibleSongList, isVisibleSongList, songList, setSongList, setIsVisible }: Props) => {

    const toast = useToast();
    const listService = new SongListService();

    const [listDate, setListDate] = useState<Nullable<Date>>();

    const handleVerifySong = () => {
        const isValid = songList.every((song: SongModel) => song.chord.length <= 1);

        if (!isValid) {
            toast?.toast('warn', 'Error', 'Se permite una sola Nota por Canción!')
            return;
        }
        handleSaveList();
    }

    const handleSaveList = async () => {

        const res = await listService.createList({ songs: songList, date: listDate })

        if (res.status !== 200) {
            return toast?.toast('error', 'Error', 'Error al crear el Listado!')
        }
        setIsVisible(false)
        toast?.toast('success', 'Exito', 'Listado creado exitosamente!')
        setSongList([])
    }

    const footerContentSongList = (
        <div>
            <div className="pt-3 mb-3 flex justify-content-between align-items-center">
                <label> Seleccionar Fecha: </label>
                <Calendar value={listDate} onChange={(e) => setListDate(e.value)}
                    locale='es'
                />
            </div>
            <Button label="Cancelar" icon="pi pi-times" onClick={() => setIsVisibleSongList(false)} className="p-button-text" severity="danger" />
            <Button label="Guardar"  icon="pi pi-check" onClick={() => handleVerifySong()} autoFocus severity="success" />
        </div>
    );

    return (
        <div>
            <Dialog header="Ordenar y Asignar Fecha"
                className="randomDialog"
                visible={isVisibleSongList}
                onHide={() => setIsVisibleSongList(false)}
                footer={footerContentSongList}>

                <div className="dialog-content">
                    <OrdenarList
                        songList={songList}
                        setSongList={setSongList}
                    />
                </div>
            </Dialog>
        </div>
    )
}
