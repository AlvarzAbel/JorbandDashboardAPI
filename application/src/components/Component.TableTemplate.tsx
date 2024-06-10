import { format, parseISO } from "date-fns"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { Tag } from "primereact/tag"
import esLocale from 'date-fns/locale/es';

export const TableTemplate = ({ data, timeField, timeHeader }: any) => {

    const statusTemplate = (rowData: any) => {
        const status = rowData.status === 'COMPLETED' ? 'COMPLETADO' : ''
        return <Tag severity="success" value={status}></Tag>
    }

    const dateTemplate = (rowData: any) => {
        const originalDate = parseISO(rowData.date);
        const formatedDate = format(originalDate, 'eeee, MMMM d yyyy', { locale: esLocale });
        return <>{formatedDate}</>
    };

    return (
        <DataTable
            emptyMessage="Sin Datos"
            value={data}>
            <Column field={timeField} header={timeHeader} body={timeField === 'date' ? dateTemplate: ""} sortable></Column>
            <Column field="status" header="Estado" body={statusTemplate}></Column>
        </DataTable>
    )
}
