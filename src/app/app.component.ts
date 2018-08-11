import { Component, OnInit, ElementRef, AfterViewChecked } from '@angular/core';
import { Reservation, ReservationsService } from './services/reservations.service';
import { Car, CarsService } from './services/cars.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked {

    public title: String = 'Browse Reservations';
    public days: Array<any> = [];
    public cars: Array<Car> = [];
    public reservations: Array<Reservation> = [];
    public scrolling: Boolean = false;
    public timer;

    constructor(
        private reservationsService: ReservationsService,
        private carsService: CarsService,
        private elRef: ElementRef) {
        // fill days
        this.fillDays();
    }

    ngOnInit() {
        // retrieve reservations in the main component
        this.reservationsService.getReservations().subscribe(data => {
            this.reservations = data;
        });

        // retrieve cars in the main component
        this.carsService.getCars().subscribe(data => {
            this.cars = data;
        });

        // call the syncScroll function
        this.syncScroll(
            this.elRef.nativeElement.querySelector('.browse__cars__list'),
            this.elRef.nativeElement.querySelector('.browse__reservations__content'));

        this.syncScroll(
            this.elRef.nativeElement.querySelector('.browse__reservations__content'),
            this.elRef.nativeElement.querySelector('.browse__cars__list'));
    }

    // We check if we have the data into the template so that we populate with reservations
    ngAfterViewChecked() {
        const domElems = this.elRef.nativeElement.querySelectorAll('.browse__reservations__content__item');
        if (domElems.length) {
            this.reservations.forEach((rez) => {
                // gathered data from the response
                const currentCar = this.cars.filter(car => car.id === rez.carId);
                const domEl = this.elRef.nativeElement.querySelector(`.browse__reservations__content__item[data-carid="${rez.carId}"]`);
                const from = new Date(rez.from).getDate();
                const to = new Date(rez.to).getDate();

                // we attach to the created element
                const price = (to - from + 1) * 24 * currentCar[0].pricePerHour;
                const marginLeft = (from - 1) * 21;
                const width = (to - from + 1) * 20;

                // insert the reservation in the dom
                domEl.insertAdjacentHTML('afterbegin', `<div title="${price}$ ${rez.clientName}"
                style="margin-left: ${marginLeft}px; width: ${width}px;"
                class="browse__reservations__content__item__rez">
                ${price}$ ${rez.clientName}</div>`);
            });
        }
    }

    public fillDays() {
        this.days = [];
        for (let i = 1; i <= 31; i++) {
            this.days.push(i);
        }
    }

    // scroll left/right
    public scrollReservations(ev, direction) {
        ev.preventDefault();

        const elementNav = this.elRef.nativeElement.querySelector('.browse__reservations__header__day-navigator');
        const elementRez = this.elRef.nativeElement.querySelector('.browse__reservations__content');

        if (direction === 'left') {
            elementNav.scrollLeft -= 21;
            elementRez.scrollLeft -= 21;
        } else {
            elementNav.scrollLeft += 21;
            elementRez.scrollLeft += 21;
        }
    }

    // sync scrolling on the two containers (cars + rezervations)
    public syncScroll(el1, el2): void {
        el1.addEventListener('scroll', () => {
            const ignore = this.scrolling;
            this.scrolling = false;
            if (ignore) { return; }

            this.scrolling = true;
            el2.scrollTop = el1.scrollTop;
        });
    }
}
