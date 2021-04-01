import { createAppServiceMock } from "../../services/app-service.mock";
import { AppService } from "../../services/app-service";
import { IdeaComponentService } from "./idea-component.service";

describe('IdeaComponentService', () => {
    let service: IdeaComponentService;
    let appService: AppService;

    beforeEach(() => {
        appService = createAppServiceMock();
        service = new IdeaComponentService(appService);
    });

    it('should create the service', () => {
        expect(service).toBeTruthy();
    });

    it('should call AppService when updateIdea is called', async () => {
        const spy = spyOn(appService, 'updateIdea');
        const request = {
            id: 'xx',
            title: '',
            description: 'yy',
        };

        service.updateIdea(request);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(request);
    });

    it('should call AppService when deleteIdea is called', async () => {
        const spy = spyOn(appService, 'deleteIdea');
        const request = 'xyz';

        service.deleteIdea(request);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(request);
    });
});