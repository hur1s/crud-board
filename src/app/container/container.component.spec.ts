import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerComponent } from './container.component';
import { ContainerComponentService } from './services/container-component.service';

describe('ContainerComponent', () => {
  let component: ContainerComponent;
  let fixture: ComponentFixture<ContainerComponent>;
  let service: ContainerComponentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContainerComponent],
      providers: [
        {
          provide: ContainerComponentService,
          useValue: { start: () => {}, addNewIdea: () => Promise.resolve() },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerComponent);
    service = TestBed.inject(ContainerComponentService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the ContainerComponentService to add a new idea', async () => {
    const spy = spyOn(service, 'addNewIdea');
    component.addIdea();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
