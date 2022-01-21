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

  constructor(private authService  : AuthService  , private httpClient  : HttpClient ,private router : Router, private modalService: NgbModal) { }


  ngOnInit(): void {

  }

  onCodeResult(result:string){
    this.scanResult= result; 
    var Y = ":";
    var Z = 'salle":"';
    this.jsonresult = result.slice(result.indexOf(Y) + Y.length);
    this.salle = result.slice(result.indexOf(Z) + Z.length);
    this.salle = this.salle.split('"', 1)[0] 
    this.idmat = this.jsonresult.split(",", 1)
    return this.scanResult, this.idmat, this.salle;
  }

}
