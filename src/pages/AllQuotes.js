import { useEffect } from 'react';

import QuoteList from '../components/quotes/QuoteList';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import NoQuotesFound from '../components/quotes/NoQuotesFound';
import usePosts from '../hooks/usePosts';

const AllQuotes = () => {
  const { status, data: loadedQuotes, error, isFetching } = usePosts();

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

  if (status === 'success' && (!loadedQuotes || loadedQuotes.length === 0)) {
    return <NoQuotesFound />;
  }

  return <QuoteList quotes={loadedQuotes} isFetching={isFetching} />;
};

export default AllQuotes;
