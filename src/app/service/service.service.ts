import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomersComponent } from '../customers/customers.component';
import { Customers } from '../Model/customer.model';
import { accountdetails } from '../Model/accounts.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {


  constructor(private http:HttpClient,) { }
  public listCustomers(){
    return this.http.get("http://localhost:8090/customers")
  }
  public searchCustomers(keyword:String):Observable<any>{
    return this.http.get("http://localhost:8090/customers/search?keyword=" + keyword)
  }
  public addcustomers(cust:Customers):Observable<Customers[]>{
    return this.http.post<Customers[]>("http://localhost:8090/savecustomers",cust)
  }
  public deltecustomer(id:number){
    return this.http.delete("http://localhost:8090/customers/"+ id)

  }
  public searchaccounts(id:String):Observable<any>{
    return this.http.get("http://localhost:8090/accounts/"+id+"/pageOperations")
  }
  public page(id:String,num:number):Observable<any>{
    return this.http.get("http://localhost:8090/accounts/"+id+"/pageOperations?page="+num+"&size=5" )
  }
  public debit(id:String ,amount: number,desc:String ):Observable<any>{
    let data={accountId:id,amount:amount,description:desc}
    return this.http.post<any>("http://localhost:8090/accounts/debit",data)
  }
  public Credit(id:String ,amount: number,desc:String ):Observable<any>{
    let data={accountId:id,amount:amount,description:desc}
    return this.http.post<any>("http://localhost:8090/accounts/credit",data)
  }
  public Transfer(id:String ,amount: number,destine:String ):Observable<any>{
    let data={accountSource:id,amount:amount,accountDestination:destine}
    return this.http.post<any>("http://localhost:8090/accounts/transfer",data)
  }
  public accbycust(id:number ):Observable<any>{
    return this.http.get<any>("http://localhost:8090/customer/"+id+"/accounts")
  }



}
