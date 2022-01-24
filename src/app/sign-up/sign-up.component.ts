import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private router:Router, private httpClient  : HttpClient ) { }

  ngOnInit(): void {
  }

  signup(form : NgForm){ 
          var myHeaders = new Headers();
          //myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'));
          myHeaders.append("Content-Type", "application/json");

          var raw = JSON.stringify(form.value);
          
          
          fetch("https://localhost:8092/gestion/ressources/users",
          {
                  method: 'POST',
                  headers: myHeaders,
                  body: raw,
                  redirect: 'follow'
          })
          .then(
            response=>{ 
              // on sauvegarde le token si tous se passe bien 
      
              if (response.status==200){
                response.text().then(
                    result=>{console.log(result)
                    //this.router.navigate(['users'])
            })   
            }else{
              this.router.navigate(['sign-up'])
                
            }
          })
            .catch(error=>console.log('error',error))
  }

}
