import { Component, computed, inject, signal } from '@angular/core';
import { SalesService } from '../../services/sales-service';
import { form, FormField, required, validate } from '@angular/forms/signals';
import { CreateSaleRequest } from '../../interfaces/create-sale-request';

@Component({
  imports: [FormField],
  selector: 'app-new-sale-page',
  styleUrl: './new-sale-page.css',
  templateUrl: './new-sale-page.html',
})
export class NewSalePage {
  private saleService = inject(SalesService);
  private initialSale = {
    customerName: '',
    paymentType: "0",
    total: 0,
    details:[{
      productName: '',
      quantity: 1,
      unitPrice: 0
    }]
  };

  private saleModel = signal(this.initialSale);
  protected saleForm = form(this.saleModel, (schemaPath) => {
    required(schemaPath.customerName, {message: 'Customer name is reuired'});
    validate(schemaPath.paymentType, ({value}) => {
      if (value().match('0')) return { kind: "equals", message: 'Payment type is required'};

      return null;
    })
  });

  protected addProduct(): void {
    this.saleForm.details().value.update(current => ([...current, {
      productName: '',
      quantity: 1,
      unitPrice: 0
    }]));
  }

  protected removeProduct(index: number): void {
    this.saleForm.details().value.update(current => current.filter((detail, i) => i !== index));
  }

  protected readonly total = computed(() => {
    return this.saleForm.details().value().reduce(( sum, detail ) => {
      return sum + (detail.quantity * detail.unitPrice);
    }, 0)
  })

  protected save(): void{
    const { customerName, paymentType, details } = this.saleForm().value();
    const request: CreateSaleRequest = {
      customerName: customerName,
      paymentTypeValue: Number(paymentType),
      total: this.total(),
      details: details
    };

    this.saleService.create(request).subscribe({
      next: response => {
        if (response.isSuccess) {
          this.saleModel.set(this.initialSale);
          this.saleForm().reset();
        }
      }
    })
  }
}
