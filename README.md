# CrudBoardApp

This project was created with Angular version 11.2.6.

https://hur1s.github.io/crud-board

## Completed

- Page is responsive (Tested in Chrome)

- Each idea has a title, description (that is editable) and created/updated time

- New ideas have the title input focused, ready for the user to start typing

- Ability to sort the ideas by creation date or the title alphabetically

- Added a character countdown limit when the user is approaching the limit of the description text

## Assumptions

- Sorting by Date Created shows latest first (top).

- Sorting alphabetically is by Title and is ascending. Ideas with empty titles appear first (top).

## TODO

- Saving title/description changes with Enter keypress

- Implement saving / retrieving to / from local storage in App-service.ts. Saved ideas pushed into RXJS stream on load (if they exist)

- Notify when a new idea has been updated (flash the idea, or display a toast popup)

- Install Prettier

- Complete unit test coverage (Utilise marbles for observable testing)

- Implement E2E tests

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

`ng build --prod=true --baseHref=/crud-board/`

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
