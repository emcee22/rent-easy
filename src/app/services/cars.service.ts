import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Car {
    id: number;
    carType: string;
    plateNumber: string;
    pricePerHour: number;
}

@Injectable()
export class CarsService {
    private carsUrl = './assets/json_files/cars.json';

    constructor(private http: HttpClient) { }

    public getCars(): Observable<any> {
        return this.http.get(this.carsUrl);
    }

    // other functions here setter etc..
}
