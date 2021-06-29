const BASE_URL = "http://ongapi.alkemy.org/api";

export async function details() {
    try {
        const url = `${BASE_URL}/organization`
        const params = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
        const response = await fetch(url, params)
        const result = await response.json();
        return result
    } catch (error) {
        console.log(error)
        return null
    }
    
}

export async function membersApi() {
    try {
        const url = `${BASE_URL}/members`
        const params = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
        const response = await fetch(url, params)
        const result = await response.json();
        return result
    } catch (error) {
        console.log(error)
        return null
    }
    
}

