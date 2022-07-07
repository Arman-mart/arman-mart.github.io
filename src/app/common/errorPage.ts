const Error404 = {

    render : async () => {
        const content = `
            <section class="section">
                <h1> 404 Error </h1>
            </section>
        `
        return content
    }
    , after_render: async () => {
    }
}
export default Error404;