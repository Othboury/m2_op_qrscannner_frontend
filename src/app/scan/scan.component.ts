import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit {
  scanResult: any='';
  title = 'QR Scanner';

  constructor(private authService  : AuthService  , private httpClient  : HttpClient ,private router : Router) { }

  ngOnInit(): void {}


  onCodeResult(result:string){
    this.scanResult=result;
  }

 

}
