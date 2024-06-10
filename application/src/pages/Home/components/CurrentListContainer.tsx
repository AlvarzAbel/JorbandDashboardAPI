import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { SongListService } from "../../../services/Service.ListService";
import { useState, useEffect } from 'react';
import { Button } from "primereact/button";
import { PrimaryTitle } from "../../../styled-components/PrimaryTitle";
import { useAuthContext } from "../../../context/Context.Auth";
import { SINGER } from "../../../utils/Util.Constants";

interface Props {
    setRandomDialogVisible: any;
    randomDialogVisible: boolean;
    setRegularDialogVisible: any;
    regularDialogVisible: boolean;
}

export const DisplayList = ({ setRandomDialogVisible, randomDialogVisible,
    setRegularDialogVisible, regularDialogVisible }: Props) => {

    const listService = new SongListService();

    const { loggedUserData: { user } } = useAuthContext()!;

    const [currentSongList, setCurrentSongList] = useState<SongListModel>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => { getCurrentSongList() }, [])

    const getCurrentSongList = async () => {
        setIsLoading(true)
        const list = await listService.getCurrentList();
        setCurrentSongList(list.data.result)
        setIsLoading(false)
    }

    return (
        <div className="">
            <div className="salign-items-center mb-2 ">
                <div className="col-12 content-header">
                    <PrimaryTitle title="Listado Actual" />
                    {
                        user.profile.includes(SINGER) && (
                            <div>
                                <Button className="mr-2" severity='success' label="Random" onClick={() => setRandomDialogVisible(!randomDialogVisible)} />
                                <Button className="ml-2" severity='success' label="Manual" onClick={() => setRegularDialogVisible(!regularDialogVisible)} />
                            </div>
                        )
                    }
                </div>
            </div>

            <div className="card">
                <DataTable
                    emptyMessage="Sin datos"
                    loading={isLoading}
                    value={currentSongList?.songs}>
                    <Column field='name' header='Nombre' />
                    <Column field='chord' header='Nota' />
                </DataTable>
            </div>
        </div>
    )
}
