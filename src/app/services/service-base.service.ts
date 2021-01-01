import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceBaseService {

  public API_STORAGE_KEY:string = 'ouzsrcm';
  public API_URL:string = 'https://fikiratlasi.com/';

  constructor() {
    
  }

}
