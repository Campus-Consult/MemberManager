import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MemberStatusDetailsComponent } from './member-status-details.component';

fdescribe('MemberStatusDetailsComponent', () => {
  let component: MemberStatusDetailsComponent;
  let fixture: ComponentFixture<MemberStatusDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MemberStatusDetailsComponent],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberStatusDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
