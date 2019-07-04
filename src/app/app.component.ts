import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from './services/shared/loader.service';
import { Subscription } from 'rxjs';
import { LoaderState } from './services/shared/loader-state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy  {
    show = false;
    private subscription: Subscription;
    constructor(private loaderService: LoaderService) { }
    ngOnInit() {
        this.subscription = this.loaderService.loaderState
            .subscribe((state: LoaderState) => {
                this.show = state.show;
            });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
