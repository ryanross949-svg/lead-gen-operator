// src/actions/feedback.ts
"use server"

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createFeedback(formData: FormData) {
  const type = formData.get("type") as string;
  const outcome = formData.get("outcome") as string;
  const coreIssue = formData.get("coreIssue") as string;
  const insight = formData.get("insight") as string;
  const ruleUpdate = formData.get("ruleUpdate") as string;

  if (!type || !outcome || !insight || !ruleUpdate) {
    return;
  }

  // 1. Create the interaction log
  const interaction = await prisma.interactionLog.create({
    data: {
      category: type,
      isResolved: true,
    },
  });

  // 2. Attach the fast-capture feedback
  await prisma.feedback.create({
    data: {
      interactionId: interaction.id,
      type,
      outcome,
      coreIssue,
      insight,
      ruleUpdate,
    },
  });

  // Refresh the page data
  revalidatePath("/feedback");
}