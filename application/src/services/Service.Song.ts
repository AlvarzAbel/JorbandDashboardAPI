import { BaseService } from './Service.Base';

export class SongService extends BaseService {

    async getRandomSong(params: any) {
        return await this.http.getWithParams(this.env.SONG_ROUTE, params);
    }
    async getAllSong() {
        return await this.http.get(this.env.SONG_ROUTE);
    }
    async createSong(data: Object) {
        return await this.http.post(`${this.env.SONG_ROUTE}/create`, data);
    }
    async removeSong(data: any) {
        return await this.http.post(`${this.env.SONG_ROUTE}/delete`, data)
    }
}