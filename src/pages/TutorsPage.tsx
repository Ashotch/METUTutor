import { Tutors } from "../components/Tutors";

export function TutorsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl mb-4">Find Your Perfect Tutor</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse our curated selection of expert tutors and find the perfect match for your learning needs
          </p>
        </div>
      </div>
      <Tutors />
    </div>
  );
}
