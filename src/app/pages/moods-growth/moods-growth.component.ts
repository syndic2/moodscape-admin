import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-moods-growth',
  templateUrl: './moods-growth.component.html',
  styleUrls: ['./moods-growth.component.scss']
})
export class MoodsGrowthComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle('Perkembangan Mood');
  }

  ngOnInit(): void {
  }
}
