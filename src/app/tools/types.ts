export interface iPage  {
    getParams?:  (match:any) => any;
    render: () => Promise<string>
}

export interface IListOfAllResponse {
    message: {
      [key: string]: string;
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