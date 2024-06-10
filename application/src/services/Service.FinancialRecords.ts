import { BaseService } from "./Service.Base";


export class FinancialRecords extends BaseService {

    async getPlanContributionTotal(){
        return await this.http.get(this.env.GET_TOTAL_PLAN_CONTRIBUTION);
    }

    async getTotalIncomes(){
        return await this.http.get(this.env.GET_TOTAL_INCOMES);
    }

    async getTotalExpenses(){
        return await this.http.get(this.env.GET_TOTAL_EXPENSES);
    }
}