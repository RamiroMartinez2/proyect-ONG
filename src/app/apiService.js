

export function apiService (token) {

    const BASE_URL = "http://ongapi.alkemy.org/api/auth/me";
    
    const authToken = localStorage.getItem(token)

    if (authToken) {
    fetch( BASE_URL, {
        method: 'GET',
        headers: {
            'Autorization': 'Baerer' + authToken
        }
    })
    .then(res => res.json())
    }
}




