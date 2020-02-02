import { Component } from '@angular/core';
import { NavigationStart, NavigationEnd,Event,Router, NavigationError, NavigationCancel } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularCrud';
  showLoadingIndicator:boolean = true;
  constructor(private router: Router){
    this.router.events.subscribe((routerEvent: Event )=> {
      if(routerEvent instanceof NavigationStart){
        this.showLoadingIndicator = true;
      }
      if(
        routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationError ||
        routerEvent instanceof NavigationCancel 
        ){
        this.showLoadingIndicator = false;
      }
    });
  }
}
