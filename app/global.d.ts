import { Timestamp } from "firebase/firestore";

// global.d.ts
declare global {
  interface List {
    title: string;
    color: string;
    id: string;
    createdAt: Timestamp;
  }

  interface Tag {
    title: string;
    color: string;
    id: string;
    createdAt: Timestamp;
  }

  interface Subtasks {
    title: string;
    done: boolean;
    id: string;
  }

  interface Task {
    title: string;
    description: string;
    list: List;
    tag: Tag;
    date: string;
    time: string;
    priority: "low" | "medium" | "high";
    done: boolean;
    subtasks: Subtasks[];
    id: string;
  }
}

export {};
