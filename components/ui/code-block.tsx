"use client";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { IconCheck, IconCopy } from "@tabler/icons-react";

type CodeBlockProps = {
  language: string;
  filename: string;
  highlightLines?: number[];
} & (
  | {
      code: string;
      tabs?: never;
    }
  | {
      code?: never;
      tabs: Array<{
        name: string;
        code: string;
        language?: string;
        highlightLines?: number[];
      }>;
    }
);

export const CodeBlock = ({
  language,
  filename,
  code,
  highlightLines = [],
  tabs = [],
}: CodeBlockProps) => {
  const [copied, setCopied] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);

  const tabsExist = tabs.length > 0;

  const copyToClipboard = () => {
    const textToCopy = tabsExist ? tabs[activeTab].code : code;
    if (!textToCopy) return;

    // Use document.execCommand for broader compatibility, especially in iframes.
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    textArea.style.position = "fixed"; // Prevent scrolling to bottom of page in MS Edge.
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
    document.body.removeChild(textArea);
  };

  const activeCode = tabsExist ? tabs[activeTab].code : code;
  const activeLanguage = tabsExist
    ? tabs[activeTab].language || language
    : language;
  const activeHighlightLines = tabsExist
    ? tabs[activeTab].highlightLines || []
    : highlightLines;

  return (
    // Main container: full height, flex column layout to separate header and content
    <div className="relative w-full h-full rounded-lg bg-slate-900 font-mono text-sm flex flex-col overflow-hidden">
      {/* Header Section: Stays fixed at the top, does not scroll */}
      <div className="flex-shrink-0 px-4 pt-4">
        <div className="flex flex-col gap-2">
          {tabsExist && (
            <div className="flex border-b border-slate-700">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-3 py-2 text-xs transition-colors font-sans rounded-t-md ${
                    activeTab === index
                      ? "text-white bg-slate-800"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          )}
          {!tabsExist && filename && (
            <div className="flex justify-between items-center pb-2">
              <div className="text-xs text-zinc-400">{filename}</div>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200 transition-colors font-sans"
              >
                {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Scrollable Code Section: Takes up the remaining space and allows scrolling */}
      <div className="relative flex-grow overflow-auto px-4 pb-4">
        <SyntaxHighlighter
          language={activeLanguage}
          style={atomDark}
          customStyle={{
            margin: 0,
            padding: 0,
            background: "transparent",
            fontSize: "0.875rem", // text-sm equivalent
          }}
          showLineNumbers={true}
          lineProps={(lineNumber) => ({
            style: {
              backgroundColor: activeHighlightLines.includes(lineNumber)
                ? "rgba(255,255,255,0.1)"
                : "transparent",
              display: "block",
            },
          })}
          PreTag="pre" // Use <pre> for semantic correctness and better code formatting
        >
          {String(activeCode ?? "")}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};
