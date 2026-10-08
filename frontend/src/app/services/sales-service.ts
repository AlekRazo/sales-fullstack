//import { Service } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { CreateSaleRequest } from "../interfaces/create-sale-request";
import { ApiResponse } from "../interfaces/api-response";
import { GetSalesQueryRequest } from "../interfaces/get-sales-query-request";
import { Observable } from "rxjs";
import { GetSalesQueryResponse } from "../interfaces/get-sales-query-response";
import { GetSaleResponse } from "../interfaces/get-sale-response";

//@Service()
@Injectable({
    providedIn: "root"
})
export class SalesService {
    private http = inject(HttpClient);
    private endpoint = `${environment.apiUrl}/Sales`;

    create(request: CreateSaleRequest): Observable<ApiResponse<number>>{
        return this.http.post<ApiResponse<number>>(this.endpoint, request);
    }

    get(request: GetSalesQueryRequest): Observable<ApiResponse<GetSalesQueryResponse>>{
        return this.http.get<ApiResponse<GetSalesQueryResponse>>(`${this.endpoint}?page=${request.page}&pageSize0${request.pageSize}`);
    }

    getById(id: number): Observable<ApiResponse<GetSaleResponse>>{
        return this.http.get<ApiResponse<GetSaleResponse>>(`${this.endpoint}/${id}`);
    }
}
