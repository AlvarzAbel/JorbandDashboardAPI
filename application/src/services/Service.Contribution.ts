import { BaseService } from './Service.Base';

export class ContributionService extends BaseService {

    async createContribution(data: any) {
        return await this.http.post(this.env.CREATE_CONTRIBUTION, data)
    }
    async getContributionList(){
        return await this.http.get(this.env.GET_CONTRIBUTIONS)
    }
}