import { Fragment, useEffect } from 'react';
import { useParams, Route, Link, useRouteMatch } from 'react-router-dom';

import HighlightedQuote from '../components/quotes/HighlightedQuote';
import Comments from '../components/comments/Comments';
import LoadingSpinner from '../components/UI/LoadingSpinner';

import axios from 'axios';
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';

function useQuote(quoteId) {
  return useQuery(['singleQuote', quoteId], async () => {
    const { data } = await axios.get(
      `https://react-query-practice-default-rtdb.firebaseio.com/quotes/${quoteId}.json`,
    );

    const loadedQuote = {
      id: quoteId,
      ...data,
    };
    return loadedQuote;
  });
}

const QuoteDetail = () => {
  const match = useRouteMatch();
  const params = useParams();

  const { quoteId } = params;

  const { status, data: loadedQuote, error, isFetching } = useQuote(quoteId);

  // const {
  //   sendRequest,
  //   status,
  //   data: loadedQuote,
  //   error,
  // } = useHttp(getSingleQuote, true);

  // useEffect(() => {
  //   sendRequest(quoteId);
  // }, [sendRequest, quoteId]);

  if (status === 'loading') {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === 'error') {
    return <p className="centered">{error}</p>;
  }

  if (!loadedQuote.text) {
    return <p>No quote found!</p>;
  }

  return (
    <Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
