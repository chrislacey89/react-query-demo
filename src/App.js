import { Route, Switch, Redirect } from 'react-router-dom';

import AllQuotes from './pages/AllQuotes';
import QuoteDetail from './pages/QuoteDetail';
import NewQuote from './pages/NewQuote';
import NotFound from './pages/NotFound';
import Layout from './components/layout/Layout';
import { useQueryClient, QueryClient, QueryClientProvider } from 'react-query';

import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes" />
          </Route>
          <Route path="/quotes" exact>
            <AllQuotes />
          </Route>
          <Route path="/quotes/:quoteId">
            <QuoteDetail />
          </Route>
          <Route path="/new-quote">
            <NewQuote />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Layout>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}

export default App;
