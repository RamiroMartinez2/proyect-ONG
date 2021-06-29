const url = "http://ongapi.alkemy.org/api/organization"

export const getOrganization = async () => {
  return await fetch(url, { method: "GET" })
    .then((response) => response.json())
    .catch((err) => console.log(err))
};

export function editOrganization(data) {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
    .then((response) => response.json())
    .then((json) => {
        console.log(json)
        return 'ok'
    })
    .catch(err => {
        console.log(err)
    })
}
