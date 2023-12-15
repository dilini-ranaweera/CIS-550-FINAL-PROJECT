import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider, useToast } from '@chakra-ui/react';

import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import ListingPage from "./pages/ListingPage";
import ProfilePage from './pages/ProfilePage';
import StatisticsPage from "./pages/StatisticsPage";



export default function App() {
  const toast = useToast();
  return (
    <ChakraProvider isResettingCSS={false}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage toast={toast} />} />
          <Route path="/register" element={<RegistrationPage toast={toast} />} />
          <Route path="/listing" element={<ListingPage />}/>
          <Route path="profile" element={<ProfilePage/>} />
          <Route path="/statistics" element={<StatisticsPage/>} />
          {/* <Route path="/feed" element={<ProtectedRoute><ActivityFeed /></ProtectedRoute>} />
          <Route path="/statistics" element={<ProtectedRoute><StatisticsLayout /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><NotificationsLayout /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} /> */}
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}