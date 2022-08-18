import { useQuery } from 'react-query';

export const useGetNews = () =>
  useQuery(['news'], () =>
    fetch(
      `http://api.mediastack.com/v1/news?access_key=${process.env.REACT_APP_NEWS_API_TOKEN}&limit=1&languages=en`
    ).then((res) => res.json())
  );
