import { Injectable } from '@angular/core';
import { Place } from './place.model';
import { OpenDays } from './openDays.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places: Place[] = [
    new Place(
      'Scart',
      'cool place, might come back later',
      'https://d2fdt3nym3n14p.cloudfront.net/venue/2107/gallery/5309/conversions/scart-loc-lejer-13866-big.jpg',
      new OpenDays(true, false, false),
      4,
      5,
      5,
      [[0, 0], [0, 1]]
    ),

    new Place(
      '80`sPub',
      'same',
      'https://timisoara.fest.ro/files/places/8/image_884_2_preview.jpg',
      new OpenDays(true, false, false),
      4,
      5,
      5,
      [[0, 0], [0, 1]]
    ),

    new Place(
      'D`arc',
      'also on lake',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcScfa8GR2gbK3gczQjCz0V47zue29V0mHZ5Qg&usqp=CAU',
      new OpenDays(true, false, false),
      4,
      5,
      5,
      [[0, 0], [0, 1]]
    ),

    new Place(
      'Aethernative',
      'downstairs',
      'https://www.thebohoguide.com/wp-content/uploads/job-manager-uploads/main_image/2017/03/boho1.jpg',
      new OpenDays(true, false, false),
      4,
      5,
      5,
      [[0, 0], [0, 1]]
    ),

    new Place(
      'Cuib D`Arte',
      'upstairs',
      'https://media-cdn.tripadvisor.com/media/photo-s/19/ed/90/90/img-20191104-220623-373.jpg',
      new OpenDays(true, false, false),
      4,
      5,
      5,
      [[0, 0], [0, 1]]
    ),
  ];

  get places(){
    return [...this._places]; //return a copy of the array in order to directly edit the places 
  }

  constructor() { }

  getPlace(id: string){
    return {...this._places.find(p => p.id === id)}; //clone the entire object
  }
}
