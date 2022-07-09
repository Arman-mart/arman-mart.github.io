import                   '../../src/style.css'
import Footer           from './common/footer'
import { routes }       from './tools/helpers'
import { viewElements } from './tools/helpers'

const pathToRegex = (path:string) => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const navigateTo = (url:string) => {
    history.pushState(null, url);
    router();
};


const router = async () => {  
    viewElements.footer.innerHTML = await Footer.render();
    console.log(routes)

    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: window.location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);
    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }

    viewElements.content.innerHTML = await match.route.view.render();
    const dogs = document.querySelectorAll('.card-inner');
    console.log(dogs);

    dogs.forEach(element => {
        element.addEventListener('click', e => {
            const el = e.currentTarget as HTMLElement;
            console.log(el.childNodes)
        })
    });

}

// window.addEventListener('popstate', router);
router();