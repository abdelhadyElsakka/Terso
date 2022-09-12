import { Component, OnInit } from '@angular/core';
import { Observable, first } from 'rxjs';


@Component({
  selector: 'app-trending-favourite',
  templateUrl: './trending-favourite.component.html',
  styleUrls: ['./trending-favourite.component.scss'],

})
export class TrendingFavouriteComponent implements OnInit {

  favlist:any = [];
  
  ngOnInit(): void {
    this.favlist=JSON.parse(localStorage.getItem("fav") || "")
  }
  
  
}
