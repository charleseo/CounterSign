"use server";

import { dbRepository } from '@/lib/db/repository';
import { stripPersonalData } from '@/lib/utils/privacy';
import { revalidatePath } from 'next/cache';
import { WeeklyScamPost } from '@/lib/db/types';

export interface PublishWeeklyScamInput {
  reportId?: string | null;
  title: string;
  paraphrasedMessage: string;
  warningSigns: string[];
  whatToDo: string[];
  reportedDate?: string;
}

export interface PublishWeeklyScamResult {
  success: boolean;
  message: string;
  post?: WeeklyScamPost;
}

export async function publishToWeeklyScamsAction(
  input: PublishWeeklyScamInput
): Promise<PublishWeeklyScamResult> {
  try {
    if (!input.title || input.title.trim().length === 0) {
      return { success: false, message: 'A descriptive title is required.' };
    }

    if (!input.paraphrasedMessage || input.paraphrasedMessage.trim().length === 0) {
      return { success: false, message: 'Paraphrased message text is required.' };
    }

    // 1. Rigorously strip personal data from all fields
    const sanitizedMessage = stripPersonalData(input.paraphrasedMessage.trim());
    const sanitizedWarningSigns = input.warningSigns
      .map((s) => stripPersonalData(s.trim()))
      .filter((s) => s.length > 0);
    const sanitizedWhatToDo = input.whatToDo
      .map((s) => stripPersonalData(s.trim()))
      .filter((s) => s.length > 0);

    // Format date in strict "12 Oct 2026" form
    const dateObj = new Date();
    const day = dateObj.getDate();
    const month = dateObj.toLocaleDateString('en-US', { month: 'short' });
    const year = dateObj.getFullYear();
    const formattedDate = input.reportedDate || `${day} ${month} ${year}`;

    // 2. Create the published weekly scam post
    const post = dbRepository.createWeeklyScam({
      title: input.title.trim(),
      reported_date: formattedDate,
      message_paraphrased: sanitizedMessage,
      warning_signs:
        sanitizedWarningSigns.length > 0
          ? sanitizedWarningSigns
          : ['Unsolicited recruitment outreach via non-corporate channels'],
      what_to_do:
        sanitizedWhatToDo.length > 0
          ? sanitizedWhatToDo
          : [
              'Do not send money or banking details.',
              'Verify the recruiter identity on the official platform portal.',
              'Report the contact attempt directly to our verification team.',
            ],
      published: true,
      source_report_id: input.reportId || null,
    });

    // 3. If tied to a report, mark it as approved
    if (input.reportId) {
      dbRepository.updateReportStatus(
        input.reportId,
        'approved',
        `Published to weekly scams: ${post.slug}`
      );
    }

    // 4. Revalidate public and admin paths outside try/catch redirects
    revalidatePath('/scams-this-week');
    revalidatePath(`/scams-this-week/${post.slug}`);
    revalidatePath('/admin/reports');
    revalidatePath('/scam-check');

    return {
      success: true,
      message: 'Weekly scam alert published successfully with personal data stripped.',
      post,
    };
  } catch {
    return {
      success: false,
      message: 'Failed to publish weekly scam alert. Please try again.',
    };
  }
}
