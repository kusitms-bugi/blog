"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

export default function Comments() {
  const { theme } = useTheme();

  return (
    <div className="mt-16 pt-8 border-t border-border">
      <Giscus
        id="comments"
        repo="kusitms-bugi/blog"
        repoId="R_kgDOQ7elxw"
        data-category="Announcements"
        data-category-id="DIC_kwDOQ7elx84C1EAY"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme={theme === "dark" ? "dark" : "light"}
        lang="ko"
        loading="lazy"
      />
    </div>
  );
}
