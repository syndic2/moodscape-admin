import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'Header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toogleSideBarEmitter: EventEmitter<any>= new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  toogleSideBar() {
    this.toogleSideBarEmitter.emit();
  }
}
