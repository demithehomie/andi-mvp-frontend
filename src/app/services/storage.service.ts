import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as localforage from 'localforage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

    constructor(private readonly storage: Storage) {
        this.initStorage();
      }
    
      async initStorage() {
        await this.storage.defineDriver(localforage.WEBSQL);
        await this.storage.create();
        console.log('Storage initialized');
      }
}
