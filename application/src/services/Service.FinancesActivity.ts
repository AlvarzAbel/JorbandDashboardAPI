import { BaseService } from "./Service.Base";

export class FinancesActivity extends BaseService {

    async getActivities(){
        return this.http.get(this.env.GET_ACTIVITIES);
    }
}