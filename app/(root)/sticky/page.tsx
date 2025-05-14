"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import NewStickyForm from "@/components/NewStickyForm";
import StickyUpdateForm from "@/components/StickyUpdateForm";

export default function Sticky() {
  const [stickies, setStickies] = useState<StickyNote[]>([]);
  const { user } = useAuth();
  const userId = user?.uid;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const stickiesRef = collection(db, "users", userId, "stickies");

    const unsubscribe = onSnapshot(stickiesRef, (snapshot) => {
      const notes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as StickyNote[];
      setStickies(notes);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-wrap gap-4 justify-center">
        <NewStickyForm userId={userId || ""} />
        {stickies.map((note) => (
          <Card key={note.id} className={`bg-${note.color}-200`}>
            <CardContent className=" flex flex-col gap-2 h-[200px] overflow-y-auto glass-scrollbar w-[250px]">
              <div className="flex justify-between items-center border-b-[1px] border-gray-500">
                <h2 className="font-semibold pb-2 text-lg text-stone-800">
                  {note.title}
                </h2>
                <StickyUpdateForm noteData={note} />
              </div>
              <p className="text-sm text-stone-700">{note.description}</p>
              {note.subs && note.subs.length > 0 && (
                <ul className="space-y-1">
                  {note.subs.map((sub, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-1 text-sm text-stone-700"
                    >
                      <span>-</span>
                      <span>{sub.title}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
