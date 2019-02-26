import { Injectable } from '@angular/core';
import { Router, CanActivate, CanDeactivate } from '@angular/router';
import { DataTransferService } from './data-transfer.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private datatransfer: DataTransferService, private router: Router) { }

  canActivate(): boolean {
  	if(!this.datatransfer.isLoggedIn()){
  		this.router.navigateByUrl('/home');
  		return false;
  	}
  	return true;
  }
}
