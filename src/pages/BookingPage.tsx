import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Star, Clock, Calendar as CalendarIcon, DollarSign, ArrowLeft, CheckCircle } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface Tutor {
  name: string;
  subject: string;
  image: string;
  rating: number;
  sessions: number;
  specialties: string[];
  rate: string;
  availability: string[];
}

const availabilityLabels: Record<string, string> = {
  morning: "Morning (8 AM - 12 PM)",
  afternoon: "Afternoon (12 PM - 5 PM)",
  evening: "Evening (5 PM - 9 PM)",
  night: "Late Night (9 PM - 12 AM)",
};

const timeSlots: Record<string, string[]> = {
  morning: ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM"],
  afternoon: ["12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"],
  evening: ["5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"],
  night: ["9:00 PM", "10:00 PM", "11:00 PM"],
};

const durations = [
  { label: "30 minutes", value: 0.5 },
  { label: "1 hour", value: 1 },
  { label: "1.5 hours", value: 1.5 },
  { label: "2 hours", value: 2 },
];

export function BookingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const tutor: Tutor | undefined = location.state?.tutor;

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [notes, setNotes] = useState("");

  if (!tutor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <p className="text-xl mb-4">No tutor selected</p>
            <Button onClick={() => navigate("/tutors")}>Browse Tutors</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const hourlyRate = parseFloat(tutor.rate.replace(/[^0-9.]/g, ""));
  const totalCost = hourlyRate * selectedDuration;

  const handleBooking = () => {
    if (!isAuthenticated) {
      navigate("/signin", { state: { from: location.pathname } });
      return;
    }

    if (!selectedDate || !selectedTimeSlot) {
      alert("Please select a date and time");
      return;
    }

    // Navigate to confirmation page with booking details
    navigate("/booking/confirmation", {
      state: {
        booking: {
          tutor,
          date: selectedDate,
          time: selectedTimeSlot,
          duration: selectedDuration,
          notes,
          totalCost: totalCost.toFixed(2),
        },
      },
    });
  };

  // Generate next 14 days for date selection
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const availableDates = generateDates();

  const getAvailableTimeSlots = () => {
    const slots: { time: string; period: string }[] = [];
    tutor.availability.forEach((period) => {
      timeSlots[period]?.forEach((time) => {
        slots.push({ time, period });
      });
    });
    return slots;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tutor Info Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <div className="aspect-square overflow-hidden">
                <ImageWithFallback
                  src={tutor.image}
                  alt={tutor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl mb-1">{tutor.name}</h3>
                    <p className="text-gray-600">{tutor.subject}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span>{tutor.rating}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {tutor.specialties.map((specialty, idx) => (
                    <Badge key={idx} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{tutor.sessions} sessions completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-blue-600">{tutor.rate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Book a Session</CardTitle>
                <p className="text-gray-600">
                  Select your preferred date, time, and session duration
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Date Selection */}
                <div>
                  <Label className="mb-3 block">Select Date</Label>
                  <div className="grid grid-cols-7 gap-2">
                    {availableDates.map((date, idx) => {
                      const dateStr = date.toISOString().split("T")[0];
                      const isSelected = selectedDate === dateStr;
                      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
                      const dayNum = date.getDate();

                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedDate(dateStr)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            isSelected
                              ? "border-blue-600 bg-blue-50"
                              : "border-gray-200 hover:border-blue-300"
                          }`}
                        >
                          <div className="text-xs text-gray-600">{dayName}</div>
                          <div className={`${isSelected ? "text-blue-600" : ""}`}>
                            {dayNum}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slot Selection */}
                <div>
                  <Label className="mb-3 block">Select Time</Label>
                  <div className="space-y-3">
                    {tutor.availability.map((period) => (
                      <div key={period}>
                        <p className="text-sm text-gray-600 mb-2">
                          {availabilityLabels[period]}
                        </p>
                        <div className="grid grid-cols-4 gap-2">
                          {timeSlots[period]?.map((time) => {
                            const isSelected = selectedTimeSlot === time;
                            return (
                              <button
                                key={time}
                                onClick={() => setSelectedTimeSlot(time)}
                                className={`p-3 rounded-lg border-2 transition-all text-sm ${
                                  isSelected
                                    ? "border-blue-600 bg-blue-50 text-blue-600"
                                    : "border-gray-200 hover:border-blue-300"
                                }`}
                              >
                                {time}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Duration Selection */}
                <div>
                  <Label className="mb-3 block">Session Duration</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {durations.map((duration) => {
                      const isSelected = selectedDuration === duration.value;
                      return (
                        <button
                          key={duration.value}
                          onClick={() => setSelectedDuration(duration.value)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            isSelected
                              ? "border-blue-600 bg-blue-50 text-blue-600"
                              : "border-gray-200 hover:border-blue-300"
                          }`}
                        >
                          {duration.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <Label htmlFor="notes" className="mb-2 block">
                    Additional Notes (Optional)
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Let your tutor know what you'd like to focus on..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                  />
                </div>

                {/* Cost Summary */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Hourly Rate:</span>
                    <span>{tutor.rate}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Duration:</span>
                    <span>{selectedDuration} {selectedDuration === 1 ? "hour" : "hours"}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-lg">Total Cost:</span>
                      <span className="text-2xl text-blue-600">${totalCost.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={handleBooking}
                    disabled={!selectedDate || !selectedTimeSlot}
                  >
                    {isAuthenticated ? "Confirm Booking" : "Sign In to Book"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
