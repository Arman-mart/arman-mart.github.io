const Header = {
    render: async (pageTitle: string, title: string): Promise < string > => {
        const content = `
            <h1>${pageTitle}</h1>
            <h2>${title}</h2>
        `
        return content;
    },

}

export default Header