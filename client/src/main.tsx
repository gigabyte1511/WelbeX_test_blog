import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import NewPost from './components/NewPost.js'
import SignIn from './components/SignIn.js'
import Sign from './components/Sign.js'
import SignUp from './components/SignUp.js'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import EditPost from './components/EditPost'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false // default: true
    }
  }
})
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'newPost',
        element: <NewPost />
      },
      {
        path: 'editPost',
        element: <EditPost />
      },
      {
        path: 'sign',
        element: <Sign />,
        children: [
          {
            path: 'signIn',
            element: <SignIn />
          },
          {
            path: 'signUp',
            element: <SignUp />
          }
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
)
