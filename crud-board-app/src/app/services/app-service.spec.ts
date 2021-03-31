import { AppService } from './app-service';
import { IdeaState } from '../models/idea-state';
import { take } from 'rxjs/operators';
import { Idea } from '../models/idea';
import { hot, cold } from 'jasmine-marbles';

describe('AppService', () => {
  let service: AppService;

  beforeEach(() => {
    service = new AppService();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should add new idea', async () => {
    // TODO use marbles to test observables
    await service.addNewIdea();
    const ideas = await service.getIdeas().pipe(take(1)).toPromise();

    expect(ideas.length).toEqual(1);
    expect(ideas).toEqual(
      jasmine.arrayContaining([
        jasmine.objectContaining({
          title: '',
          description: '',
          state: IdeaState.Added,
        }),
      ])
    );

    const newIdea = {
      title: 'xx',
      description: 'yy',
      created: new Date(),
      lastUpdated: new Date(),
      id: 'id1',
      state: IdeaState.Added,
    };
    (service as any)._ideasCache.set(newIdea.id, newIdea);

    // const expected = cold('a', {
    //   a: jasmine.arrayContaining([
    //     jasmine.objectContaining({
    //       title: '',
    //       description: '',
    //       state: IdeaState.Added,
    //     }),
    //   ]),
    // });

    // await service.addNewIdea();
    // expect(service.getIdeas()).toBeObservable(expected);
  });

  describe('with existing ideas', () => {
    let idea1: Idea;
    let idea2: Idea;

    beforeEach(async () => {
      await service.addNewIdea();
      await service.addNewIdea();
      const ideas = await service.getIdeas().pipe(take(1)).toPromise();
      idea1 = ideas[0];
      idea2 = ideas[1];
    });

    it('updates an idea title', async () => {
      await service.updateIdea({ ...idea1, title: 'New title' });
      const ideas = await service.getIdeas().pipe(take(1)).toPromise();
      expect(ideas.length).toEqual(2);
      expect(ideas).toEqual(
        jasmine.arrayContaining([
          jasmine.objectContaining({
            title: 'New title',
            state: IdeaState.Updated,
          }),
        ])
      );
    });

    it('updates an idea description', async () => {
      await service.updateIdea({ ...idea1, description: 'New description' });
      const ideas = await service.getIdeas().pipe(take(1)).toPromise();
      expect(ideas.length).toEqual(2);
      expect(ideas).toEqual(
        jasmine.arrayContaining([
          jasmine.objectContaining({
            description: 'New description',
            state: IdeaState.Updated,
          }),
        ])
      );
    });

    it('deletes an idea', async () => {
      await service.deleteIdea(idea1.id);
      const ideas = await service.getIdeas().pipe(take(1)).toPromise();
      expect(ideas.length).toEqual(1);
      expect(ideas[0]).toEqual(idea2);
    });
  });
});
