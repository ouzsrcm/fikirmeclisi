import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoriesService } from './categories.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceLoaderService {

  public CategoryService:CategoriesService;

  constructor() {

  }

  public load(){
    this.CategoryService.initialize();
    //TODO: log
  }

}
