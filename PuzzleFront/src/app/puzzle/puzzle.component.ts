import { Component, OnInit, ElementRef  } from '@angular/core';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DataTransferService } from '../service/data-transfer.service';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.css']
})
export class PuzzleComponent implements OnInit {

	puzzlenumbers = [];
	first =[];
	second = [];
	third = [];
	fourth = [];
	temp_array = [];
	timer: any = 0;
	interval;
	hours; minutes;
	time: String;
	moves: any;
	errMess: String;

  constructor(private el: ElementRef, private router: Router, private datatransfer: DataTransferService, private location: PlatformLocation) { 
     location.onPopState(() => {
      history.forward();
    });
  }

  ngOnInit() {
  	this.puzzlenumbers = [' ', '6', '8', '3', '1', '5', '2', '10', '9', '12', '4', '15', '14', '13', '11', '7'];
	this.first = this.puzzlenumbers.slice(0,4);
	this.second = this.puzzlenumbers.slice(4, 8);
	this.third = this.puzzlenumbers.slice(8, 12);
	this.fourth = this.puzzlenumbers.slice(12, 16);
	this.moves = Math.floor(Math.random()*(80-43+1)+43);
	this.interval = setInterval(() => {
		this.timer ++;
		this.hours = Math.floor(this.timer/60);
		this.minutes = (this.timer%60);
		if(this.hours < 10){
			var temp = '0';
			this.hours = temp+this.hours;
		}
		if(this.minutes < 10){
			var temp = '0';
			this.minutes = temp+this.minutes ;
		}
		this.time = this.hours+":"+this.minutes;
	}, 1000);

  }

  swapEntry(number){
  	if(this.temp_array.length < 2){
  		this.temp_array.push(number);
  	}
  	else{
  		this.temp_array = [];
  		this.temp_array.push(number);
  	}
  	if(this.temp_array.length == 2){
  		var index1 = this.puzzlenumbers.indexOf(this.temp_array[0]);
  		var index2 = this.puzzlenumbers.indexOf(this.temp_array[1]);
  		for(var i=0; i<this.temp_array.length; i++){
  			if(this.temp_array[i] == ' ' && (Math.abs(index1 - index2) == 1 ||  Math.abs(index1 - index2) == 4)){
  				this.puzzlenumbers = this.swapNumber(this.temp_array[0], this.temp_array[1]);
  					this.first = this.puzzlenumbers.slice(0,4);
					this.second = this.puzzlenumbers.slice(4, 8);
					this.third = this.puzzlenumbers.slice(8, 12);
					this.fourth = this.puzzlenumbers.slice(12, 16);
					if(this.moves > 1){
						this.moves--;
					}
					else{
						this.errMess = 'Sorry, you have failed the challenge';
						this.goToScorePage();
					}
					break;
  			}
  		}
  	}
  	
  }

  swapNumber(num1, num2){
  	var index1 = this.puzzlenumbers.indexOf(num1);
  	var index2 = this.puzzlenumbers.indexOf(num2);
  	this.puzzlenumbers[index1] = num2;
  	this.puzzlenumbers[index2] = num1;
  	return this.puzzlenumbers;
  }

  goToScorePage(){
  	if(this.errMess){
  		setTimeout(()=> {
  			this.datatransfer.calculateScore(this.moves, this.puzzlenumbers, this.time);
  			this.router.navigateByUrl('/scores');
  		}, 1000);
  	}
  	else{
  		this.datatransfer.calculateScore(this.moves, this.puzzlenumbers, this.time)
  		.subscribe((response)=>{
	      this.datatransfer.getDetailsOfLoggedIn(response, this.time);
	    },(error)=>{
	    });
      this.router.navigateByUrl('/scores');
  	} 	
  }

}
