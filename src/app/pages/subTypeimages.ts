import { iPage,iParams } from "../tools/types";
import Header            from "../common/header";
import { viewElements }  from "../tools/helpers";

const getRandomImages = async (type: string) => {
  try {
      const response = await fetch(
          `https://dog.ceo/api/breed/${type}/images/random/20`
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

const subTypeImages: iPage = {
  render: async (params: iParams) => {
      const type = params.type;

      viewElements.header.innerHTML = await Header.render(
          "Third Page",
          `Random images of  <span class='type'>${type}</span>`
      );

      const images = await getRandomImages(type);

      const content = images.reduce((acc: string, el: string) => {
          return `
          ${acc}
          <div class="card-item" >
              <div class="card-inner">
                  <img src="${el}">
              </div>
          </div>
      `;
      },'<div class="row">');

      return content;
  }
};

export default subTypeImages;