import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Config {
  heroesUrl: string;
  textfile: string;
  date: any;
}

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) {}

  getConfig() {
    return this.http.get<Config>(
      'https://prog3.nhorenstein.com/api/geolocalizacion/GetMarcadores'
    );
  }
}
