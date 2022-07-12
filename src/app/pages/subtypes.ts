import Header                       from "../common/header";
import { iPage,iParams }            from "../tools/types";
import { navigateTo, viewElements } from "../tools/helpers";
import { getBreedList }             from "./mainPage";

const getSubBreedList = async (type: string) => {
    const list = await getBreedList();
    const subBreeds = list.filter((element) => {
        return element.subBreed.length !== 0 && element.nameOfBreed === type;
    });

    console.log(subBreeds);

    const test = subBreeds[0].subBreed.map((el) => {
        return fetch(`https://dog.ceo/api/breed/${type}/${el}/images/random`);
    });

    return Promise.all(test)
        .then((values) => {
            return Promise.all(values.map((value) => value.json()));
        })
        .then((data) => {
            return data.map((value, idx) => {
                return {
                    url: value,
                    nameOfSubBreed: subBreeds[0].subBreed[idx],
                    nameOfBreed: subBreeds[0].nameOfBreed
                };
            });
        });
};

const Subtypes: iPage = {

    async initDomEvents(params: iParams) {
        const type = params.type;
        const subList = await getSubBreedList(type);
        const dogs = document.querySelectorAll(".card-item");

        dogs.forEach((element, idx) => {
            element.addEventListener("click", (e) => {
                navigateTo(`/random/${type}/${subList[idx].nameOfSubBreed}`);
            });
        });
    },

    render: async (params: iParams) => {
        const type = params.type;
        viewElements.header.innerHTML = await Header.render(
            `Second page`,
            ` <span class='type'>
                        ${type}
                </span>             
              Sub-breeds `
        );

        const posts = await getSubBreedList(type);
        const content = posts.reduce((acc, el) => {
            return `
          ${acc}
          <div class="card-item" data-name="${el.nameOfBreed}">
              <div class="card-inner">
                  <img src="${el.url.message}">
                  <div class="breed-name">
                      <h3>${el.nameOfSubBreed}</h3>
                  </div>
              </div>
          </div>
      `;
        }, '');
        return content;
    },
};

export default Subtypes;