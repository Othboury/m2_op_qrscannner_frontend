import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-materiels',
  templateUrl: './materiels.component.html',
  styleUrls: ['./materiels.component.css']
})
export class MaterielsComponent implements OnInit {
  materiels :any = [] ; 

  constructor(private authService  : AuthService  , private httpClient  : HttpClient ,private router : Router) { }

  ngOnInit(): void {
    this.httpClient.get<any>("http://localhost:8091/materiels").subscribe((res)=>{
            console.log(res);
            this.materiels = res ; 
        });
  }

  remove(id : any){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'));
    fetch("http://localhost:8091/materiels/"+id, {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    })
    .then(
      response=>{ 
        if (response.status==200){
          response.text().then(
              result=>{console.log(result); 
                alert("Le matériel a été supprimé de la base de données ")
      })   
      }else{
   
        this.router.navigate(['auth'])
      
      }
    })
      .catch(error=>{console.log('error',error); 

    })

}

moved(id : any){
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'));

  fetch("http://localhost:8091/materiels/"+id, {
    method: 'PUT',
    headers: myHeaders,
    redirect: 'follow'
  })
  .then(
    response=>{ 
      if (response.status==200){
        response.text().then(
            result=>{console.log(result); 
              alert("Le matériel a été déplacé")
    })   
    }else{
 
      this.router.navigate(['auth'])
    
    }
  })
    .catch(error=>{console.log('error',error); 

  })

}
}
