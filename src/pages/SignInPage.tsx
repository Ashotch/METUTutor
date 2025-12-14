import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { GraduationCap, UserCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function SignInPage() {
  const [userType, setUserType] = useState<"student" | "tutor">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signIn(email, password, userType);
    // Navigate to appropriate profile page
    if (userType === "student") {
      navigate("/profile/student");
    } else {
      navigate("/profile/tutor");
    }
  };

  return (
    <div className="min-h-[calc(100vh-73px)] bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="container mx-auto max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl mb-4">Welcome Back</h1>
          <p className="text-gray-600">Sign in to continue your learning journey</p>
        </div>

        {/* User Type Toggle */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => setUserType("student")}
            className={`p-4 rounded-lg border-2 transition-all ${
              userType === "student"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <UserCircle className={`w-8 h-8 ${userType === "student" ? "text-blue-600" : "text-gray-400"}`} />
              <span className={userType === "student" ? "text-blue-600" : "text-gray-600"}>
                Student
              </span>
            </div>
          </button>
          <button
            onClick={() => setUserType("tutor")}
            className={`p-4 rounded-lg border-2 transition-all ${
              userType === "tutor"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <GraduationCap className={`w-8 h-8 ${userType === "tutor" ? "text-blue-600" : "text-gray-400"}`} />
              <span className={userType === "tutor" ? "text-blue-600" : "text-gray-600"}>
                Tutor
              </span>
            </div>
          </button>
        </div>

        {/* Sign In Form */}
        <Card>
          <CardHeader>
            <CardTitle>
              Sign In as {userType === "student" ? "Student" : "Tutor"}
            </CardTitle>
            <CardDescription>
              {userType === "student"
                ? "Access your learning dashboard and book sessions"
                : "Manage your tutoring schedule and students"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={userType === "student" ? "student@example.com" : "tutor@example.com"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600">Don&apos;t have an account? </span>
              <Link to="/get-started" className="text-blue-600 hover:underline">
                Get Started
              </Link>
            </div>

            {userType === "tutor" && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>New tutors:</strong> Complete your profile after signing in to start accepting students.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}