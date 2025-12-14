import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { GraduationCap, UserCircle, CheckCircle2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function GetStartedPage() {
  const [userType, setUserType] = useState<"student" | "tutor">("student");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    subjects: "",
  });
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would register the user first
    // For now, we'll just sign them in with the provided credentials
    if (formData.password === formData.confirmPassword) {
      signIn(formData.email, formData.password, userType);
      // Navigate to appropriate profile page
      if (userType === "student") {
        navigate("/profile/student");
      } else {
        navigate("/profile/tutor");
      }
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <div className="min-h-[calc(100vh-73px)] bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl mb-4">Get Started</h1>
          <p className="text-gray-600">Create your account and start your journey today</p>
        </div>

        {/* User Type Selection */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => setUserType("student")}
            className={`p-6 rounded-lg border-2 transition-all ${
              userType === "student"
                ? "border-blue-600 bg-blue-50 shadow-lg"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div className="flex flex-col items-center gap-4">
              <UserCircle className={`w-16 h-16 ${userType === "student" ? "text-blue-600" : "text-gray-400"}`} />
              <div className="text-center">
                <h3 className={`text-xl mb-2 ${userType === "student" ? "text-blue-600" : "text-gray-700"}`}>
                  I&apos;m a Student
                </h3>
                <p className="text-sm text-gray-600">
                  Find expert tutors and improve your grades
                </p>
              </div>
              <ul className="text-sm text-left space-y-2 w-full">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Browse verified tutors</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Book flexible sessions</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Track your progress</span>
                </li>
              </ul>
            </div>
          </button>

          <button
            onClick={() => setUserType("tutor")}
            className={`p-6 rounded-lg border-2 transition-all ${
              userType === "tutor"
                ? "border-blue-600 bg-blue-50 shadow-lg"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div className="flex flex-col items-center gap-4">
              <GraduationCap className={`w-16 h-16 ${userType === "tutor" ? "text-blue-600" : "text-gray-400"}`} />
              <div className="text-center">
                <h3 className={`text-xl mb-2 ${userType === "tutor" ? "text-blue-600" : "text-gray-700"}`}>
                  I&apos;m a Tutor
                </h3>
                <p className="text-sm text-gray-600">
                  Share your knowledge and earn money
                </p>
              </div>
              <ul className="text-sm text-left space-y-2 w-full">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Set your own schedule</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Choose your subjects</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Grow your student base</span>
                </li>
              </ul>
            </div>
          </button>
        </div>

        {/* Registration Form */}
        <Card>
          <CardHeader>
            <CardTitle>
              Create Your {userType === "student" ? "Student" : "Tutor"} Account
            </CardTitle>
            <CardDescription>
              {userType === "student"
                ? "Join thousands of students improving their grades"
                : "Join our community of expert tutors"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              {userType === "tutor" && (
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                />
              </div>

              {userType === "tutor" && (
                <div className="space-y-2">
                  <Label htmlFor="subjects">Subjects You Can Teach</Label>
                  <Input
                    id="subjects"
                    type="text"
                    placeholder="e.g., Mathematics, Physics, Chemistry"
                    value={formData.subjects}
                    onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
                    required
                  />
                  <p className="text-sm text-gray-500">
                    You can add more details after registration
                  </p>
                </div>
              )}

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  required
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <Link to="/terms" className="text-blue-600 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600">Already have an account? </span>
              <Link to="/signin" className="text-blue-600 hover:underline">
                Sign In
              </Link>
            </div>

            {userType === "tutor" && (
              <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-800">
                  <strong>Next Steps:</strong> After registration, you&apos;ll need to complete your tutor profile, 
                  upload verification documents, and set your availability before you can start accepting students.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}