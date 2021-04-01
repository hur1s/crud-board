import { AppService } from "../../services/app-service";
import { createAppServiceMock } from "../../services/app-service.mock";
import { ContainerComponentService } from "./container-component.service";

describe('ContainerComponentService', () => {
    let service: ContainerComponentService;
    let appService: AppService;

    beforeEach(() => {
        appService = createAppServiceMock();
        service = new ContainerComponentService(appService);
    });

    it('should create the service', () => {
        expect(service).toBeTruthy();
    });

    it('should call AppService when addNewIdea is called', async () => {
        const spy = spyOn(appService, 'addNewIdea');

        service.addNewIdea();

        expect(spy).toHaveBeenCalledTimes(1);
    });
});