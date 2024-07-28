export interface IFilter {
  name: string;
  value: string;
  checked: boolean;
}

export interface IFilters {
  name: string;
  filters: IFilter[];
}
