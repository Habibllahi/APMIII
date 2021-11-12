import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductResolved } from './product';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  product!: Product;
  errorMessage!: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getResolvedProduct()
  }

  public getResolvedProduct(){
    const resolvedData = this.activatedRoute.snapshot.data['resolvedProduct'] as ProductResolved;
    if(resolvedData.error){
      this.errorMessage = resolvedData.error
    }else{
      this.pageTitle = resolvedData.product!.productName;
      this.product = resolvedData.product!;
    }
  }

}
