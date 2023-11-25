import { Outlet } from "react-router-dom";
import Navbar from "../Components/Header/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import ScrollToTop from "../Components/ScrollToTop/ScrollToTop";
import { QueryClient, QueryClientProvider } from 'react-query';

// Create a client
const queryClient = new QueryClient();

const Root = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <div className="fixed top-0 w-full z-50 shadow-lg">
          <Navbar />
        </div>
        <div className="mt-[87px]">
          <ScrollToTop />
          <Outlet />
        </div>
        <Footer />
      </div>
    </QueryClientProvider>
  );
};

export default Root;
