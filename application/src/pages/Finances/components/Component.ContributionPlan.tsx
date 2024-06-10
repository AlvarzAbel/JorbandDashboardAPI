import { FinancialRecords } from "../../../services/Service.FinancialRecords"
import { useEffect, useState } from 'react';

export const ContributionPlan = () => {

    const service = new FinancialRecords();

    const [totalPlan, setTotalPlan] = useState(0);
    const [totalIncomes, setTotalIncomes] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);

    useEffect(() => {
        handleGetTotalPlan();
        handleGetTotalIncomes();
        handleGetTotalExpenses();
    }, [])

    const handleGetTotalPlan = async () => {
        const resp = await service.getPlanContributionTotal();
        setTotalPlan(resp.data.result);
    }

    const handleGetTotalIncomes = async () => {
        const resp = await service.getTotalIncomes();
        setTotalIncomes(resp.data.result);
    }
    const handleGetTotalExpenses = async () => {
        const resp = await service.getTotalExpenses();
        setTotalExpenses(resp.data.result);
    }

    return (
        <div className="finances-card">

            <div className="container">
                <div className="card-container">
                    <div className="card-content">
                        <h2 className="text-blue">Q. {totalPlan}</h2>
                        <p>PLAN 5</p>
                    </div>
                    <div className="icon-container ">
                        <i className="pi pi-dollar background-blue" />
                    </div>
                </div>
            </div>

            <div className="container ">
                <div className="card-container">
                    <div className="card-content">
                        <h2 className="text-green">Q. {totalIncomes}</h2>
                        <p>INGRESOS</p>
                    </div>
                    <div className="icon-container ">
                        <i className="pi pi-dollar background-green" />
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="card-container">
                    <div className="card-content">
                        <h2>Q. {totalExpenses}</h2>
                        <p>EGRESOS</p>
                    </div>
                    <div className="icon-container ">
                        <i className="pi pi-dollar background-red" />
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="card-container">
                    <div className="w-full text-center">
                        <h2>Total</h2>
                        <h2>Q. {totalPlan + totalIncomes - totalExpenses}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}
