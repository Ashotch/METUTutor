import { Card, CardContent } from "./ui/card";
import { BookOpen, Calculator, Beaker, Globe, Code, Palette, Music, MessageSquare } from "lucide-react";

const subjects = [
  { icon: Calculator, name: "Mathematics", tutors: 120 },
  { icon: Beaker, name: "Science", tutors: 95 },
  { icon: BookOpen, name: "English", tutors: 85 },
  { icon: Globe, name: "Languages", tutors: 110 },
  { icon: Code, name: "Programming", tutors: 75 },
  { icon: Palette, name: "Arts", tutors: 45 },
  { icon: Music, name: "Music", tutors: 38 },
  { icon: MessageSquare, name: "Test Prep", tutors: 92 },
];

export function Subjects() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {subjects.map((subject, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors">
                  <subject.icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="mb-2">{subject.name}</h3>
                <p className="text-sm text-gray-600">{subject.tutors} tutors</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
