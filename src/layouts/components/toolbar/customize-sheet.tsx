import { useState } from "react";
import { Check, Copy, ListFilter, RotateCcw, Share2 } from "lucide-react";
import { endsWith, get, map, startCase } from "lodash";

import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "#/components/ui/sheet";
import {
  customizeBaseColors,
  customizeColorScales,
  customizeFonts,
  customizePresets,
  customizeRadii,
  getCustomizeShareUrl,
  useCustomizeStore,
  type CustomizeConfig,
} from "#/store";

const labels = {
  preset: "Theme preset",
  baseColor: "Base color",
  colorScale: "Color scale",
  radius: "Radius",
  fontFamily: "Font family",
} as const;

const formatLabel = (value: string) =>
  endsWith(value, "rem") ? value : startCase(value);

async function copyText(value: string) {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    // Fall through to the browser-compatible copy fallback.
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  return copied;
}

function CustomizeField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-1.5 text-sm" htmlFor={`customize-${label}`}>
      <span className="font-medium">{label}</span>
      <select
        id={`customize-${label}`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-9 w-full rounded-md border border-input bg-background px-2.5 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
      >
        {map(options, (option) => (
          <option key={option} value={option}>
            {formatLabel(option)}
          </option>
        ))}
      </select>
    </label>
  );
}

const CustomizeSheet = () => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const config = useCustomizeStore();
  const setConfig = useCustomizeStore((state) => state.setConfig);
  const reset = useCustomizeStore((state) => state.reset);

  const handleShare = async () => {
    const url = getCustomizeShareUrl(config);
    if (!url) return;

    const didCopy = await copyText(url);
    setCopyError(!didCopy);
    setCopied(didCopy);
    if (didCopy) window.setTimeout(() => setCopied(false), 1800);
  };

  const update = <TKey extends keyof CustomizeConfig>(
    key: TKey,
    value: CustomizeConfig[TKey],
  ) => setConfig({ [key]: value });

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button size="sm" className="shrink-0" aria-label="Customize theme">
            <ListFilter data-icon="inline-start" />
            Customize
          </Button>
        }
      />
      <SheetContent side="right" className="w-[min(100%,24rem)] sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Customize</SheetTitle>
          <SheetDescription>
            Tune the shared ShomaUI catalog style. Changes apply instantly.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 px-4 pb-6">
          <Card size="sm">
            <CardHeader className="gap-1">
              <CardTitle className="text-sm">Style tokens</CardTitle>
              <p className="text-xs text-muted-foreground">
                Presets affect every catalog preview and persist on this device.
              </p>
            </CardHeader>
            <CardContent className="grid gap-3">
              <CustomizeField
                label={labels.preset}
                value={config.preset}
                options={customizePresets}
                onChange={(value) =>
                  update("preset", value as CustomizeConfig["preset"])
                }
              />
              <CustomizeField
                label={labels.baseColor}
                value={config.baseColor}
                options={customizeBaseColors}
                onChange={(value) =>
                  update("baseColor", value as CustomizeConfig["baseColor"])
                }
              />
              <CustomizeField
                label={labels.colorScale}
                value={config.colorScale}
                options={customizeColorScales}
                onChange={(value) =>
                  update("colorScale", value as CustomizeConfig["colorScale"])
                }
              />
              <CustomizeField
                label={labels.radius}
                value={config.radius}
                options={customizeRadii}
                onChange={(value) =>
                  update("radius", value as CustomizeConfig["radius"])
                }
              />
              <CustomizeField
                label={labels.fontFamily}
                value={config.fontFamily}
                options={customizeFonts}
                onChange={(value) =>
                  update("fontFamily", value as CustomizeConfig["fontFamily"])
                }
              />
            </CardContent>
          </Card>

          <div className="flex items-center justify-between rounded-lg border bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
            <span>Active preset</span>
            <Badge variant="outline">
              {formatLabel(get(config, "preset"))}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={reset}>
              <RotateCcw data-icon="inline-start" />
              Reset
            </Button>
            <Button variant="outline" onClick={handleShare}>
              {copied ? (
                <Check data-icon="inline-start" />
              ) : (
                <Share2 data-icon="inline-start" />
              )}
              {copied ? "Copied" : copyError ? "Retry share" : "Share"}
            </Button>
          </div>

          {copied ? (
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Copy className="size-3.5" />
              Config URL copied to clipboard.
            </p>
          ) : copyError ? (
            <p className="text-xs text-destructive">
              Clipboard access is unavailable. Please try again.
            </p>
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CustomizeSheet;
