
import React, { memo } from 'react';
import './index.less';

const RemoteButton = React.lazy(() => import('my-react-lib/Button'));

const Home: React.FC = memo(props => {

  return (
    <div className='home-page'>
      <p>home page</p>

      <React.Suspense fallback="Loading Button">
        <RemoteButton />
      </React.Suspense>
    </div>
  );
});

export default Home;