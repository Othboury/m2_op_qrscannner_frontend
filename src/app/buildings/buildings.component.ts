import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.css']
})
export class BuildingsComponent implements OnInit {

  buildings :any = [] ; 

  constructor(private authService  : AuthService  , private httpClient  : HttpClient ,private router : Router) { }

  ngOnInit(): void {
    this.httpClient.get<any>("http://localhost:8091/buildings").subscribe((res)=>{
            console.log(res);
            this.buildings = res ; 
        });
  }

  remove(id : any){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'));
    fetch("http://localhost:8091/buildings/"+id, {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    })
    .then(
      response=>{ 
        if (response.status==200){
          response.text().then(
              result=>{console.log(result); 
                alert("Le bâtiment a été supprimé de la base de données ")
      })   
      }else{
   
        this.router.navigate(['auth'])
      
      }
    })
      .catch(error=>{console.log('error',error); 

    })

}


}
