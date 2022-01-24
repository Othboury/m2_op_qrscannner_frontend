import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit {
  closeResult: any="";
  jsonresult: any = "";
  idmat: any = "";
  scanResult: any='';
  salle: any='';
  salleNum: any = '';
  title = 'QR Scanner';
  datePipe: any;
  journal: any ="";
  journalUrl = "https://localhost:8092/gestion/ressources/journals";
  scanUrl = "https://localhost:8092/gestion/ressources/scans";
  usernameEmail = localStorage.getItem('currentUser');

  constructor(private authService  : AuthService  , private httpClient  : HttpClient ,private router : Router, private modalService: NgbModal) { }


  ngOnInit(): void {

  }

  onCodeResult(result:string){
    this.scanResult= JSON.parse(result); 
    var Y = ":";
    var Z = 'salle":"';
    this.jsonresult = result.slice(result.indexOf(Y) + Y.length);
    this.salle = result.slice(result.indexOf(Z) + Z.length);
    this.salle = this.salle.split('"', 1)[0] 
    this.idmat = this.jsonresult.split(",", 1)
    
    this.createScan(this.usernameEmail, this.idmat, this.salle)
    return this.scanResult, this.idmat, this.salle;
  }


  createJournal(usernameEmail: string | null){
    var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          
          fetch(this.journalUrl+"/"+usernameEmail,
          {
                  method: 'POST',
                  headers: myHeaders,
                  //body: raw,
                  redirect: 'follow'
          })
          .then(
            response=>{ 
      
              if (response.status==200){
                response.text().then(
                    result=>{console.log(result)
            })   
            }else{
              this.router.navigate(['scan'])
                
            }
          })
            .catch(error=>console.log('error',error))
  }

  checkJournal(){
    var usernameEmail = localStorage.getItem('currentUser');
    var todayDate: any = this.datePipe.transform(todayDate, 'dd/MM/yyyy');
    this.httpClient.get<any>(this.journalUrl+"/"+todayDate+"/"+usernameEmail).subscribe((res)=>{
            console.log(res);
            this.journal = res;
        });
    if(this.journal == ""){
      this.createJournal(usernameEmail)
    }
  }

  createScan(usernameEmail: any, idmat: any, salle: any){
    var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          
          fetch(this.scanUrl+"/"+usernameEmail+"/"+idmat+"/"+salle,
          {
                  method: 'POST',
                  headers: myHeaders,
                  //body: raw,
                  redirect: 'follow'
          })
          .then(
            response=>{ 
      
              if (response.status==200){
                response.text().then(
                    result=>{console.log(result)
            })   
            }else{
              this.router.navigate(['scan'])
                
            }
          })
            .catch(error=>console.log('error',error))
  }

}
