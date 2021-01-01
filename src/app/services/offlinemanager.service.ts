import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable, from, of, forkJoin } from 'rxjs';
import { switchMap, finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

const STORAGE_REQ_KEY = 'storedreq';

interface StoredRequest{
  id: string,
  data: any,
  url: string,
  time: number,
  type: string
}

@Injectable({
  providedIn: 'root'
})
export class OfflinemanagerService {

  constructor(
    private storage:Storage,
    private http:HttpClient,
    private toastController:ToastController
  ) { 

  }

  checkForEvents() : Observable<any> {
    return from(this.storage.get(STORAGE_REQ_KEY)).pipe(
      switchMap(storedOperations => {
        let obj = JSON.parse(storedOperations);
        if(obj && obj.length > 0){
          return this.sendRequests(obj).pipe(
            finalize(()=> {
              let toast = this.toastController.create({
                message: 'Senkronize edildi.',
                duration: 3000,
                position: 'bottom'
              });
              toast.then(t => t.present());
              this.storage.remove(STORAGE_REQ_KEY);
            })
          )
        } else {
          return of(false);
        }
      })
    );
  }

  storeRequest(url, type, data) {
    let toast = this.toastController.create({
      message: 'Offline...',
      duration: 3000,
      position: 'bottom'
    });
    toast.then(t => t.present());

    let action: StoredRequest={
      url: url,
      type:type,
      data:data,
      time:new Date().getTime(),
      id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
    };
    return this.storage.get(STORAGE_REQ_KEY).then(x => {
      let storedObj = JSON.parse(x);

      if(storedObj){
        storedObj.push(action);
      } else {
        storedObj = [action];
      }

      return this.storage.set(STORAGE_REQ_KEY, JSON.stringify(storedObj));
    });
  }

  sendRequests(operations: StoredRequest[]){
    let obs = [];
    for(let op of operations){
      console.log('request: ', op);
      let oneObs = this.http.request(op.type, op.url, op.data);
      obs.push(oneObs);
    }

    return forkJoin(obs);
  }

}
