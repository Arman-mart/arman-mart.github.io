import '../../src/style.css'

import Main         from './pages/mainPage'
import Second       from './pages/secondPage'
import Third        from './pages/thirdPage'
import Error404     from './common/errorPage'
import Header       from './common/header';
import Footer       from './common/footer'
import Utils        from '../library/tools/utils';


const routes: { [key: string]: any } = {
    '/' : Main,
    '/second' : Second,
    '/third' : Third
}
const router = async () => {
    // Load view elements
    const header = document.getElementById('header_container')      as HTMLElement;
    const content = document.getElementById('page_container')       as HTMLElement;
    const footer = document.getElementById('footer_container')      as HTMLElement;

    // Render the Header and footer of the page
    header.innerHTML =  await Header.redner();
    footer.innerHTML = await Footer.render();

    // Get the parsed URl from the addressbar
    const request = Utils.parseRequestURL();
    const parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')

    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page

     const page = routes[parsedURL] ? routes[parsedURL] : Error404
    content.innerHTML =  await page.render();
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
