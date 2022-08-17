export const getNews = () => {
  return fetch(
    `https://newsapi.org/v2/everything?q=React.js&pageSize=1&apiKey=${process.env.REACT_APP_NEWS_API_TOKEN}`
  ).then((res) => res.json());
};
