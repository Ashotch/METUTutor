import { Subjects } from "../components/Subjects";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const benefits = [
  "Personalized learning plans tailored to your needs",
  "Flexible scheduling to fit your busy lifestyle",
  "Track your progress with detailed session reports",
  "Access to learning materials and resources",
  "Money-back satisfaction guarantee",
];

export function SubjectsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl mb-4">Explore Our Subjects</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From math and science to arts and music, find expert tutors for any subject you want to master
          </p>
        </div>
      </div>

      <Subjects />

      {/* Why Learn With Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-10">
                <h2 className="text-3xl mb-6 text-center">Why Learn With Us?</h2>
                <div className="space-y-4 mb-8">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <p className="text-lg text-gray-700">{benefit}</p>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <Button size="lg" onClick={() => navigate('/tutors')}>
                    Browse Tutors Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
