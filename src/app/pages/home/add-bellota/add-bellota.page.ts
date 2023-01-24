import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { isEmpty } from 'lodash';
import { AuthService } from 'src/app/services/auth.service';
import { BellotasService } from 'src/app/services/bellotas/bellotas.service';
import { GoogleMapsService } from 'src/app/services/google-maps/google-maps.service';
import { LocationService } from 'src/app/services/location/location.service';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-add-bellota',
  templateUrl: './add-bellota.page.html',
  styleUrls: ['./add-bellota.page.scss'],
})
export class AddBellotaPage implements OnInit {
  ionicForm: FormGroup;
  user: any;
  center = { lat: 39.89194, lng: -5.53181 };
  location: any;

  constructor(
    private fb: FormBuilder,
    private bellotasService: BellotasService,
    private locationService: LocationService,
    private authService: AuthService,
    private googleMapsService: GoogleMapsService,
    private router: Router
  ) {
    this.ionicForm = this.fb.group({
      message: [''],
    });
  }

  ngOnInit() {
    this.getCurrentUser();
    this.getLocationAddress();
  }

  getCurrentUser() {
    const user = this.authService.getCurrentUser();
    user.subscribe((res: any) => {
      this.user = res;
    });
  }

  async getLocationAddress() {
    const position = await this.locationService.getCurrentLocation();
    this.center = {
      lat: position!.coords.latitude,
      lng: position!.coords.longitude,
    };

    this.getAddress(this.center.lat, this.center.lng);
  }

  async getAddress(lat: any, lng: any) {
    try {
      const result = (await this.googleMapsService.getAddress(lat, lng)) as any;
      const loc = {
        address: result.formatted_address,
        lat,
        lng,
      };
      this.location = loc;
    } catch (error) {}
  }

  async submitForm() {
    if (isEmpty(this.ionicForm.value.message)) {
      console.log('Es necesario rellenar el mensaje');
    } else {
      const data = {
        message: this.ionicForm.value.message,
        location: this.center,
        createdAt: new Date(),
        createdBy: this.user.email,
        rated: 5,
        address: this.location.address,
      };
      this.bellotasService.insertBellota(data).subscribe(() => {
        this.router.navigate(['/tabs/home']);
        // añadir mensaje de ok
      });
    }
  }
}
