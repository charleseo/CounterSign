import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TraceBase | Human-verified AI work hub and model evaluation studio",
    short_name: "TraceBase",
    description:
      "AI work, checked by a human. Model answers, checked against the source.",
    start_url: "/",
    display: "standalone",
    background_color: "#070a10",
    theme_color: "#070a10",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  };
}
