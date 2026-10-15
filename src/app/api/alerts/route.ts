import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { dbRepository } from "@/lib/db/repository";

const AlertSchema = z.object({
  email: z.string().email(),
  country_code: z.string().optional().nullable(),
  work_types: z.array(z.string()).default([]),
  frequency: z.string().default("weekly"),
  userId: z.string().optional().nullable(),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const data = AlertSchema.parse(json);

    const subscription = dbRepository.saveUserAlertPreferences(
      data.userId || `guest-${Date.now()}`,
      data.email,
      data.country_code || null,
      data.work_types,
      data.frequency
    );

    return NextResponse.json({ success: true, subscription });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Invalid payload";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
