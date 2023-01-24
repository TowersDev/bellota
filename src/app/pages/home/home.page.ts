import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BellotasService } from 'src/app/services/bellotas/bellotas.service';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  center: any;
  update: boolean = false;
  isLocationFetched: boolean = false;
  location: any = {};
  showCard: boolean = false;
  parrots: any;
  marker: any;

  constructor(
    private supabaseService: SupabaseService,
    private bellotasService: BellotasService,
    public router: Router
  ) {}

  ngOnInit() {
    this.supabaseService.loadUser();
    this.bellotasService.getBellotas().subscribe((res: any) => {
      console.log(res);
      this.parrots = res;
    });
  }
  addBellota() {
    this.router.navigate(['/tabs/home/add-bellota']);
  }

  clickMarker(event: any) {
    this.marker = event;
  }
}
