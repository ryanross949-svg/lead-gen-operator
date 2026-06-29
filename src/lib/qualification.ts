// src/lib/qualification.ts

export type QualificationStatus = "PASS" | "RISKY" | "CONDITIONAL" | "FAIL" | "DANGER";

export type EntityType = "buyer" | "seller";

export type ChecklistState = {
  [key: string]: boolean;
};

export type QualificationResult = {
  status: QualificationStatus;
  nextAction: string;
};

// --- BUYER LOGIC ---
// Intent + Budget = PASS
// Intent + No Budget = CONDITIONAL
// No Intent = FAIL
export function calculateBuyerQualification(state: ChecklistState): QualificationResult {
  const hasIntent = state["hasIntent"];
  const hasBudget = state["hasBudget"];

  if (!hasIntent) {
    return { status: "FAIL", nextAction: "Reject always. Do not chase low intent." };
  }
  
  if (hasIntent && hasBudget) {
    return { status: "PASS", nextAction: "Connect immediately with seller." };
  }

  if (hasIntent && !hasBudget) {
    return { status: "CONDITIONAL", nextAction: "Ask one more question: 'What's your budget for it?'" };
  }

  return { status: "FAIL", nextAction: "Reject." };
}

// --- SELLER LOGIC ---
// No Product/Responsive = FAIL
// No Coop + No Pay = DANGER
// No Pay = RISKY
// All Core = PASS
export function calculateSellerQualification(state: ChecklistState): QualificationResult {
  const hasRealProduct = state["hasRealProduct"];
  const isResponsive = state["isResponsive"];
  const isCooperative = state["isCooperative"];
  const paymentWillingness = state["paymentWillingness"];

  if (!hasRealProduct || !isResponsive) {
    return { status: "FAIL", nextAction: "Reject. Cannot deliver or ghosting." };
  }

  if (!isCooperative && !paymentWillingness) {
    return { status: "DANGER", nextAction: "Hard avoid. Disengage immediately." };
  }

  if (!paymentWillingness) {
    return { status: "RISKY", nextAction: "High risk. Test cooperation or limit exposure." };
  }

  if (!isCooperative) {
    return { status: "RISKY", nextAction: "Watch closely. May require hand-holding to close." };
  }

  return { status: "PASS", nextAction: "Move to setting price and connecting." };
}

export const checklistConfig = {
  buyer: {
    title: "Buyer Qualification",
    description: "Intent + Budget are mandatory. Urgency is optional.",
    calculate: calculateBuyerQualification,
    items: [
      { id: "hasIntent", label: "Intent (REQUIRED): Explicitly wants to buy, asking how to pay." },
      { id: "hasBudget", label: "Budget (REQUIRED): Confirms price range, doesn't hesitate." },
      { id: "hasUrgency", label: "Urgency (OPTIONAL): Wants it soon, says 'now'." },
    ]
  },
  seller: {
    title: "Seller Qualification",
    description: "Must be able to deliver AND willing to cooperate.",
    calculate: calculateSellerQualification,
    items: [
      { id: "hasRealProduct", label: "Product (REQUIRED): Has real product/service, can deliver." },
      { id: "isResponsive", label: "Responsiveness (REQUIRED): Replies within reasonable time." },
      { id: "isCooperative", label: "Cooperation (CRITICAL): Open to external buyers, not defensive." },
      { id: "paymentWillingness", label: "Payment Willingness (CRITICAL): Open to at least test structure." },
      { id: "canCloseLeads", label: "Close Capability (SECONDARY): Has basic ability to convert." },
    ]
  }
};

export const statusConfig = {
  PASS: { label: "✅ Qualified", color: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300" },
  CONDITIONAL: { label: "⚠️ Needs 1 More Question", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" },
  RISKY: { label: "⚠️ Risky", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" },
  FAIL: { label: "❌ Reject", color: "bg-gray-100 text-gray-700 dark:bg-gray-800/40 dark:text-gray-400" },
  DANGER: { label: "🚨 Dangerous / Low-Integrity", color: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300" },
};