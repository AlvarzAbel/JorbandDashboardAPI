export default class SharedEndpoins {
    API_URL;
    END_POINTS;

    constructor(API_URL: string) {
        this.API_URL = API_URL;
        this.END_POINTS = {
            LOGINROUTE: `${API_URL}/auth`,
            USER_ROUTE: `${API_URL}/users`,

            CONTRIBUTION_ROUTE: `${API_URL}/contribution`,
            CREATE_CONTRIBUTION: `${API_URL}/contribution/create`,
            GET_CONTRIBUTIONS: `${API_URL}/contribution/get`,

            GET_TOTAL_PLAN_CONTRIBUTION: `${API_URL}/contribution/total`,
            GET_TOTAL_INCOMES: `${API_URL}/incomes/total`,

            CREATE_EXPENSES: `${API_URL}/expenses`,
            GET_TOTAL_EXPENSES: `${API_URL}/expenses/total`,

            CREATE_INCOME: `${API_URL}/incomes`,
            GET_ACTIVITIES: `${API_URL}/activities`,

            SONG_ROUTE: `${API_URL}/song`,

            CREATE_SONG_LIST: `${API_URL}/songList`,
            GET_CURRENT_SONG_LIST: `${API_URL}/songList/current`,
            GET_SONG_LISTS: `${API_URL}/songList`,
            GET_SONG_LIST_BY_USER: `${API_URL}/songList/userLists`,

            FINANCE_CONTROL_ROUTE: `${API_URL}/financeControl`,
            UPLOADS: `${API_URL}/upload`,

            CHANGE_USER_PASSWORD: `${API_URL}/auth/security`,

            REMOVE_USER_PROFILE: `${API_URL}/profiles/remove`,
            ADD_USER_PROFILE: `${API_URL}/profiles/add`,
            GET_PROFILE: `${API_URL}/profiles/`
        }
    }
}