import { Component, OnInit, Input, Inject } from '@angular/core';
import { DataTransferService } from '../service/data-transfer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 personname: String;
 errorStatus: String;
  constructor(private datatransfer: DataTransferService, @Inject('BaseURL') private BaseURL, private router: Router) { }

  ngOnInit() {
  }

  letsPlay(personname){
  	console.log("Here at home component", personname);
  	this.datatransfer.loginUser(personname)
    .subscribe((response)=>{
      if(response){
        this.router.navigateByUrl('/puzzle');
      }
    },(error)=>{
      this.errorStatus = error;
      console.log('error during post is ', error)
      if(error.status == 500){
        this.errorStatus = 'The name already exists. Please use another name';
      }
    });
  }

}
