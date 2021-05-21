import request from 'superagent';

export async function signUp(credentials) {
  const response = await request
    .post('/api/auth/signUp')
    // superagent considers 400 errors
    .ok(res => res.status < 500)
    .send(credentials);

  // re-throw any bad request
  if (response.status === 400) {
    throw response.body;
  }

  return response.body;
}

export async function signIn(credentials) {
  const response = await request
    .post('/api/auth/signIn')
    .ok(res => res.status < 500)
    .send(credentials);

  if (response.status === 400) {
    throw response.body;
  }

  return response.body;
}

export async function getQuotes(search) {
  const response = await request
    .get('/api/quotes')
    .query({ filter: search })
    .set('Authorization', window.localStorage.getItem('TOKEN'));

  return response.body;
}

// export async function getQuote(id) { // WE NEED BACKEND
//   const response = await request
//     .get(`/api/quotes/${id}`)
//     .set('Authorization', window.localStorage.getItem('TOKEN'));

//   return response.body;
// }

export async function getMyFavorites() {
  const response = await request
    .get('/api/me/favorites')
    .set('Authorization', window.localStorage.getItem('TOKEN'));

  return response.body;
}

export async function addFavorite(favorite) {
  const response = await request
    .post('/api/favorites')
    .send(favorite)
    .set('Authorization', window.localStorage.getItem('TOKEN'));

  return response.body;
}

export async function deleteFavorite(id) {
  const response = await request
    .delete(`/api/favorites/${id}`)
    .set('Authorization', window.localStorage.getItem('TOKEN'));

  return response.body;
}