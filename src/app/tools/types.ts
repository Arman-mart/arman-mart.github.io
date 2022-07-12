export interface iPage  {
    getParams?:  (match:any) => any;
    render: (params?:any) => Promise<string>;
    initDomEvents?: Function;
}

export interface IListOfAllResponse {
    message: {
      [key: string]: string[];
    };
  }


export interface iMathc {
  route: iRoutes;
  result: RegExpMatchArray | null
}

export interface iRoutes {
    path:string,
    view: iPage
}