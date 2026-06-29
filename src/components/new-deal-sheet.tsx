"use client"

import { useState } from "react"
import { buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"
import { createSeller, createBuyer } from "@/actions/deal"
import { cn } from "@/lib/utils"

export function NewDealSheet() {
  const [isOpen, setIsOpen] = useState(false)
  const [entityType, setEntityType] = useState<"seller" | "buyer">("seller")

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className={cn(buttonVariants({ variant: "default" }))}>
        <Plus className="h-4 w-4 mr-2" />
        Add Entity
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add New Entity</SheetTitle>
          <SheetDescription>
            Add a buyer or seller to your pipeline.
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex gap-2 py-4">
          <button 
            className={cn(buttonVariants({ variant: entityType === "seller" ? "default" : "outline" }), "flex-1")}
            onClick={() => setEntityType("seller")}
          >
            Add Seller
          </button>
          <button 
            className={cn(buttonVariants({ variant: entityType === "buyer" ? "default" : "outline" }), "flex-1")}
            onClick={() => setEntityType("buyer")}
          >
            Add Buyer
          </button>
        </div>

        <form 
          action={async (formData) => {
            if (entityType === "seller") {
              await createSeller(formData)
            } else {
              await createBuyer(formData)
            }
            setIsOpen(false)
          }} 
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="name">{entityType === "seller" ? "Seller Name / Company" : "Buyer Name"}</Label>
            <Input id="name" name="name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactInfo">TikTok Handle / Contact</Label>
            <Input id="contactInfo" name="contactInfo" placeholder="@handle" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="niche">{entityType === "seller" ? "Product" : "Product Interest"}</Label>
            <Input id="niche" name="niche" placeholder="e.g. Skincare, Fitness" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Initial Notes / First Impression</Label>
            <Textarea id="notes" name="notes" placeholder="Any context..." />
          </div>
          <SheetFooter>
            <button type="submit" className={cn(buttonVariants({ variant: "default" }))}>
              Save {entityType === "seller" ? "Seller" : "Buyer"}
            </button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}