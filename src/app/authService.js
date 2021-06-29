const BASE_URL = "http://ongapi.alkemy.org/api";

export async function registerUser(data) {
    try {
        const url = `${BASE_URL}/register`
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, params)
        const result = await response.json();
        return result
    } catch (error) {
        console.log(error)
        return null
    }
    
}



export async function loginUser(data) {
    try {
        const url = `${BASE_URL}/login`
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, params)
        const result = await response.json()
        // console.log(result.data.user.name);
        return result
        
    } catch (error) {
        console.log(error)
        // return null
    }
}