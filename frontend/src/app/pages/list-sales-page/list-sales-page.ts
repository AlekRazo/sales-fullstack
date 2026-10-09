import { Component, effect, inject, signal } from '@angular/core';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { GetSaleResponse } from '../../interfaces/get-sale-response';
import { GetSalesQueryRequest } from '../../interfaces/get-sales-query-request';
import { SalesService } from '../../services/sales-service';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  imports: [NgbPagination, CurrencyPipe, RouterLink],
  selector: 'app-list-sales-page',
  styleUrl: './list-sales-page.css',
  templateUrl: './list-sales-page.html',
})
export class ListSalesPage {
  protected currentPage = signal(1);
  protected pageSize = signal(10);
  protected totalRecords = signal(0);
  protected sales = signal<GetSaleResponse[]>([]);

  private saleService = inject(SalesService);
  
  constructor() {
    effect(() => {
      const query: GetSalesQueryRequest = {
        page: this.currentPage(),
        pageSize: this.pageSize()
      };

      this.saleService.get(query).subscribe({
        next: resp => {
          if (resp.isSuccess) {
            const {totalItems, items} = resp.data;
            this.sales.set(items);
            this.totalRecords.set(totalItems);
          }
        },
        error: (e) => { console.log(e); }
      });
    });
  }
}
