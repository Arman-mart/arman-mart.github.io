export interface IListOfAllResponse {
    message: {
      [key: string]: string[];
    };
  }

export const enum PageIds {
    MainPage = 'main-page',
    SecondPage = 'second-page',
    ThirdPage = 'third-page',
  }
