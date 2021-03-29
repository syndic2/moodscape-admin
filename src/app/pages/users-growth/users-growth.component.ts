import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-users-growth',
  templateUrl: './users-growth.component.html',
  styleUrls: ['./users-growth.component.scss']
})
export class UsersGrowthComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle('Perkembangan Pengguna');
  }

  ngOnInit(): void {
  }
}
