// src/lib/daily-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type DailyTask = {
  id: string;
  label: string;
  done: boolean;
};

type Metric = {
  id: string;
  label: string;
  value: number;
  goal: number;
};

type DailyState = {
  tasks: DailyTask[];
  metrics: Metric[];
  streak: number;
  lastCompletedDate: string | null;
  violations: string[];
  toggleTask: (id: string) => void;
  incrementMetric: (id: string) => void;
  addViolation: (rule: string) => void;
  completeDay: () => void;
  resetDay: () => void;
};

const initialTasks: DailyTask[] = [
  { id: "find_sellers", label: "Find 5 sellers with comment demand", done: false },
  { id: "dm_sellers", label: "DM 5 sellers (Use Deal Assistant)", done: false },
  { id: "engage_buyers", label: "Engage 10 buyers in comments", done: false },
  { id: "qualify_buyers", label: "Qualify at least 3 buyers", done: false },
  { id: "attempt_connect", label: "Attempt 1 connection", done: false },
  { id: "log_feedback", label: "Log all interactions in Feedback Engine", done: false },
];

const initialMetrics: Metric[] = [
  { id: "sellers_found", label: "Sellers Found", value: 0, goal: 5 },
  { id: "messages_sent", label: "Messages Sent", value: 0, goal: 10 },
  { id: "buyers_qualified", label: "Buyers Qualified", value: 0, goal: 3 },
  { id: "connections", label: "Connections Attempted", value: 0, goal: 1 },
];

export const useDailyStore = create<DailyState>()(
  persist(
    (set, get) => ({
      tasks: initialTasks,
      metrics: initialMetrics,
      streak: 0,
      lastCompletedDate: null,
      violations: [],
      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, done: !t.done } : t
          ),
        })),
      incrementMetric: (id) =>
        set((state) => ({
          metrics: state.metrics.map((m) =>
            m.id === id ? { ...m, value: m.value + 1 } : m
          ),
        })),
      addViolation: (rule) =>
        set((state) => ({
          violations: [...state.violations, `${rule} (Logged: ${new Date().toLocaleString()})`],
        })),
      completeDay: () => {
        const today = new Date().toDateString();
        const { lastCompletedDate, streak } = get();
        if (lastCompletedDate === today) return; // Already completed today

        const yesterday = new Date(Date.now() - 86400000).toDateString();
        const newStreak = lastCompletedDate === yesterday ? streak + 1 : 1;

        set({ streak: newStreak, lastCompletedDate: today });
      },
      resetDay: () =>
        set({
          tasks: initialTasks.map((t) => ({ ...t, done: false })),
          metrics: initialMetrics.map((m) => ({ ...m, value: 0 })),
        }),
    }),
    { name: "daily-execution-store-v2" }
  )
);