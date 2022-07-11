export interface iPage  {
    getParams?:  (match:any) => any;
    render: () => Promise<string>;
    initDomEvents?: Function;
}

export interface IListOfAllResponse {
    message: {
      [key: string]: string[];
    };
  }


export interface iMathc {
    
    route: iRoutes,
    result:string;
}

export interface iRoutes {
    path:string,
    view: iPage
}