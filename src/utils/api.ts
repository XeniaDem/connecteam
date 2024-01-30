import request from "superagent"

export const post = <T extends Object>(url: string, body: T, token?: string) => {
   return request.post('http://localhost:5432/' + url)
    .set('Access-Control-Allow-Origin', '*')
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .send(body)
    
}

export const get = (url: string, token?: string) => {
    return request.get('http://localhost:5432/' + url)
     .set('Access-Control-Allow-Origin', '*')
     .set('Accept', 'application/json')
     .set('Content-Type', 'application/json')
     .set('Authorization', `Bearer ${token}`)
     
 }

 export const patch = <T extends Object>(url: string, body: T, token?: string) => {
    return request.patch('http://localhost:5432/' + url)
     .set('Access-Control-Allow-Origin', '*')
     .set('Accept', 'application/json')
     .set('Content-Type', 'application/json')
     .set('Authorization', `Bearer ${token}`)
     .send(body)
     
 }

 