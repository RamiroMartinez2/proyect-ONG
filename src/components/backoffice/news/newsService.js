import axios from 'axios';

export default {
    getNews: async () => {
        const data = await axios.get(`http://ongapi.alkemy.org/api/news`).then(res => res.data.data)
        return data;
    },
    createNews: async (data) => {
        const create = await axios.post(`http://ongapi.alkemy.org/api/news`, data)
        .then(res => res.data)
        .catch(err => console.log(`Error al cargar nueva novedad ${err}`) )
        return create;
    },
    editNews: async (data, id) => {
        const edit = await axios.put(`http://ongapi.alkemy.org/api/news/${id}`, data)
        .then(res => res.data)
        .catch(err =>  console.log(`Error al editar novedad ${err}`))
        return edit;
    },
    deleteNews: async (id) => {
        axios.delete(`http://ongapi.alkemy.org/api/news/${id}`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
}