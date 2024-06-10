import { BaseService } from './Service.Base';

export class FinanceControlService extends BaseService {

    async createFinanceControl(data: any) {
        return this.http.post(this.env.FINANCE_CONTROL_ROUTE, data);
    }
}