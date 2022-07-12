import { iPage }  from "../tools/types";

const Footer: iPage = {
    render: async () => {
        let content = `
        <footer class="footer">
            <div class="content has-text-centered">
                <p>
                    Footer 
                </p>
            </div>
        </footer>
        `
        return content
    },
}

export default Footer;