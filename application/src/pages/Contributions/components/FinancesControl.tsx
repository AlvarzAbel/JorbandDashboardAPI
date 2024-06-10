import React, { useEffect, useState } from "react";
import { ContributionControl } from "./Component.ControlContribution"
import { PromisesControl } from "./Component.ControlPromise"
import { TitheControl } from "./Component.ControlTithe"
import { UserService } from "../../../services/Service.User";
import { CreateControl } from "./Component.ControlCreation";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { UserControlModel } from "../models/model.UserControl";

export const FinancesControl = () => {

    const userService = new UserService();

    const [userData, setUserData] = useState<UserControlModel[]>([]);
    const [displayControl, setDisplayControl] = useState('contribution')
    const [dialogVisibility, setDialogVisibility] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    const controls = [
        { name: 'Control de Plan 5', value: 'contribution' },
        { name: 'Control de Promesas', value: 'promises' },
        { name: 'Control de Diezmos', value: 'tithe' },
    ]

    useEffect(() => {
        getUserFinances();
    }, [isLoading]);

    const getUserFinances = async () => {
        const resp = await userService.getUsersFinancesControl();
        if (resp.status === 200) {
            setUserData(resp.data.result)
        }
    }

    return (
        <React.Fragment>
            <div className="flex justify-content-between mb-2 mt-2">
                <Dropdown
                    value={displayControl}
                    onChange={(e) => setDisplayControl(e.value)}
                    options={controls}
                    optionLabel={'name'}
                    placeholder="Seleccionar"
                />
                <Button
                    severity='success'
                    className='header-btn'
                    label="Crear Registro"
                    onClick={() => setDialogVisibility(true)}
                />
            </div>

            {
                displayControl === 'contribution' && <ContributionControl user={userData} />
            }
            {
                displayControl === 'promises' && <PromisesControl user={userData} />
            }
            {
                displayControl === 'tithe' && <TitheControl user={userData} />
            }

            <CreateControl
                dialogVisibility={dialogVisibility}
                setDialogVisibility={setDialogVisibility}
                setIsLoading={setIsLoading}
            />

        </React.Fragment>
    )
}
