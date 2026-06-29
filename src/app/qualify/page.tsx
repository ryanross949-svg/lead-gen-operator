// src/app/qualify/page.tsx
"use client"

import { useState } from "react"
import { checklistConfig, EntityType, ChecklistState, statusConfig } from "@/lib/qualification"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ClipboardCheck, ArrowRight } from "lucide-react"

export default function QualificationPage() {
  const [entityType, setEntityType] = useState<EntityType>("buyer")
  const [checklist, setChecklist] = useState<ChecklistState>({
    hasIntent: false,
    hasBudget: false,
    hasUrgency: false,
  });

  const currentConfig = checklistConfig[entityType];
  const result = currentConfig.calculate(checklist);

  const handleToggleEntityType = (type: EntityType) => {
    setEntityType(type);
    const newChecklist: ChecklistState = {};
    checklistConfig[type].items.forEach(item => {
      newChecklist[item.id] = false;
    });
    setChecklist(newChecklist);
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setChecklist(prev => ({ ...prev, [id]: checked }));
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <ClipboardCheck className="h-6 w-6" />
          Qualification
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Adaptive, behavior-based logic. Maximize clean deals.
        </p>
      </div>

      <div className="flex gap-2">
        <Button 
          variant={entityType === "buyer" ? "default" : "outline"}
          onClick={() => handleToggleEntityType("buyer")}
        >
          Qualify Buyer
        </Button>
        <Button 
          variant={entityType === "seller" ? "default" : "outline"}
          onClick={() => handleToggleEntityType("seller")}
        >
          Qualify Seller
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{currentConfig.title}</CardTitle>
              <CardDescription className="mt-1">{currentConfig.description}</CardDescription>
            </div>
            <div className={`text-sm font-bold px-4 py-2 rounded-md text-center min-w-[150px] ${statusConfig[result.status].color}`}>
              {statusConfig[result.status].label}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentConfig.items.map((item) => (
            <div key={item.id} className="flex items-start space-x-3 p-3 rounded-md border bg-muted/20 hover:bg-muted/40 transition-colors">
              <Checkbox 
                id={item.id} 
                checked={checklist[item.id] || false}
                onCheckedChange={(checked) => handleCheckboxChange(item.id, checked as boolean)}
              />
              <label
                htmlFor={item.id}
                className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {item.label}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Next Action Generator */}
      <Card className="bg-muted/30 border-dashed">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-foreground text-background shrink-0">
            <ArrowRight className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase text-muted-foreground mb-1">Next Action Generator</h3>
            <p className="text-sm font-medium text-foreground">{result.nextAction}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}