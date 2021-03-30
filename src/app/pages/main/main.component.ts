import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public sideBarOpen: Boolean= false;

  constructor() {
  }

  ngOnInit(): void {
  }

  toogleSideBar() {
    this.sideBarOpen= !this.sideBarOpen;
  }
}
