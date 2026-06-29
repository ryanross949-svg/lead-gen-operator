// src/app/playbook/page.tsx
import { foundationalRules, playbookSections, mentalModels } from "@/lib/playbook"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BookOpen, AlertTriangle, CheckCircle, ListChecks } from "lucide-react"

export default function PlaybookPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          Operator Playbook
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          The foundational rules of the game. Read daily before executing.
        </p>
      </div>

      {/* Foundational Rules (Mandatory Top Section) */}
      <Card className="bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900">
        <CardHeader>
          <CardTitle className="text-xl text-red-600 dark:text-red-400">Foundational Rules of the Game</CardTitle>
          <CardDescription className="text-red-500/80">Non-negotiable laws. Read daily.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {foundationalRules.map((rule, i) => (
              <li key={i} className="flex items-start gap-2 text-sm font-medium text-foreground">
                <span className="text-red-500 mt-0.5">⛔</span>
                {rule}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Core Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {playbookSections.map((section) => (
          <Card key={section.id}>
            <CardHeader>
              <CardTitle className="text-lg">{section.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm">
                <span className="font-bold text-muted-foreground block mb-1">WHAT THIS REALLY MEANS</span>
                <p>{section.whatItMeans}</p>
              </div>
              
              <div className="text-sm p-3 rounded-md bg-red-50/50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/50">
                <span className="font-bold text-red-600 dark:text-red-400 block mb-1 flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> WHAT MOST PEOPLE DO WRONG</span>
                <p className="text-muted-foreground">{section.whatPeopleDoWrong}</p>
              </div>

              <div className="text-sm p-3 rounded-md bg-green-50/50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/50">
                <span className="font-bold text-green-600 dark:text-green-400 block mb-1 flex items-center gap-1"><CheckCircle className="h-3 w-3" /> WHAT YOU SHOULD DO INSTEAD</span>
                <p className="text-muted-foreground">{section.whatToDoInstead}</p>
              </div>

              <div className="text-sm">
                <span className="font-bold text-muted-foreground block mb-2 flex items-center gap-1"><ListChecks className="h-3 w-3" /> CLEAR ACTION STEPS</span>
                <ul className="space-y-1">
                  {section.actionSteps.map((step, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground">
                      <span className="font-bold mt-0.5">{i + 1}.</span> {step}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-sm">
                <span className="font-bold text-amber-600 dark:text-amber-400 block mb-1">WARNING SIGNS</span>
                <ul className="space-y-1">
                  {section.warningSigns.map((warn, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-amber-500 mt-0.5">⚠️</span> {warn}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mental Models */}
      <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900">
        <CardHeader>
          <CardTitle className="text-lg text-blue-600 dark:text-blue-400">Mental Models</CardTitle>
          <CardDescription>How to think about the game.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mentalModels.map((model, i) => (
              <div key={i} className="text-sm">
                <span className="font-bold block">{model.title}</span>
                <p className="text-muted-foreground">{model.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

    </div>
  )
}