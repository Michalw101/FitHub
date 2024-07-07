export async function serverRequests(method, URL, body) {
    const token = sessionStorage.getItem('token'); 
    const expirationTime = sessionStorage.getItem('expirationTime'); 

    const headers = {
        ...(token ? { 'authorization': token } : {}),
        ...(expirationTime ? { 'Expiration-Time': expirationTime } : {}),
        ...(body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
    };

    if (method === 'GET') {
        try {
            const fetchResponse = await fetch(`http://localhost:3000/${URL}`, {
                headers: headers
            });
            console.log('fetch response: ', fetchResponse);
           
            return fetchResponse;
        } catch (error) {
            return ({ status: fetchResponse.status, ok: false, error: error });
        }
    }

    const requestOption = {
        method: method,
        headers: headers,
        body: body instanceof FormData ? body : JSON.stringify(body),
        credentials: 'include'
    };

    try {
        const fetchResponse = await fetch(`http://localhost:3000/${URL}`, requestOption);
        console.log('fetch response: ', fetchResponse);
        return fetchResponse;
    } catch (error) {
        return ({ ok: false, error: error });
    }
}
