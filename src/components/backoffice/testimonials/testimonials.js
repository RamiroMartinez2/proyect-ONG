
const url='http://ongapi.alkemy.org/api/testimonials'


///////   Mostrar Lista de Testimoniales   ///////

export const getTestimonials = () => {
    return fetch(url, {method: 'GET'})
    // .then(res => res.data)
    .then(response => response.json())
    .catch(err => console.log(err))
}


/////   Creacion de Testimoniales   ///////

export function createTestimonial (values, lastId) {

    let date = new Date().toISOString()

    const newTestimonial = {
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
          body: JSON.stringify(newTestimonial),
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

//////////     Editar Testimoniales   ///////////

  export function editTestimonial(id, values) {

    let date = new Date().toISOString()

    const newTestimonial = {
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
          body: JSON.stringify(newTestimonial),
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


///////////    Eliminar Testimonial  ////////////////////


export const deleteTestimonial = (id) => {
    return fetch(`${url}/${id}`, {method: 'DELETE'})
    // .then(res => res.data)
    .then(() => 'Testimonial deleted')
    .catch(err => console.log(err))
}