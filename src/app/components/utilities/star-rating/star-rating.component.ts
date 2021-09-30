import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {
  @Input() rating: number= 0;
  @Input() maxStar: number= 5;

  public maxStarCounter: number[]= [...Array(this.maxStar).keys()];

  constructor() { }

  ngOnInit(): void {
  }
}
