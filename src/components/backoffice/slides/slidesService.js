const url = "http://ongapi.alkemy.org/api/slides";

export const getSlides = async () => {
  return await fetch(url, { method: "GET" })


    .then((response) => response.json())

    // .then((res) =>console.log(res.data))

    .catch((err) => console.log(err));
};



export function createSlide(values, lastId) {

  let date = new Date().toISOString()

  const newSlide = {
      "id": '',
      "name": values.name,
      "description": values.description,
      "image": values.image,
      "parent_category_id": 0,
      "created_at": date,
      "updated_at": date,
      "deleted_at": null
    }

    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(newSlide),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
    .then((response) => response.json())
    .then((json) => {
        console.log(json)
        return 'Posted! Great job!'
    })
    .catch(err => {
        console.log(err)
        alert('Something went wrong, please try again!')
    })
}

export function editSlide(id, values) {

  let date = new Date().toISOString()

  const editSlide = {
      "id": id,
      "name": values.name,
      "description": values.description,
      "image": values.image,
      "parent_category_id": 0,
      "created_at": date,
      "updated_at": date,
      "deleted_at": null
    }

    return fetch(`${url}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(editSlide),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
    .then((response) => response.json())
    .then((json) => {
        console.log(json)
        return 'Posted! Great job!'
    })
    .catch(err => {
        console.log(err)
        alert('Something went wrong, please try again!')
    })
}


export const deleteSlide = (id) => {
  return fetch(`${url}/${id}`, {method: 'DELETE'})
  // .then(res => res.data)
  .then(() => 'Slide deleted')
  .catch(err => console.log(err))
}