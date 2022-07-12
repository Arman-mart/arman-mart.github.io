import Footer           from './common/footer'
import { routes }       from './tools/helpers'
import { viewElements } from './tools/helpers'
import '../../src/style.css'

const pathToRegex = (path: string) => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const router = async () => {

    const getParams =  (match:any) => {
        const values = match.result.slice(1);
        const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map((result:any) => result[1]);
    
        return Object.fromEntries(keys.map((key, i) => {
            return [key, values[i]];
        }));
      };

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
    const params = getParams(match);
    viewElements.content.innerHTML = await match.route.view.render(params);

    
    if (match.route.view.initDomEvents) {
        match.route.view.initDomEvents(params);
    }

    console.log(getParams(match));

}

window.addEventListener('popstate', router);
router();  