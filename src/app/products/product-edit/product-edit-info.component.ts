import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Product } from '../product';
import { Subscription } from 'rxjs';


@Component({
  templateUrl: './product-edit-info.component.html'
})
export class ProductEditInfoComponent implements OnInit, OnDestroy{
  @ViewChild(NgForm, {static: false})
  productForm!: NgForm;

  errorMessage!: string;
  product!: Product;
  resolvedDataSub: Subscription | undefined;

  constructor(private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.getProductDataFromPrarenResolver();
  }
  ngOnDestroy(): void {
    if(this.resolvedDataSub){
      this.resolvedDataSub.unsubscribe();
    }
  }

  public getProductDataFromPrarenResolver(){
    this.route.parent?.data.subscribe(
      (data)=>{
        if(this.productForm){
          this.productForm.reset();
        }
        const resolvedData = data['resolvedProduct'];
        if(resolvedData.product){
          this.product = resolvedData.product;
        }else{
          this.errorMessage = resolvedData.error;
        }
      }
    );
  }
}
