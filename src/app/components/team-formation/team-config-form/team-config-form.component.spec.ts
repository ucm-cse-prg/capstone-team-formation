import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamConfigFormComponent } from './team-config-form.component';

describe('TeamConfigFormComponent', () => {
  let component: TeamConfigFormComponent;
  let fixture: ComponentFixture<TeamConfigFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamConfigFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamConfigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
