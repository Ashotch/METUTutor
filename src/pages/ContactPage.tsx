import { Contact } from "../components/Contact";
import { Card, CardContent } from "../components/ui/card";
import { Clock, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How do I book a tutoring session?",
    answer: "Simply browse our tutors, select the one that matches your needs, and click 'Book Session'. You can choose your preferred time and date.",
  },
  {
    question: "What if I'm not satisfied with my tutor?",
    answer: "We offer a 100% satisfaction guarantee. If you're not happy with your first session, we'll refund you or help you find a better match.",
  },
  {
    question: "Can I cancel or reschedule a session?",
    answer: "Yes! You can cancel or reschedule up to 24 hours before your session with no penalty. Cancellations within 24 hours may incur a fee.",
  },
  {
    question: "How are tutors verified?",
    answer: "All tutors undergo background checks, credential verification, and teaching demonstrations. We accept only the top 5% of applicants.",
  },
];

export function ContactPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're here to help! Reach out with any questions or concerns
          </p>
        </div>
      </div>

      <Contact />

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-4xl mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600">
                Quick answers to common questions
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="text-xl mb-3">{faq.question}</h3>
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hours Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl mb-4">Support Hours</h3>
                <div className="space-y-2 text-gray-600">
                  <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
                  <p>Saturday: 9:00 AM - 6:00 PM</p>
                  <p>Sunday: 10:00 AM - 4:00 PM</p>
                </div>
                <p className="text-sm text-gray-500 mt-4">All times in EST</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
