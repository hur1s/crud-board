import { of } from "rxjs"
import { AppService } from "./app-service"

export const createAppServiceMock = () => {
    const mock: Partial<AppService> = {
        getIdeas: () => of([]),
        addNewIdea: () => Promise.resolve(),
        updateIdea: () => Promise.resolve(),
        deleteIdea: () => Promise.resolve(),
    }

    return mock as AppService;
}