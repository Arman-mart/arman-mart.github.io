abstract class Page { 
    protected container : HTMLElement;
    static TextObject = {};

    constructor(id:string){
        this.container = document.createElement('div');
        this.container.id = id;
    }

    protected createHeader(text:string){
        const header = document.createElement('header');
        const headerTItle = document.createElement('h1');
        headerTItle.innerText = text;
        header.append(headerTItle)
        return header;
    }  
    
    render(){
        return this.container
    }
}
export default Page