import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiceService } from '../service/service.service';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginform!:FormGroup
  constructor(private fb:FormBuilder,private service:AuthService,private router:Router) {

  }
  ngOnInit(): void {
    this.loginform=this.fb.group({
      name:this.fb.control(''),
      pwd:this.fb.control('')
    })
  }
  login(){
    console.log("logs succ");

    let name=this.loginform.value.name
    let pwd=this.loginform.value.pwd
    this.service.login(name,pwd).subscribe({
      next:data =>{
        this.service.loadprofile(data)

        this.router.navigate(['/admin'])
      },error:err=>{
        console.log(err)

        }
    })

  }

}
