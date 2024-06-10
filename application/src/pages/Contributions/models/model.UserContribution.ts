import { ContributionModel } from "./model.Contribution";

export interface UserContributionModel {
    name: string;
    contributions?: ContributionModel[];
}