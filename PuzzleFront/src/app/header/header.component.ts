import { Component, OnInit } from '@angular/core';
import { DataTransferService } from '../service/data-transfer.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	username: String = undefined;
	loginUser: String;
  subscription: Subscription;

  constructor(private datatransfer: DataTransferService, private router: Router) { }

  ngOnInit() {
  	this.subscription  = this.datatransfer.getUsername()
    .subscribe(name => { this.username = name; });
  }

  logOut(){
    this.username = undefined;
    this.router.navigateByUrl('/home');
    this.datatransfer.logOut();

  }

}
