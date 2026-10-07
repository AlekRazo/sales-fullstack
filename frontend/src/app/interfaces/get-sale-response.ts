import { GetSaleDetailResponse } from "./get-sale-detail-response";

export interface GetSaleResponse {
    saleId: number;
    customerName: string;
    paymentTypeName: string;
    total: number;
    saleDate: string;
    details: GetSaleDetailResponse[];
}
