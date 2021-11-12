import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditInfoComponent } from './product-edit/product-edit-info.component';
import { ProductEditTagsComponent } from './product-edit/product-edit-tags.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list.component';
import { ProductListResolver } from './product-list.resolver';
import { ProductResolver } from './product.resolver';

const routes: Routes = [
  {
    path: 'products',
    component: ProductListComponent,
    resolve: {
      resolvedProducts: ProductListResolver
    }
  },
  {
    path: 'products/:id',
    component: ProductDetailComponent,
    resolve: {
      resolvedProduct: ProductResolver
    }
  },
  {
    path: 'products/:id/edit',
    component: ProductEditComponent,
    resolve: {
      resolvedProduct: ProductResolver
    },
    children: [
      {
        path: '',
        redirectTo: 'info',
        pathMatch: 'full'
      },
      {
        path: 'info',
        component: ProductEditInfoComponent,
      },
      {
        path: 'tags',
        component: ProductEditTagsComponent
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProductRouterModule { }
