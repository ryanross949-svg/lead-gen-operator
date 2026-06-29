// src/app/feedback/page.tsx
import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { BarChart3, Zap, BookMarked } from "lucide-react"
import { createFeedback } from "@/actions/feedback"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default async function FeedbackLogPage() {
  const feedbacks = await prisma.feedback.findMany({
    include: { interaction: true },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  // Extract all rule updates for the Rule Library
  const ruleLibrary = feedbacks.filter(f => f.ruleUpdate).map(f => f.ruleUpdate);

  // Count core issues for pattern detection
  const issueCounts: { [key: string]: number } = {};
  feedbacks.forEach(f => {
    if (f.coreIssue) {
      issueCounts[f.coreIssue] = (issueCounts[f.coreIssue] || 0) + 1;
    }
  });
  const topIssues = Object.entries(issueCounts).sort((a, b) => b[1] - a[1]).slice(0, 3);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <BarChart3 className="h-6 w-6" />
          Feedback & Rule Engine
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Capture conclusions in &lt; 60 seconds. Think externally, log the rule here.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6">
        {/* Left Column: Fast Capture Form & Log */}
        <div className="flex flex-col gap-6">
          {/* Fast Capture Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Zap className="h-5 w-5" />
                Fast Capture
              </CardTitle>
              <CardDescription>Log the final result. No over-thinking.</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={createFeedback} className="space-y-4">
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select name="type">
                      <SelectTrigger id="type"><SelectValue placeholder="Select..." /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Buyer">Buyer</SelectItem>
                        <SelectItem value="Seller">Seller</SelectItem>
                        <SelectItem value="Pricing">Pricing</SelectItem>
                        <SelectItem value="Execution">Execution</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="outcome">Outcome</Label>
                    <Select name="outcome">
                      <SelectTrigger id="outcome"><SelectValue placeholder="Select..." /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Success">Success</SelectItem>
                        <SelectItem value="Fail">Fail</SelectItem>
                        <SelectItem value="Ghost">Ghost</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="coreIssue">Core Issue</Label>
                    <Select name="coreIssue">
                      <SelectTrigger id="coreIssue"><SelectValue placeholder="Select..." /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low Intent">Low Intent</SelectItem>
                        <SelectItem value="No Budget">No Budget</SelectItem>
                        <SelectItem value="Price Resistance">Price Resistance</SelectItem>
                        <SelectItem value="Unresponsive">Unresponsive</SelectItem>
                        <SelectItem value="Bad Fit">Bad Fit</SelectItem>
                        <SelectItem value="None">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="insight">Insight (1 sentence: What caused this?)</Label>
                  <Input id="insight" name="insight" placeholder="e.g., Buyer ghosted because I didn't confirm budget fast enough." required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ruleUpdate">Rule Update (1 sentence: What will you change?)</Label>
                  <Input id="ruleUpdate" name="ruleUpdate" placeholder="e.g., Always ask for budget immediately after intent." required />
                </div>

                <Button type="submit" className="w-full">Log & Save Rule</Button>
              </form>
            </CardContent>
          </Card>

          {/* Recent Entries (Minimal) */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Recent Logs</h2>
            {feedbacks.length === 0 && (
              <Card><CardContent className="p-4 text-sm text-muted-foreground">No logs yet.</CardContent></Card>
            )}
            {feedbacks.map((f) => (
              <Card key={f.id}>
                <CardContent className="p-4 flex items-center justify-between gap-4">
                  <div className="text-sm">
                    <div className="flex gap-2 mb-1">
                      <span className="text-xs font-bold bg-muted px-2 py-0.5 rounded">{f.type}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${f.outcome === 'Success' ? 'bg-green-100 text-green-700' : f.outcome === 'Fail' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>{f.outcome}</span>
                    </div>
                    <p className="text-muted-foreground"><span className="font-semibold text-foreground">Insight:</span> {f.insight}</p>
                    <p className="text-muted-foreground"><span className="font-semibold text-foreground">Rule:</span> {f.ruleUpdate}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Column: Rule Library & Patterns */}
        <div className="flex flex-col gap-4">
          {/* Rule Library */}
          <Card className="bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm"><BookMarked className="h-4 w-4" /> Active Rule Library</CardTitle>
            </CardHeader>
            <CardContent>
              {ruleLibrary.length > 0 ? (
                <ul className="text-sm space-y-2">
                  {ruleLibrary.map((rule, i) => <li key={i} className="flex items-start gap-2"><span className="text-purple-500">📌</span> {rule}</li>)}
                </ul>
              ) : <p className="text-sm text-muted-foreground">No rules logged yet.</p>}
            </CardContent>
          </Card>

          {/* Top Failure Causes */}
          <Card className="bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900">
            <CardHeader>
              <CardTitle className="text-sm">Top Failure Causes</CardTitle>
            </CardHeader>
            <CardContent>
              {topIssues.length > 0 ? (
                <ul className="text-sm space-y-1">
                  {topIssues.map(([issue, count], i) => <li key={i}>• {issue} ({count}x)</li>)}
                </ul>
              ) : <p className="text-sm text-muted-foreground">Not enough data yet.</p>}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}