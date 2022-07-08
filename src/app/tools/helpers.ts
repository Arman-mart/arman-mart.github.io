import Main         from "../pages/mainPage"
import Second       from "../pages/secondPage"
import Third        from "../pages/thirdPage"
import Error404     from '../common/errorPage';
import { iRoutes }  from "./types";


export const routes: iRoutes[] = [
    {path:`/404`, view: Error404},
    {path: `/`, view: Main},
    {path:`/types/:type`, view: Second},
    {path:`/random/:type`, view: Third},
    {path:`/random/:type/:sub-type`, view: Third}
]


export const viewElements: {[key:string]:HTMLElement} =  {
     header:  document.getElementById('header_container') as HTMLElement,
     content: document.getElementById('page_container') as HTMLElement,
     footer : document.getElementById('footer_container') as HTMLElement,
}