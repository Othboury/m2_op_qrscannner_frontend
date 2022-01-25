import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-journals',
  templateUrl: './journals.component.html',
  styleUrls: ['./journals.component.css']
})
export class JournalsComponent implements OnInit {

  journals :any = [] ; 
  journalUrl = "https://localhost:8092/gestion/ressources/journals"
  datePipe: any;

  constructor(private authService  : AuthService  , private httpClient  : HttpClient ,private router : Router) { }

  ngOnInit(): void {
    this.httpClient.get<any>(this.journalUrl).subscribe((res)=>{
            console.log(res);
            this.journals = res ; 
        });
  }

  save(form: NgForm){
    var usernameEmail = localStorage.getItem('currentUser');
    var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          var raw = JSON.stringify(form.value);
          
          fetch(this.journalUrl+"/"+usernameEmail,
          {
                  method: 'POST',
                  headers: myHeaders,
                  body: raw,
                  redirect: 'follow'
          })
          .then(
            response=>{ 
      
              if (response.status==200){
                response.text().then(
                    result=>{console.log(result)
            })   
            }else{
              this.router.navigate(['salles'])
                
            }
          })
            .catch(error=>console.log('error',error))
  }

  remove(id : any){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'));
    fetch(this.journalUrl+"/"+id, {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    })
    .then(
      response=>{ 
        if (response.status==200){
          response.text().then(
              result=>{console.log(result); 
                alert("Le journal a été supprimé de la base de données ")
      })   
      }else{
   
        this.router.navigate(['auth'])
      
      }
    })
      .catch(error=>{console.log('error',error); 

    })

}

}
