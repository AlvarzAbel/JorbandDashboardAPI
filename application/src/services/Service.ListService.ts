import { BaseService } from './Service.Base';

export class SongListService extends BaseService{

    async createList(data: any) {
        return await this.http.post(this.env.CREATE_SONG_LIST, data)
    }
    async getCurrentList() {
        return await this.http.get(this.env.GET_CURRENT_SONG_LIST)
    }
    async getAllList() {
        return await this.http.get(this.env.GET_SONG_LISTS);
    }
    async getListByUser() {
        return await this.http.get(this.env.GET_SONG_LIST_BY_USER);
    }
}