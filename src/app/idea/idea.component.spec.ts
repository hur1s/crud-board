import { ComponentFixture, TestBed } from '@angular/core/testing';
import { createMockIdea } from '../helpers/test-helpers';

import { IdeaComponent } from './idea.component';
import { IdeaComponentService } from './services/idea-component.service';

describe('IdeaComponent', () => {
  let component: IdeaComponent;
  let service: IdeaComponentService;
  let fixture: ComponentFixture<IdeaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IdeaComponent],
      providers: [
        {
          provide: IdeaComponentService,
          useValue: {
            updateIdea: () => Promise.resolve(),
            deleteIdea: () => Promise.resolve(),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeaComponent);
    service = TestBed.inject(IdeaComponentService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the IdeaComponentService to update an idea', async () => {
    const spy = spyOn(service, 'updateIdea');
    component.model = createMockIdea(
      'id1234',
      'AAA Title',
      new Date(2018, 12, 1)
    );

    await component.saveIdea();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      id: component.id,
      title: component.title,
      description: component.description,
    });
  });
});
