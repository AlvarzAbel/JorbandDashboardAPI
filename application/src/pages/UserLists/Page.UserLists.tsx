import { SongListService } from "../../services/Service.ListService";
import { useEffect, useState } from 'react';
import { ListTableComponent } from "../Lists/components/Component.ListTable";
import { DateAllocationDialog } from "../Lists/components/Component.DateAllocationDialog";
import { PrimaryTitle } from "../../styled-components/PrimaryTitle";


export const UserListPage = () => {
    const listService = new SongListService();

    const [lists, setLists] = useState([]);
    const [listData, setListData] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchUserList();
    }, [isLoading])
    
    const fetchUserList = async () => {
        const resp = await listService.getListByUser();
        if(resp.status === 200) {
            setLists(resp.data.result)
        }
    }
    return (
        <div className="page-container">
            <div className="card mb-2">
                <PrimaryTitle title="Mis Listados"/>
            </div>
            <div className="card">

                <ListTableComponent
                    lists={lists} 
                    listData={listData} 
                    setListData={setListData} 
                    setIsVisible={setIsVisible}
                />
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
