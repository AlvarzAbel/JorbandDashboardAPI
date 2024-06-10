// import { DOMAIN } from '../config/Config.EndPoints';
import SharedEndpoins from './Shared';


const API_URL = import.meta.env.VITE_REACT_API_URL;

export const environment = {
    END_POINTS: new SharedEndpoins(API_URL).END_POINTS,
};