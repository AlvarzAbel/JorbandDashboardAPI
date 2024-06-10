import { format, parseISO } from "date-fns";
import { Button } from "primereact/button";
import { Column } from "primereact/column"
import { DataTable, DataTableExpandedRows } from "primereact/datatable"
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { useRef, useState } from 'react';
import esLocale from 'date-fns/locale/es';
import { useAuthContext } from "../../../context/Context.Auth";


export const ListTableComponent = ({ lists, listData, setListData, setIsVisible }: any) => {

    const { loggedUserData: { user } } = useAuthContext()!

    const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows | any[]>([]);

    const menu = useRef<Menu>(null);
    const menuItems: MenuItem[] = [
        {
            label: `Acciones`,
            items: [
                {
                    label: 'Reutilizar',
                    icon: 'pi pi-undo',
                    command: () => {
                        setIsVisible(true)
                    }
                }
            ]
        }
    ];

    const actionBodyTemplate = (rowData: any) => {
        return (
            <div className="flex justify-content-center cursor-pointer"
                onClick={(event) => {
                    menu.current?.toggle(event)
                    setListData({
                        ...listData,
                        songs: rowData.songs
                    })
                }}>
                <Menu model={menuItems}
                    popup
                    ref={menu}
                    popupAlignment="right" />
                <Button
                    icon="pi pi-ellipsis-v"
                    outlined
                    style={{ border: 'none', padding: 0, margin: 0, width: '5px' }}
                />
            </div>
        );
    };

    const rowExpansionTemplate = (data: any) => {
        return (
            <>{
                data.songs.map((song: any, i: number) => {
                    return <li className="p-3 flex justify-content-between" key={i}>
                        <span>{song.name}</span>
                        <span>{song.chord}</span>
                    </li>
                })
            }</>
        );
    };

    const dateTemplate = (rowData: any) => {
        const originalDate = parseISO(rowData.date);
        const formatedDate = format(originalDate, 'eeee, d MMMM yyyy', { locale: esLocale });

        return <>{formatedDate}</>
    };

    return (
        <DataTable
            value={lists}
            expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
            rowExpansionTemplate={rowExpansionTemplate}
            dataKey="_id"
            emptyMessage="Sin datos"
            style={{ zIndex: '0' }}>
            <Column expander style={{ width: '5rem' }} />
            <Column field="date" header="Fecha" body={dateTemplate} />
            <Column body={user.profile.includes('SINGER') && actionBodyTemplate} header="Acción" exportable={false}></Column>

        </DataTable>
    )
}
