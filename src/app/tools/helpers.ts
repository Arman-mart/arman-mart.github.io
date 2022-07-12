import Main           from "../pages/mainPage"
import Subtypes       from "../pages/subtypes"
import SubTypeRandom  from "../pages/subTypeRandom"
import subTypeImages from "../pages/subTypeimages";
import Error404       from '../common/errorPage';
import { iRoutes }    from "./types";

const ROUTES = {
    list: {
        path: '/',
        
    },
    notFound: {
        path: '/404',
    },
    subTypes: {
        path: '/types/:type',
    },
    typeRandom: {
        path: '/random/:type',
    },
    subTypeRandom: {
        path: '/random/:type/:subtype',

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
         view: Subtypes
    },

    {
        path: ROUTES.subTypeRandom.path,
        view: SubTypeRandom
    },

    {
        path: ROUTES.typeRandom.path,
        view: subTypeImages
    },
];

export const viewElements: {[key:string]:HTMLElement} =  {
     header:  document.getElementById('header_container') as HTMLElement,
     content: document.getElementById('page_container') as HTMLElement,
     footer : document.getElementById('footer_container') as HTMLElement,
}

export const navigateTo = (url: string) => {
    history.pushState(null,'', url);
    window.dispatchEvent(new Event('popstate'));
};
