import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { SongService } from "../../../services/Service.Song";
import { useToast } from "../../../context/Context.Toast";
import { Dialog } from "primereact/dialog";
import { onChangeFunc } from "../../../utils/Util.HandleOnchange";
import { SongModel } from "../../../models/Model.Song";
import { OrdenarListComponent } from "./Component.OrderSongList";
import { ScrollPanel } from "primereact/scrollpanel";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ParamsModel } from "../models/ParamsModel";
import { ChordTemplate } from "../../../components/Component.ChordTemplate";
import { ChordMultiSelect } from "../../../components/Component.ChordDropdown";

const initialParamsState: ParamsModel = {
    chords: [],
    amount: '',
}

interface Props {
    setIsVisible: any;
    isVisible: any;
}

export const CreateRandomListDialog = ({ setIsVisible, isVisible }: Props) => {

    const service = new SongService();
    const toast = useToast();

    const [songList, setSongList] = useState<SongModel[]>([]);
    const [params, setParams] = useState<ParamsModel>(initialParamsState)
    const [isVisibleSongList, setIsVisibleSongList] = useState(false)
    const [loading, setLoading] = useState(false);



    const handleOnchange = (e: any) => {
        onChangeFunc(e, params, setParams)
    }

    const handleGetRandomSongs = async () => {
        setLoading(true);
        if (!params.amount || params.chords.length === 0) {
            return toast?.toast('warn', 'Error', 'Todos los campos deben estar llenos')
        }
        const list = await service.getRandomSong(params);
        setSongList(list.data.result);
        setLoading(false)
    }

    const footer = () => (
        <>
            {songList.length > 0 && <Button label="Continuar" onClick={() => { setIsVisibleSongList(true) }} />}
        </>
    )

    const deleteSong = (rowData: any) => {
        const updateList = songList.filter(song => song._id !== rowData._id)
        setSongList(updateList);
    }

    const deleteActionTemplate = (rowData: any) => {
        return <Button
            icon="pi pi-trash"
            style={{ border: 'none', margin: '0', padding: '2% 0%' }}
            outlined
            severity="danger"
            onClick={() => deleteSong(rowData)} />
    };

    return (
        <Dialog
            header="Nuevo Listado"
            visible={isVisible}
            onHide={() => setIsVisible(false)}
            footer={footer}
            className="randomDialog">
            <ChordMultiSelect
                name="chords"
                value={params.chords}
                onChange={handleOnchange}
                placeholder="Seleccionar Notas"
                maxSelectedLabels={5}
                className="w-full mb-2" />
            <InputText
                name="amount"
                onChange={handleOnchange}
                value={params.amount}
                keyfilter="int"
                placeholder="Cantidad"
                className="w-full mb-2" />
            <Button
                label="Crear"
                onClick={handleGetRandomSongs}
                className="mb-2 flex"
                severity="success"
                style={{ float: 'right' }} />

            <ScrollPanel style={{ width: '100%', height: '46vh', minHeight: '10vh' }}>
                <DataTable
                    value={songList}
                    loading={loading}
                    emptyMessage="El listado está Vacío..."
                    id="_id">
                    <Column field='name' header='Nombre' headerStyle={{ display: 'none' }} />
                    <Column headerStyle={{ display: 'none' }} body={(rowData) => <ChordTemplate rowData={rowData} />} />
                    <Column body={deleteActionTemplate} headerStyle={{ display: 'none' }} exportable={false}></Column>
                </DataTable>
            </ScrollPanel>

            <OrdenarListComponent
                setIsVisibleSongList={setIsVisibleSongList}
                isVisibleSongList={isVisibleSongList}
                songList={songList}
                setSongList={setSongList}
                setIsVisible={setIsVisible}
            />
        </Dialog>
    )
}
