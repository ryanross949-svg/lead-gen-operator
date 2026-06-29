"use client"

import { useTransition } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
  const [isPending, startTransition] = useTransition()
  const stages = type === "seller" ? sellerStages : buyerStages

  const handleMove = (status: string) => {
    startTransition(() => {
      if (type === "seller") updateSellerStatus(id, status)
      if (type === "buyer") updateBuyerStatus(id, status)
    })
  }

  const handleDelete = () => {
    startTransition(() => {
      if (type === "seller") deleteSeller(id)
      if (type === "buyer") deleteBuyer(id)
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="absolute top-2 right-2 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-muted z-10">
        {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <MoreHorizontal className="h-4 w-4" />}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Move to...</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {stages.map((stage) => (
          <DropdownMenuItem key={stage.value} onClick={() => handleMove(stage.value)} disabled={isPending}>
            <ArrowRight className="h-4 w-4 mr-2" />
            {stage.label}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete} className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/30" disabled={isPending}>
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}