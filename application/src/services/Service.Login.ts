import { BaseService } from './Service.Base';

export class LoginService extends BaseService {

    async login(data: any) {
        return await this.http.post(this.env.LOGINROUTE, data);
    }
}