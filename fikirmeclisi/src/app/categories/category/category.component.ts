import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categories } from 'src/app/models/Categories';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {

  public id:string;
  private sub:any;
  public category:Categories = null;
  public categories:Categories[] = [];

  constructor(private route:ActivatedRoute,
    private categoriesService:CategoriesService) {
      
    }

  ngOnInit() {
    this.sub = this.route.params.subscribe(x => {
      this.id = x['id'];
    });
    this.categoriesService.list().subscribe(x => this.categories = x);
    this.category = (this.categories || []).filter((x) => {
      return x.CategoryId == this.id;
    })[0];
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}