import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { read } from 'fs';
import { Categories } from 'src/app/models/Categories';
import { Category } from 'src/app/models/Category';
import { CategoriesService } from 'src/app/services/categories.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {

  constructor(private db: DatabaseService) {

  }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(ready => {
      if (ready) {

      }
    });
  }

  ngOnDestroy() {
  }

}