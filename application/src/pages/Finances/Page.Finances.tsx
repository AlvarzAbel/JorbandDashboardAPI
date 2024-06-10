import { PrimaryTitle } from "../../styled-components/PrimaryTitle"
import { ContributionPlan } from "./components/Component.ContributionPlan"
import { FinanceActivity } from "./components/Component.FinancesActivity"
import './theme/styles.css'

export const FinancesPage = () => {
    //23386565:9755

    return (
        <div className="page-container">
            <div className="col-12 content-header ml-2" >
                <PrimaryTitle title="Finanzas"/>
            </div>
            <ContributionPlan/>
            <FinanceActivity/>
        </div>
    )
}
