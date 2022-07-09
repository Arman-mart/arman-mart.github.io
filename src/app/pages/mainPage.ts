import Header                 from "../common/header";
import { iMathc }             from "../tools/types";
import { iPage }              from "../tools/types";
import { viewElements }       from "../tools/helpers";
import { IListOfAllResponse } from "../tools/types";


const getBreedList = async () => {
  const response = await fetch("https://dog.ceo/api/breeds/list/all");
  const data: IListOfAllResponse = await response.json();
  const { message } = data;
  console.log(message);
  const nameOfBreed = Object.keys(message);
  const dogArray = nameOfBreed.map((nameOfBreed) => {
    return fetch(`https://dog.ceo/api/breed/${nameOfBreed}/images/random`);
  });

  return Promise.all(dogArray)
    .then((values) => {
      return Promise.all(values.map((value) => value.json()));
    })
    .then((data) => {
      return data.map((value, idx) => {
        return {
          url: value,
          nameOfBreed: Object.keys(message)[idx],
        };
      });
    });
};


const dogs = document.querySelectorAll('.card-inner');
console.log(dogs)


const Main: iPage = {
     getParams: (match: iMathc ) => {
        const values = match.result.slice(1);
        const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);
    
        return Object.fromEntries(keys.map((key, i) => {
            return [key, values[i]];
        }));
    },

  render: async () => {
    viewElements.header.innerHTML = await Header.redner(
      "Main Page",
      "All Dogs"
    );
    const posts = await getBreedList();

    const content = posts.reduce((acc, el) => {
      return (
        acc +
        `
            <div class="card-item">
                <div class="card-inner">
                    <img src="${el.url.message}">
                    <div class="breed-name">
                        <h3>${el.nameOfBreed}</h3>
                    </div>
                </div>
            </div>
        `
      );
    }, '');
    return content;
  },
};




export default Main;
