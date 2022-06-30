import { IListOfAllResponse } from "../helpers/helpers";
import Page from "../core/templates/page";

class MainPage extends Page{
    static TextObject = {
        MainTitle: 'Main Page'
    };

    
    constructor(id:string){
        super(id);
    }

    async drowBreeds(): Promise<void> {
        const response = await fetch("https://dog.ceo/api/breeds/list/all");
        const data: IListOfAllResponse = await response.json();
        const { message } = data;
    
        const dogArray = Object.entries(message).map(([nameOfBreed]) => {
          return fetch(`https://dog.ceo/api/breed/${nameOfBreed}/images/random`);
        });
    
        Promise.all(dogArray)
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
          })
          .then((data) => {
            data.forEach((el) => {
              this.container.innerHTML += `
                  <div class="card-item">
                         <div class="card-inner">
                              <img src="${el.url.message}">
                              <div class="breed-name">
                                  <h3>${el.nameOfBreed}</h3>
                              </div>
                          </div>
                   </div>
                  `;
            });
          });
          const title = this.createHeader(MainPage.TextObject.MainTitle);
          this.container.append(title);
      }
    
    render(){
        this.drowBreeds();
        return this.container;
    }
}

export default MainPage