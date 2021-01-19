import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';
import { SegmentChangeEventDetail } from '@ionic/core';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  allPlaces: Place[];
  selectedPlace: Place;
  @ViewChild('pageTop') pageTop;

  constructor(private _placesService: PlacesService, private menuCtrl: MenuController) { }

  ngOnInit() { 
    //fetch all places when loaded; no update for now so fetch 1 time just good enough
    this._placesService.allPlaces.subscribe(data =>
      {
        if (data) {
          this.allPlaces = data;
          this.selectedPlace = this.allPlaces[0];
        }
      }
    );
  }

  onOpenMenu(){
    this.menuCtrl.toggle();
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>){
    console.log(event.detail);
  }

  selectPlace(place: Place) {
    this.selectedPlace = place;
    this.pageTop.scrollToTop();
  }
}
