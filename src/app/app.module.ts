import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { StarshipCalcComponent } from './pages/starship-calc/startship-calc.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderInterceptorService } from './services/shared/loader-interceptor.service';

const appRoutes: Routes = [
    { path: 'starship-calc', component: StarshipCalcComponent },
    { path: '', redirectTo: '/starship-calc', pathMatch: 'full' }
];

@NgModule({
    declarations: [
        AppComponent,
        StarshipCalcComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MDBBootstrapModule.forRoot(),
        RouterModule.forRoot(appRoutes),
        HttpClientModule
    ],
    providers: [
        { provide: 'BASE_URL', useFactory: getBaseUrl },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoaderInterceptorService,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

export function getBaseUrl() {
    return 'https://swapi.co/api/';
}