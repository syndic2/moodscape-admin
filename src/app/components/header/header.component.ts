import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { logout } from 'src/app/store/actions/application.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toogleSideBarEmitter: EventEmitter<any>= new EventEmitter();

  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {
  }

  toogleSideBar() {
    this.toogleSideBarEmitter.emit();
  }

  onLogout() {
    this.router.navigate(['/login']);
    this.store.dispatch(logout());
  }
}
