// src/actions/deal.ts
"use server"

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createSeller(formData: FormData) {
  const name = formData.get("name") as string;
  const niche = formData.get("niche") as string;
  const contactInfo = formData.get("contactInfo") as string;
  const notes = formData.get("notes") as string;

  if (!name) return;

  await prisma.seller.create({
    data: {
      name,
      niche,
      contactInfo,
      notes,
      status: "PROSPECTED",
    },
  });
  revalidatePath("/");
}

export async function createBuyer(formData: FormData) {
  const name = formData.get("name") as string;
  const niche = formData.get("niche") as string;
  const contactInfo = formData.get("contactInfo") as string;
  const notes = formData.get("notes") as string;

  if (!name) return;

  await prisma.buyer.create({
    data: {
      name,
      niche,
      contactInfo,
      notes,
      status: "CONTACTED",
    },
  });
  revalidatePath("/");
}

export async function updateSellerStatus(id: string, status: string) {
  await prisma.seller.update({
    where: { id },
    data: { status },
  });
  revalidatePath("/");
}

export async function deleteSeller(id: string) {
  await prisma.seller.delete({
    where: { id },
  });
  revalidatePath("/");
}

export async function updateBuyerStatus(id: string, status: string) {
  await prisma.buyer.update({
    where: { id },
    data: { status },
  });
  revalidatePath("/");
}

export async function deleteBuyer(id: string) {
  await prisma.buyer.delete({
    where: { id },
  });
  revalidatePath("/");
}