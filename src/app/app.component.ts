import { Component } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  count: number = 0;
  countMin: number = 0;
  countHour: number = 0;
  time: any;
  stopInterval: any;
  continueInterval: any;
  resetInterval: any;
  ForDblClick: any;
  boolVal: boolean;

  o = Observable.create((observer: Observer<any>) => {

    this.time = setInterval(() => {
        observer.next(this.count++);
        if(this.count == 60) {
          this.count = 0;
          this.countMin++;
        }

        if(this.countMin == 60) {
          this.countHour++;
          this.countMin = 0;
        }

        if(this.countHour == 24) this.countHour = 0;
    }, 1000);

    this.stopInterval = () => {
      this.boolVal = false;
      clearInterval(this.time);
    }

    this.continueInterval = () => {
      if(this.boolVal == false) {
        this.time = setInterval(() => {
          observer.next(this.count++);
          if(this.count == 60) {
            this.count = 0;
            this.countMin++;
          }
  
          if(this.countMin == 60) {
            this.countHour++;
            this.countMin = 0;
          }
  
          if(this.countHour == 24) this.countHour = 0;
      }, 1000);
      }
      this.boolVal = true;
    }

    this.resetInterval = () => {
      this.count = 0;
      this.countMin = 0;
      this.countHour = 0;
    }

    
   this.ForDblClick = () => {
            this.stopInterval();
   }
}).subscribe({
  next: (value) => console.log(value),
  complete: () => console.log('complete'),
  error: (error) => console.log('error: ', error)
});

}


