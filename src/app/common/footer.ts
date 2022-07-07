const Footer = {
    render: async () : Promise<string> => {
        let content =  `
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