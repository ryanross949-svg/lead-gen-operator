// src/lib/playbook.ts

export type CoreSection = {
  id: string;
  title: string;
  whatItMeans: string;
  whatPeopleDoWrong: string;
  whatToDoInstead: string;
  actionSteps: string[];
  warningSigns: string[];
};

export const foundationalRules: string[] = [
  "Never transfer value before setting terms.",
  "Intent + budget defines a real buyer.",
  "Cooperation matters more than capability.",
  "One test maximum — no exceptions.",
  "If something feels unclear → ask one question → decide immediately.",
  "Speed matters, but learning matters more.",
  "Every interaction must produce a lesson.",
  "Don’t chase — filter.",
  "You are matching demand, not creating it.",
  "If the system breaks → update the system."
];

export const playbookSections: CoreSection[] = [
  {
    id: "find-sellers",
    title: "1. How to Find Sellers",
    whatItMeans: "You are looking for real businesses with existing demand but poor intake systems. 'Imperfect but working' is ideal.",
    whatPeopleDoWrong: "They target massive brands with dedicated teams, or they target accounts with zero comment demand.",
    whatToDoInstead: "Find creators with high views and comment sections full of 'where do I buy this?' but no link in bio.",
    actionSteps: [
      "Search TikTok for niche products.",
      "Filter for videos with high engagement but no obvious purchase link.",
      "Read comments for buying intent signals.",
      "DM the creator using the First Contact framework."
    ],
    warningSigns: ["No comments asking to buy (no demand).", "Account is too polished (they already have a sales team)."]
  },
  {
    id: "find-buyers",
    title: "2. How to Find Buyers",
    whatItMeans: "You are detecting existing buying intent, not generating interest. The market speaks through behavior.",
    whatPeopleDoWrong: "They post 'who wants to buy X?' in public forums, attracting tire-kickers and low-intent people.",
    whatToDoInstead: "Go directly to people commenting 'link?' or 'how do I get this?' and DM them immediately.",
    actionSteps: [
      "Go to comment sections of popular niche videos.",
      "Find users asking for the link or how to buy.",
      "DM them: 'Hey — saw you were asking about that. Still trying to get one?'",
      "If yes, immediately qualify for budget."
    ],
    warningSigns: ["They say 'just looking'.", "They ask too many questions without giving a budget."]
  },
  {
    id: "qualify",
    title: "3. Qualification System",
    whatItMeans: "Filtering out time-wasters before you spend any energy. This is your protection layer.",
    whatPeopleDoWrong: "They assume anyone who replies is a real buyer or a real seller.",
    whatToDoInstead: "Hard filter. Buyers must have Intent + Budget. Sellers must have a Product + Responsiveness.",
    actionSteps: [
      "Buyers: Ask 'Are you looking to get this soon?'",
      "Buyers: Ask 'What's your budget?'",
      "Sellers: Ask 'Are you taking orders right now?'",
      "If any answer is weak, drop them immediately."
    ],
    warningSigns: ["Buyer says 'let me think about it'.", "Seller takes 24+ hours to reply to a warm lead intro."]
  },
  {
    id: "charge",
    title: "4. How to Charge",
    whatItMeans: "You get paid for the match, not the close. You deliver ready buyers, not sales.",
    whatPeopleDoWrong: "They agree to 'pay after close' or send free leads hoping to get paid later.",
    whatToDoInstead: "Set the price per lead BEFORE the group chat intro. $20-$50 per qualified buyer.",
    actionSteps: [
      "Tell seller: 'I usually do $20-$50 per confirmed buyer.'",
      "If they resist, offer ONE test lead.",
      "After test, enforce the rate.",
      "Get paid before the next batch."
    ],
    warningSigns: ["Seller asks for 'pay after close'.", "Seller wants 5+ free tests."]
  },
  {
    id: "deal-flow",
    title: "5. Deal Flow (The Loop)",
    whatItMeans: "The exact system: Find → Qualify → Set Terms → Connect → Observe → Log → Improve.",
    whatPeopleDoWrong: "They skip steps (usually Set Terms or Log) and the system breaks.",
    whatToDoInstead: "Follow the loop religiously. Never connect before terms. Never skip logging.",
    actionSteps: [
      "Find buyer and seller.",
      "Qualify both independently.",
      "Set price and terms with seller.",
      "Connect in group chat.",
      "Observe outcome.",
      "Log in Feedback Engine."
    ],
    warningSigns: ["Connecting before setting terms.", "Forgetting to log the interaction."]
  },
  {
    id: "failures",
    title: "6. Common Failure Patterns",
    whatItMeans: "Knowing how you will lose so you can prevent it.",
    whatPeopleDoWrong: "They repeat the same mistakes (chasing, over-explaining) and blame the market.",
    whatToDoInstead: "Pre-empt these failures. When you see them, disengage immediately.",
    actionSteps: [
      "Never send leads before setting terms.",
      "Never deal with low-intent buyers.",
      "Never over-explain what you do.",
      "Never trust unresponsive sellers."
    ],
    warningSigns: ["You feel desperate to close.", "You are writing paragraphs in DMs."]
  },
  {
    id: "scaling",
    title: "7. Scaling Strategy",
    whatItMeans: "Earning the right to automate. You must learn manually first.",
    whatPeopleDoWrong: "They try to build automation tools before they've closed 5 deals manually.",
    whatToDoInstead: "Phase 1: Manual reps. Phase 2: Refine scripts. Phase 3: Build tools.",
    actionSteps: [
      "Complete 1-5 successful manual loops.",
      "Identify your highest converting niche.",
      "Refine your scripts based on data.",
      "Only then, look to streamline or automate."
    ],
    warningSigns: ["Trying to scale a broken system.", "Automating before you understand the objections."]
  }
];

export const mentalModels: { title: string, description: string }[] = [
  { title: "Demand Already Exists", description: "You capture it, you don't create it." },
  { title: "Behavior > Words", description: "The market speaks through behavior, not words." },
  { title: "Trust is the Friction", description: "Your job is to reduce trust friction between buyer and seller." },
  { title: "Speed × Reflection", description: "Growth comes from moving fast, then thinking deeply about what happened." },
  { title: "Do Less, Think More", description: "Most people fail by doing too much, not thinking enough." }
];