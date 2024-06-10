import { BaseService } from "./Service.Base";

export class PasswordManagerService extends BaseService {

    async changePassword(data: any) {
        return await this.http.put(this.env.CHANGE_USER_PASSWORD, data);
    }
}