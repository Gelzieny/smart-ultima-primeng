import {SortDirection} from "../models/page-sort/sort-direction.enum";

export interface IOrder {
  changeOrder(column: string, direction: SortDirection): void;
}
