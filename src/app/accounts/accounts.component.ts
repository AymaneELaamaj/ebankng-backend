import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit{
  accounts!:FormGroup
  acc:any
  currentpage:number=0;
  size:number=5;
  operationGroup!:FormGroup
  constructor(private fb:FormBuilder,private service:ServiceService){

  }
  ngOnInit(): void {
    this.accounts=this.fb.group({
      accid:[""]
    })
    this.operationGroup=this.fb.group({
      OpeartionType:[''],
      amount:[''],
      accountdistination:[''],
      description:['']
    })
  }
  saveOperations(){
    let id=this.accounts.value.accid;
    let amount=this.operationGroup.value.amount;
    let OpeartionType=this.operationGroup.value.OpeartionType
    let accountdistination=this.operationGroup.value.accountdistination;
    let description=this.operationGroup.value.description;
    if (OpeartionType=='debit') {
      this.service.debit(id,amount,description).subscribe({
        next:data=>{
          alert("debit seccuful")

            this.findaacounts()
        },error:err=>{
          console.log(err)
        }
      })

    }else if (OpeartionType=='credit') {
      this.service.Credit(id,amount,description).subscribe({
        next:data=>{
            alert("credit seccuful")
            this.findaacounts()
        },error:err=>{
          console.log(err)
        }
      })

    }else  {
      this.service.Transfer(id,amount,accountdistination).subscribe({
        next:data=>{
          alert("Transfer seccuful")

            this.findaacounts()
        },error:err=>{
          console.log(err)
        }
      })

    }
  }
  // findaacounts(){
  //   let accid=this.accounts.value.accid
  //   this.service.searchaccounts(accid).subscribe({
  //     next:data=>{
  //       this.acc=data
  //       console.log(data)
  //     },error:(err)=> {
  //         console.log(err)
  //     },
  //   })

  // }
  findaacounts(){
    let accid=this.accounts.value.accid

    this.service.page(accid,this.currentpage).subscribe({
      next:data=>{
        this.acc=data
      },error:err=>{
        console.log(err)

      }
    })

  }
  pagesuit(page:any){
    let accid=this.accounts.value.accid
    this.currentpage=page
    this.findaacounts()

  }

}
