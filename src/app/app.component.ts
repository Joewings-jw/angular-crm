import { Component,OnInit, OnDestroy, OnChanges} from '@angular/core';
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges{
  title = 'ng crm';
  user: any = null;
  mode = "side"
  uiContent = "content"
  progrssBarClass = "progress-bar";
  isloading = true;

  constructor() {
    console.log(" constructor")

    this.isloading = true;

  }

  ngOnChanges() {
    console.log("ngOnChanges")
  }


  ngOnInit(): void {
    console.log(" ngOnInit")
  }


}
