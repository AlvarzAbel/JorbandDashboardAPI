import './theme/style.css';
import { AddProfileComponent } from "./components/Component.AddProfile"
import { RemoveProfileComponent } from './components/Component.RemoveProfile';
import { PrimaryTitle } from '../../styled-components/PrimaryTitle';

export const AdminPage = () => {
    
    return (
        <div className='page-container '>
            <div className="flex justify-content-center">
                <div className="page-content ">
                    <PrimaryTitle title='Administración'/>
                    <AddProfileComponent />
                    <RemoveProfileComponent/>
                </div>

            </div>
        </div>
    )
}
