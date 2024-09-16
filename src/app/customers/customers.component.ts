import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { Customers } from '../Model/customer.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {
  customers: any
  search!:FormGroup
  errmsg!:String
  mesaageerror!:String
  constructor( private service:ServiceService ,private fb:FormBuilder,private router:Router) {

  }
  ngOnInit(): void {
    this.loadCustomers()
    this.search=this.fb.group({
      keyword:this.fb.control("")
    })

  }
  viewAccounts(customerId: number) {
    this.router.navigate([`/customer/${customerId}/accounts`]);
  }
  public loadCustomers(){
    this.service.listCustomers().subscribe({
      next:(value:any)=> {

          this.customers=value;
      },error(err) {
        console.log(err)

      }
    }

    )
  }

  public find(){
    // let keyword=this.search.value.keyword
    // this.customers=this.service.searchCustomers(keyword).pipe(
    //   catchError(err =>{
    //     this.errmsg=err.message;
    //     return throwError(err)
    //   })
    // )
    let keyword=this.search.value.keyword
    this.service.searchCustomers(keyword).subscribe({
      next:(data:any)=>{
        this.customers = data
        console.log(data)
      },error(err) {
          console.log(err)
      },
    })
  }
  public delete(customer: Customers){
    if (confirm('Are you sure you want to delete this customer?')) {
      this.service.deltecustomer(customer.id).subscribe({
        next: (data) => {
          // Remove customer from local array after successful deletion
          // this.customers = this.customers.filter(c => c.id !== customer.id);
          // console.log('Customer deleted');
          this.loadCustomers();

        },
        error: (err) => {
          console.error('Error deleting customer:', err);
        }
      });
    }
  }
}
