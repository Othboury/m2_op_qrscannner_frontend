import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import{ GlobalComponent } from '../global-component';

@Component({
  selector: 'app-salles',
  templateUrl: './salles.component.html',
  styleUrls: ['./salles.component.css']
})
export class SallesComponent implements OnInit {

  salles :any = [] ; 

  constructor(private authService  : AuthService  , private httpClient  : HttpClient ,private router : Router) { }

  ngOnInit(): void {
    this.httpClient.get<any>(GlobalComponent.path+"salles").subscribe((res)=>{
            console.log(res);
            this.salles = res ; 
        });
  }

  save(form: NgForm){
    var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          var raw = JSON.stringify(form.value);
          
          fetch(GlobalComponent.path+"salles",
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
              this.router.navigate(['salles'])
                
            }
          })
            .catch(error=>console.log('error',error))
  }

  remove(id : any){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'));
    fetch(GlobalComponent.path+"salles?id="+id,{
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    })
    .then(
      response=>{ 
        if (response.status==200){
          response.text().then(
              result=>{console.log(result); 
                alert("La salle a été supprimée de la base de données ")
      })   
      }else{
   
        this.router.navigate(['auth'])
      
      }
    })
      .catch(error=>{console.log('error',error); 

    })

}

}
