import { Button } from "./ui/button";
import { Menu, User, LogOut, LayoutDashboard, Settings, Calendar, MessageSquare, HelpCircle, BookOpen } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  const profilePath = user?.userType === "student" ? "/profile/student" : "/profile/tutor";

  return (
    <header className="border-b sticky top-0 bg-white z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              T
            </div>
            <span className="text-xl">METU TUTORING</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`transition-colors ${
                isActive("/") ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Home
            </Link>
            <Link
              to="/tutors"
              className={`transition-colors ${
                isActive("/tutors") ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Find Tutors
            </Link>
            <Link
              to="/subjects"
              className={`transition-colors ${
                isActive("/subjects") ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Subjects
            </Link>
            <Link
              to="/about"
              className={`transition-colors ${
                isActive("/about") ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`transition-colors ${
                isActive("/contact") ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback className="bg-blue-600 text-white">
                        {user?.firstName[0]}{user?.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span>{user?.firstName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div>
                      <p className="font-medium">{user?.firstName} {user?.lastName}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                      <p className="text-xs text-blue-600 mt-1 capitalize">{user?.userType} Account</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to={profilePath} className="cursor-pointer">
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      View Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to={profilePath} className="cursor-pointer">
                      <User className="w-4 h-4 mr-2" />
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to={profilePath + "?tab=sessions"} className="cursor-pointer">
                      <Calendar className="w-4 h-4 mr-2" />
                      {user?.userType === "student" ? "My Sessions" : "My Schedule"}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/messages" className="cursor-pointer">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Messages
                    </Link>
                  </DropdownMenuItem>
                  {user?.userType === "student" && (
                    <DropdownMenuItem asChild>
                      <Link to="/tutors" className="cursor-pointer">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Find Tutors
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to={profilePath + "?tab=settings"} className="cursor-pointer">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/help" className="cursor-pointer">
                      <HelpCircle className="w-4 h-4 mr-2" />
                      Help & Support
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/signin">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link to="/get-started">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden pt-4 pb-2 flex flex-col gap-4">
            <Link
              to="/"
              className={`transition-colors ${
                isActive("/") ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/tutors"
              className={`transition-colors ${
                isActive("/tutors") ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Find Tutors
            </Link>
            <Link
              to="/subjects"
              className={`transition-colors ${
                isActive("/subjects") ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Subjects
            </Link>
            <Link
              to="/about"
              className={`transition-colors ${
                isActive("/about") ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`transition-colors ${
                isActive("/contact") ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex flex-col gap-2 pt-2">
              {isAuthenticated ? (
                <>
                  <div className="px-3 py-2 border-b">
                    <p className="font-medium">{user?.firstName} {user?.lastName}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                    <p className="text-xs text-blue-600 mt-1 capitalize">{user?.userType} Account</p>
                  </div>
                  <Button variant="ghost" asChild className="justify-start">
                    <Link to={profilePath} onClick={() => setMobileMenuOpen(false)}>
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      View Dashboard
                    </Link>
                  </Button>
                  <Button variant="ghost" asChild className="justify-start">
                    <Link to={profilePath} onClick={() => setMobileMenuOpen(false)}>
                      <User className="w-4 h-4 mr-2" />
                      My Profile
                    </Link>
                  </Button>
                  <Button variant="ghost" asChild className="justify-start">
                    <Link to={profilePath + "?tab=sessions"} onClick={() => setMobileMenuOpen(false)}>
                      <Calendar className="w-4 h-4 mr-2" />
                      {user?.userType === "student" ? "My Sessions" : "My Schedule"}
                    </Link>
                  </Button>
                  <Button variant="ghost" asChild className="justify-start">
                    <Link to="/messages" onClick={() => setMobileMenuOpen(false)}>
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Messages
                    </Link>
                  </Button>
                  {user?.userType === "student" && (
                    <Button variant="ghost" asChild className="justify-start">
                      <Link to="/tutors" onClick={() => setMobileMenuOpen(false)}>
                        <BookOpen className="w-4 h-4 mr-2" />
                        Find Tutors
                      </Link>
                    </Button>
                  )}
                  <Button variant="ghost" asChild className="justify-start">
                    <Link to={profilePath + "?tab=settings"} onClick={() => setMobileMenuOpen(false)}>
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Link>
                  </Button>
                  <Button variant="ghost" asChild className="justify-start">
                    <Link to="/help" onClick={() => setMobileMenuOpen(false)}>
                      <HelpCircle className="w-4 h-4 mr-2" />
                      Help & Support
                    </Link>
                  </Button>
                  <Button variant="outline" className="justify-start text-red-600" onClick={() => {
                    handleSignOut();
                    setMobileMenuOpen(false);
                  }}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Log Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" asChild>
                    <Link to="/signin" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/get-started" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
