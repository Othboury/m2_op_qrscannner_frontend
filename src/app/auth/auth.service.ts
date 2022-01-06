import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {

authStatus:boolean= false ;

signOut(){
    this.authStatus = false ;
}
}
