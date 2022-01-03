import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit {
  scanResult: any='';

  title = 'QR Scanner';

  onCodeResult(result:string)
  {
    this.scanResult=result;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
