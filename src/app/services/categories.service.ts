import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Categories } from '../models/Categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  public list():any{
    return this.http.get<Categories[]>('/assets/categories.json');
  }

}
