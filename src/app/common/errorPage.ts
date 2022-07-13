import Header            from "./header";
import {viewElements}    from "../tools/helpers";


const Error404 = {
    render: async () => {
        viewElements.header.innerHTML = await Header.render('Page Not Found');
        const content = `
            <section class="section"> </section>
        `
        return content
    }

}
export default Error404;