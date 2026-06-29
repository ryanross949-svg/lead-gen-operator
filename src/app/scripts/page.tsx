// src/app/scripts/page.tsx
import { coreLaws, interpretationTable, messageFrameworks, decisionEngine } from "@/lib/conversation-os"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Brain, Scale, Table2, Blocks, Cpu } from "lucide-react"

export default function ConversationOSPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <Brain className="h-6 w-6" />
          Conversation OS
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          The intelligence layer. Rules that generate the answers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 1. Core Laws */}
        <Card className="bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Scale className="h-5 w-5" /> Core Laws</CardTitle>
            <CardDescription>Non-negotiable rules. Always visible.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {coreLaws.map((law, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-red-500 font-bold mt-0.5">⛔</span>
                  <span className="font-medium">{law}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* 2. Decision Engine */}
        <Card className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Cpu className="h-5 w-5" /> Decision Engine</CardTitle>
            <CardDescription>Deterministic logic for moving forward.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {decisionEngine.map((rule, i) => (
                <div key={i} className="p-3 rounded-md bg-background border text-sm">
                  <div className="font-semibold text-foreground">{rule.condition}</div>
                  <div className="text-green-600 dark:text-green-400 font-mono mt-1">{rule.action}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 3. Interpretation Table */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Table2 className="h-5 w-5" /> Situation → Interpretation Table</CardTitle>
            <CardDescription>How to read the field instantly.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {interpretationTable.map((row, i) => (
                <div key={i} className="p-4 rounded-lg border bg-muted/20 space-y-2">
                  <div className="text-sm">
                    <span className="font-bold text-xs uppercase text-muted-foreground block">Situation</span>
                    {row.situation}
                  </div>
                  <div className="text-sm">
                    <span className="font-bold text-xs uppercase text-blue-500 block">Interpretation</span>
                    {row.interpretation}
                  </div>
                  <div className="text-sm">
                    <span className="font-bold text-xs uppercase text-green-500 block">Correct Move</span>
                    {row.correctMove}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 4. Message Frameworks */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Blocks className="h-5 w-5" /> Message Frameworks</CardTitle>
            <CardDescription>Structures, not scripts. Generate your own messages from these.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {messageFrameworks.map((fw, i) => (
                <div key={i} className="p-4 rounded-lg border bg-muted/20">
                  <h3 className="font-semibold text-sm mb-2">{fw.name}</h3>
                  <div className="text-xs font-mono p-2 rounded bg-background border border-dashed mb-2">
                    {fw.structure}
                  </div>
                  <p className="text-xs text-muted-foreground italic">"{fw.example}"</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}