import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, } from "react-router-dom";
import routes from './Routers/routes.jsx';
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'
import Provider from './Provider/Provider.jsx';

const queryClient = new QueryClient()



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider>
      <QueryClientProvider client={queryClient}>
        <div className='max-w-7xl	mx-auto w-full px-6 md:px-0 lg:px-0 md:w-11/12 lg:w-11/12'>
          <RouterProvider router={routes} />
        </div>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
)
