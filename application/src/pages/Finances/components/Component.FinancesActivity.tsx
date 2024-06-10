import { ScrollPanel } from 'primereact/scrollpanel';
import { Timeline } from 'primereact/timeline';
import { useEffect, useState } from 'react';
import { FinancesActivity } from '../../../services/Service.FinancesActivity';
import { format, parseISO } from 'date-fns';
import esLocale from 'date-fns/locale/es';

export const FinanceActivity = () => {

  const service = new FinancesActivity();

  const [activities, setActivities] = useState([])

  useEffect(() => {
    handleGetActivities();
  }, [])

  const handleGetActivities = async () => {
    const resp = await service.getActivities();
    setActivities(resp.data.result);
  }

  const dateTemplate = (rowData: any) => {
    const originalDate = parseISO(rowData.creation_date);
    const formatedDate = format(originalDate, 'eeee, d MMMM yyyy', { locale: esLocale });
    return <>{formatedDate}</>
};

  const customizedContent = (item: any) => {
    return (
      <div className='timeline-content'>
        <h3>{`${item.created_by.name} ${item.created_by.lastName}`}</h3>
        <p className=''>Un nuevo {item.category === 'EXPENSES'? 'GASTO':'INGRESO'} de Q.{item.amount} fue creado </p>
        <small>{dateTemplate(item)}</small>
      </div>
    );
  };

  return (
    <div className="scroll-container mb-4" >
      <ScrollPanel className='scroll-style' >
        <h2>Actividad</h2>
        <Timeline
          value={activities}
          content={customizedContent}
          style={{ padding: 0, marginLeft: '-30px' }}
          className="w-full " />
      </ScrollPanel>
    </div>
  )
}
