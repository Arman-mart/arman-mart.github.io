import Footer           from './common/footer'
import { routes }       from './tools/helpers'
import { viewElements } from './tools/helpers'
import { iParams }      from './tools/types'
import                       '../../src/style.css'

const pathToRegex = (path: string) => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const router = async () => {
    const getParams = (match: any) => {
        const values = match.result?.slice(1);
        const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map((result: any) => result[1]);

        return Object.fromEntries(keys.map((key, i) => {
            return [key, values[i]];
        }));
    };

    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: window.location.pathname.match(pathToRegex(route.path))
        };
    });

    let match: any = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }
    
    const params: iParams = getParams(match);
    viewElements.content.innerHTML = await match.route.view.render(params);
    viewElements.footer.innerHTML = await Footer.render(params);


    if (match.route.view.initDomEvents) {
        match.route.view.initDomEvents(params);
    }


}

window.addEventListener('popstate', router);
router();