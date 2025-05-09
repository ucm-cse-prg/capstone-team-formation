import { Routes } from '@angular/router';
import { ProductListComponent } from '@components/product-list/product-list.component';

export const routes: Routes = [
    {
        path: '',
        // redirectTo: 'products',
        // pathMatch: 'full',
        component: ProductListComponent
    },
    {
        path: 'products',
        loadComponent: () => import('@components/product-list/product-list.component').then(c => c.ProductListComponent)
    },
    {
        path: 'team-formation',
        loadComponent: () => import('@components/team-formation/team-formation.component').then(c => c.TeamFormationComponent)
    },
    {   path: '**',
        redirectTo: 'products'
    }
];
