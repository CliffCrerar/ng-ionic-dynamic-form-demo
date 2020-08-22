import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeDisplayComponent } from './code-display.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpService} from '../dynamic-form/http.service';

describe('CodeDisplayComponent', () => {
  let component: CodeDisplayComponent;
  let fixture: ComponentFixture<CodeDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeDisplayComponent ],
      imports: [HttpClientTestingModule],
      providers: [HttpService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.inject(HttpService);
    fixture = TestBed.createComponent(CodeDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
