import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-journals',
  templateUrl: './journals.component.html',
  styleUrls: ['./journals.component.css']
})
export class JournalsComponent implements OnInit {

  journals :any = [] ; 

  constructor(private authService  : AuthService  , private httpClient  : HttpClient ,private router : Router) { }

  ngOnInit(): void {
    this.httpClient.get<any>("http://localhost:8091/journals").subscribe((res)=>{
            console.log(res);
            this.journals = res ; 
        });
  }

  remove(id : any){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'));
    fetch("http://localhost:8091/journals/"+id, {
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
