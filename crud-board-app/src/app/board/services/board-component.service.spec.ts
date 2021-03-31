import { createAppServiceMock } from "../../services/app-service.mock";
import { AppService } from "../../services/app-service";
import { BoardComponentService } from "./board-component.service";
import { cold } from "jasmine-marbles";
import { createMockIdea } from "../../helpers/test-helpers";

describe('BoardComponentService', () => {
    let service: BoardComponentService;
    let appService: AppService;
    const idea1 = createMockIdea('id1234', 'AAA Title', new Date(2018, 12, 1));
    const idea2 = createMockIdea('idabcd', 'TTT Title', new Date(2019, 7, 1));
    const idea3 = createMockIdea('id9876', 'ZZZ Title', new Date(2021, 3, 1));

    let mockIdeas = [
        idea1, idea2, idea3      
    ];

    beforeEach(() => {
        appService = createAppServiceMock();
        service = new BoardComponentService(appService);
    });

    it('should create the service', () => {
        expect(service).toBeTruthy();
    });

    it('should request idea items from appService', () => {
        const spy = spyOn(appService, 'getIdeas');
        const ideasStream = service.ideas;
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should receive items and sort by date created', () => {
        appService.getIdeas = () => cold('a', {a: mockIdeas});
        const expected = cold('a', {a: [idea3, idea2, idea1]});
        expect(service.ideas).toBeObservable(expected);
    });

    it('should receive items and sort by title', () => {
        appService.getIdeas = () => cold('a', {a: mockIdeas});
        service.setSortBy('Title');
        const expected = cold('a', {a: [idea1, idea2, idea3]});
        expect(service.ideas).toBeObservable(expected);
    });
});