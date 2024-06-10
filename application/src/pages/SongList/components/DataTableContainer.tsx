import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { SongService } from "../../../services/Service.Song";
import { useState } from 'react';
import { useEffect } from 'react';
import { SongModel } from "../../../models/Model.Song";
import { RatingBarTemplate } from "../../../components/Component.RatingBarTemplate";
import { ChordTemplate } from "../../../components/Component.ChordTemplate";

interface Props {
    seletable?: boolean;
    data?: any;
    onSelectionChange?:any;
}
export const DataTableContainer = ({ seletable, data, onSelectionChange }: Props) => {

    const songService = new SongService();

    const [songList, setSongList] = useState<SongModel[]>([]);
    const [listAmount, setListAmount] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getSongService();
    }, [])

    const getSongService = async () => {
        setLoading(true);
        const resp = await songService.getAllSong();
        setSongList(resp.data.result);
        setListAmount(resp.data.listCount)
        setLoading(false);
    }

    const chordTemplate = (rowData: any) => {
        return <ChordTemplate rowData={rowData} />
    }

    const ratingBodyTemplate = (rowData: any, i: any) => {
        return <RatingBarTemplate rowData={rowData} i={i} amount={listAmount} />
    }
    return (
        <div className="card">
            <DataTable
                value={songList}
                paginator
                loading={loading}
                emptyMessage="Sin datos"
                dataKey="_id"
                selection={data} 
                onSelectionChange={onSelectionChange}
                rows={20}>
                {
                    seletable && (
                        <Column
                            selectionMode="multiple"
                            exportable={false} />
                    )
                }

                <Column field="name" header="Nombre" sortable />
                <Column field="chord" header="Nota" body={chordTemplate} sortable />
                <Column field="usage" header="Uso" body={ratingBodyTemplate} sortable />
            </DataTable>
        </div>
    )
}
