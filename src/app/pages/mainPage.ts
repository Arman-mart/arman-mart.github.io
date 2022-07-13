import Header                       from "../common/header";
import { iPage }                    from "../tools/types";
import { navigateTo, viewElements } from "../tools/helpers";
import { IListOfAllResponse }       from "../tools/types";


export const getBreedList = async () => {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data: IListOfAllResponse = await response.json();
    const {
        message
    } = data;
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
    async initDomEvents() {
        const list = await getBreedList();
        const dogs = document.querySelectorAll('.card-item');
        dogs.forEach((element, idx) => {
            element.addEventListener('click', e => {
                const dog = e.currentTarget as HTMLElement
                const text = dog.getAttribute('data-name');
                if (list[idx].subBreed.length !== 0) {
                    navigateTo(`/types/${text}`);
                }
                else {
                    navigateTo(`/random/${text}`);
                }
            })
        });
    },

    render: async () => {
        viewElements.header.innerHTML = await Header.render(
            "List of all Dogs"
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
        }, '<div class="row">');
        return content;
    },
};


export default Main;