import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Reservation {
    id: number;
    carId: number;
    from: string;
    to: string;
    clientName: string;
}

@Injectable()
export class ReservationsService {
    private reservationsUrl = './assets/json_files/reservations.json';

    constructor(private http: HttpClient) { }

    public getReservations(): Observable<any> {
        return this.http.get(this.reservationsUrl);
    }

    // other functions here setter etc..
}
