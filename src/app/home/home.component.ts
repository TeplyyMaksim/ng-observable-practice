import { logger } from 'codelyzer/util/logger';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs/Rx';
import 'rxjs/Rx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  numbersObsSubscribtion: Subscription;
  customObsSubscribtion: Subscription;

  constructor() { }

  ngOnInit() {
    // Angulars observable
    const myNumbers = Observable.interval(1000)
      .map(
        (data: number) => {
          return data * 2;
        }
      );
    this.numbersObsSubscribtion = myNumbers.subscribe(
      (number: number) => {
        console.log(number);
      }
    );

    // Custom observable
    const myObservable = Observable.create((observer: Observer<string>) => {
      setTimeout(() => {
        observer.next('first package');
      }, 2000);
      setTimeout(() => {
        observer.next('second package');
      }, 4000);
      setTimeout(() => {
        observer.complete();
        // observer.error('This does not work!');
      }, 5000);
      setTimeout(() => {
        observer.next('third package!');
      }, 6500);
    });

    this.customObsSubscribtion = myObservable.subscribe(
      (data: string) => { console.log(data); },
      (error: string) => { console.log(error); },
      () => { console.log('completed!'); }
    );
  }

  ngOnDestroy () {
    this.numbersObsSubscribtion.unsubscribe();
    this.customObsSubscribtion.unsubscribe();
  }
}
