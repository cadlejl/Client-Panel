import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  private client: Client = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: 0
  }
  private disableBalanceOnAdd: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
