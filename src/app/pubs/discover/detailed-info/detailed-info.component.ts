import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Place } from '../../place.model';

@Component({
  selector: 'app-detailed-info',
  templateUrl: './detailed-info.component.html',
  styleUrls: ['./detailed-info.component.scss'],
})
export class DetailedInfoComponent implements OnInit {

  @Input() selectedPlace: Place;
  nonCachedImage: string; 

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.nonCachedImage = this.selectedPlace?.imageUrl + '#' + new Date().getTime();
  }

  onReviewsButton(selectedPlaceId: string) {
    this.modalController.dismiss(
      {
        redirect: true,
        route: `/pubs/tabs/discover/reviews/${selectedPlaceId}`,
      }
    );
  }

  onReserveButton(selectedPlaceId: string) {
    this.modalController.dismiss(
      {
        redirect: true,
        route: `/pubs/tabs/discover/booking/${selectedPlaceId}`,
      }
    );
  }

  onFavouriteButton(selectedPlaceTitle: string, selectedPlaceId: string) {
    this.modalController.dismiss(
      {
        favourite: true,
        selectedPlaceTitle, 
        selectedPlaceId
      }
    );
  }
}
