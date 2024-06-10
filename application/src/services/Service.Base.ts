import { environment } from "../environment/Enviroment";
import { HttpProvider } from "./HttpProvider";

export abstract class BaseService {
    env = environment.END_POINTS;
    http = new HttpProvider();

}