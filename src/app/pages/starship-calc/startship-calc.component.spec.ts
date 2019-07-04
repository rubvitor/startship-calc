import { TestBed, async } from '@angular/core/testing';
import { StarshipComponent } from './app.component';

describe('StarshipComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StarshipComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(StarshipComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-bootstrap-md-app'`, () => {
    const fixture = TestBed.createComponent(StarshipComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('angular-bootstrap-md-app');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(StarshipComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to angular-bootstrap-md-app!');
  });
});
