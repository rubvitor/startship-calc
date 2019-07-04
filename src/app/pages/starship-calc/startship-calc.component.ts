import { Component, OnInit } from '@angular/core';
import { StarshipService } from 'src/app/services/starship.service';
import { Starship } from 'src/app/models/Startship';
import { StarshipCalc } from 'src/app/models/StartshipCalc';

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
                    
                    this.starshipsList.forEach((starship) => {
                        const stops = calculateStops(starship.MGLT, starship.consumables);
                        this.starshipsCalcList.push({ name: starship.name, stops: stops });
                    });

                    this.starshipsCalcList = this.starshipsCalcList.sort(a, b) {
                        if (a.name > b.name) {
                            return 1;
                        }
                        else if (a.name < b.name) {
                            return -1;
                        }

                        return 0;
                    });
                }
            },
            (err) => { alert(err); }
        );
    }

    calculate() {
        this.getAll();
    }

    calculateStops(mgltStar, consumables) : number {
        const consumableSplit: string[] = consumables.split(' ');
        const period: string = consumableSplit[1];
        const numPeriod: string = consumableSpli[0];
        const hoursCalc: number = 0;
        const stops: number = 0;

        switch (period) {
            case 'year':
            case 'years':
                hoursCalc = parseInt(numPeriod) * 365 * 24;
                break;
            case 'month'
            case 'mounths'
                hoursCalc = parseInt(numPeriod) * 30 * 24;
                break;
            case 'day'
            case 'days'
                hoursCalc = parseInt(numPeriod) * 24;
                break;
            case 'hour'
            case 'hours'
                hoursCalc = parseInt(numPeriod);
                break;
        }

        stops = (this.mglt / mgltStar) / hoursCalc;
        return stops;
    }
}
