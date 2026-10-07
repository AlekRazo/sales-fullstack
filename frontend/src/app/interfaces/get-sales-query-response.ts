import { GetSaleResponse } from "./get-sale-response";

export interface GetSalesQueryResponse {
    items: GetSaleResponse[];
    page: number;
    pageSize: number;
    totalItems: number;
}
