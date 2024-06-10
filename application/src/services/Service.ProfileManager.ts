import { BaseService } from "./Service.Base";

export class ProfileManager extends BaseService {

    async addProfile(data: any){
        return await this.http.put(this.env.ADD_USER_PROFILE, data);
    }
    async removeProfile(data: any){
        return await this.http.put(this.env.REMOVE_USER_PROFILE, data);
    }
    async getProfiles(){
        return await this.http.get(this.env.GET_PROFILE)
    }
}