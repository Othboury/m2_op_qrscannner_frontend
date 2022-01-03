import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authStatus : boolean= false;
  constructor(private router : Router , private httpClient : HttpClient, private authService :AuthService) { }

  ngOnInit(): void {
    this.authService.authStatus =!!(localStorage.getItem('status'))
  }

  login(form : NgForm) {

    let email  = form.value.email ;
    let password  = form.value.password ;
    // log in
    this.signin(email,password) ;
  }

  signOut(){
    this.authStatus = this.authService.authStatus;
    console.log("Deconnexion er")
    console.log(this.authStatus);
  }

  signin(email: string, password: string){
    // tentative de connexion pour l'utilisateur email , password
  
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic "+btoa(email+":"+password));
  
    fetch("http://0.0.0.0:8091/auth",
    {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
    })
      .then(
              response=>{
                console.log(response.status , "status")
                // on sauvegarde le token si tous se passe bien
                if (response.status==200){
                  response.text().then(
                      result=>{console.log(result)
                      localStorage.setItem('token', result.substring(10,result.length-1))
                      localStorage.setItem('status', 'true')
                     this.authService.authStatus=true;
                      this.router.navigate(['users'])
              })
              .catch(error=>console.log('error',error))
  
              }
            else{
              alert(" login or password incorrect");
            }})
    }


}
