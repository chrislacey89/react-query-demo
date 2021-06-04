import axios from 'axios';
import { useQuery } from 'react-query';

const getPosts = async () => {
  const { data } = await axios.get(
    'https://react-query-practice-default-rtdb.firebaseio.com/quotes.json',
  );

  const transformedQuotes = [];

  for (const key in data) {
    const quoteObj = {
      id: key,
      ...data[key],
    };

    transformedQuotes.push(quoteObj);
  }

  return transformedQuotes;
};

const usePosts = () => {
  return useQuery('allPosts', getPosts, {
    // refetchInterval: 2000,
  });
};

export default usePosts;
