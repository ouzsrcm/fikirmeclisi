import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/Category';
// import * as writeJsonFile from 'write-json-file';
import { ServiceBaseService } from './service-base.service'

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  
  public Categories:Category[] = [];
  public apiUrl: string = 'http://www.fikiratlasi.com/';

  constructor(public http: HttpClient) {
    
  }

  public initialize() {
    var list = this.get();
    if (list = null) {
      return;
    }
    console.log(list);
    this.Categories = list;
    // (async () => {
    //   await writeJsonFile('./assets/categories.json', list);
    // });
  }

  public get(): any {
    return this.http.get<Category[]>(this.apiUrl + 'wp-json/wp/v2/categories')
      .toPromise()
      .then((response) => {
        return response;
      })
  }

}
