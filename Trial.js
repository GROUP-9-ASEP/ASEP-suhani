import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function NotesSharing() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [review, setReview] = useState({});

  const addNote = () => {
    if (newNote.trim() === "") return;
    const note = { id: Date.now(), content: newNote, reviews: [] };
    setNotes([note, ...notes]);
    setNewNote("");
  };

  const addReview = (id, reviewText) => {
    if (reviewText.trim() === "") return;
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, reviews: [...note.reviews, reviewText] } : note
      )
    );
    setReview({ ...review, [id]: "" });
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Notes Sharing</h1>
      <Textarea
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        placeholder="Write a note to share..."
        className="mb-2"
      />
      <Button onClick={addNote} className="mb-4">Share Note</Button>

      <div className="space-y-4">
        {notes.map((note) => (
          <Card key={note.id} className="p-4">
            <CardContent>
              <p className="mb-2">{note.content}</p>
              <Textarea
                value={review[note.id] || ""}
                onChange={(e) => setReview({ ...review, [note.id]: e.target.value })}
                placeholder="Write a review..."
                className="mb-2"
              />
              <Button onClick={() => addReview(note.id, review[note.id] || "")}>
                Submit Review
              </Button>
              <div className="mt-2 text-sm text-gray-600">
                {note.reviews.length > 0 && <strong>Reviews:</strong>}
                {note.reviews.map((rev, idx) => (
                  <p key={idx} className="border-t pt-1 mt-1">{rev}</p>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
