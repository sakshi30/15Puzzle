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

	puzzlenumbers = undefined;
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
  number: any = 0;

  constructor(private el: ElementRef, private router: Router, private datatransfer: DataTransferService, private location: PlatformLocation) { 
     location.onPopState(() => {
      history.forward();
    });
  }

  ngOnInit() {}
  letsPlay(){
     this.puzzlenumbers = this.createPuzzle();
     console.log(this.puzzlenumbers);
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

  createPuzzle(){
      var flag =  true;
      var arr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', ' '];
      var temp_arr = [];
      while(temp_arr.length != 16){
        var index = Math.floor(Math.random()*(arr.length)+0);
        this.number = arr[index];
        temp_arr.push(this.number);
        arr.splice(index, 1);
      }
      flag = this.isSolvable(temp_arr);
      if(flag){
        return temp_arr;
      }
      else{
        console.log("Not solvable");
        return this.createPuzzle();
      }
    
  }

  isSolvable(arr){
    var count = 0;
    var index;
    for(var i=0; i< 16; i++){
      for(var j=i+1; j<16; j++){
        if(arr[j] && arr[i] && arr[i] > arr[j]){
          count += 1;
        }
        if(arr[i] === ' '){
          var index = i;
        }
      }
    }
    if(index%2 == 0 && count%2 !=0){
      return true;
    }
    else if(index%2 != 0 && count%2 == 0){
      return true;
    }
    else{
      return false;
    }

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
        console.log(response);
	      this.datatransfer.getDetailsOfLoggedIn(response, this.time);
	    },(error)=>{
	    });
      this.router.navigateByUrl('/scores');
  	} 	
  }

}
