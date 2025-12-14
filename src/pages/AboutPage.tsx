import { Card, CardContent } from "../components/ui/card";
import { Target, Heart, Lightbulb, Shield, TrendingUp } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const features = [
  {
    icon: Target,
    title: "Personalized Learning",
    description: "Every student is unique. Our tutors create customized lesson plans tailored to your specific learning style, pace, and goals.",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "Your safety is our priority. We use encrypted communications and secure payment processing for your peace of mind.",
  },
  {
    icon: TrendingUp,
    title: "Track Your Progress",
    description: "Monitor your improvement with detailed progress reports and analytics after each session.",
  },
  {
    icon: Lightbulb,
    title: "Interactive Sessions",
    description: "Engage in live, one-on-one video sessions with screen sharing, digital whiteboards, and collaborative tools.",
  },
  {
    icon: Heart,
    title: "Student-Centered Approach",
    description: "We believe in nurturing confidence and fostering a love for learning, not just improving grades.",
  },
];

export function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl mb-6">About METU Tutoring</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We're on a mission to make quality education accessible to everyone. 
              Our platform connects students with passionate, experienced tutors who 
              are dedicated to helping you achieve your academic goals.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4">How We Help You Succeed</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive approach ensures you get the support you need to excel
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="text-xl mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGxlYXJuaW5nfGVufDF8fHx8MTc2MjE0ODkwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Students learning together"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At METU Tutoring, we believe that every student deserves access to 
                high-quality, personalized education. We've built a platform that 
                removes barriers to learning and creates meaningful connections between 
                students and expert tutors.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded by educators who understand the challenges students face, 
                we're committed to creating a supportive learning environment where 
                students feel empowered to ask questions, make mistakes, and grow.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Whether you're struggling with a specific subject, preparing for exams, 
                or looking to advance your skills, we're here to help you every step 
                of the way.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}