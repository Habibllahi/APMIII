import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product, ProductResolved } from '../product';

@Component({
  templateUrl: './product-edit-tags.component.html'
})
export class ProductEditTagsComponent implements OnInit, OnDestroy{
  errorMessage!: string;
  newTags = '';
  product !: Product;
  resolvedDataSub: Subscription | undefined;

  constructor(private route: ActivatedRoute) { }
  ngOnDestroy(): void {
    if(this.resolvedDataSub){
      this.resolvedDataSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getProductDataFromPrarenResolver();
  }

  public getProductDataFromPrarenResolver(){
    this.resolvedDataSub = this.route.parent?.data.subscribe(
      (data)=>{
        const resolvedData = data['resolvedProduct'] as ProductResolved;
        if(resolvedData.product){
          this.product = resolvedData.product;
        }else{
          this.errorMessage = resolvedData.error!;
        }
      }
    );
  }

  // Add the defined tags
  addTags(): void {
    if (!this.newTags) {
      this.errorMessage = 'Enter the search keywords separated by commas and then press Add';
    } else {
      const tagArray = this.newTags.split(',');
      this.product.tags = this.product.tags ? this.product.tags.concat(tagArray) : tagArray;
      this.newTags = '';
      this.errorMessage = '';
    }
  }

  // Remove the tag from the array of tags.
  removeTag(idx: number): void {
    this.product.tags?.splice(idx, 1);
  }
}
