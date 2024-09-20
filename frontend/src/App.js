import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Book from './pages/Book';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Category from './pages/Category';
import BusCrud from './pages/Bus';
import BookingCrud from './pages/Booking';
import LocationCrud from './pages/Location';
import ScheduleCrud from './pages/Schedule';


const MainLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

// Admin Layout component without Navbar and Footer
const AdminLayout = ({ children }) => (

  <>
    {children}</>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout><Home /></MainLayout>} />
        <Route path='/about' element={<MainLayout><About /></MainLayout>} />
        <Route path='/book' element={<MainLayout><Book /></MainLayout>} />

        <Route path='/login' element={<MainLayout><Login /></MainLayout>} />

        <Route path='/dashboard' element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path='/category' element={<AdminLayout><Category /></AdminLayout>} />
        <Route path='/bus' element={<AdminLayout><BusCrud /></AdminLayout>} />
        <Route path='/schedule' element={<AdminLayout><ScheduleCrud /></AdminLayout>} />
        <Route path='/booking' element={<AdminLayout><BookingCrud /></AdminLayout>} />
        <Route path='/location' element={<AdminLayout><LocationCrud /></AdminLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
