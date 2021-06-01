import { useEffect } from 'react';

import QuoteList from '../components/quotes/QuoteList';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import NoQuotesFound from '../components/quotes/NoQuotesFound';
import useHttp from '../hooks/use-http';
import { getAllQuotes } from '../lib/api';

import axios from 'axios';
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';

const usePosts = () => {
  const queryClient = new useQueryClient();
  queryClient.cancelQueries('allPosts');

  return useQuery('allPosts', async () => {
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
  });
};

const AllQuotes = () => {
  // const { sendRequest, status, data: loadedQuotes, error } = useHttp(
  //   getAllQuotes,
  //   true
  // );

  const { status, data: loadedQuotes, error, isFetching } = usePosts();
  // console.log("🚀 ~ file: AllQuotes.js ~ line 35 ~ AllQuotes ~ loadedQuotes", loadedQuotes)
  // console.log("🚀 ~ file: AllQuotes.js ~ line 35 ~ AllQuotes ~ status", status)

  // useEffect(() => {
  //   sendRequest();
  // }, [sendRequest]);

  if (status === 'loading') {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === 'error') {
    return <p className="centered focused">{error.message}</p>;
  }
  if (status === 'success') {
    console.log('👍🏻👍🏻👍🏻');
  }

  if (status === 'success' && (!loadedQuotes || loadedQuotes.length === 0)) {
    return <NoQuotesFound />;
  }


  return (
    <>
      <div>{isFetching ? 'Updating in background...' : ' '}</div>

      <QuoteList quotes={loadedQuotes} />
    </>
  );
};

export default AllQuotes;
