import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Renderer2,
  Input,
  AfterViewInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { GoogleMapsService } from 'src/app/services/google-maps/google-maps.service';
import { LocationService } from 'src/app/services/location/location.service';
import { mapRetroStyle } from 'src/app/utils/const.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {
  @Input() parrots: any;
  @Input() height: any;
  @Output() clickMarker: EventEmitter<any> = new EventEmitter();
  @Output() mapClick: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('map', { static: true }) mapElementRef: ElementRef;
  googleMaps: any;
  map: any;
  marker: any;
  center = { lat: 39.89194, lng: -5.53181 };
  markerIsClicked: boolean = false;

  constructor(
    private googleMapsService: GoogleMapsService,
    private renderer: Renderer2,
    private locationService: LocationService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.initMap();
  }

  async initMap() {
    try {
      const position = await this.locationService.getCurrentLocation();
      this.center = {
        lat: position!.coords.latitude,
        lng: position!.coords.longitude,
      };
      await this.loadMap();
      this.getAddress(this.center.lat, this.center.lng);
    } catch (e) {
      console.log(e);
    }
  }

  async loadMap() {
    try {
      let googleMaps: any = await this.googleMapsService.loadGoogleMaps();
      this.googleMaps = googleMaps;
      const mapEl = this.mapElementRef.nativeElement;
      const location = new googleMaps.LatLng(this.center.lat, this.center.lng);
      this.map = new googleMaps.Map(mapEl, {
        center: location,
        zoom: 18,
        scaleControl: false,
        streetViewControl: false,
        zoomControl: false,
        overviewMapControl: false,
        mapTypeControl: false,
        mapTypeControlOptions: {
          mapTypeIds: [googleMaps.MapTypeId.ROADMAP, 'SwiggyClone'],
        },
      });
      this.map.addListener('click', () => {
        this.onMapClick();
      });
      var mapType = new googleMaps.StyledMapType(mapRetroStyle, {
        name: 'Grayscale',
      });
      this.map.mapTypes.set('SwiggyClone', mapType);
      this.map.setMapTypeId('SwiggyClone');
      this.renderer.addClass(mapEl, 'visible');
      this.addMarker(this.parrots);
    } catch (e) {
      console.log(e);
    }
  }

  addMarker(parrots: any) {
    let googleMaps: any = this.googleMaps;
    const icon = {
      url: 'assets/icons/bellota.png',
      scaledSize: new googleMaps.Size(50, 50),
    };

    for (let marker of parrots) {
      this.marker = new googleMaps.Marker({
        position: new googleMaps.LatLng(
          marker.location.lat,
          marker.location.lng
        ),
        message: marker.message,
        name: marker.createdBy,
        date: marker.createdAt,
        rated: marker.rated,
        address: marker.address,
        map: this.map,
        icon: icon,
        animation: googleMaps.Animation.DROP,
      });
      this.addInfoWindowToMarker(this.marker);
    }
  }

  addInfoWindowToMarker(marker: any) {
    marker.addListener('click', () => {
      this.markerIsClicked = true;
      const infoMarker = {
        marker: marker,
        selected: this.markerIsClicked,
      };
      this.clickMarker.emit(infoMarker);
    });
  }

  async getAddress(lat: any, lng: any) {
    try {
      const result = (await this.googleMapsService.getAddress(lat, lng)) as any;
      const loc = {
        address: result.formatted_address,
        lat,
        lng,
      };
      console.log(loc);
    } catch (error) {}
  }

  onMapClick() {
    this.markerIsClicked = false;
    const infoMarker = {
      marker: null,
      selected: this.markerIsClicked,
    };
    this.clickMarker.emit(infoMarker);
  }
}
