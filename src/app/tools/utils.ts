interface iRequest { 
    resource: string,
    id:       string,
    verb:     string 
}

const Utils = {

    parseRequestURL : () => {
        let url = location.hash.slice(1).toLowerCase() || '/';
        let r = url.split("/")
        console.log(r)

        let request: iRequest = {
            resource    : r[1],
            id          : r[2],
            verb        : r[3]
        }

        return request
    }

}

export default Utils;