const Header = {
    render: async ( title: string): Promise < string > => {
        const content = `
            <h2>${title}</h2>
        `
        return content;
    },

}

export default Header