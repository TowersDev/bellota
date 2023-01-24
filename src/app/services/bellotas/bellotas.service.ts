import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bellotas } from 'src/app/interfaces/bellotas';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BellotasService {
  url = 'https://asfulvuoiwthavlsrywp.supabase.co/rest/v1';

  headerDict = {
    apikey: environment.supabaseKey,
    Authorization: `Bearer ${environment.supabaseKey}`,
    'Content-Type': 'application/json',
    Prefer: 'return=minimal',
  };

  requestOptions = {
    headers: new HttpHeaders(this.headerDict),
  };

  constructor(private http: HttpClient) {}

  getBellotas() {
    return this.http.get<Bellotas>(`${this.url}/bellotas`, this.requestOptions);
  }

  insertBellota(body: any) {
    return this.http.post<Bellotas>(
      `${this.url}/bellotas`,
      body,
      this.requestOptions
    );
  }
}
