import {Order, Sort} from './base-page.model';
import {Pageable} from "./base-page.model";
import {BaseModel} from "../base.model";
export class Page<T extends BaseModel> {
  constructor(
      public content: T[],
      public pageable: Pageable,
      public orders: Order[],
      public totalElements: number,
      public totalPages: number,
      public first: boolean,
      public last: boolean,
      public numberOfElements: number,
      public number: number,
      public size: number,
      public sort: Sort,
      public empty: boolean
  ) {
  }
  static fromJson<U extends BaseModel>(content: U[], json: any): Page<U> {
    return new Page<U>(
        content,
        Pageable.fromJson(json.pageable ? json.pageable : {}),
        json.orders ? json.orders.map(order => Order.fromJson(order ? order : {})): [],
        json.totalElements,
        json.totalPages,
        json.first,
        json.last,
        json.numberOfElements,
        json.number,
        json.size,
        Sort.fromJson(json.sort ? json.sort : {}),
        json.empty,
    )
  }
}
