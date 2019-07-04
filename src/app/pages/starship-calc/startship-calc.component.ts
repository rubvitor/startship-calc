import { Component, OnInit } from '@angular/core';
import { StarshipService } from 'src/app/services/starship.service';
import { Starship } from 'src/app/models/Startship';
import { StarshipCalc } from 'src/app/models/StartshipCalc';

@Component({
    selector: 'app-startship-calc',
    templateUrl: './startship-calc.component.html',
    styleUrls: ['./startship-calc.component.scss']
})
export class StarshipCalcComponent implements OnInit {

    starshipsList: Starship[];
    starshipsCalcList: StarshipCalc[];
    mglt: number;

    columnStopAsc = false;
    columnNameAsc = false;

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
                        this.starshipsCalcList.push({ name: starship.name, stops: stops });
                    });

                    this.columnStopAsc = false;
                    this.columnNameAsc = false;

                    this.sortBy('stops');
                }
            },
            error => {
                alert(error);
            });
    }

    calculate(event?: any, value?: number) {
        if (!event || event.keyCode === 13) {
            this.getAll();
        }
    }

    sortBy(column: string) {
        let asc = true;
        switch (column) {
            case 'stops':
                this.columnStopAsc = !this.columnStopAsc;
                asc = this.columnStopAsc;

                this.starshipsCalcList = this.starshipsCalcList.sort(function (a, b) {
                    if (a.stops > b.stops) {
                        return asc ? 1 : -1;
                    } else if (a.stops < b.stops) {
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
                    } else if (a.name < b.name) {
                        return asc ? -1 : 1;
                    }

                    return 0;
                });
                break;
        }
    }

    calculateStops(mgltStar: number, consumables: string): number {
        const consumableSplit: string[] = consumables.split(' ');
        const period: string = consumableSplit[1];
        const numPeriod: number = parseInt(consumableSplit[0]);
        let hoursCalc = 0;
        let stops = 0;

        if (this.mglt <= Number(mgltStar)) {
            return 0;
        }

        switch (period) {
            case 'year':
            case 'years':
                hoursCalc = numPeriod * 365 * 24;
                break;
            case 'month':
            case 'months':
                hoursCalc = numPeriod * 30 * 24;
                break;
            case 'week':
            case 'weeks':
                hoursCalc = numPeriod * 168;
                break;
            case 'day':
            case 'days':
                hoursCalc = numPeriod * 24;
                break;
            case 'hour':
            case 'hours':
                hoursCalc = numPeriod;
                break;
        }

        const timeMgltHour = parseInt((this.mglt / mgltStar).toString());
        if (hoursCalc >= timeMgltHour) {
            return 0;
        }

        stops = parseInt((timeMgltHour / hoursCalc).toString());
        return stops;
    }
}
