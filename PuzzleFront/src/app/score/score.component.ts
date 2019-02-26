import { Component, OnInit } from '@angular/core';
import { DataTransferService } from '../service/data-transfer.service';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

	scorers: any;
  flag: boolean;

  constructor(private datatransfer: DataTransferService, private location: PlatformLocation) { 
    location.onPopState(() => {
      history.forward();
    });
  }

  ngOnInit() {
    this.scorers = [];
    var current_user = this.datatransfer.sendDetails();
  	this.datatransfer.getData()
  		.subscribe(scorers => {
  			this.scorers = scorers;
  			var done = false;
  			while(!done){
  				done = true;
  				for(var i=1; i<this.scorers.length; i++){
  					if(this.scorers[i-1].points < this.scorers[i].points){
  						done = false;
  						var temp = this.scorers[i-1];
  						this.scorers[i-1] = this.scorers[i];
  						this.scorers[i] = temp;
  					}
  					else if(this.scorers[i-1].points == this.scorers[i].points){
  						if(this.scorers[i-1].time_taken < this.scorers[i].time_taken){
  							done = false;
  							var temp = this.scorers[i-1];
  							this.scorers[i-1] = this.scorers[i];
  							this.scorers[i] = temp;
  						}
              if(this.scorers[i-1].time_taken == this.scorers[i].time_taken){
                if(this.scorers[i-1].name > this.scorers[i].name){
                done = false;
                var temp = this.scorers[i-1];
                this.scorers[i-1] = this.scorers[i];
                this.scorers[i] = temp;
              }
              }
  					}
  				}
  			}
        this.scorers = this.scorers.slice(0, 10);
        this.scorers.forEach((value) => {
          if(value.name == current_user.name){
            this.flag = true;
          }
          else{
            this.flag = false;
          }
        })
        if(!this.flag){
          this.scorers.push(current_user);
        }
  	})
  }
}
