export async function serverRequests(method, URL, body) {
    const token = localStorage.getItem('token');
    if (method === 'GET') {
        try {
            const fetchResponse = await fetch(`http://localhost:3000/${URL}`, {
                headers: {
                    'authorization': token
                }
            });
            console.log('fetch response: ', fetchResponse);
            // if (fetchResponse.ok) {
            //       return fetchResponse;
            // } else {
            //     throw new Error(fetchResponse.statusText);

            // }
            return fetchResponse;
        } catch (error) {
            return ({status: fetchResponse.status, ok: false, error: error });
        }
    }

    const requestOption = {
        method: method,
        headers: {
            'authorization': token,
            ...(body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
        },
        body: body instanceof FormData ? body : JSON.stringify(body),
        credentials: 'include'

    };

    try {
        const fetchResponse = await fetch(`http://localhost:3000/${URL}`, requestOption);
        // if (fetchResponse.ok) {
            console.log('fetch response: ', fetchResponse);
            return fetchResponse;
        // } else {
        //     console.log("statusText", fetchResponse.statusText);
        //     throw new Error(fetchResponse.statusText);
        // }
    } catch (error) {
        return ({ ok: false, error: error });
    }
}