import { BaseService } from "./Service.Base";

export class ExpensesService extends BaseService {

    async createExpense(data: any) {
        return await this.http.post(this.env.CREATE_EXPENSES, data)
    }

}