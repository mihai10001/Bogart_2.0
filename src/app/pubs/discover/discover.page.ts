import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';
// import { SegmentChangeEventDetail } from '@ionic/core';
import { FavouritePlacesService } from '../favourite-places.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  isLoading: boolean | null = null;
  isMoreInfoVisible: boolean;
  allPlaces: Place[];
  @ViewChild('pageTop') pageTop;

  constructor(
    private _favouritePlaces: FavouritePlacesService,
    private _placesService: PlacesService,
    private _authService: AuthService,
    public modalController: ModalController,
    public alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() { 
  }

  ionViewWillEnter() {
    //fetch all places when loaded; no update for now so fetch 1 time just good enough
    this.getAllPlaces();
  }

  getAllPlaces() {
    this.isLoading = true;
    let getSubscription = this._placesService.getPlacesAPIObservable();
    getSubscription.subscribe(data => {
      this.allPlaces = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...(e.payload.doc.data() as {})
          } as Place;
        });
      this.isLoading = false;
    }, (error) => this.isLoading = false);
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

  onOpenMenu(){
    this.menuCtrl.toggle();
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>){
    console.log(event.detail);
  }

  toggleMoreInfoVisibility() {
    this.isMoreInfoVisible = !this.isMoreInfoVisible;
  }
}
