"use client";

import React from "react";
import { ShareButton } from "@/components/ui/ShareButton";
import { useSelectedCountry } from "@/components/ui/CountrySelector";
import { countryLabel } from "@/lib/utils/country";

interface JobShareButtonProps {
  roleTitle: string;
  orgName: string;
  checkedDate: string;
  slug: string;
  className?: string;
}

export function JobShareButton({
  roleTitle,
  orgName,
  checkedDate,
  slug,
  className = "",
}: JobShareButtonProps) {
  const countryCode = useSelectedCountry();

  const articleName = countryLabel(countryCode, "withArticle");
  const shareText = `${roleTitle} at ${orgName}. Open to people in ${articleName}, checked ${checkedDate} on TraceBase:`;

  return (
    <ShareButton
      title={`${roleTitle} at ${orgName} | TraceBase`}
      shareText={shareText}
      url={`/jobs/${slug}`}
      pageType="role"
      className={className}
      buttonText="Share role"
    />
  );
}
