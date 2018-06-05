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
  private clientDetailFormId: string;
  private client: Client;
  private hasBalance: boolean = false;
  private showBalanceUpdateInput: boolean = false;

  constructor(
    public clientService: ClientService,
    public router: Router,
    public route: ActivatedRoute,// From router
    public flashMessagesService: FlashMessagesService,
  ) { }

  ngOnInit() {
    // "Get ID from URL"
    this.clientDetailFormId = this.route.snapshot.params['id'];
    // Get client
    this.clientService.getClient(this.clientDetailFormId).subscribe(serviceClient => {
      if(serviceClient.balance > 0) {
        this.hasBalance = true;
      }
      this.client = serviceClient;
      console.log(this.client);
    })
  }

}
