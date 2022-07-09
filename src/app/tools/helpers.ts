import Main         from "../pages/mainPage"
import Second       from "../pages/secondPage"
import Third        from "../pages/thirdPage"
import Error404     from '../common/errorPage';
import { iRoutes }  from "./types";

const ROUTES = {
    list: {
        path: '/',
    },
    notFound: {
        path: '/404',
    },
    subTypes: {
        path: '/types/:type',
        getFullPath: function(type: string) {
            this.path.replace(':type', type);
        }
    },
    typeRandom: {
        path: '/random/:type',
        getFullPath: function(type: string) {
            this.path.replace(':type', type);
        }
    },
    subTypeRandom: {
        path: '/random/:type/:sub-type',
        getFullPath: function(type: string, subType: string) {
            this.path.replace(':type', type).replace(':sub-type', subType);
        }
    },
}

export const routes: iRoutes[] = [
    {
        path: ROUTES.notFound.path,
        view: Error404,
    },
    {
        path: ROUTES.list.path,
         view: Main},
    {
        path: ROUTES.subTypes.path,
         view: Second
    },
    {
        path: ROUTES.subTypeRandom.path,
        view: Third
    },
    {
        path: '/404',
         view: Error404
    },
];

export const viewElements: {[key:string]:HTMLElement} =  {
     header:  document.getElementById('header_container') as HTMLElement,
     content: document.getElementById('page_container') as HTMLElement,
     footer : document.getElementById('footer_container') as HTMLElement,
}