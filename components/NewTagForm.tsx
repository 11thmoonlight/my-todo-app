import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { IoMdAdd } from "react-icons/io";
import { createTag } from "@/services/tagService";
import { useAuth } from "@/context/AuthContext";

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

export default function NewTagForm() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !selectedColor || !user) return;

    await createTag(user.uid, {
      title,
      color: selectedColor,
      createdAt: new Date(),
    });

    setTitle("");
    setSelectedColor("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="w-full">
        <div className="flex gap-1 bg-gray-200 p-2 rounded-md text-xs">
          <IoMdAdd size={16} className="text-violet-500" />
          <span className="font-semibold">Add New Tag</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] text-violet-900">
        <DialogHeader>
          <DialogTitle className="text-center font-bold text-xl mb-3">
            Add New Tag
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <Input
              id="title"
              placeholder="Tag Title"
              className="col-span-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-3 rtl:space-x-reverse items-center justify-center">
            {colors.map((color) => (
              <Label
                key={color.value}
                className="cursor-pointer hover:bg-yellow-100 hover:scale-105 rounded-lg active:scale-95 transition-all duration-300 mb-2"
              >
                <Input
                  type="radio"
                  name="priority"
                  value={color.value}
                  checked={selectedColor === color.value}
                  onChange={() => setSelectedColor(color.value)}
                  className="hidden peer"
                />
                <div
                  className={`w-6 h-6 rounded-full border-2 border-white ${color.bgClass} peer-checked:ring-2 peer-checked:ring-violet-600`}
                />
              </Label>
            ))}
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="w-full mt-6 bg-violet-300 text-violet-950 hover:bg-violet-200 active:scale-80 transition-transform duration-300"
            >
              Add Tag
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
