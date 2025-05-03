"use client";

import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, {
  DateClickArg,
  EventClickArg,
} from "@fullcalendar/interaction";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";

import { useMediaQuery } from "react-responsive";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type EventData = {
  id: string;
  title: string;
  start: string;
  end: string;
  color: string;
};

const colors = [
  { value: "yellow", bgClass: "bg-yellow-500" },
  { value: "red", bgClass: "bg-red-500" },
  { value: "orange", bgClass: "bg-orange-500" },
  { value: "amber", bgClass: "bg-amber-500" },
  { value: "lime", bgClass: "bg-lime-500" },
  { value: "green", bgClass: "bg-green-500" },
  { value: "emerald", bgClass: "bg-emerald-500" },
  { value: "teal", bgClass: "bg-teal-500" },
  { value: "cyan", bgClass: "bg-cyan-500" },
  { value: "sky", bgClass: "bg-sky-500" },
  { value: "indigo", bgClass: "bg-indigo-500" },
  { value: "violet", bgClass: "bg-violet-500" },
  { value: "purple", bgClass: "bg-purple-500" },
  { value: "fuchsia", bgClass: "bg-fuchsia-500" },
  { value: "pink", bgClass: "bg-pink-500" },
  { value: "rose", bgClass: "bg-rose-500" },
  { value: "slate", bgClass: "bg-slate-500" },
  { value: "zinc", bgClass: "bg-zinc-500" },
  { value: "stone", bgClass: "bg-stone-500" },
  { value: "neutral", bgClass: "bg-neutral-500" },
];

