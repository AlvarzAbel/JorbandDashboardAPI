import { DataTable, DataTableValueArray } from "primereact/datatable";
import { SongService } from "../../../services/Service.Song"
import { useState } from 'react';
import { useEffect } from 'react';
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { OrdenarListComponent } from "./Component.OrderSongList";
import { RatingBarTemplate } from "../../../components/Component.RatingBarTemplate";
import { ChordTemplate } from "../../../components/Component.ChordTemplate";
import { useToast } from "../../../context/Context.Toast";

interface Props {
    setRegularDialogVisible: any;
    regularDialogVisible: boolean;
}

export const CreateListDialog = ({ setRegularDialogVisible, regularDialogVisible }: Props) => {

    const service = new SongService();
    const toast = useToast();

    const [songList, setSongList] = useState([]);
    const [listAmount, setListAmount] = useState(0);
    const [selectedSong, setSelectedSong] = useState<DataTableValueArray>();
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        getSongList()
    }, [])

    const getSongList = async () => {

            const res = await service.getAllSong();
            setListAmount(res.data.listCount)
            setSongList(res.data.result);

    }

    const ratingBodyTemplate = (rowData: any, i: any) => {
        return <RatingBarTemplate rowData={rowData} i={i} amount={listAmount} />
    };

    const chordTemplate = (rowData: any) => {
        return <ChordTemplate rowData={rowData} />
    }

    const onSelectionChange = (event: any) => {
        const value = event.value;
        setSelectedSong(value);
    };

    const handleDisplayOrderDialog = () => {
        console.log(selectedSong?.length)
        if (selectedSong?.length === 0 || !selectedSong) {
            return toast?.toast('warn', 'Error', 'La lista es vacía.')
        }
        setIsVisible(true)
    }

    return (
        <>
            <Dialog
                className="selectSongDialog"
                header="Seleccionar Canciones"
                visible={regularDialogVisible}
                contentClassName='dialog-content-style'
                onHide={() => setRegularDialogVisible(false)}>

                <DataTable
                    scrollable
                    scrollHeight="70vh"
                    value={songList}
                    dataKey="_id"
                    selection={selectedSong}
                    className="songsTable"
                    filterDisplay="row"
                    onSelectionChange={onSelectionChange}>
                    <Column
                        selectionMode="multiple"
                        exportable={false} />
                    <Column
                        field="name"
                        header="Nombre"
                        filterPlaceholder="Buscar por Nombre"
                        style={{ fontSize: '14px' }}
                        filterHeaderStyle={{ zIndex: 100, padding: '0.5%' }}
                        sortable
                        filter />
                    <Column
                        field="chord"
                        header="Nota"
                        style={{ fontSize: '12px', textAlign: 'center', padding: '0' }}
                        body={chordTemplate}
                        sortable />
                    <Column
                        field="usage"
                        header="Uso"
                        body={ratingBodyTemplate}
                        style={{ width: '100px' }}
                        sortable />
                </DataTable>
                <div className="cm-footer-dialog-style" >
                    <Button
                        label="Continuar"
                        severity='success'
                        onClick={handleDisplayOrderDialog}
                    />
                </div>

            </Dialog>
            <OrdenarListComponent
                setIsVisibleSongList={setIsVisible}
                isVisibleSongList={isVisible}
                songList={selectedSong}
                setSongList={setSelectedSong}
                setIsVisible={setIsVisible}
            />
        </>
    )
}
