import { format, parseISO } from 'date-fns';
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import esLocale from 'date-fns/locale/es';

export const ContributionTables = ({ data }: any) => {

    const dateTemplate = (rowData: any) => {
        const originalDate = parseISO(rowData.date);
        const formatedDate = format(originalDate, 'eeee, MMMM d yyyy', { locale: esLocale });
        return <>{formatedDate}</>
    };

    const amountTemplate = (rowData: any) => {
        return <>Q.{rowData.amount}</>
    }

    return (
        <DataTable
            emptyMessage="Sin Datos"
            value={data}>
            <Column field="date" header="Fecha" body={dateTemplate} sortable></Column>
            <Column field="amount" header="Monto" body={amountTemplate} ></Column>
        </DataTable>
    )
}
