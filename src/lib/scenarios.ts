// src/lib/scenarios.ts

export type Scenario = {
  id: string;
  title: string;
  category: "Buyer" | "Seller" | "Deal" | "Negotiation";
  script: string;
  reasoning: string;
  nextAction: string;
};

export const scenarios: Scenario[] = [
  // 🟣 BUYER SIDE
  {
    id: "buyer_first_message",
    title: "Buyer: First Message (Intent)",
    category: "Buyer",
    script: "Hey — saw you were asking about that. Are you still trying to get one?",
    reasoning: "Very simple, low friction. Immediately qualifies if they are still in the market.",
    nextAction: "If serious → ask budget. If not → drop."
  },
  {
    id: "buyer_qualified",
    title: "Buyer: Qualified / Ready",
    category: "Buyer",
    script: "Got it — I can connect you directly with the person handling orders. Easiest way is a quick intro.",
    reasoning: "Moves fast to action, no friction.",
    nextAction: "Confirm with seller → then connect."
  },
  {
    id: "buyer_unsure",
    title: "Buyer: Unsure",
    category: "Buyer",
    script: "No worries — just lmk when you're serious about getting one.",
    reasoning: "Disqualifies politely and saves time. Don't chase low intent.",
    nextAction: "Stop chasing. Move on."
  },
  {
    id: "buyer_ghosted",
    title: "Buyer: Ghosted",
    category: "Buyer",
    script: "Still trying to get it or nah?",
    reasoning: "Casual + low-pressure re-engagement.",
    nextAction: "If no response → drop permanently."
  },

  // 🔵 SELLER SIDE
  {
    id: "seller_first_touch",
    title: "Seller: First Touch",
    category: "Seller",
    script: "Hey — quick question. How are you currently handling people trying to buy from your videos?",
    reasoning: "Non-sales, low friction. Opens conversation about their current process.",
    nextAction: "Wait for response. If engaged → mention you have a buyer ready."
  },
  {
    id: "seller_interested",
    title: "Seller: Have a Buyer Ready",
    category: "Seller",
    script: "Quick heads up — I just spoke with someone from your comments who’s ready to buy. Are you currently taking orders right now?",
    reasoning: "Leads with value, not a pitch. Forces clarity on their readiness.",
    nextAction: "If yes → move to setting price."
  },
  {
    id: "seller_setting_price",
    title: "Seller: Setting Price (CRITICAL)",
    category: "Seller",
    script: "I can connect you guys directly. For these I usually do $20–$50 per confirmed buyer. If that works, I’ll set it up now.",
    reasoning: "Sets expectation BEFORE giving value. Anchors your price.",
    nextAction: "If yes → connect. If unsure → offer ONE test."
  },
  {
    id: "seller_free_leads",
    title: "Seller: Asks for Free Leads / Test",
    category: "Seller",
    script: "No worries. I’ll connect this one so you can see the quality. After that we can keep it simple going forward.",
    reasoning: "Reduces resistance while protecting future leverage. ONLY allow this once.",
    nextAction: "Track outcome → enforce payment after."
  },
  {
    id: "seller_payment_pushback",
    title: "Seller: Pushes Back on Payment",
    category: "Seller",
    script: "Totally fair. I only focus on people who are actually ready to buy, so it usually works out clean. Happy to show with one and go from there.",
    reasoning: "Reframes value instead of arguing. Holds boundary while allowing entry.",
    nextAction: "If still resistant → walk or do one test."
  },
  {
    id: "seller_pay_after_close",
    title: "Seller: Wants 'Pay After Close'",
    category: "Seller",
    script: "I focus on delivering ready buyers, not managing the close. That’s why I keep it simple per qualified lead.",
    reasoning: "Prevents shifting responsibility onto you.",
    nextAction: "Hold boundary. Do not manage their sales process."
  },
  {
    id: "seller_ghosted",
    title: "Seller: Ghosted",
    category: "Seller",
    script: "Still good on taking buyers?",
    reasoning: "Simple and direct. Gives chance to recover without chasing.",
    nextAction: "Send 1 follow-up. If no response → drop and blacklist."
  },

  // 🔷 DEAL / CONNECTION
  {
    id: "deal_group_chat",
    title: "Deal: Group Chat Setup",
    category: "Deal",
    script: "[Buyer] is ready to buy \n [Seller] handles orders directly \n I’ll let you guys take it from here",
    reasoning: "Clean, neutral, no interference or over-explaining.",
    nextAction: "Go silent and observe."
  },

  // 🔥 NEGOTIATION / OBJECTIONS
  {
    id: "negotiation_bad_leads",
    title: "Negotiation: Seller says 'Bad Lead'",
    category: "Negotiation",
    script: "Makes sense. That’s why I qualify for intent and budget before connecting. We can keep it clean and only continue if it converts.",
    reasoning: "Takes control instead of arguing. Re-establishes your filter.",
    nextAction: "Refine qualification system for next time."
  },
  {
    id: "negotiation_lower_price",
    title: "Negotiation: Seller says 'Lower Price'",
    category: "Negotiation",
    script: "I keep it consistent per qualified buyer. If volume increases we can revisit later.",
    reasoning: "Stops downward negotiation without conflict.",
    nextAction: "Hold rate."
  },
  {
    id: "negotiation_send_more",
    title: "Negotiation: Seller says 'Send More First'",
    category: "Negotiation",
    script: "I only do one test — after that we keep it structured.",
    reasoning: "Protects your leverage. Prevents you from being a free lead source.",
    nextAction: "Hold boundary firmly."
  }
];