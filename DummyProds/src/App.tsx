import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./paginas/login"
import ListaProdutos from "./paginas/listaProdutos"
import Produto from "./paginas/produto"

import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const router = createBrowserRouter([
  {
    path:'/',
    element: <Login/>
  },
  {
    path:'/listaProdutos',
    element: <ListaProdutos/>
  },
  {
    path:'/produto/:id',
    element: <Produto/>
  }
])

const queryClient = new QueryClient()

function App() {
  return (
    <div className="container-App">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  )
}

export default App
