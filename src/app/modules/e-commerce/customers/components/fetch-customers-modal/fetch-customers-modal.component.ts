import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Customer } from '../../../_models/customer.model';
import { CustomersService } from '../../../_services';
import { ContactService } from '../../../_services/_services_t/customer.service';

@Component({
  selector: 'app-fetch-customers-modal',
  templateUrl: './fetch-customers-modal.component.html',
  styleUrls: ['./fetch-customers-modal.component.scss']
})
export class FetchCustomersModalComponent implements OnInit, OnDestroy {
  @Input() ids: number[];
  customers: Customer[] = [{
    id: 4,
      firstName: 'Naomi',
      lastName: 'Galbreth',
      email: 'ngalbreth3@springer.com',
      userName: 'ngalbreth3',
      gender: 'Female',
      status: 3,
      dateOfBbirth: '12/30/1976',
      ipAddress: '239.198.18.122',
      type: 1,
      _userId: 2,
      _createdDate: '06/22/2013',
      _updatedDate: '01/31/2011'
    },
    {
      id: 5,
      firstName: 'Ashley',
      lastName: 'Jandl',
      email: 'ajandl4@mapy.cz',
      userName: 'ajandl4',
      gender: 'Female',
      status: 2,
      dateOfBbirth: '11/23/1996',
      ipAddress: '11.19.64.48',
      type: 2,
      _userId: 1,
      _createdDate: '01/30/2018',
      _updatedDate: '05/22/2014'
    }];
  isLoading = false;
  subscriptions: Subscription[] = [];


  constructor(private customersService: CustomersService, public modal: NgbActiveModal) { }

  ngOnInit(): void {
    /* this.customersService.find().subscribe(data=>{
      console.log("data in fetch",data);
    }); */
  }

 /*  loadCustomers() {
     this.customersService.find().subscribe(data=>{
       console.log(data);
       this.customers=data.customerListResponse;
     });
  } */

  fetchSelected() {
    this.isLoading = true;
    // just imitation, call server for fetching data
    setTimeout(() => {
      this.isLoading = false;
      this.modal.close();
    }, 1000);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
