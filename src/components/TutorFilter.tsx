import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Filter, X } from "lucide-react";
import { useState } from "react";

interface TutorFilterProps {
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
}

export interface FilterState {
  subject: string;
  minRating: number;
  availability: string[];
}

const subjects = [
  "All Subjects",
  "Mathematics",
  "Computer Science",
  "English Literature",
  "Science",
  "Languages",
  "Arts",
  "Music",
];

const availabilityOptions = [
  { id: "morning", label: "Morning (6am - 12pm)" },
  { id: "afternoon", label: "Afternoon (12pm - 6pm)" },
  { id: "evening", label: "Evening (6pm - 12am)" },
  { id: "night", label: "Late Night (12am - 6am)" },
];

const ratingOptions = [
  { value: 0, label: "All Ratings" },
  { value: 4.0, label: "4.0+ Stars" },
  { value: 4.5, label: "4.5+ Stars" },
  { value: 4.8, label: "4.8+ Stars" },
];

export function TutorFilter({ onFilterChange, onReset }: TutorFilterProps) {
  const [subject, setSubject] = useState("All Subjects");
  const [minRating, setMinRating] = useState(0);
  const [availability, setAvailability] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubjectChange = (value: string) => {
    setSubject(value);
    onFilterChange({
      subject: value,
      minRating,
      availability,
    });
  };

  const handleRatingChange = (value: string) => {
    const rating = parseFloat(value);
    setMinRating(rating);
    onFilterChange({
      subject,
      minRating: rating,
      availability,
    });
  };

  const handleAvailabilityChange = (id: string, checked: boolean) => {
    const newAvailability = checked
      ? [...availability, id]
      : availability.filter((a) => a !== id);
    
    setAvailability(newAvailability);
    onFilterChange({
      subject,
      minRating,
      availability: newAvailability,
    });
  };

  const handleReset = () => {
    setSubject("All Subjects");
    setMinRating(0);
    setAvailability([]);
    onReset();
  };

  const hasActiveFilters = subject !== "All Subjects" || minRating > 0 || availability.length > 0;

  return (
    <div className="mb-8">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Filter className="w-4 h-4 mr-2" />
          {isExpanded ? "Hide Filters" : "Show Filters"}
          {hasActiveFilters && (
            <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
              {(subject !== "All Subjects" ? 1 : 0) + (minRating > 0 ? 1 : 0) + availability.length}
            </span>
          )}
        </Button>
      </div>

      {/* Filter Panel */}
      <Card className={`${isExpanded ? "block" : "hidden"} lg:block`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg">Filter Tutors</h3>
            </div>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={handleReset}>
                <X className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Subject Filter */}
            <div>
              <Label className="mb-2 block">Subject / Lesson</Label>
              <Select value={subject} onValueChange={handleSubjectChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subj) => (
                    <SelectItem key={subj} value={subj}>
                      {subj}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Rating Filter */}
            <div>
              <Label className="mb-2 block">Minimum Rating</Label>
              <Select value={minRating.toString()} onValueChange={handleRatingChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent>
                  {ratingOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value.toString()}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Availability Filter */}
            <div>
              <Label className="mb-2 block">Available Time</Label>
              <div className="space-y-3 pt-2">
                {availabilityOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.id}
                      checked={availability.includes(option.id)}
                      onCheckedChange={(checked) =>
                        handleAvailabilityChange(option.id, checked as boolean)
                      }
                    />
                    <label
                      htmlFor={option.id}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

