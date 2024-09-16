import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  isauth:boolean=false;
  role: any;
  username!:any
  accesToken!:any;

  constructor(private http:HttpClient,private router:Router) { }
  public login(name:string,pwd:string):Observable<any>{
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    let param=new HttpParams().set("username",name).set("password",pwd);
    return this.http.post("http://localhost:8090/login",param,options)
  }
  logout() {
    this.isauth=false;
    this.accesToken=undefined
    this.username=undefined
    this.role=undefined
    window.localStorage.removeItem("token")
    this.router.navigate(['/login'])

  }
  public loadprofile(data:any){
   this.isauth=true
   this.accesToken=data["token"]
   let jwt_decode:any =jwtDecode(this.accesToken)
   this.username=jwt_decode.sub
   this.role= jwt_decode.scope
   window.localStorage.setItem("token",this.accesToken)
  }
  loadjwttokenformlocalstorage() {
    let token=window.localStorage.getItem("token");
    if(token){
      this.loadprofile({"token":token})
      this.router.navigate(["/admin/acc"])
    }
  }
}

