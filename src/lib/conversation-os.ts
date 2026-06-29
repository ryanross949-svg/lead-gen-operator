// src/lib/conversation-os.ts

export type CoreLaw = string;

export type Interpretation = {
  situation: string;
  interpretation: string;
  correctMove: string;
};

export type Framework = {
  name: string;
  structure: string;
  example: string;
};

export type DecisionRule = {
  condition: string;
  action: string;
};

export const coreLaws: CoreLaw[] = [
  "Never give value before setting terms.",
  "Intent > urgency.",
  "Budget validates seriousness.",
  "One test maximum.",
  "Cooperation > capability.",
  "If unclear → ask 1 question → then drop.",
];

export const interpretationTable: Interpretation[] = [
  { situation: "Seller says 'let's see first'", interpretation: "Low trust, risk avoidance", correctMove: "Offer 1 test + pre-frame future pricing." },
  { situation: "Seller avoids payment discussion", interpretation: "High risk of non-payment", correctMove: "Limit exposure or drop." },
  { situation: "Buyer asks 100 questions", interpretation: "Lack of real intent", correctMove: "Ask budget question to disqualify." },
  { situation: "Seller says 'bad lead'", interpretation: "Shifting blame, bad closer", correctMove: "Tighten qualification, don't argue." },
  { situation: "Buyer ghosts", interpretation: "Found alternative or not serious", correctMove: "1 casual nudge, then drop permanently." },
];

export const messageFrameworks: Framework[] = [
  { 
    name: "Value Drop Framework", 
    structure: "[signal you observed] + [buyer readiness] + [question]",
    example: "I saw people trying to buy — I have someone ready, are you taking orders?"
  },
  { 
    name: "Qualification Framework", 
    structure: "Intent → Budget → Timing",
    example: "Are you looking to get this soon? What's your budget? I can set it up today."
  },
  { 
    name: "Group Chat Intro", 
    structure: "[Buyer] is ready + [Seller] handles orders + Step back",
    example: "[Buyer] is ready to buy. [Seller] handles orders directly. I'll let you guys take it from here."
  },
];

export const decisionEngine: DecisionRule[] = [
  { condition: "IF buyer real + seller ready + terms set", action: "→ Connect" },
  { condition: "IF buyer unclear", action: "→ Ask one more question" },
  { condition: "IF seller resists payment", action: "→ Allow one test or exit" },
  { condition: "IF repeated friction", action: "→ Disengage" },
];