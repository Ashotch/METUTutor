import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { CheckCircle, Calendar, Clock, DollarSign, FileText, Home, User } from "lucide-react";

export function BookingConfirmationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const booking = location.state?.booking;

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <p className="text-xl mb-4">No booking information found</p>
            <Button onClick={() => navigate("/tutors")}>Browse Tutors</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl mb-2">Booking Confirmed!</h1>
          <p className="text-xl text-gray-600">
            Your tutoring session has been successfully booked
          </p>
        </div>

        {/* Booking Details Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-2xl mb-6">Session Details</h2>

            {/* Tutor Info */}
            <div className="flex items-start gap-4 pb-6 mb-6 border-b">
              <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                <ImageWithFallback
                  src={booking.tutor.image}
                  alt={booking.tutor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl mb-1">{booking.tutor.name}</h3>
                <p className="text-gray-600 mb-2">{booking.tutor.subject}</p>
                <div className="flex flex-wrap gap-2">
                  {booking.tutor.specialties.map((specialty: string, idx: number) => (
                    <Badge key={idx} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Session Info */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Date</p>
                  <p className="font-medium">{formatDate(booking.date)}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Time & Duration</p>
                  <p className="font-medium">
                    {booking.time} ({booking.duration} {booking.duration === 1 ? "hour" : "hours"})
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Cost</p>
                  <p className="text-xl text-blue-600">${booking.totalCost}</p>
                </div>
              </div>

              {booking.notes && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Your Notes</p>
                    <p className="text-sm">{booking.notes}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Payment Info */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <span className="font-medium">Payment Required:</span> You will be charged $
                {booking.totalCost} after the session is completed. You can cancel or reschedule up
                to 24 hours before the session start time.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* What's Next Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl mb-4">What&apos;s Next?</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm text-blue-600">1</span>
                </div>
                <p className="text-gray-700">
                  You&apos;ll receive a confirmation email with session details and a meeting link
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm text-blue-600">2</span>
                </div>
                <p className="text-gray-700">
                  Your tutor may reach out to confirm the session and discuss your learning goals
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm text-blue-600">3</span>
                </div>
                <p className="text-gray-700">
                  You&apos;ll receive a reminder 24 hours and 1 hour before your session
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm text-blue-600">4</span>
                </div>
                <p className="text-gray-700">
                  Join the session through your dashboard at the scheduled time
                </p>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-3 gap-4">
          <Button variant="outline" onClick={() => navigate("/profile/student?tab=sessions")}>
            <User className="w-4 h-4 mr-2" />
            View My Sessions
          </Button>
          <Button variant="outline" onClick={() => navigate("/tutors")}>
            <Calendar className="w-4 h-4 mr-2" />
            Book Another Session
          </Button>
          <Button onClick={() => navigate("/")}>
            <Home className="w-4 h-4 mr-2" />
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
