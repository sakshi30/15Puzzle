import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map  } from 'rxjs/operators';
import { baseURL } from '../baseUrl';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

	username: Subject<string> = new Subject<string>();
  isAuthenticated: Boolean = false;
  authToken: string = undefined;
  tokenKey = 'JWT';
  name: string;
  score:any;
  data: any;

  constructor(private http: HttpClient) { }

  calculateScore(moves, puzzlenumbers, time): Observable<any>{
      this.score = 0;
      if(moves >= 0){
        var obj = localStorage.getItem(this.tokenKey);
         for(var i=0; i< 15; i++){
            if(puzzlenumbers[i] === String(i+1)){
              this.score += 10;
            }
         }
         if(puzzlenumbers[-1] === undefined){
            this.score += 10;
         }
         return this.http.put<any>(baseURL+'users', {"name": JSON.parse(obj).username, "points": this.score, "time_taken": time}, httpOptions)
         .pipe( map(res => {
           return {"name": res.name, "points": res.points, "time":time};
       }));
      }
  }


  getDetailsOfLoggedIn(response: any, time_taken){
    localStorage.setItem("name", response.name);
    localStorage.setItem("points", response.points);
    localStorage.setItem("time_taken", time_taken);
  }

   sendDetails(): any{
    var obj = localStorage.getItem(this.tokenKey);
    var name = JSON.parse(obj).username;
    var points = localStorage.getItem("points");
    var time_taken =  localStorage.getItem("time_taken");
    return {"name": name, "points": points, "time_taken": time_taken};
  }

 
  storeUserCredentials(credentials: any) {
     localStorage.setItem(this.tokenKey, JSON.stringify(credentials));
     this.useCredentials(credentials);
   }

  useCredentials(credentials: any) {
     this.isAuthenticated = true;
     this.sendUsername(credentials.username);
     this.authToken = credentials.token;
   }

   sendUsername(name: string) {
     this.username.next(name);
   }

  getUsername(): Observable<string> {
     return this.username.asObservable();
   }

   getToken(): string {
     return this.authToken;
   }


  getData(): Observable<any[]> {
  	return this.http.get<any[]>(baseURL+'users');
  }
  loginUser(personame): Observable<any>{
  	return this.http.post<any>(baseURL+'users', {"name": personame}, httpOptions)
    .pipe( map(res => {
           this.storeUserCredentials({username: personame, token: res.token});
           return {'success': true, 'username': personame };
       }));
  }

   isLoggedIn(): Boolean {
     return this.isAuthenticated;
   }

  clearUsername() {
     this.username.next(undefined);
   }

  logOut(){
    this.destroyUserCredentials();
  }

  destroyUserCredentials() {
     this.authToken = undefined;
     this.clearUsername();
     this.isAuthenticated = false;
     localStorage.removeItem(this.tokenKey);
   }
}
