"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

type StickyNote = {
  id: string;
  title: string;
  description?: string;
  color: string;
  subtasks?: string[];
};

const colors = ["#facc15", "#34d399", "#60a5fa", "#f472b6", "#c084fc"];

export default function Sticky() {
  const [stickies, setStickies] = useState<StickyNote[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState(colors[0]);
  const [subtaskInput, setSubtaskInput] = useState("");
  const [subtasks, setSubtasks] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { user } = useAuth();
  const userId = user?.uid;

  useEffect(() => {
    if (!userId) return;

    const stickiesRef = collection(db, "users", userId, "stickies");

    const unsubscribe = onSnapshot(stickiesRef, (snapshot) => {
      const notes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as StickyNote[];
      setStickies(notes);
    });

    return () => unsubscribe();
  }, [userId]);

  const handleAddOrUpdate = async () => {
    if (!userId || title.trim() === "") return;

    const ref = collection(db, "users", userId, "stickies");

    const data = {
      title,
      description,
      color,
      subtasks,
    };

    if (editingId) {
      await updateDoc(doc(db, "users", userId, "stickies", editingId), data);
      setEditingId(null);
    } else {
      await addDoc(ref, data);
    }

    setTitle("");
    setDescription("");
    setColor(colors[0]);
    setSubtasks([]);
    setSubtaskInput("");
  };

  const handleDelete = async (id: string) => {
    if (!userId) return;
    await deleteDoc(doc(db, "users", userId, "stickies", id));
  };

  const handleEdit = (note: StickyNote) => {
    setTitle(note.title);
    setDescription(note.description || "");
    setColor(note.color);
    setSubtasks(note.subtasks || []);
    setEditingId(note.id);
  };

  const handleAddSubtask = () => {
    if (subtaskInput.trim() !== "") {
      setSubtasks((prev) => [...prev, subtaskInput.trim()]);
      setSubtaskInput("");
    }
  };

  const handleRemoveSubtask = (index: number) => {
    setSubtasks((prev) => prev.filter((_, i) => i !== index));
  };

  if (!userId) return <div className="p-4">لطفاً وارد شوید...</div>;

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-col gap-2">
        <input
          placeholder="عنوان استیکی"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
        />
        <textarea
          placeholder="توضیحات (اختیاری)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
        />
        <div className="flex gap-2">
          {colors.map((c) => (
            <button
              key={c}
              style={{ backgroundColor: c }}
              className={`w-6 h-6 rounded-full border-2 ${
                color === c ? "border-black" : "border-transparent"
              }`}
              onClick={() => setColor(c)}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <input
            placeholder="افزودن ساب‌تسک"
            value={subtaskInput}
            onChange={(e) => setSubtaskInput(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <Button onClick={handleAddSubtask}>+</Button>
        </div>

        {subtasks.length > 0 && (
          <ul className="pl-4 list-disc space-y-1">
            {subtasks.map((task, index) => (
              <li key={index} className="flex justify-between">
                <span>{task}</span>
                <button
                  onClick={() => handleRemoveSubtask(index)}
                  className="text-red-500"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}

        <Button onClick={handleAddOrUpdate}>
          {editingId ? "ویرایش" : "افزودن"}
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {stickies.map((note) => (
          <Card key={note.id} style={{ backgroundColor: note.color }}>
            <CardContent className="p-4 relative min-h-[150px]">
              <h2 className="font-bold">{note.title}</h2>
              <p>{note.description}</p>
              {note.subtasks && note.subtasks.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {note.subtasks.map((sub, idx) => (
                    <li key={idx} className="flex items-start gap-1">
                      <span>-</span>
                      <span>{sub}</span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="absolute bottom-2 left-2 flex gap-2">
                <Pencil
                  className="w-4 h-4 cursor-pointer"
                  onClick={() => handleEdit(note)}
                />
              </div>
              <div className="absolute bottom-2 right-2">
                <Trash2
                  className="w-4 h-4 cursor-pointer"
                  onClick={() => handleDelete(note.id)}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
