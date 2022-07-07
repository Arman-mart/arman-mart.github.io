const Header = {
    redner: async () : Promise<string> => {
        const content = `
            <h1>Header</h1>
            <h2>title</h2>
        `
        return content;
    },

    afterRender : async () => {}
}

export default Header