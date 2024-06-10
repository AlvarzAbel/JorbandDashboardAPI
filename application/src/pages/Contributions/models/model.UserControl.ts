import { ControlModel } from "./model.Control";

export interface UserControlModel {
    name: string;
    promises?: ControlModel[];
    tithes?: ControlModel[];
    contributions?: ControlModel[];
}