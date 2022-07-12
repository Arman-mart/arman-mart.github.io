export interface iPage {
  getParams ? : (match: any) => any;
  render: (params: iParams) => Promise < string > ;
  initDomEvents ? : Function;
}

export interface IListOfAllResponse {
  message: {
      [key: string]: string[];
  };
}


export interface iParams {
  type: string,
  subtype: string
}


export interface iRoutes {
  path: string,
  view: iPage
}