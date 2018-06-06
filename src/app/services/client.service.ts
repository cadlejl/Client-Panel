import { Injectable } from '@angular/core';

// List for getting all the clients, and Object for getting one client from database.
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Client } from '../models/Client';

@Injectable()
export class ClientService {
  clientsObs: FirebaseListObservable<any[]>;
  clientObs: FirebaseObjectObservable<any>;

  constructor(public afdb: AngularFireDatabase) { 
    this.clientsObs 
    = this.afdb
    .list('/clients') as FirebaseListObservable<Client[]>
  }

  getClients() {
    return this.clientsObs;
  }

  newClient(formValue: Client) {
    this.clientsObs.push(formValue);
  }

  getClient(clientDetailFormId: string) {
    this.clientObs 
    = this.afdb
    .object(
      '/clients/' // '/clients/' is the database path
      + clientDetailFormId
    ) as FirebaseObjectObservable<Client>;
    return this.clientObs;
  }

  updateClient(clientDetailFormId: string, client: Client) {
    return this.clientsObs.update(clientDetailFormId, client);
  }
}
