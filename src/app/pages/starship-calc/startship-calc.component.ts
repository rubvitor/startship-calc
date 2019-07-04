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
                    let starshipsCalcListTemp: StarshipCalc[] = [];
                    let mgtlTemp = this.mglt;

                    this.starshipsList.forEach(function (starship) {
                        const stops = parseInt(String(mgtlTemp / starship.MGLT));
                        starshipsCalcListTemp.push({ name: starship.name, stops: stops });
                    });

                    this.starshipsCalcList = starshipsCalcListTemp.sort(function (a, b) {
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
}
