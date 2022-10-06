import { async, ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { CoursesModule } from '../courses.module';
import { DebugElement } from '@angular/core';

import { HomeComponent } from './home.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CoursesService } from '../services/courses.service';
import { HttpClient } from '@angular/common/http';
import { COURSES } from '../../../../server/db-data';
import { setupCourses } from '../common/setup-test-data';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { click } from '../common/test-utils';




describe('HomeComponent', () => {

  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let el: DebugElement;
  let coursesservice: any;
  const begginerCourses = setupCourses().filter(course => course.category == 'BEGINNER');
  const advancedCourses = setupCourses().filter(course => course.category == 'ADVANCED');

  beforeEach(waitForAsync(() => {
    const courseServiceJasmine = jasmine.createSpyObj('CoursesService', ['findAllCourses']);
    TestBed.configureTestingModule({
      imports: [CoursesModule, NoopAnimationsModule],
      providers: [{ provide: CoursesService, useValue: courseServiceJasmine }]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      coursesservice = TestBed.inject(CoursesService);
    });

  }));

  it("should create the component", () => {

    expect(component).toBeTruthy();

  });


  it("should display only beginner courses", () => {
    coursesservice.findAllCourses.and.returnValue(of(begginerCourses));
    //le of permet de retournet son param immédiatement au lieu d'etre un observable
    fixture.detectChanges();
    const tabs = el.queryAll(By.css('.mat-tab-label'));
    expect(tabs.length).toBe(1);
  });


  it("should display only advanced courses", () => {
    coursesservice.findAllCourses.and.returnValue(of(advancedCourses));
    //le of permet de retournet son param immédiatement au lieu d'etre un observable
    fixture.detectChanges();
    const tabs = el.queryAll(By.css('.mat-tab-label'));
    expect(tabs.length).toBe(1);

  });


  it("should display both tabs", () => {
    coursesservice.findAllCourses.and.returnValue(of(setupCourses()));
    //le of permet de retournet son param immédiatement au lieu d'etre un observable
    fixture.detectChanges();
    const tabs = el.queryAll(By.css('.mat-tab-label'));
    expect(tabs.length).toBe(2);

  });


  it("should display advanced courses when tab clicked", fakeAsync(() => {
    coursesservice.findAllCourses.and.returnValue(of(setupCourses()));
    fixture.detectChanges();
    const tabs = el.queryAll(By.css('.mat-tab-label'));
    el.nativeElement.click(tabs[1]);
    //click(tabs[1]);
    console.log(tabs[0].nativeElement.textContent);
    console.log('------------------------------------');

    console.log(tabs[1].nativeElement.textContent);

    fixture.detectChanges();
    flush();
    const cardTitles = el.queryAll(By.css('.mat-card-title'));
    expect(cardTitles.length).toBeGreaterThan(0);
    console.log(cardTitles[0].nativeElement.textContent);

    //expect(cardTitles[0].nativeElement.textContent).toContain('Angular Security Course');
  }));

  it("should display advanced courses when tab clicked - waitForAsync", waitForAsync(() => {
    coursesservice.findAllCourses.and.returnValue(of(setupCourses()));
    fixture.detectChanges();
    const tabs = el.queryAll(By.css('.mat-tab-label'));
    //el.nativeElement.click(tabs[1]);
    click(tabs[1]);
    console.log(tabs[0].nativeElement.textContent);
    console.log('------------------------------------');

    console.log(tabs[1].nativeElement.textContent);

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const cardTitles = el.queryAll(By.css('.mat-card-title'));
      expect(cardTitles.length).toBeGreaterThan(0);
      console.log(cardTitles[0].nativeElement.textContent);

      //expect(cardTitles[0].nativeElement.textContent).toContain('Angular Security Course');
    })

  }));

});


