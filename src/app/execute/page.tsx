// src/app/execute/page.tsx
"use client"

import { useState, useEffect } from "react"
import { useDailyStore } from "@/lib/daily-store"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button, buttonVariants } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Rocket, ListChecks, AlertCircle, Timer, RotateCcw, Flame, PlusCircle, StopCircle, ShieldAlert } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ExecutePage() {
  const { tasks, toggleTask, metrics, incrementMetric, streak, completeDay, resetDay, violations, addViolation } = useDailyStore();
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [violationText, setViolationText] = useState("");

  // Session Timer Logic
  useEffect(() => {
    if (!isSessionActive) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsSessionActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSessionActive]);

  const completedCount = tasks.filter(t => t.done).length;
  const progressValue = (completedCount / tasks.length) * 100;
  
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleLogViolation = () => {
    if (violationText.trim()) {
      addViolation(violationText);
      setViolationText("");
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <Rocket className="h-6 w-6" />
            Daily System
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Don&apos;t think. Just execute the system.
          </p>
        </div>
        <div className="flex gap-2">
           <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300 font-bold text-sm">
             <Flame className="h-4 w-4" /> {streak} Day Streak
           </div>
           <Button variant="outline" onClick={resetDay}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset Day
          </Button>
        </div>
      </div>

      {/* 1. SCOREBOARD & SESSION MODE */}
      <Card className="bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900">
        <CardHeader>
          <CardTitle className="text-xl text-red-600 dark:text-red-400">Today&apos;s Objective & Scoreboard</CardTitle>
          <CardDescription className="text-red-500/80">Get 1 qualified buyer connected.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Scorecard Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((metric) => (
              <div key={metric.id} className="p-3 rounded-md bg-background border">
                <h4 className="text-xs font-bold uppercase text-muted-foreground">{metric.label}</h4>
                <div className="text-xl font-bold mt-1 flex items-center gap-2">
                  {metric.value} <span className="text-sm text-muted-foreground font-normal">/ {metric.goal}</span>
                  {metric.value >= metric.goal ? <span className="text-green-500 text-sm">✅</span> : <button onClick={() => incrementMetric(metric.id)} className="text-blue-500 hover:text-blue-700"><PlusCircle className="h-4 w-4"/></button>}
                </div>
              </div>
            ))}
          </div>

          {/* Session Mode Button */}
          {!isSessionActive ? (
            <Dialog>
              <DialogTrigger className={cn(buttonVariants({ size: "lg" }), "w-full bg-red-600 hover:bg-red-700 text-white")}>
                <Rocket className="h-5 w-5 mr-2" /> Start Focus Session
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Start Focus Session</DialogTitle>
                  <DialogDescription>30-minute timer. No distractions. Just execute.</DialogDescription>
                </DialogHeader>
                <div className="space-y-2 py-4 text-sm">
                  <p>1. Find sellers & send DMs.</p>
                  <p>2. Engage buyers in comments.</p>
                  <p>3. Qualify and attempt connections.</p>
                </div>
                <DialogFooter>
                  <DialogClose className={cn(buttonVariants({ variant: "outline" }))}>
                    Cancel
                  </DialogClose>
                  <Button onClick={() => { setTimeLeft(30 * 60); setIsSessionActive(true); }}>Start Timer</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ) : (
            <div className="flex items-center justify-between p-4 rounded-lg bg-black text-white">
              <div className="flex items-center gap-3">
                <Timer className="h-8 w-8 animate-pulse" />
                <span className="text-3xl font-mono font-bold">{formatTime(timeLeft)}</span>
              </div>
              <Button variant="destructive" onClick={() => setIsSessionActive(false)}>
                <StopCircle className="h-4 w-4 mr-2" /> End Session
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6">
        {/* 2. EXECUTION CHECKLIST */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center mb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <ListChecks className="h-5 w-5" /> Execution Checklist
              </CardTitle>
              <span className="text-sm font-medium text-muted-foreground">{completedCount} / {tasks.length}</span>
            </div>
            <Progress value={progressValue} className="h-2" />
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center space-x-3 p-3 rounded-md border bg-muted/20 hover:bg-muted/40 transition-colors">
                <Checkbox 
                  id={task.id} 
                  checked={task.done}
                  onCheckedChange={() => toggleTask(task.id)}
                />
                <label
                  htmlFor={task.id}
                  className={`text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${task.done ? 'line-through text-muted-foreground' : 'text-foreground'}`}
                >
                  {task.label}
                </label>
              </div>
            ))}
            <Button className="w-full mt-4" onClick={completeDay} disabled={progressValue < 100}>
              Complete Day & Update Streak
            </Button>
          </CardContent>
        </Card>

        {/* 3. RULE ENFORCER */}
        <Card className="bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm"><ShieldAlert className="h-4 w-4" /> Rule Enforcer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase">Live Warnings</h4>
              <p className="text-xs text-muted-foreground">⚠️ Never connect buyer without budget.</p>
              <p className="text-xs text-muted-foreground">⚠️ Never send free leads (1 test max).</p>
            </div>
            
            <div className="space-y-2 pt-2 border-t">
              <h4 className="text-xs font-bold uppercase">Log Violation</h4>
              <input 
                value={violationText}
                onChange={(e) => setViolationText(e.target.value)}
                placeholder="e.g., Connected without budget"
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
              <Button size="sm" variant="destructive" className="w-full" onClick={handleLogViolation}>Log Violation</Button>
            </div>

            <div className="space-y-2 pt-2 border-t max-h-40 overflow-y-auto">
              <h4 className="text-xs font-bold uppercase">Violations Log ({violations.length})</h4>
              {violations.length > 0 ? (
                violations.slice().reverse().map((v, i) => (
                  <p key={i} className="text-xs text-red-600 dark:text-red-400 flex items-start gap-1">
                    <AlertCircle className="h-3 w-3 mt-0.5 shrink-0" /> {v}
                  </p>
                ))
              ) : <p className="text-xs text-muted-foreground">No violations. Stay disciplined.</p>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}