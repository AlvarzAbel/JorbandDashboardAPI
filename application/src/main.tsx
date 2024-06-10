// import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primereact/resources/themes/lara-light-blue/theme.css'
import 'primeicons/primeicons.css';
import "primereact/resources/primereact.min.css";
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { AuthContext } from "./context/Context.Auth";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthContext>
    <App />
  </AuthContext>

)
