// src/app/page.tsx
import { prisma } from "@/lib/db";
import { KanbanSquare, Zap, Link2, Brain, AlertTriangle, Info } from "lucide-react";
import { NewDealSheet } from "@/components/new-deal-sheet";
import { EntityCardMenu } from "@/components/entity-card-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const pipelineColumns = [
  { id: "target", title: "Target Sellers", color: "bg-slate-200", sellerStatus: "PROSPECTED" },
  { id: "engaged", title: "Engaged Sellers", color: "bg-blue-200", sellerStatus: "ACTIVE" },
  { id: "contacted", title: "Buyers in Convo", color: "bg-purple-200", buyerStatus: "CONTACTED" },
  { id: "qualified", title: "Qualified Buyers", color: "bg-indigo-200", buyerStatus: "QUALIFIED" },
];

export default async function Dashboard() {
  const sellers = await prisma.seller.findMany();
  const buyers = await prisma.buyer.findMany();
  const feedbacks = await prisma.feedback.findMany({ orderBy: { createdAt: "desc" }, take: 5 });

  const sellerActions = sellers.filter(s => s.status === "PROSPECTED" && !s.hasRealProduct);
  const buyerActions = buyers.filter(b => b.hasIntent && !b.hasBudget);
  const readyBuyers = buyers.filter(b => b.status === "QUALIFIED");
  const readySellers = sellers.filter(s => s.status === "ACTIVE");
  const readyToConnect = readyBuyers.length > 0 && readySellers.length > 0;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <KanbanSquare className="h-6 w-6" />
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Action-driven system. Execute without thinking.
          </p>
        </div>
        <NewDealSheet />
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-blue-600">
            <Info className="h-5 w-5" /> When to Move Cards
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div><span className="font-bold text-foreground">Target → Engaged:</span> Seller replies "Yes, I can take orders".</div>
          <div><span className="font-bold text-foreground">In Convo → Qualified:</span> Buyer confirms they have the budget.</div>
          <div><span className="font-bold text-foreground">→ Unresponsive:</span> Followed up twice, no reply.</div>
          <div><span className="font-bold text-foreground">→ Rejected:</span> Buyer says "just looking" or ghosts.</div>
        </CardContent>
      </Card>

      <Card className="bg-red-50 border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-red-600">
            <Zap className="h-5 w-5" /> Action Queue (Do Now)
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 rounded-md bg-white border">
            <h4 className="text-xs font-bold uppercase text-muted-foreground mb-2">Seller Follow-ups</h4>
            {sellerActions.length > 0 ? (
              sellerActions.map(s => <div key={s.id} className="text-sm mb-1">→ Follow up with <span className="font-semibold">{s.name}</span></div>)
            ) : <p className="text-sm text-muted-foreground">No actions.</p>}
          </div>
          <div className="p-3 rounded-md bg-white border">
            <h4 className="text-xs font-bold uppercase text-muted-foreground mb-2">Buyer Questions</h4>
            {buyerActions.length > 0 ? (
              buyerActions.map(b => <div key={b.id} className="text-sm mb-1">→ Ask <span className="font-semibold">{b.name}</span> for budget</div>)
            ) : <p className="text-sm text-muted-foreground">No actions.</p>}
          </div>
          <div className="p-3 rounded-md bg-white border">
            <h4 className="text-xs font-bold uppercase text-muted-foreground mb-2">Connections</h4>
            {readyToConnect ? (
              <div className="text-sm mb-1 font-semibold text-green-600">→ Connect {readyBuyers[0].name} with {readySellers[0].name}</div>
            ) : <p className="text-sm text-muted-foreground">No connections ready.</p>}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {pipelineColumns.map((col) => {
            let cards: React.ReactNode[] = [];

            if (col.sellerStatus) {
              cards = sellers.filter(s => s.status === col.sellerStatus).map(s => (
                <div key={s.id} className="group relative p-3 rounded-md bg-white border shadow-sm">
                  <EntityCardMenu id={s.id} type="seller" />
                  <div className="flex justify-between items-start pr-6">
                    <p className="font-medium text-sm">{s.name}</p>
                  </div>
                  {s.niche && <p className="text-xs text-muted-foreground mt-1">Product: {s.niche}</p>}
                  <div className="mt-2 pt-2 border-t text-xs font-medium text-blue-600">
                    Next: {s.status === 'PROSPECTED' ? 'Outreach / Find Buyer' : 'Set Price / Connect'}
                  </div>
                </div>
              ));
            } else if (col.buyerStatus) {
              cards = buyers.filter(b => b.status === col.buyerStatus).map(b => (
                <div key={b.id} className="group relative p-3 rounded-md bg-white border shadow-sm">
                  <EntityCardMenu id={b.id} type="buyer" />
                  <div className="flex justify-between items-start pr-6">
                    <p className="font-medium text-sm">{b.name}</p>
                  </div>
                  {b.niche && <p className="text-xs text-muted-foreground mt-1">Wants: {b.niche}</p>}
                  <div className="mt-2 pt-2 border-t text-xs font-medium text-blue-600">
                    Next: {b.status === 'CONTACTED' ? 'Qualify Intent/Budget' : 'Find Seller / Connect'}
                  </div>
                </div>
              ));
            }

            return (
              <div key={col.id} className="flex flex-col w-72 shrink-0 rounded-lg border bg-white text-card-foreground">
                <div className={`flex items-center justify-between p-3 border-b rounded-t-lg ${col.color}`}>
                  <h3 className="text-sm font-semibold text-foreground">{col.title}</h3>
                  <span className="text-xs bg-white/50 px-2 py-0.5 rounded-full text-foreground/70">{cards.length}</span>
                </div>
                <div className="p-3 flex flex-col gap-3 flex-1 min-h-[200px] bg-gray-50">
                  {cards.length > 0 ? cards : (
                    <div className="h-20 border border-dashed rounded-md flex items-center justify-center text-xs text-muted-foreground/50">Empty</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex flex-col gap-4">
          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm"><Link2 className="h-4 w-4" /> Ready to Connect</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              {readyToConnect ? (
                <>
                  <div className="p-2 rounded bg-white border"><span className="font-bold">Buyer:</span> {readyBuyers[0].name}</div>
                  <div className="p-2 rounded bg-white border"><span className="font-bold">Seller:</span> {readySellers[0].name}</div>
                  <button className="w-full mt-2 bg-green-600 text-white text-sm font-medium py-2 rounded hover:bg-green-700">Connect Now</button>
                </>
              ) : <p className="text-muted-foreground">No qualified matches yet.</p>}
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm"><Brain className="h-4 w-4" /> Intel Snapshot</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              {feedbacks.length > 0 ? (
                feedbacks.map(f => (
                  <div key={f.id} className="border-b pb-2">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <AlertTriangle className="h-3 w-3" /> {f.coreIssue || "Issue"}
                    </div>
                    <p className="text-xs font-medium">{f.ruleUpdate}</p>
                  </div>
                ))
              ) : <p className="text-muted-foreground">No feedback logged yet.</p>}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}