import { Component, OnInit } from '@angular/core';
import { StarshipService } from 'src/app/services/starship.service';
import { Starship } from 'src/app/models/Startship';
import { StarshipCalc } from 'src/app/models/StartshipCalc';
import { debug } from 'util';

@Component({
    selector: 'startship-calc-app',
    templateUrl: './startship-calc.component.html',
    styleUrls: ['./startship-calc.component.scss']
})
export class StarshipCalcComponent implements OnInit {

    starshipsList: Starship[];
    starshipsCalcList: StarshipCalc[];
    mglt: number;

    constructor(private starshipService: StarshipService) {

    }

    ngOnInit(): void {

    }

    getAll() {
        this.starshipService.GetAll().subscribe(
            (res) => {
                this.starshipsList = res.results;
                if (this.starshipsList && this.starshipsList.length > 0) {
                    this.starshipsCalcList = [];
                    this.starshipsList.forEach((starship) => {
                        const stops = this.calculateStops(starship.MGLT, starship.consumables);
                        console.log(stops);
                        this.starshipsCalcList.push({ name: starship.name, stops: stops });
                    });

                    this.sortBy('stops');
                }
            },
            error => {
                alert(error);
            });
    }

    calculate(event?) {
        if (!event || (event.keyCode === 13 && event.shiftKey)) {
            this.getAll();
        }
    }

    columnStopAsc: boolean = false;
    columnNameAsc: boolean = false;

    sortBy(column: string) {
        let asc: boolean = true;
        switch (column) {
            case 'stops':
                this.columnStopAsc = !this.columnStopAsc;
                asc = this.columnStopAsc;

                this.starshipsCalcList = this.starshipsCalcList.sort(function (a, b) {
                    if (a.stops > b.stops) {
                        return asc? 1 : -1;
                    }
                    else if (a.stops < b.stops) {
                        return asc ? -1 : 1;
                    }

                    return 0;
                });
                break;
            case 'name':
                this.columnNameAsc = !this.columnNameAsc;
                asc = this.columnNameAsc;

                this.starshipsCalcList = this.starshipsCalcList.sort(function (a, b) {
                    if (a.name > b.name) {
                        return asc ? 1 : -1;
                    }
                    else if (a.name < b.name) {
                        return asc ? -1 : 1;
                    }

                    return 0;
                });
                break;
        }
    }

    calculateStops(mgltStar, consumables): number {
        const consumableSplit: string[] = consumables.split(' ');
        const period: string = consumableSplit[1];
        const numPeriod: string = consumableSplit[0];
        let hoursCalc: number = 0;
        let stops: number = 0;

        if (this.mglt <= mgltStar)
            return 0;

        switch (period) {
            case 'year':
            case 'years':
                hoursCalc = parseInt(numPeriod) * 365 * 24;
                break;
            case 'month':
            case 'months':
                hoursCalc = parseInt(numPeriod) * 30 * 24;
                break;
            case 'week':
            case 'weeks':
                hoursCalc = parseInt(numPeriod) * 168;
                break;
            case 'day':
            case 'days':
                hoursCalc = parseInt(numPeriod) * 24;
                break;
            case 'hour':
            case 'hours':
                hoursCalc = parseInt(numPeriod);
                break;
        }

        const timeMgltHour = parseInt((this.mglt / mgltStar).toString());
        if (hoursCalc >= timeMgltHour)
            return 0;

        stops = parseInt((timeMgltHour / hoursCalc).toString());
        return stops;
    }
}
