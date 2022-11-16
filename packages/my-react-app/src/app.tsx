import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import React, { Suspense } from 'react';
import './app.less';

(window as any).react = require('react');
(window as any).reactDom = require('react-dom');

const Home = React.lazy(() => import(/* webpackPrefetch:true */'./pages/Home'));
// const PageManager = React.lazy(() => import(/* webpackPrefetch:true */'./app/pages/PageManager'));
// const PageEditor = React.lazy(() => import(/* webpackPrefetch:true */'./app/pages/PageEditor'));
// const ModelManager = React.lazy(() => import(/* webpackPrefetch:true */'./app/pages/ModelManager'));
// const ModelEditor = React.lazy(() => import(/* webpackPrefetch:true */'./app/pages/ModelEditor'));

function WrapperSuspense(WrappedComponent: any) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WrappedComponent />
    </Suspense>
  )
}

const router = createBrowserRouter([
  {
    path: 'home',
    element: WrapperSuspense(Home),
  },
  {
    index: true,
    element: <Navigate to="/home" replace={true} />,
  },
  {
    path: '*',
    element: <Navigate to="/home" replace={true} />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RouterProvider router={router} />
);
