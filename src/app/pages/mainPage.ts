interface IListOfAllResponse {
  message: {
    [key: string]: string;
  };
}


const getBreedList = async () => {
  const response = await fetch("https://dog.ceo/api/breeds/list/all");
  const data: IListOfAllResponse = await response.json();
  const { message } = data;

  const dogArray = Object.entries(message).map(([nameOfBreed]) => {
    return fetch(`https://dog.ceo/api/breed/${nameOfBreed}/images/random`);
  });

  return Promise.all(dogArray).then((values) => {
        return Promise.all(values.map((value) => value.json()));
  });
};

const Main = {
  render: async () => {
    const posts = await getBreedList();
    console.log(posts)
    const content = posts.reduce((acc, el) => {
      return acc + `
            <div class="card-item">
                <div class="card-inner">
                    <img src="${el.message}">
                    <div class="breed-name">
                        <h3>name</h3>
                    </div>
                </div>
            </div>
        `;
    }, '');
    return content;
  },
};

export default Main;
