let cancelRequest = [];

export const handleCancelRequest = (url = "pathname") => {
  switch (url) {
    case "pathname":
      for (let i = 0; i < cancelRequest.length; i++) {
        if (cancelRequest[i].pathname === window.location.pathname) {
          cancelRequest[i].controller.abort();
          cancelRequest = cancelRequest.splice(i, 1);
        }
      }
      break;
    default:
      break;
  }
};

// eslint-disable-next-line
export default {
  get(url, config = {}) {
    let storageData = sessionStorage.getItem(url);
    if (storageData !== null) return Promise.resolve(JSON.parse(storageData));
    const abortCont = new AbortController();
    cancelRequest.push({
      pathname: window.location.pathname,
      controller: abortCont,
    });
    return fetch(url, {
      ...config,
      method: "get",
      signal: abortCont.signal,
    })
      .then((res) => {
        return res.json().then((data) => {
          if (!res.ok) {
            return Promise.reject((data && data.message) || res.statusText);
          }
          sessionStorage.setItem(url, JSON.stringify(data));
          return Promise.resolve(data);
        });
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          return Promise.reject("Encountered some error while fetching");
        }
        return Promise.reject(err);
      });
  },
};
