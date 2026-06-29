// src/lib/script-builder.ts

export type Positioning = {
  sellerCare: string;
  buyerCare: string;
  valueLost: string;
  insertYourself: string;
};

export type Angle = {
  title: string;
  message: string;
};

export type Variation = {
  tone: string;
  message: string;
};

export type Component = {
  type: string;
  text: string;
};

export function generatePositioning(niche: string): Positioning {
  const n = niche || "this niche";
  return {
    sellerCare: `Sellers in ${n} care about getting more sales without doing extra work. They want ready-to-buy customers, not window shoppers.`,
    buyerCare: `Buyers in ${n} care about finding a reliable source quickly. They don't want to jump through hoops to give someone their money.`,
    valueLost: `The value is lost because sellers don't have a clean intake system for people in their comments, and buyers get ignored or distracted.`,
    insertYourself: `You insert yourself by capturing the buyer's intent, qualifying them, and dropping them directly into the seller's DMs as a warm lead.`
  };
}

export function generateAngles(niche: string): Angle[] {
  const n = niche || "your videos";
  return [
    { title: "Problem Angle", message: `People are asking to buy in your comments but not getting clear direction. I handle that.` },
    { title: "Opportunity Angle", message: `I can bring people who are already ready to buy from your ${n} content.` },
    { title: "Efficiency Angle", message: `You’re leaving buyers on the table. I can clean up that intake so you just get the orders.` },
    { title: "System Angle", message: `You don't have a clean intake system for buyers. I do. Let me send them your way.` }
  ];
}

export function generateVariations(): Variation[] {
  return [
    { tone: "Direct", message: "I have someone ready to buy — are you taking orders?" },
    { tone: "Casual", message: "Hey — got someone looking to buy right now. You open to taking orders?" },
    { tone: "Curious", message: "How are you handling people trying to buy right now?" },
    { tone: "Assertive", message: "I’m sending a buyer your way. Let me know if you can take the order today." },
    { tone: "Minimal", message: "Are you currently taking buyers?" }
  ];
}

export function generateComponents(niche: string): Component[] {
  const n = niche || "this";
  return [
    { type: "Opener", text: `Hey — quick question about ${n}.` },
    { type: "Value Drop", text: "I just spoke with someone who’s ready to buy." },
    { type: "Transition", text: "I can connect you guys directly." },
    { type: "Close", text: "If that works, I’ll set it up now." }
  ];
}