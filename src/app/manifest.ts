import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Countersign | Human-Verified AI Work Hub & Model Evaluation Studio",
    short_name: "Countersign",
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
