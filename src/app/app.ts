import Footer           from './common/footer'
import { routes }       from './tools/helpers'
import { viewElements } from './tools/helpers'

import '../../src/style.css'

const pathToRegex = (path: string) => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const router = async () => {
    viewElements.footer.innerHTML = await Footer.render();
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
    
    if (match.route.view.initDomEvents) {
        match.route.view.initDomEvents();
    }
}

window.addEventListener('popstate', router);
router();  