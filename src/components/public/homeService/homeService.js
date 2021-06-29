const urlActivities = "http://ongapi.alkemy.org/api/activities";
const urlNews = "http://ongapi.alkemy.org/api/news";

export const getActivities = async () => {
  return await fetch(urlActivities, { method: "GET" })
    .then((response) => response.json())

    // .then((res) =>console.log(res.data))

    .catch((err) => console.log(err));
};

export const getActivitiesById = async (id) => {
  return await fetch(`${urlActivities}${id}`, { method: "GET" })
    .then((response) => response.json())

    // .then((res) =>console.log(res.data))

    .catch((err) => console.log(err));
};

export const getNews = async () => {
  return await fetch(urlNews, { method: "GET" })
    .then((response) => response.json())

    // .then((res) =>console.log(res.data))

    .catch((err) => console.log(err));
};

export const getNewsById = async (id) => {
  return await fetch(`${urlNews}${id}`, { method: "GET" })
    .then((response) => response.json())

    // .then((res) =>console.log(res.data))

    .catch((err) => console.log(err));
};
