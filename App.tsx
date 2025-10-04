import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CoursesSection from './components/CoursesSection';
import Footer from './components/Footer';
import CourseDetail from './components/CourseDetail';
import CheckoutPage from './components/CheckoutPage';
import SignUpPage from './components/SignUpPage';
import AdminDashboard from './components/AdminDashboard';
import { courses as mockCourses } from './data/mockData';
import type { Course } from './types';

type Page = 'home' | 'courseDetail' | 'checkout' | 'auth' | 'admin';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    setCurrentPage('courseDetail');
  };

  const handleStartCheckout = (course: Course) => {
    setSelectedCourse(course);
    setCurrentPage('checkout');
  };

  const handleBack = () => {
    setSelectedCourse(null);
    setCurrentPage('home');
  };

  const handleNavigateToAuth = () => {
    setCurrentPage('auth');
  };

  const handleLoginAttempt = (email: string, pass: string) => {
    // Dummy auth logic for admin
    if (email === 'admin@example.com' && pass === 'admin') {
      setIsAdmin(true);
    }
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setCurrentPage('home');
  };

  const handleNavigateToAdmin = () => {
    setCurrentPage('admin');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'courseDetail':
        return selectedCourse && <CourseDetail course={selectedCourse} onBack={handleBack} onStartCheckout={handleStartCheckout} />;
      case 'checkout':
        return selectedCourse && <CheckoutPage course={selectedCourse} onBack={() => setCurrentPage('courseDetail')} />;
      case 'auth':
        return <SignUpPage onBack={handleBack} onLoginAttempt={handleLoginAttempt} />;
      case 'admin':
        return isAdmin ? <AdminDashboard /> : <div className="container mx-auto text-center p-10"><p>You are not authorized to view this page. Try logging in with admin@example.com and password "admin".</p><button onClick={handleBack} className="text-brand-red hover:underline mt-4">Go Back</button></div>;
      case 'home':
      default:
        return (
          <>
            <Hero />
            <CoursesSection 
              title="أحدث الكورسات" 
              courses={mockCourses}
              onCourseSelect={handleCourseSelect}
              onStartCheckout={handleStartCheckout}
            />
            <CoursesSection 
              title="الكورسات الأكثر مبيعاً" 
              courses={[...mockCourses].reverse()}
              onCourseSelect={handleCourseSelect}
              onStartCheckout={handleStartCheckout}
            />
          </>
        );
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col" dir="rtl">
      <Header 
        onLogoClick={handleBack}
        onNavigateToAuth={handleNavigateToAuth}
        isAdmin={isAdmin}
        onNavigateToAdmin={handleNavigateToAdmin}
        onLogout={handleLogout}
      />
      <main className="flex-grow">
        {renderPage()}
      </main>
      {currentPage !== 'admin' && <Footer />}
    </div>
  );
};

export default App;
