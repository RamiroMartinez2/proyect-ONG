
///// Listado de Contactos ////////

export async function ContactList() {
    try {
        const url = 'http://ongapi.alkemy.org/api/contacts'
        const params = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
        const response = await fetch(url, params)
        const result = await response.json();
        console.log(result);
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}
    


