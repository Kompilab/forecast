import Cookie from 'universal-cookie';
const cookie = new Cookie();

const envUrls = {
  development: 'http://localhost:5001',
  production: 'https://my-forecast-api.herokuapp.com'
}

const BASE_URL = envUrls[process.env.NODE_ENV]

let headers = new Headers();
headers.append("Content-Type", "application/json; charset=utf-8");
headers.append("Authorization", cookie.get('_fo_'));

const httpInterface = {
  getData(url) {
    return fetch(`${BASE_URL}${url}`, {
      headers: headers
    })
  },
  postData(url, method, payload={}) {
    return fetch(`${BASE_URL}${url}`, {
      method: method,
      mode: "cors",// no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "include", // include, same-origin, *omit
      headers: headers,
      body: JSON.stringify(payload)
    })
  },
  processMultiple(requests) {
    const buildRequests = requests.map(request => {
      let options = {
        method: request.method,
        headers: headers
      }

      if (request.body) {
        options.body = JSON.stringify(request.body)
      }

      return fetch(`${BASE_URL}${request.path}`, options)
    });

    return Promise.all(buildRequests)
  },
  postDataNoContentType(url, method, payload={}) {
    return fetch(`${BASE_URL}${url}`, {
      method: method,
      mode: "cors",// no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "include", // include, same-origin, *omit
      headers: {
        "Authorization": cookie.get('_fo_')
      },
      body: payload
    })
  },
};

export default httpInterface;