const Calendar = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<EventData[]>([]);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const calendarRef = useRef<FullCalendar | null>(null);

  const userId = user?.uid;

  const form = useForm({
    defaultValues: {
      title: "",
      start: "",
      end: "",
      color: "#3788d8",
    },
  });

  const fetchEvents = async () => {
    if (!userId) return;
    const eventsRef = collection(db, "users", userId, "events");
    const querySnapshot = await getDocs(eventsRef);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as EventData[];
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, [userId]);

  const handleDateClick = (arg: DateClickArg) => {
    form.reset({
      title: "",
      start: arg.dateStr,
      end: arg.dateStr,
      color: "#3788d8",
    });
    setEditingEventId(null);
    setOpen(true);
  };

  const handleEventClick = (arg: EventClickArg) => {
    const event = events.find((e) => e.id === arg.event.id);
    if (event) {
      form.reset({
        title: event.title,
        start: event.start,
        end: event.end,
        color: event.color,
      });
      setEditingEventId(event.id);
      setOpen(true);
    }
  };

  const handleAddOrUpdateEvent = async (values: any) => {
    if (!userId) return;
    if (editingEventId) {
      const eventRef = doc(db, "users", userId, "events", editingEventId);
      await updateDoc(eventRef, values);
    } else {
      await addDoc(collection(db, "users", userId, "events"), values);
    }
    setOpen(false);
    setEditingEventId(null);
    fetchEvents();
  };

  const handleDeleteEvent = async () => {
    if (!userId || !editingEventId) return;
    await deleteDoc(doc(db, "users", userId, "events", editingEventId));
    setOpen(false);
    setEditingEventId(null);
    fetchEvents();
  };

  const [title, setTitle] = useState("");
  const [currentView, setCurrentView] = useState("dayGridMonth");

  const handleViewChange = (view) => {
    const api = calendarRef.current?.getApi();
    api?.changeView(view);
    setTitle(api?.view.title);
    setCurrentView(view);
  };

  useEffect(() => {
    const api = calendarRef.current?.getApi();
    api?.changeView("dayGridMonth");
    setTitle(api?.view.title);
    setCurrentView("dayGridMonth");
  }, [calendarRef]);

  return (
    <div className="p-4 bg-violet-50 rounded-2xl shadow-lg max-w-full">
      <div className="flex sm:flex-row flex-col items-center sm:justify-between justify-center mb-4 flex-wrap gap-2">
        <h2 className="text-2xl font-semibold text-center w-full sm:w-auto text-violet-800 flex gap-5 justify-center mb-4">
          <button
            onClick={() => {
              const api = calendarRef.current?.getApi();
              api?.prev();
              setTitle(api?.view.title);
            }}
            className="cursor-pointer text-2xl hover:scale-110 active:scale-95 transition-transform duration-300"
          >
            <FiChevronLeft />
          </button>
          {title}
          <button
            onClick={() => {
              const api = calendarRef.current?.getApi();
              api?.next();
              setTitle(api?.view.title);
            }}
            className="cursor-pointer text-2xl hover:scale-110 active:scale-95 transition-transform duration-300"
          >
            <FiChevronRight />
          </button>
        </h2>

        <div className="flex gap-2 flex-wrapp">
          <button
            onClick={() => {
              const api = calendarRef.current?.getApi();
              api?.today();
              setTitle(api?.view.title);
            }}
            className="bg-violet-200 text-sm font-semibold text-violet-900 px-3 py-2 rounded hover:bg-violet-300 hover:scale-105 active:scale-95 transition-transform duration-300"
          >
            Today
          </button>

          <div className="flex gap-2 bg-violet-300 p-1 rounded">
            <button
              onClick={() => handleViewChange("dayGridMonth")}
              className={`text-sm font-semibold px-3 rounded-l-lg transition-transform duration-300 ${
                currentView === "dayGridMonth"
                  ? "bg-violet-600 text-white scale-95 border-2 border-violet-300 border-dashed"
                  : "bg-violet-100 text-violet-900 hover:bg-violet-200 hover:scale-105 border-2 border-violet-300 border-dashed"
              } active:scale-95`}
            >
              Month
            </button>

            <button
              onClick={() => handleViewChange("timeGridWeek")}
              className={`text-sm font-semibold px-3 transition-transform duration-300 ${
                currentView === "timeGridWeek"
                  ? "bg-violet-600 text-white scale-95 border-2 border-violet-300 border-dashed"
                  : "bg-violet-100 text-violet-900 hover:bg-violet-200 hover:scale-105 border-2 border-violet-300 border-dashed"
              } active:scale-95`}
            >
              Week
            </button>

            <button
              onClick={() => handleViewChange("timeGridDay")}
              className={`text-sm font-semibold px-3 rounded-r-lg transition-transform duration-300 ${
                currentView === "timeGridDay"
                  ? "bg-violet-600 text-white scale-95 border-2 border-violet-300 border-dashed"
                  : "bg-violet-100 text-violet-900 hover:bg-violet-200 hover:scale-105 border-2 border-violet-300 border-dashed"
              } active:scale-95`}
            >
              Day
            </button>
          </div>
        </div>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={false}
        // headerToolbar={{
        //   left: "prev,next today",
        //   center: "title",
        //   right: "dayGridMonth,timeGridWeek,timeGridDay",
        // }}
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        ref={calendarRef}
        editable
        selectable
        height="auto"
        contentHeight="auto"
        expandRows={true}
        dayMaxEventRows={true}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px] text-violet-900">
          <DialogHeader>
            <DialogTitle className="text-center font-bold text-xl mb-3">
              {editingEventId ? "Edit Event" : "Add Event"}
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleAddOrUpdateEvent)}
              className="flex flex-col gap-5"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="start"
                render={({ field }) => (
                  <FormItem className="flex justify-between gap-6 mt-4">
                    <FormLabel className="text-nowrap">Start Time:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="time"
                        type="datetime-local"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="end"
                render={({ field }) => (
                  <FormItem className="flex justify-between gap-10 mb-4">
                    <FormLabel className="text-nowrap">End Tile</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-wrap gap-3 rtl:space-x-reverse items-center justify-center ">
                      {colors.map((color) => (
                        <Label
                          key={color.value}
                          className="cursor-pointer hover:bg-yellow-100 hover:scale-105 rounded-lg active:scale-95 transition-all duration-300 mb-2"
                        >
                          <Input
                            type="radio"
                            value={color.value}
                            checked={field.value === color.value}
                            onChange={() => field.onChange(color.value)}
                            className="hidden peer"
                          />
                          <div
                            className={`w-6 h-6 rounded-full border-2 border-white ${color.bgClass} peer-checked:ring-2 peer-checked:ring-violet-600`}
                          />
                        </Label>
                      ))}
                    </div>
                  </FormItem>
                )}
              />

              <DialogFooter className="pt-2 flex justify-between gap-2">
                <Button
                  type="submit"
                  className={`mt-2 bg-violet-300 text-violet-950 hover:bg-violet-200 active:scale-90 transition-transform duration-300 ${
                    editingEventId ? "w-1/2" : "w-full"
                  }`}
                >
                  {editingEventId ? "Update Event" : "Add Event"}
                </Button>

                {editingEventId && (
                  <Button
                    type="button"
                    className="w-1/2 mt-2 bg-pink-300 text-pink-950 hover:bg-pink-200 active:scale-90 transition-transform duration-300"
                    onClick={handleDeleteEvent}
                  >
                    Delete Event
                  </Button>
                )}
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Calendar;
