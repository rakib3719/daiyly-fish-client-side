import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {  RouterProvider } from 'react-router-dom'
import { router } from './route/Route'
import AuthProvider from './provider/AuthProvider'
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';
import {
  QueryClient,
  QueryClientProvider,
 
} from '@tanstack/react-query'
const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>


<QueryClientProvider client={queryClient}>

<AuthProvider>
<RouterProvider router={router}>


</RouterProvider>
</AuthProvider>
</QueryClientProvider>

  </React.StrictMode>,
)
