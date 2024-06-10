import './theme/theme.pages.css'
import './theme/theme.dialogstyles.css'
import './theme/theme.barNavigation.css'
import './theme/theme.headerStyles.css'

import { BrowserRouter } from "react-router-dom"
import { ToastProvider } from "./context/Context.Toast";
import { AxiosInterceptor } from "./interceptors/axios.inteceptor";
import { RoutesComponent } from './components/Component.Routes';
import { BarNavigation } from './components/Component.BarNavigation';
import { addLocale } from 'primereact/api'

AxiosInterceptor();

export const App = () => {
  
  addLocale('es', {
    firstDayOfWeek: 1,
    dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    today: 'Hoy',
    clear: 'Limpiar'
  });

  return (
    <ToastProvider>
      <BrowserRouter>
        <BarNavigation />
        <RoutesComponent />
      </BrowserRouter>
    </ToastProvider>
  )
}

