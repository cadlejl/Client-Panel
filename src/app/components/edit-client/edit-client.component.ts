import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../models/Client';


@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  private pathId: string;
  private client: Client = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: 0
  }

  disableBalanceOnEdit: boolean = true;

  constructor(
    public clientService: ClientService,
    public router: Router,
    public route: ActivatedRoute,// From router
    public flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.pathId = this.route.snapshot.params['id'];

    // Get client
    this.clientService.getClient(this.pathId)
    .subscribe(serviceClient => {
      this.client = serviceClient;
    })
  }

  onSubmit({value, valid}:{value: Client, valid: boolean}) {
    if(!valid) {
      this.flashMessagesService.show(
        'Please fill in all fields.', 
        {cssClass:'alert-danger', timeout:4000}
      );

      //this.router.navigate(['edit-client/' + this.pathId]); I don't get what this is for.

    } else {
      // Update client
      this.clientService.updateClient(this.pathId, value);
      this.flashMessagesService.show(
        'Client updated.', 
        {cssClass:'alert-success', timeout:4000}
      );

      this.router.navigate(['/client/' + this.pathId]);
    }
  }
}
