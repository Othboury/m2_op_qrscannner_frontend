import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import {environment} from 'src/environments/environment'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users :any = [] ; 
  constructor(private authService  : AuthService  , private httpClient  : HttpClient ,private router : Router) { }

  ngOnInit(): void {
    this.httpClient.get<any>("https://localhost:8092/gestion/ressources/users").subscribe((res)=>{
            console.log(res);
            this.users = res ; 
        });
  }
  remove(id : any){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'));
    fetch("https://localhost:8092/gestion/ressources/users"+id, {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    })
    .then(
      response=>{ 
        if (response.status==200){
          response.text().then(
              result=>{console.log(result); 
                alert("l'utilisateur a été supprimé de la base de données ")
      })   
      }else{
  
        this.router.navigate(['users'])
      
      }
    })
      .catch(error=>{console.log('error',error); 

    })

}

}
