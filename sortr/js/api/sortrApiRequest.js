const sortrApiRequest = (apiEndpoint) => (
  fetch(apiEndpoint)
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }

      return res.json();
    })
);

export default sortrApiRequest;
