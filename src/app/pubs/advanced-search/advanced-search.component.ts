import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { Place } from '../../pubs/place.model';
import { PlacesService } from '../../pubs/places.service';
import { FavouritePlacesService } from '../favourite-places.service';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss'],
})
export class AdvancedSearchComponent implements OnInit {


  isLoading: boolean | null = null;
  allPlaces: Place[] = [];
  filteredPlaces: Place[] = [];

  constructor(
    private _placesService: PlacesService,
    private _favouritePlaces: FavouritePlacesService,
    private _authService: AuthService,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
    this.getPlaces();
  }

  getPlaces() {
    this.isLoading = true;
    let getSubscription = this._placesService.getPlacesAPIObservable();
    getSubscription.subscribe(data => {
      this.allPlaces = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...(e.payload.doc.data() as {})
          } as Place;
        });
      this.filteredPlaces = this.allPlaces;
      this.isLoading = false;
    }, (error) => this.isLoading = false);
  }

  filterList(event) {
    this.isLoading = true;
    this.filteredPlaces = this.allPlaces;
    const searchTerm = event.target.value;

    if (!searchTerm) {
      this.isLoading = false;
      return;
    }
  
    if (searchTerm) {
      this.isLoading = false;
      this.filteredPlaces = this.filteredPlaces.filter(place => {
        if (place.title && place.description && place.schedule && place.openDays && searchTerm) {
          return (place.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
            (place.description.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) || 
            (place.schedule.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
        }
      });
    }
  }

  addToFavourites(placeId: string) {
    this._favouritePlaces.getFavouritePlaceAPIObservableAsData(this._authService.getUserId)
      .subscribe(data => {
        if (Array.isArray(data) && data.length) {
          let favouritePlaceObject = data.pop();
          this._favouritePlaces.addFavouritePlaceAPI(placeId, favouritePlaceObject);
        } else {
          this._favouritePlaces.createFavouritePlaceAPIPromise(this._authService.getUserId, placeId);
        }
      });
  }

  presentAlert(title:string, placeId: string) {
    this.alertController
      .create({
        cssClass: 'my-custom-class',
        header: 'Adaugă la favorite',
        // subHeader: 'Subtitle',
        message: `Adaugă ${title} la locații favorite?`,
        buttons: [
          {
            text: 'Nu',
            role: 'cancel'
          },
          {
            text: 'Da',
            handler: () => { 
              this.addToFavourites(placeId);
              return true;
            }
          }
        ]
      })
      .then(alert => {
        alert.present();
      });
  }
}
