import { iPage }        from "../tools/types";
import Header           from "../common/header";
import { viewElements } from "../tools/helpers";

const getRandomImages = async (type:any, subtype:any) => {
  try {
        const response = await fetch(
          `https://dog.ceo/api/breed/${type}/images/random/20`
        );
        const data = await response.json();
        const { message } = data;
        return message;
  }
  catch (e) {
        console.log(e);
    }
};

const subTypeImages: iPage = {
  render: async (params) => {
    const type = params.type;
    const subtype = params.subtype;

    viewElements.header.innerHTML = await Header.render(
      "Third Page",
      `Random images of`
    );
   
    const images = await getRandomImages(type,subtype);
  
      const content = images.reduce((acc:string, el:string) => {
        return `
            ${acc}
            <div class="card-item" >
                <div class="card-inner">
                    <img src="${el}">
                </div>
            </div>
        `;
      }, '');

      return content;
    }
  };

export default subTypeImages;
