import Header           from "../common/header";
import { iPage }        from "../tools/types";
import { iMathc }       from "../tools/types";
import { viewElements } from "../tools/helpers";


const getSubBreedList = async () => {
    // const response = await fetch(`https://dog.ceo/api/breed/${}/${dogSubBreedName}/images/random`)
}

const Second: iPage = {

   getParams: (match: iMathc ) => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
},


  render: async () => {
    viewElements.header.innerHTML =  await Header.redner('Second page', 'Random sub-breed images');
    const posts = await getSubBreedList();
    const content = `
            <div>
                
            </div>
        `;
    return content;
  },
};

export default Second;
