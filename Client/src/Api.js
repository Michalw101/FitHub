export async function serverRequests(method, URL, body) {
    if (method === 'GET') {
        try {
            const fetchResponse = await fetch(`http://localhost:3000/${URL}`);
            console.log(fetchResponse);
            if (fetchResponse.ok) {
                  return fetchResponse;
            } else {
                throw new Error("user not found");

            }
        } catch (error) {
            return ({status: 404, ok: false, error: error });
        }
    }

    const requestOption = {
        method: method,
        headers: {
            ...(body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
        },
        body: body instanceof FormData ? body : JSON.stringify(body),
        credentials: 'include'

    };
    

    try {
        const fetchResponse = await fetch(`http://localhost:3000/${URL}`, requestOption);
        if (fetchResponse.ok) {
            console.log('fetch response: ', fetchResponse);
            return fetchResponse;
        } else {
            throw new Error("user not found");
        }
    } catch (error) {
        return ({status: 404, ok: false, error: error });
    }
}