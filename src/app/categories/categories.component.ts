import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories :any = [] ; 

  constructor(private authService  : AuthService  , private httpClient  : HttpClient ,private router : Router) { }

  ngOnInit(): void {
    this.httpClient.get<any>("https://localhost:8092/gestion/ressources/categories").subscribe((res)=>{
            console.log(res);
            this.categories = res ; 
        });
  }

  save(form: NgForm){
    var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          var raw = JSON.stringify(form.value);
          
          fetch("https://localhost:8092/gestion/ressources/categories",
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
              this.router.navigate(['categories'])
                
            }
          })
            .catch(error=>console.log('error',error))
  }

  remove(id : any){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'));
    fetch("https://localhost:8092/gestion/ressources/categories/"+id, {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    })
    .then(
      response=>{ 
        if (response.status==200){
          response.text().then(
              result=>{console.log(result); 
                alert("La cat??gorie a ??t?? supprim??e de la base de donn??es ")
      })   
      }else{
   
        this.router.navigate(['auth'])
      
      }
    })
      .catch(error=>{console.log('error',error); 

    })

}




}
