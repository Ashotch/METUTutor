import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { HelpCircle, Mail, Phone, MessageCircle, BookOpen } from "lucide-react";

export function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-8">
          <HelpCircle className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl mb-2">Help & Support</h1>
          <p className="text-xl text-gray-600">
            We&apos;re here to help you succeed
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Mail className="w-8 h-8 text-blue-600" />
                <CardTitle>Email Support</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Send us an email and we&apos;ll get back to you within 24 hours
              </p>
              <p className="text-blue-600 mb-4">support@metututoring.com</p>
              <Button variant="outline" className="w-full">Send Email</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Phone className="w-8 h-8 text-blue-600" />
                <CardTitle>Phone Support</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Call us during business hours (Mon-Fri, 9 AM - 6 PM)
              </p>
              <p className="text-blue-600 mb-4">+1 (555) 123-4567</p>
              <Button variant="outline" className="w-full">Call Now</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <MessageCircle className="w-8 h-8 text-blue-600" />
                <CardTitle>Live Chat</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Chat with our support team in real-time
              </p>
              <p className="text-sm text-gray-500 mb-4">Available 9 AM - 9 PM EST</p>
              <Button variant="outline" className="w-full">Start Chat</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-blue-600" />
                <CardTitle>Help Center</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Browse our comprehensive guides and FAQs
              </p>
              <p className="text-sm text-gray-500 mb-4">Find answers instantly</p>
              <Button variant="outline" className="w-full">Visit Help Center</Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-medium mb-2">How do I book a tutoring session?</h3>
              <p className="text-gray-600 text-sm">
                Navigate to the Find Tutors page, select your preferred tutor, and click &quot;Book Session&quot;. Choose your date, time, and duration, then confirm your booking.
              </p>
            </div>
            <div className="border-b pb-4">
              <h3 className="font-medium mb-2">Can I cancel or reschedule a session?</h3>
              <p className="text-gray-600 text-sm">
                Yes, you can cancel or reschedule up to 24 hours before the session start time without any penalty. Go to your profile and manage your sessions.
              </p>
            </div>
            <div className="border-b pb-4">
              <h3 className="font-medium mb-2">How do I become a tutor?</h3>
              <p className="text-gray-600 text-sm">
                Click &quot;Get Started&quot; in the header, select &quot;I&apos;m a Tutor&quot;, and complete the registration form. Our team will review your application within 3-5 business days.
              </p>
            </div>
            <div className="pb-4">
              <h3 className="font-medium mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600 text-sm">
                We accept all major credit cards, debit cards, and PayPal. Payment is processed securely after each session is completed.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
