import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss']
})
export class ThemesComponent implements OnInit {
  constructor(private titleService: Title) {
    this.titleService.setTitle('Kelola Tema');
  }

  ngOnInit(): void {
  }
}
