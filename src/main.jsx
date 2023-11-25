import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './Routes/router';
import AuthProvider from './services/Firebase/AuthProvider';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';


// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient} >
      <AuthProvider>
        <RouterProvider router={router}>
        </RouterProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);


// import {
//   QueryClient,
//   QueryClientProvider,
// } from '@tanstack/react-query'

// const queryClient = new QueryClient();

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <AuthProvider>
//       <QueryClientProvider client={queryClient}>
//         <HelmetProvider>
//           <div className='max-w-screen-xl mx-auto'>
//             <RouterProvider router={router} />
//           </div>
//         </HelmetProvider>
//       </QueryClientProvider>
//     </AuthProvider>
//   </React.StrictMode>
//   );