import request from "superagent"

export const post = async <T extends Object>(url: string, body?: T, token?: string) => {
    try {
        const response = await request.post('http://localhost:8000/' + url)
            .set('Access-Control-Allow-Origin', '*')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(body)
        return response;
    } catch (error: any) {
        if (error.status == 401) {
            document.location.href = "/auth/login"
        }
        else if (error.message.includes('network is offline')) {
            alert("Сервер недоступен.")
            document.location.href = "/"
        }
        throw error;

    }

}

export const put = async <T extends Object>(url: string, body?: T, token?: string) => {
    try {
        const response = await request.put('http://localhost:8000/' + url)
            .set('Access-Control-Allow-Origin', '*')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(body)
        return response;
    } catch (error: any) {
        if (error.status == 401) {
            document.location.href = "/auth/login"
        }
        else if (error.message.includes('network is offline')) {
            alert("Сервер недоступен.")
            document.location.href = "/"
        }
        throw error;

    }

}

export const get = async (url: string, token?: string) => {
    try {
        const response = await request.get('http://localhost:8000/' + url)
            .set('Access-Control-Allow-Origin', '*')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
        return response;
    } catch (error: any) {
        if (error.status == 401) {
            document.location.href = "/auth/login"
        }  
        else if (error.message.includes('network is offline')) {
            alert("Сервер недоступен.")
            document.location.href = "/"
        }
        throw error;

    }

}

export const patch = async <T extends Object>(url: string, body?: T, token?: string) => {
    try {
        const response = await request.patch('http://localhost:8000/' + url)
            .set('Access-Control-Allow-Origin', '*')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(body)

        return response;
    } catch (error: any) {
        if (error.status == 401) {
            document.location.href = "/auth/login"
        }
        else if (error.message.includes('network is offline')) {
            alert("Сервер недоступен.")
            document.location.href = "/"
        }
        throw error;

    }

}

export const Delete = async (url: string, token?: string) => {
    try {
        const response = await request.delete('http://localhost:8000/' + url)
            .set('Access-Control-Allow-Origin', '*')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
        return response;
    } catch (error: any) {
        if (error.status == 401) {
            document.location.href = "/auth/login"
        }
        else if (error.message.includes('network is offline')) {
            alert("Сервер недоступен.")
            document.location.href = "/"
        }
        throw error;

    }

}

export const readServerError = (message: any) => {
    var messageParsed = JSON.parse(message);
    var content = messageParsed.message;
    console.log(content)
}



