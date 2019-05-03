import Cookie from 'universal-cookie';

const cookie = new Cookie();

let headers = new Headers();
headers.append("Content-Type", "application/json; charset=utf-8");
headers.append("Authorization", cookie.get('_fo_'));

const httpInterface = {
  getData(url) {
    return fetch(url, {
      headers: headers
    })
  },
  postData(url, method, payload={}) {
    return fetch(url, {
      method: method,
      mode: "same-origin",
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, same-origin, *omit
      headers: headers,
      body: JSON.stringify(payload)
    })
  }
};

export default httpInterface;