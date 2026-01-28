import { cn } from "@/lib/utils";
import Image, { type ImageProps } from "next/image";
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Badge } from "./ui/badge";

const CALLOUT_COLOR_CLASSES: Record<string, string> = {
  default: "bg-muted/40 border-border",
  default_background: "bg-muted/40 border-border",
  gray: "bg-muted/40 border-border",
  gray_background: "bg-muted border-border",
  brown: "bg-amber-50 dark:bg-amber-950/25 border-amber-200 dark:border-amber-900/40",
  brown_background:
    "bg-amber-50 dark:bg-amber-950/25 border-amber-200 dark:border-amber-900/40",
  orange:
    "bg-orange-50 dark:bg-orange-950/25 border-orange-200 dark:border-orange-900/40",
  orange_background:
    "bg-orange-50 dark:bg-orange-950/25 border-orange-200 dark:border-orange-900/40",
  yellow:
    "bg-yellow-50 dark:bg-yellow-950/25 border-yellow-200 dark:border-yellow-900/40",
  yellow_background:
    "bg-yellow-50 dark:bg-yellow-950/25 border-yellow-200 dark:border-yellow-900/40",
  green:
    "bg-emerald-50 dark:bg-emerald-950/25 border-emerald-200 dark:border-emerald-900/40",
  green_background:
    "bg-emerald-50 dark:bg-emerald-950/25 border-emerald-200 dark:border-emerald-900/40",
  blue: "bg-blue-50 dark:bg-blue-950/25 border-blue-200 dark:border-blue-900/40",
  blue_background:
    "bg-blue-50 dark:bg-blue-950/25 border-blue-200 dark:border-blue-900/40",
  purple:
    "bg-purple-50 dark:bg-purple-950/25 border-purple-200 dark:border-purple-900/40",
  purple_background:
    "bg-purple-50 dark:bg-purple-950/25 border-purple-200 dark:border-purple-900/40",
  pink: "bg-pink-50 dark:bg-pink-950/25 border-pink-200 dark:border-pink-900/40",
  pink_background:
    "bg-pink-50 dark:bg-pink-950/25 border-pink-200 dark:border-pink-900/40",
  red: "bg-red-50 dark:bg-red-950/25 border-red-200 dark:border-red-900/40",
  red_background:
    "bg-red-50 dark:bg-red-950/25 border-red-200 dark:border-red-900/40",
};

const components = {
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1 className="mb-4 font-bold text-4xl">{children}</h1>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="mb-4">{children}</p>
  ),
  a: ({ children, href }: { children?: React.ReactNode; href?: string }) => (
    <a href={href} className="text-blue-500">
      {children}
    </a>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="mb-4 list-disc pl-5">{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="mb-4 list-decimal pl-5">{children}</ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="mb-2">{children}</li>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => {
    const childrenArray = React.Children.toArray(children);
    const firstChild = childrenArray[0];

    if (React.isValidElement(firstChild)) {
      const pChildren = React.Children.toArray(
        (firstChild.props as { children?: React.ReactNode }).children
      );
      const marker = pChildren[0];

      if (
        React.isValidElement(marker) &&
        marker.type === "span" &&
        (marker.props as any)?.["data-callout"]
      ) {
        const icon = (marker.props as any)?.["data-icon"] ?? "💡";
        const color = String((marker.props as any)?.["data-color"] ?? "default");
        const colorClass = CALLOUT_COLOR_CLASSES[color] ?? CALLOUT_COLOR_CLASSES.default;

        const newPChildren = pChildren.slice(1);
        if (typeof newPChildren[0] === "string") {
          newPChildren[0] = newPChildren[0].replace(/^ /, "");
        }

        const firstParagraphIsEmpty =
          newPChildren.length === 0 ||
          newPChildren.every(
            (node) => typeof node === "string" && node.trim().length === 0
          );

        const contentChildren = firstParagraphIsEmpty
          ? childrenArray.slice(1)
          : [
              React.cloneElement(
                firstChild as React.ReactElement<any>,
                {},
                newPChildren
              ),
              ...childrenArray.slice(1),
            ];

        return (
          <div
            className={cn(
              "my-6 flex gap-3 rounded-md border px-4 py-3",
              "text-foreground",
              colorClass
            )}
          >
            <div className="mt-0.5 select-none text-lg leading-none">{icon}</div>
            <div className="min-w-0 flex-1">{contentChildren}</div>
          </div>
        );
      }
    }

    return (
      <blockquote className="mb-4 border-neutral-300 border-l-2 py-2 pl-4 italic">
        {children}
      </blockquote>
    );
  },
  code: ({
    className,
    children,
    ...props
  }: {
    className?: string;
    children?: React.ReactNode;
  }) => {
    const match = /language-(\w+)/.exec(className || "");
    return match ? (
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={match[1]}
        PreTag="div"
        {...props}
        className="rounded-md [&>code]:bg-transparent [&>code]:p-2 [&>code]:rounded-md"
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <Badge variant="pre" className="font-mono rounded-md text-sm">
        {children}
      </Badge>
    );
  },
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
    return <pre className={cn("bg-transparent p-0", className)} {...props} />;
  },
  img: ({ src, alt }: { src?: string | Blob; alt?: string }) => {
    const imageUrl = src
      ? typeof src === "string"
        ? src
        : URL.createObjectURL(src)
      : "";
    
    // Notion 이미지 URL 처리
    const isNotionImage = imageUrl.includes('notion.so') || imageUrl.includes('s3');
    
    return (
      <span className="block my-6">
        <Image
          src={imageUrl}
          alt={alt || "Image"}
          className="h-auto w-full rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          width={1200}
          height={675}
          unoptimized={isNotionImage} // Notion 이미지는 최적화 비활성화
          loading="lazy"
        />
        {alt && (
          <span className="block mt-2 text-center text-sm text-muted-foreground italic">
            {alt}
          </span>
        )}
      </span>
    );
  },
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="mb-2 font-bold text-2xl">{children}</h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="mb-1 font-bold text-xl">{children}</h3>
  ),
  h4: ({ children }: { children?: React.ReactNode }) => (
    <h4 className="mb-1 font-bold text-lg">{children}</h4>
  ),
  h5: ({ children }: { children?: React.ReactNode }) => (
    <h5 className="mb-1 font-bold text-base">{children}</h5>
  ),
  h6: ({ children }: { children?: React.ReactNode }) => (
    <h6 className="mb-1 font-bold text-sm">{children}</h6>
  ),
  table: ({ children }: { children?: React.ReactNode }) => (
    <Table className="rounded-md">{children}</Table>
  ),
  thead: ({ children }: { children?: React.ReactNode }) => (
    <TableHeader className="bg-muted first:rounded-t-md">
      {children}
    </TableHeader>
  ),
  tbody: ({ children }: { children?: React.ReactNode }) => (
    <TableBody className="[&>tr:nth-child(even)]:bg-muted/50">
      {children}
    </TableBody>
  ),
  tr: ({ children }: { children?: React.ReactNode }) => (
    <TableRow className="border-border group">{children}</TableRow>
  ),
  td: ({ children }: { children?: React.ReactNode }) => (
    <TableCell className="border-r border-border last:border-r-0 group-last:first:rounded-bl-md group-last:last:rounded-br-md">
      {children}
    </TableCell>
  ),
  th: ({ children }: { children?: React.ReactNode }) => (
    <TableHead className="font-bold  border-r border-border last:border-r-0 first:rounded-tl-md last:rounded-tr-md">
      {children}
    </TableHead>
  ),
};

export { components };
