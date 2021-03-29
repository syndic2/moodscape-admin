import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle('Kelola Artikel');
  }

  ngOnInit(): void {
  }
}
