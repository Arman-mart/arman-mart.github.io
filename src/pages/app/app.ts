import MainPage from '../mainPage';

class App {
    private container: HTMLElement;
    private initialPage : MainPage;

    constructor(){
        this.container = document.body;
        this.initialPage = new MainPage('main-page');
    }

    run(){
        const mainPageHTML = this.initialPage.render();
        this.container.append(mainPageHTML);
    }
}

export default App