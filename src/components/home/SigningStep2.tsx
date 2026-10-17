"use client";

import React from "react";
import { useSelectedCountry } from "@/components/ui/CountrySelector";
import { countryLabel } from "@/lib/utils/country";

export function SigningStep2() {
  const code = useSelectedCountry();

  let target = "open to your country";
  if (code === "NG") {
    target = "open to Nigeria";
  } else if (code === "US") {
    target = "open to the US";
  } else if (code === "GB") {
    target = "open to the UK";
  } else if (code === "CA") {
    target = "open to Canada";
  } else if (code !== "WW") {
    target = `open to ${countryLabel(code, "withArticle")}`;
  }

  return (
    <p className="text-base sm:text-lg text-muted leading-relaxed m-0">
      Countries, pay and qualification tests, word for word. &ldquo;Remote&rdquo; never counts as &ldquo;{target}&rdquo;.
    </p>
  );
}
