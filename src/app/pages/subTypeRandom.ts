import { iPage,iParams } from "../tools/types";
import Header            from "../common/header";
import {viewElements}    from "../tools/helpers";
import { navigateTo }    from "../tools/helpers";

const getRandomImages = async (type: string, subType: string) => {
  try {
      const response = await fetch(
          `https://dog.ceo/api/breed/${type}/${subType}/images/random/20`
      );
      const data = await response.json();
      const {
          message
      } = data;
      return message;
  }
  catch (e) {
      console.log(e);
  }
};

const SubTypeRandom: iPage = {
  render: async (params: iParams) => {
      const type = params.type;
      const subtype = params.subtype;

      viewElements.header.innerHTML = await Header.render(
          ` Random images of  <span class='type'> ${type} / ${subtype}</span>`
      );

      const btn = document.createElement('button');
      btn.innerText = 'Sub list'
      btn.classList.add('sub-list-btn', 'btn');
      viewElements.header.append(btn);

      btn.addEventListener('click', () => {
          navigateTo(`/types/${type}`);
      })

      const images = await getRandomImages(type, subtype);
      const content = images.reduce((acc: string, el: string) => {
          return `
          ${acc}
          <div class="card-item" data-name='${type}' >
              <div class="card-inner">
                  <img src="${el}">
                  <div class="breed-name">
                  </div>
              </div>
          </div>
      `;
      }, '<div class="row">');

      return content;
  },
};

export default SubTypeRandom;