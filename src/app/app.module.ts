import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// import components
import { AppComponent } from './app.component';

// import providers (services)
import { ReservationsService } from './services/reservations.service';
import { CarsService } from './services/cars.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    providers: [ReservationsService, CarsService],
    bootstrap: [AppComponent]
})
export class AppModule { }
