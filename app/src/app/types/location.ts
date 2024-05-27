import { IActivity } from "./activity";

export type TLocation = {
  loaded: boolean;
  error?: string;
  latitude?: number;
  longitude?: number;
  activities?: IActivity[];
};
