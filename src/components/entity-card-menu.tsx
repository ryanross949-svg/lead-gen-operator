"use client"

import { useState, useTransition } from "react"
import { MoreHorizontal, Trash, ArrowRight, Loader2 } from "lucide-react"
import { updateSellerStatus, deleteSeller, updateBuyerStatus, deleteBuyer } from "@/actions/deal"

const sellerStages = [
  { label: "Target Sellers", value: "PROSPECTED" },
  { label: "Engaged Sellers", value: "ACTIVE" },
  { label: "Unresponsive", value: "UNRESPONSIVE" },
]

const buyerStages = [
  { label: "Buyers in Convo", value: "CONTACTED" },
  { label: "Qualified Buyers", value: "QUALIFIED" },
  { label: "Rejected", value: "REJECTED" },
]

export function EntityCardMenu({ id, type }: { id: string, type: "seller" | "buyer" }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const stages = type === "seller" ? sellerStages : buyerStages

  const handleMove = (status: string) => {
    setIsOpen(false)
    startTransition(() => {
      if (type === "seller") updateSellerStatus(id, status)
      if (type === "buyer") updateBuyerStatus(id, status)
    })
  }

  const handleDelete = () => {
    setIsOpen(false)
    startTransition(() => {
      if (type === "seller") deleteSeller(id)
      if (type === "buyer") deleteBuyer(id)
    })
  }

  return (
    <div className="absolute top-2 right-2 z-10">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted"
      >
        {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <MoreHorizontal className="h-4 w-4" />}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-1 w-44 rounded-md border bg-white shadow-md z-20">
          <div className="p-1">
            <p className="px-2 py-1.5 text-xs font-semibold text-gray-500">Move to...</p>
            {stages.map((stage) => (
              <button 
                key={stage.value} 
                onClick={() => handleMove(stage.value)} 
                className="flex items-center w-full text-left px-2 py-1.5 text-sm rounded hover:bg-gray-100"
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                {stage.label}
              </button>
            ))}
            <div className="my-1 border-t" />
            <button 
              onClick={handleDelete} 
              className="flex items-center w-full text-left px-2 py-1.5 text-sm text-red-600 rounded hover:bg-red-50"
            >
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  )
}