"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

interface EventData {
  id: string;
  title: string;
  date: string;
  color: string;
}

export default function Calendar() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#4ade80");
  const [editingEventId, setEditingEventId] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const querySnapshot = await getDocs(collection(db, "events"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as EventData[];
      setEvents(data);
    };

    fetchEvents();
  }, []);

  const handleDateClick = (arg: any) => {
    setSelectedDate(arg.dateStr);
    setTitle("");
    setColor("#4ade80");
    setEditingEventId(null);
    setModalOpen(true);
  };

  const handleAddEvent = async () => {
    if (!title) return;

    if (editingEventId) {
      const eventRef = doc(db, "events", editingEventId);
      await updateDoc(eventRef, { title, color });
      setEvents((prev) =>
        prev.map((e) => (e.id === editingEventId ? { ...e, title, color } : e))
      );
    } else {
      const newEvent = { title, date: selectedDate, color };
      const docRef = await addDoc(collection(db, "events"), newEvent);
      setEvents((prev) => [...prev, { id: docRef.id, ...newEvent }]);
    }

    setTitle("");
    setColor("#4ade80");
    setModalOpen(false);
    setEditingEventId(null);
  };

  const handleEventClick = (clickInfo: any) => {
    const event = clickInfo.event;
    const eventData = events.find((e) => e.id === event.id);
    if (!eventData) return;

    const confirmEdit = confirm(
      `می‌خواهی رویداد \"${event.title}\" را ویرایش کنی؟ (برای حذف، روی Cancel بزن)`
    );
    if (confirmEdit) {
      setSelectedDate(event.startStr);
      setTitle(event.title);
      setColor(eventData.color);
      setEditingEventId(event.id);
      setModalOpen(true);
    } else {
      const confirmDelete = confirm(
        `آیا مطمئن هستی که می‌خواهی \"${event.title}\" را حذف کنی؟`
      );
      if (confirmDelete) {
        deleteDoc(doc(db, "events", event.id));
        setEvents((prev) => prev.filter((e) => e.id !== event.id));
      }
    }
  };

  return (
    <div className="p-4 bg-white rounded-2xl shadow-lg">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events.map((evt) => ({
          ...evt,
          backgroundColor: evt.color,
        }))}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        eventContent={(eventInfo) => (
          <div
            className="px-2 py-1 rounded-md text-xs truncate"
            style={{
              backgroundColor: eventInfo.event.extendedProps.color || "#4ade80",
              color: "#fff",
            }}
          >
            {eventInfo.event.title}
          </div>
        )}
        dayCellClassNames={(arg) => {
          if ([5, 6].includes(arg.date.getDay())) return ["bg-gray-50"];
          return [];
        }}
        height="auto"
      />

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">
              {editingEventId ? "ویرایش رویداد" : "اضافه کردن رویداد"}
            </h2>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="عنوان رویداد"
              className="w-full p-2 mb-4 border rounded"
            />
            <div className="flex items-center gap-4">
              <label className="text-sm">رنگ:</label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setModalOpen(false);
                  setEditingEventId(null);
                }}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                لغو
              </button>
              <button
                onClick={handleAddEvent}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                ذخیره
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
