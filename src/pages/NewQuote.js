import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import QuoteForm from '../components/quotes/QuoteForm';

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
  useMutation,
} from 'react-query';
import axios from 'axios';

const NewQuote = () => {
  const history = useHistory();

  const queryClient = new useQueryClient();

  const addMutation = useMutation(
    (newQuote) =>
      axios.post(
        `https://react-query-practice-default-rtdb.firebaseio.com/quotes.json`,
        newQuote,
      ),
    {
      onMutate: async (newQuote) => {
        await queryClient.cancelQueries('allPosts');

        const previousValue = queryClient.getQueryData('allPosts');

        queryClient.setQueryData('allPosts', (old) => [...old, newQuote]);

        return previousValue;
      },

      // On failure, roll back to the previous value
      onError: (err, variables, previousValue) =>
        queryClient.setQueryData('allPosts', previousValue),
      // After success or failure, refetch the todos query
      onSettled: async () => {
        await queryClient.invalidateQueries('allPosts');
        history.push('/quotes');
      },
    },
  );

  const addQuoteHandler = async (quoteData) => {
    addMutation.mutate(quoteData);
    await queryClient.cancelQueries('allPosts');
  };

  return <QuoteForm onAddQuote={addQuoteHandler} />;
};

export default NewQuote;
