import { Column } from "primereact/column"
import { DataTable, DataTableExpandedRows, DataTableValueArray } from "primereact/datatable"
import { useState } from 'react';
import { TableTemplate } from "../../../components/Component.TableTemplate";
import { PrimaryTitle } from "../../../styled-components/PrimaryTitle";

export const PromisesControl = ({ user }: any) => {

    const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows | DataTableValueArray | undefined>(undefined);

    const allowExpansion = (rowData: any) => {
        return rowData.promises!.length > 0;
    };

    const rowExpansionTemplate = (data: any) => {
        return (
            <div className="p-0">
                <TableTemplate data={data.promises} timeHeader={"Mes"} timeField="month"/>
            </div>
        );
    };

    return (

        <div className="card mb-2">
            <div className="page-header">

                <PrimaryTitle title="Control de Promesas"/>

            </div>
            <DataTable
                value={user}
                expandedRows={expandedRows}
                onRowToggle={(e) => setExpandedRows(e.data)}
                rowExpansionTemplate={rowExpansionTemplate}
                dataKey="id">
                <Column expander={allowExpansion} style={{ width: '5rem' }} />
                <Column field="name" header="Nombre" sortable></Column>
            </DataTable>
        </div>
    );
}
