import { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import LoadingSpinner from '../UI/LoadingSpinner';

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const sortQuotes = (quotes, ascending) => {
  const result = quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
  return result;
};

const QuoteList = ({ quotes, isFetching }) => {
  const history = useHistory();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const isSortingAscending = queryParams.get('sort') === 'asc';

  const sortedQuotes = sortQuotes(quotes, isSortingAscending);

  const changeSortingHandler = () => {
    history.push({
      pathname: location.pathname,
      search: `?sort=${isSortingAscending ? 'desc' : 'asc'}`,
    });
  };

  return (
    <Fragment>
      <div className="quote-list-container">
        <div className={classes.sorting}>
          <button onClick={changeSortingHandler}>
            Sort {isSortingAscending ? 'Descending' : 'Ascending'}
          </button>
        </div>

        <span
          style={{
            display: 'inline-block',
            marginLeft: 'auto',
            width: 10,
            height: 10,
            background: isFetching ? '#445544' : 'transparent',
            transition: !isFetching ? 'all 1.5s ease' : 'none',
            borderRadius: '100%',
            transform: 'scale(2)',
          }}
        />
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
