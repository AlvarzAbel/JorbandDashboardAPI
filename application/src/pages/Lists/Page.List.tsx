import { useState } from 'react';
import { useEffect } from 'react';
import { SongListService } from "../../services/Service.ListService";
import { Nullable } from 'primereact/ts-helpers';
import { ListTableComponent } from "./components/Component.ListTable";
import { DateAllocationDialog } from './components/Component.DateAllocationDialog';

interface ListModel {
    date: Nullable<Date>;
    songs: []
}

const initialListData: ListModel = {
    date: null,
    songs: []
}

export const ListPage = () => {

    const listService = new SongListService();

    const [lists, setLists] = useState([]);
    const [listData, setListData] = useState(initialListData)
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getLists()
    }, [isLoading])

    const getLists = async () => {
        const res = await listService.getAllList();
        setLists(res.data.result);
    }

    return (
        <div className="page-container">
            <div className="col-12 content-header">
                <h2>Listados de Canciones</h2>
            </div>
            <div className="card">

                <ListTableComponent
                    lists={lists}
                    listData={listData}
                    setListData={setListData}
                    setIsVisible={setIsVisible} />

                <DateAllocationDialog
                    listData={listData}
                    setListData={setListData}
                    setIsVisible={setIsVisible}
                    isVisible={isVisible}
                    setIsLoading={setIsLoading}
                />
            </div>
        </div>
    )
}
