import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog"
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { ChordMultiSelect } from "../../../components/Component.ChordDropdown";
import { Dropdown } from "primereact/dropdown";
import { onChangeFunc } from "../../../utils/Util.HandleOnchange";
import { SongCategory } from "../../../utils/Util.Constants";
import { SongService } from "../../../services/Service.Song";
import { useToast } from "../../../context/Context.Toast";

export const AddSongComponent = ({ visible, setVisibe }: any) => {

    const service = new SongService;
    const toast = useToast();

    const initialState = {
        name: '',
        chord: [],
        category: ''
    }

    const [songData, setSongData] = useState(initialState)

    const handleOnchange = (e: any) => {
        onChangeFunc(e, songData, setSongData);
    }

    const handleSubmitData = (e: any) => {
        e.preventDefault();
        if (!songData.name || !songData.category || songData.chord.length === 0 || !songData.chord) {
            return toast?.toast('error', 'Error', 'Todos los campos deben estar llenos.')
        }
        console.log(songData)
        handleSave();
    }

    const handleSave = async () => {
        try {
            const response = await service.createSong(songData);
            if (response.status !== 200) {
                return toast?.toast('error', 'Error', 'Error al crear Canción')
            }
            toast?.toast('success', 'Exito', 'Canción creada con Exito');
            window.location.reload();
        } catch (error) {

        }
    }

    return (
        <Dialog visible={visible} onHide={() => setVisibe(false)} header="Agregra Cancion" >
            <form action="" onSubmit={handleSubmitData}>
                <div className="field">
                    <label htmlFor="">Nombre de la Canción</label>
                    <InputText
                        name="name"
                        value={songData.name}
                        onChange={handleOnchange}
                        className="w-full" />
                </div>
                <div className="field">
                    <label htmlFor="">Nota</label>
                    <ChordMultiSelect
                        name="chord"
                        value={songData.chord}
                        onChange={handleOnchange}
                        className="w-full"
                    />
                </div>
                <div className="field mb-5">
                    <label htmlFor="">Categoría</label>
                    <Dropdown
                        name="category"
                        options={SongCategory}
                        optionLabel="name"
                        optionValue="value"
                        value={songData.category}
                        onChange={handleOnchange}
                        className="w-full" />
                </div>
                <div className="flex justify-content-end">
                    <Button label="Guardar" severity="success" />
                </div>
            </form>

        </Dialog>
    )
}
