import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Place } from '../pubs/place.model';
import { PlacesService } from '../pubs/places.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {

  allPlaces: Place[];

  constructor(
    private _placesService: PlacesService,
    private actionSheetCtrl: ActionSheetController
    ) { }

  ngOnInit() {
    this.getPlaces();
  }

  getPlaces() {
    this._placesService.allPlaces.subscribe(data =>
      {
        if (data) {
          this.allPlaces = data;
        }
      }
    );
  }

  deletePlace(place: Place) {
    this._placesService.deletePlace(place);
  }

  openWarningModal(place: Place){
    this.actionSheetCtrl
      .create({
        header: 'Sunteți sigur că doriți să ștergeți intrarea?',
        buttons: [
          {
            text: 'Nu sunt sigur!',
            role: 'cancel',
            icon: 'close',
          },
          {
            text: 'Da! Doresc să șterg intrarea.',
            handler: () => {
              this.deletePlace(place);
            },
            icon: 'trash',
          }
        ]
      })
      .then(actionSheetEl =>{
        actionSheetEl.present();
      });
    
  }
}