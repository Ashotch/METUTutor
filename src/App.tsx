import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { TutorsPage } from "./pages/TutorsPage";
import { SubjectsPage } from "./pages/SubjectsPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { SignInPage } from "./pages/SignInPage";
import { GetStartedPage } from "./pages/GetStartedPage";
import { StudentProfilePage } from "./pages/StudentProfilePage";
import { TutorProfilePage } from "./pages/TutorProfilePage";
import { BookingPage } from "./pages/BookingPage";
import { BookingConfirmationPage } from "./pages/BookingConfirmationPage";
import { MessagesPage } from "./pages/MessagesPage";
import { HelpPage } from "./pages/HelpPage";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tutors" element={<TutorsPage />} />
              <Route path="/subjects" element={<SubjectsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/get-started" element={<GetStartedPage />} />
              <Route path="/profile/student" element={<StudentProfilePage />} />
              <Route path="/profile/tutor" element={<TutorProfilePage />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/booking/confirmation" element={<BookingConfirmationPage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/help" element={<HelpPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
