import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SalesService } from '../../services/sales-service';
import { GetSaleResponse } from '../../interfaces/get-sale-response';
import { CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  imports: [RouterLink, CurrencyPipe],
  selector: 'app-detail-sale-page',
  styleUrl: './detail-sale-page.css',
  templateUrl: './detail-sale-page.html',
})
export class DetailSalePage {
  private activeRoute = inject(ActivatedRoute);
  private saleService = inject(SalesService);
  protected saleModel = signal<GetSaleResponse>({
    saleId: 0,
    customerName: '',
    paymentTypeName: "",
    total: 0,
    saleDate: '',
    details:[{
      productName: '',
      quantity: 1,
      unitPrice: 0
    }]
  });

  constructor(){
    this.activeRoute.params.subscribe((params) => {
      this.saleService.getById(params['id']).subscribe({
        next: resp => {
          if(resp.isSuccess){
            this.saleModel.set(resp.data);
          }
          else{
            Swal.fire({
              text: resp.message,
              icon: "error"
            });
          }
        },
        error: (e) => {
          console.log(e);
        }
      });
    });
  }
}
