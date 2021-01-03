import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ConnectionStatus, NetworkService } from './network.service';
import { OfflinemanagerService } from './offlinemanager.service';
import { ServiceBaseService } from './service-base.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class PostsService extends ServiceBaseService{

  constructor(private networkService:NetworkService, 
    private offlineManager:OfflinemanagerService, 
    private http:HttpClient, 
    private storage:Storage) { 
      super();
    }
    
  public get(forceRequest:boolean = false) : Observable<any> {
    if(this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline || !forceRequest){
      console.log("from local");
      return from(this.getLocalData('posts'));
    }else {
      console.log("from api");
      return this.http.get(`${this.API_URL}/wp-json/wp/v2/posts`)
      .pipe(
        map(res => res['data']),
        tap(res => {
          this.setLocalData('posts', res);
        }));
    }
  }

  private setLocalData(key, data) {
    this.storage.set(`${this.API_STORAGE_KEY}-${key}`, data);
  }

  private getLocalData(key){
    return this.storage.get(`${this.API_STORAGE_KEY}-${key}`);
  }

}
