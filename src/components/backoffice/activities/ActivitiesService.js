const url = "http://ongapi.alkemy.org/api/activities";

export const getActivities = async () => {
  return await fetch(url, { method: "GET" })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export function createActivity(values, lastId) {

  let date = new Date().toISOString()

  const newActivity = {
      "id": parseInt(lastId) + 1,
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
        body: JSON.stringify(newActivity),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
    .then((response) => response.json())
    .then(() => {
        return 'Posted! Great job!'
    })
    .catch(err => {
        console.log(err)
        alert('Something went wrong, please try again!')
    })
}

export function editActivity(id, values) {

  let date = new Date().toISOString()

  const newActivity = {
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
        body: JSON.stringify(newActivity),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
    .then((response) => response.json())
    .then(() => {
        return 'Posted! Great job!'
    })
    .catch(err => {
        console.log(err)
        alert('Something went wrong, please try again!')
    })
}

export const deleteActivities = (id) => {
  return fetch(`${url}/${id}`, {method: 'DELETE'})
  .then(() => 'Category deleted')
  .catch(err => console.log(err))
}