import { Check, Copy } from "lucide-react";
import { get, toString } from "lodash";
import { useState, type ButtonHTMLAttributes, type ReactNode } from "react";

import { Button } from "#/components/shomaui/button";

export type CopyButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick"
> & {
  value: string;
  children?: ReactNode;
};

export function CopyButton({
  value,
  children = "Copy",
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const copyValue = async () => {
    await navigator.clipboard.writeText(toString(value));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <Button
      {...props}
      type="button"
      variant="outline"
      onClick={copyValue}
      aria-live="polite"
    >
      {copied ? (
        <Check data-icon="inline-start" />
      ) : (
        <Copy data-icon="inline-start" />
      )}
      {copied ? "Copied" : get({ children }, "children", "Copy")}
    </Button>
  );
}

export default CopyButton;
