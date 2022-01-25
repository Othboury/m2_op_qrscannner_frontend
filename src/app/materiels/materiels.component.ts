import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-materiels',
  templateUrl: './materiels.component.html',
  styleUrls: ['./materiels.component.css']
})
export class MaterielsComponent implements OnInit {
  @ViewChild('sample')
  listObj!: DropDownListComponent;
  materiels :any = [] ; 
  categories :any = [] ;
  salles :any = [] ;
  mat :any = [];
  material : any = [];
  val : any;
  text : any;
  item :any = []
  qrInfo:string ="";
  fields: Object = { text: ',nameSalle', value: 'idSalle' };
  height: string = '220px';
  waterMark: string = 'Selectionner une salle';
  materielUrl = "https://localhost:8092/gestion/ressources/materiels"
  materielForm!: FormGroup;

  constructor(private authService  : AuthService  , private httpClient  : HttpClient ,private router : Router, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.httpClient.get<any>(this.materielUrl).subscribe((res)=>{
            console.log(res);
            this.materiels = res ; 
        });

        this.materielForm = this.fb.group({
          sallesData: [null]
        });

        this.getSalles();
        this.getCat();
  }

  getCat(){
    this.httpClient.get<any>("https://localhost:8092/gestion/ressources/categories").subscribe((resCat)=>{
      console.log(resCat);
      this.categories = resCat ; 
  });
  //return this.categories;
  }

  getSalles(){
    this.httpClient.get<any>("https://localhost:8092/gestion/ressources/salles").subscribe((resSalles)=>{
        console.log(resSalles);
        this.salles = resSalles ; 
    });
    //return this.salles;
  }

 // sallesData: Object[] =this.getSalles() ;

  public onChange(args: any): void {
    this.val = document.getElementById('value');
    this.text = document.getElementById('text');
    this.val.innerHTML = this.listObj.value.toString();
    this.text.innerHTML = this.listObj.text;
}

  singlematerial(id: any){
    this.httpClient.get<any>(this.materielUrl+"/"+id).subscribe((result)=>{
            console.log(result);
            this.mat = result ; 
        });
      return this.mat;
  }

  save(){
    var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          var raw = JSON.stringify(this.materielForm.value);
          
          fetch(this.materielUrl,
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
              this.router.navigate(['materiels'])
                
            }
          })
            .catch(error=>console.log('error',error))
  }


  createQr(idMateriel : any, categoryMateriel: any, nameMateriel: any, salleMateriel: any){
    console.log(this.material)
    this.item = [{
      'ID': idMateriel,
      'categorie': categoryMateriel,
      'name': nameMateriel,
      'salle': salleMateriel
    }]
     this.qrInfo = JSON.stringify(this.item);
     return this.qrInfo;
  }


  remove(id : any){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'));
    fetch(this.materielUrl+"/"+id, {
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
        this.router.navigate(['materiels'])
      }
    })
      .catch(error=>{console.log('error',error); 
    })

}

moved(id : any){
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'));

  fetch(this.materielUrl+"/"+id, {
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
 
      this.router.navigate(['materiels'])
    
    }
  })
    .catch(error=>{console.log('error',error); 

  })

}
}
