import Header from "../common/header";
import { iPage } from "../tools/types";
import { iMathc } from "../tools/types";
import { navigateTo, viewElements } from "../tools/helpers";
import { getBreedList } from "./mainPage";

const getSubBreedList = async () => {
  const list = await getBreedList();
  const dogType = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  const subBreeds = list.map((el) => {
    console.log(el);
    if (el.subBreed.length !== 0 && dogType == el.nameOfBreed) {
      const types = el.subBreed;
      return types.forEach((element: any) => {
        return fetch(
          `https://dog.ceo/api/breed/${el.nameOfBreed}/${element}/images/random`
        );
      });
    }
  });
  return subBreeds;
};

const Subtypes: iPage = {
  getParams: (match: iMathc) => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
      (result) => result[1]
    );

    return Object.fromEntries(
      keys.map((key, i) => {
        return [key, values[i]];
      })
    );
  },

  render: async () => {
    viewElements.header.innerHTML = await Header.render(
      "Second page",
      "Random sub-breed images"
    );
    const posts = await getSubBreedList();
    console.log(posts);
    const content = `
            <div>
            </div>
        `;
    return content;
  },
};

export default Subtypes;
