import {async, ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {CoursesCardListComponent} from './courses-card-list.component';
import {CoursesModule} from '../courses.module';
import {COURSES} from '../../../../server/db-data';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {sortCoursesBySeqNo} from '../home/sort-course-by-seq';
import {Course} from '../model/course';
import {setupCourses} from '../common/setup-test-data';
import { title } from 'process';




describe('CoursesCardListComponent', () => {

  let component : CoursesCardListComponent;
  let fixture: ComponentFixture<CoursesCardListComponent>;
  let el: DebugElement;//pour avoir le dom
  beforeEach(waitForAsync(() => {//pour forcer before each a se terminer avt d'excec le(s) it
    TestBed.configureTestingModule({
      imports: [
        CoursesModule //il va importer toutes les composant de ce module
      ]
    }).compileComponents().then(()=> {
      fixture = TestBed.createComponent(CoursesCardListComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
    });
  }))

  it("should create the component", () => {
    expect(component).toBeTruthy();

  });


  it("should display the course list", () => {
    component.courses = setupCourses();
    fixture.detectChanges();//pour dire que le component a de nouveaux elemts ici liste de courses
    //console.log(el.nativeElement.outerHTML);//va afficher dans le console du html avec des div
    const cards = el.queryAll(By.css('.course-card'));
    expect(cards).toBeTruthy('Could not find cards');
    expect(cards.length).toBe(12);
  });


  it("should display the first course", () => {
    component.courses = setupCourses();
    fixture.detectChanges();
    const course = component.courses[0];
    const card = el.query(By.css('.course-card:first-child')),
    image = card.query(By.css('img')),
    title = card.query(By.css('mat-card-title'));
    expect(card).toBeTruthy();
    expect(title.nativeElement.textContent).toBe(course.titles.description);
    expect(image.nativeElement.src).toBe(course.iconUrl);
  });


});


