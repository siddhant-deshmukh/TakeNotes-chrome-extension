import { useState } from 'react';

import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import Home from './components/Home';
import { useContext } from 'react';
import { PopupContext } from './PopupContext';
import AllCollections from './components/AllCollections';

const Popup = () => {

  const { currPage } = useContext(PopupContext)

  return (
    <div className="App w-[600px] h-96 flex-col items-stretch bg-gray-800 p-1.5">
      {
        currPage === null &&
        <Home />
      }
      {
        currPage === 'allCollections' && 
        <AllCollections />
      }
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
