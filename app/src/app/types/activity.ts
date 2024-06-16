export interface IActivityType {
  name: string;
  _id?: string;
  image?: string;
  location: string;
  conditions: {
    windDirection: string;
    windSpeed: {
      min: number;
      max: number;
    };
    precipitation: boolean;
  };
}
export interface IActivity {
  city: string;
  date: number;
  type: IActivityType | string;
  _id: string;
}
