import {merchantId, merchantKey} from '../../ApiKeys'

const urlBase = 'https://apisandbox.cieloecommerce.cielo.com.br'
const urlQueryBase = 'https://apiquerysandbox.cieloecommerce.cielo.com.br'

const consumeApi = (parametro = '', method = 'GET', body) => {
    let url = urlBase
    if(method == 'GET'){
        url = urlQueryBase
    }
    return fetch(`${url}/${parametro}`, {
        method,
        headers: { 
            'content-type': 'application/json', 
            'MerchantId': merchantId, 
            'MerchantKey': merchantKey,            
        },
        body
    })
        .then(res => ApiService.ErrosHandling(res))
        .then(res => res.json())
}

const ApiService = {    
    authorizeCreditCard: (body) => consumeApi('1/sales','POST',JSON.stringify(body)),
    captureTransaction: (payment_id) => consumeApi('1/sales/'+ payment_id + '/capture','PUT'),
    bin: (digits) => consumeApi('1/cardBin/' + digits,'GET'),
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