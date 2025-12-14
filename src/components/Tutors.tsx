import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Star, Clock } from "lucide-react";
import { TutorFilter, type FilterState } from "./TutorFilter";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const tutors = [
  {
    name: "Dr. Sarah Johnson",
    subject: "Mathematics",
    image: "https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MjEzMTUzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.9,
    sessions: 1250,
    specialties: ["Calculus", "Algebra", "Statistics"],
    rate: "$45/hr",
    availability: ["morning", "afternoon"],
  },
  {
    name: "Michael Chen",
    subject: "Computer Science",
    image: "https://images.unsplash.com/photo-1570170609489-43197f518df0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjIwNDUyMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 5.0,
    sessions: 890,
    specialties: ["Python", "Java", "Web Dev"],
    rate: "$50/hr",
    availability: ["afternoon", "evening", "night"],
  },
  {
    name: "Emily Rodriguez",
    subject: "English Literature",
    image: "https://images.unsplash.com/photo-1574281570877-bd815ebb50a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMHRlYWNoZXJ8ZW58MXx8fHwxNzYyMTUzNDAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.8,
    sessions: 2100,
    specialties: ["Essay Writing", "Poetry", "Analysis"],
    rate: "$40/hr",
    availability: ["morning", "evening"],
  },
  {
    name: "Dr. James Wilson",
    subject: "Science",
    image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjIwNDUyMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.7,
    sessions: 780,
    specialties: ["Physics", "Chemistry", "Biology"],
    rate: "$42/hr",
    availability: ["afternoon", "evening"],
  },
  {
    name: "Maria Garcia",
    subject: "Languages",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MjA0NTIxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.9,
    sessions: 1450,
    specialties: ["Spanish", "French", "ESL"],
    rate: "$38/hr",
    availability: ["morning", "afternoon", "evening"],
  },
  {
    name: "Kevin Park",
    subject: "Mathematics",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjIwNDUyMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.6,
    sessions: 620,
    specialties: ["Geometry", "Trigonometry", "SAT Math"],
    rate: "$35/hr",
    availability: ["evening", "night"],
  },
];

const availabilityLabels: Record<string, string> = {
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
  night: "Late Night",
};

export function Tutors() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FilterState>({
    subject: "All Subjects",
    minRating: 0,
    availability: [],
  });

  const filteredTutors = tutors.filter((tutor) => {
    // Filter by subject
    if (filters.subject !== "All Subjects" && tutor.subject !== filters.subject) {
      return false;
    }

    // Filter by rating
    if (tutor.rating < filters.minRating) {
      return false;
    }

    // Filter by availability
    if (filters.availability.length > 0) {
      const hasMatchingAvailability = filters.availability.some((time) =>
        tutor.availability.includes(time)
      );
      if (!hasMatchingAvailability) {
        return false;
      }
    }

    return true;
  });

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleReset = () => {
    setFilters({
      subject: "All Subjects",
      minRating: 0,
      availability: [],
    });
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <TutorFilter onFilterChange={handleFilterChange} onReset={handleReset} />

        {filteredTutors.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              No tutors found matching your criteria. Try adjusting your filters.
            </p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {filteredTutors.map((tutor, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="aspect-square overflow-hidden">
                    <ImageWithFallback
                      src={tutor.image}
                      alt={tutor.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
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
                        <Badge key={idx} variant="secondary">{specialty}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>
                        {tutor.availability.map((time) => availabilityLabels[time]).join(", ")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                      <span>{tutor.sessions} sessions</span>
                      <span className="text-blue-600">{tutor.rate}</span>
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => navigate("/booking", { state: { tutor } })}
                    >
                      Book Session
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Showing {filteredTutors.length} of {tutors.length} tutors
              </p>
              <Button variant="outline" size="lg">View All Tutors</Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
