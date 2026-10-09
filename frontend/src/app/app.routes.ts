import { Routes } from '@angular/router';
import { ListSalesPage } from './pages/list-sales-page/list-sales-page';
import { NewSalePage } from './pages/new-sale-page/new-sale-page';
import { DetailSalePage } from './pages/detail-sale-page/detail-sale-page';

export const routes: Routes = [
    {path: '', component:ListSalesPage},
    {path: 'new', component:NewSalePage},
    {path: 'detail/:id', component:DetailSalePage}
];
