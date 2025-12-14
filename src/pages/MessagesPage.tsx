import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { MessageSquare, Send } from "lucide-react";

export function MessagesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-8">
          <MessageSquare className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl mb-2">Messages</h1>
          <p className="text-xl text-gray-600">
            Chat with your tutors and students
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Messages</CardTitle>
          </CardHeader>
          <CardContent className="text-center py-12">
            <Send className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No messages yet</p>
            <p className="text-sm text-gray-500 mb-6">
              When you book a session, you&apos;ll be able to message your tutor here
            </p>
            <Button>Find a Tutor</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
