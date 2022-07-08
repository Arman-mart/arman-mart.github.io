import { iPage }        from "../tools/types"; 
import Header           from "../common/header";
import { iMathc }       from "../tools/types";
import { viewElements } from "../tools/helpers";

const Third: iPage = {

   getParams : (match: iMathc ) => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
  },

  render: async () => {
    viewElements.header.innerHTML =  await Header.redner('Third Page', 'Random Dogs');
    const content = `
            <div>Third Page</div>
        `;
    return content;
  },
};


export default Third;
