import { BaseService } from "./Service.Base";

export class IncomeService extends BaseService{

    async createIncome(data: any) {
        return await this.http.post(this.env.CREATE_INCOME, data)
    }
}