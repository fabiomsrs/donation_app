const urlBase = 'http://localhost:8000'

const consumeApi = (parametro = '', method = 'GET', body) => {
    return fetch(`${urlBase}/${parametro}`, {
        method,
        headers: { 'content-type': 'application/json' },
        body
    })
        .then(res => ApiService.ErrosHandling(res))
        .then(res => res.json())
}

const ApiService = {    
    createUser: (body) => consumeApi('users/','POST',JSON.stringify(body)),    
    ErrosHandling: async res => {
        if (!res.ok) {         
            await res.text().then(error => {
                throw Error(error)
            })
        }        
        return res
    }
}
export default ApiService