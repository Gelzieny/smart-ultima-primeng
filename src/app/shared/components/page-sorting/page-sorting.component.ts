import { Component, Input, OnInit } from '@angular/core';
import {SortDirection} from '../../models/page-sort/sort-direction.enum';
import {IOrder} from '../../interfaces/order.interface';
import {Page} from '../../models/page-sort/page.model';

@Component({
    selector: 'app-page-sorting',
    templateUrl: './page-sorting.component.html',
    styleUrls: ['./page-sorting.component.scss']
})
export class PageSortingComponent implements OnInit {

    public directionAsc: SortDirection = SortDirection.ASCENDING;
    public directionDesc: SortDirection = SortDirection.DESCENDING;

    @Input() title: string;
    @Input() property: string;
    @Input() class: string;
    @Input() page: Page<any>;
    @Input() iOrder: IOrder;

    constructor() { }

    ngOnInit(): void {
    }

    changeOrder(column: string, direction: SortDirection) {
        this.iOrder.changeOrder(column, direction);
    }
}
