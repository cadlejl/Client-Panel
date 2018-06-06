import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  private pathId: string;
  private client: Client;
  private hasBalance: boolean = false;
  private showBalanceUpdateInput: boolean = false;

  constructor(
    public clientService: ClientService,
    public router: Router,
    public route: ActivatedRoute,// From router
    public flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    // "Get ID from path/URL"
    this.pathId = this.route.snapshot.params['id'];
    // Get client
    this.clientService.getClient(this.pathId).subscribe(serviceClient => {
      this.hasBallance(serviceClient);
      this.client = serviceClient;
    })
  }

  hasBallance(client: Client) {
    if(client.balance > 0) {
      this.hasBalance = true;
    } else {
      this.hasBalance = false;
    }
  }

  updateBalance(
    /*clientDetailFormId: string*/ // Instructor never used his parameter
  ) {
    // Update client
    this.clientService
    .updateClient(this.pathId, this.client);
    this.flashMessagesService.show(
      'Balance Updated', 
      { cssClass: 'alert-success', timeout: 4000 }
    );
    this.hasBallance(this.client);
    this.router.navigate(['/client/' + this.pathId]);
  }

  onDeleteClick() {
    if(confirm("Are you sure you want to delete this client?")) {
      this.clientService.deleteClient(this.pathId);
      this.flashMessagesService.show(
        'Client Deleted', 
        { cssClass: 'alert-success', timeout: 4000 }
      );
      this.router.navigate(['/']);
    }
  }
}
