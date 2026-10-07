import { CreateSaleDetailRequest } from "./create-sale-detail-request";

export interface CreateSaleRequest {
    customerName: string;
    paymentTypeValue: number;
    total: number;
    details: CreateSaleDetailRequest[];
}
