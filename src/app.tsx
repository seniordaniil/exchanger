import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { Exchanger } from 'features/exchanger';
import { store } from './store';
import { Layout } from 'ui';

export const App: FC = () => {
  return (
    <Provider store={store}>
      <Layout>
        <Exchanger />
      </Layout>
    </Provider>
  );
};

export default App;
