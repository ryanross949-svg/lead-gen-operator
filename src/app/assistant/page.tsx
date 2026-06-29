// src/app/assistant/page.tsx
"use client"

import { useState } from "react"
import { scenarios, Scenario } from "@/lib/scenarios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessagesSquare, Copy, Check } from "lucide-react"

// Group scenarios by category for the sidebar
const categories = ["Buyer", "Seller", "Deal", "Negotiation"];

export default function DealAssistantPage() {
  const [activeScenario, setActiveScenario] = useState<Scenario>(scenarios[0])
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(activeScenario.script)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <MessagesSquare className="h-6 w-6" />
          Deal Assistant
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Select what just happened to get the exact script, reasoning, and next action.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
        {/* Left Column: Scenario List */}
        <div className="flex flex-col gap-4">
          {categories.map((cat) => (
            <div key={cat} className="flex flex-col gap-1">
              <h3 className="text-xs font-bold uppercase text-muted-foreground px-3 mb-1">{cat}</h3>
              {scenarios.filter(s => s.category === cat).map((scenario) => (
                <Button
                  key={scenario.id}
                  variant={activeScenario.id === scenario.id ? "default" : "ghost"}
                  className="justify-start h-auto py-2 whitespace-normal text-left"
                  onClick={() => setActiveScenario(scenario)}
                >
                  {scenario.title}
                </Button>
              ))}
            </div>
          ))}
        </div>

        {/* Right Column: Active Scenario Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between gap-4">
              <span>{activeScenario.title}</span>
              <Button size="sm" variant="outline" onClick={handleCopy} className="shrink-0">
                {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {copied ? "Copied!" : "Copy Script"}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-muted border border-dashed">
              <p className="text-sm font-mono whitespace-pre-line">{activeScenario.script}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900">
                <h3 className="text-xs font-bold uppercase text-blue-600 dark:text-blue-400 mb-2">Why It Works</h3>
                <p className="text-sm text-muted-foreground">{activeScenario.reasoning}</p>
              </div>
              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900">
                <h3 className="text-xs font-bold uppercase text-green-600 dark:text-green-400 mb-2">Next Action</h3>
                <p className="text-sm text-muted-foreground">{activeScenario.nextAction}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}