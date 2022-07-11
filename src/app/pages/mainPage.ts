import Header                        from "../common/header";
import { iMathc }                    from "../tools/types";
import { iPage }                     from "../tools/types";
import { navigateTo, viewElements }  from "../tools/helpers";
import { IListOfAllResponse }        from "../tools/types";


export const getBreedList = async () => {
  const response = await fetch("https://dog.ceo/api/breeds/list/all");
  const data: IListOfAllResponse = await response.json();
  const { message } = data;
  console.log(message)
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
          subBreed: message[Object.keys(message)[idx]]
        };
      });
    });
};



const Main: iPage = {
  getParams: (match: iMathc ) => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
  },

  initDomEvents() {
    const dogs = document.querySelectorAll('.card-item');
    dogs.forEach(element => {
        element.addEventListener('click', e => {
          const dog = e.currentTarget as HTMLElement
          const text = dog.getAttribute('data-name');
          navigateTo(`/types/${text}`);
        })
    });
  },

  render: async () => {
    viewElements.header.innerHTML = await Header.render(
      "Main Page",
      "All Dogs"
    );
    const posts = await getBreedList();
    const content = posts.reduce((acc, el) => {
      return (`
          ${acc}
          <div class="card-item" data-name="${el.nameOfBreed}">
              <div class="card-inner">
                  <img src="${el.url.message}">
                  <div class="breed-name">
                      <h3>${el.nameOfBreed}</h3>
                  </div>
              </div>
          </div>
      `);
    }, '');
    return content;
  },
};




export default Main;
