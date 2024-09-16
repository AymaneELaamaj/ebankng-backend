import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Customers } from '../Model/customer.model';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.css'
})
export class NewCustomerComponent implements OnInit{
  newForm!:FormGroup
  constructor(private service:ServiceService,private fb:FormBuilder) {

  }
  ngOnInit(): void {
    this.newForm=this.fb.group({
      name:this.fb.control("",[Validators.required]),
      email:this.fb.control("",[Validators.required, Validators.email])
    })
  }
  AddCustomers(){
    let cust:Customers=this.newForm.value
    this.service.addcustomers(cust).subscribe({
      next:(value)=> {
        alert("add seccufely")
        console.log(value)
        this.newForm.reset();

      },error:(err)=> {

      },
    })
  }

}
