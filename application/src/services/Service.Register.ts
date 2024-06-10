import { BaseService } from "./Service.Base";

export class RegisterService extends BaseService {

    async createUser(data: any) {
        return await this.http.post(this.env.USER_ROUTE, data)
    }
}