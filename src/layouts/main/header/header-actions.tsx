import { Link, useNavigate } from "@tanstack/react-router";
import { Moon, Search, Server, Sun, X } from "lucide-react";
import { get } from "lodash";

import { Avatar, AvatarFallback } from "#/components/ui/avatar";
import { Button } from "#/components/ui/button";
import { Separator } from "#/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "#/components/ui/tooltip";
import { useThemeStore } from "#/store";
import { allAccessItem } from "../navigation";

type HeaderActionsProps = {
  onSearchOpen: () => void;
};

const HeaderActions = ({ onSearchOpen }: HeaderActionsProps) => {
  const { theme, setTheme } = useThemeStore();
  const navigate = useNavigate();
  const isDark = theme === "dark";

  return (
    <>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Search"
              onClick={onSearchOpen}
            />
          }
        >
          <Search data-icon="inline-start" />
        </TooltipTrigger>
        <TooltipContent>Search</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={isDark ? "Use light theme" : "Use dark theme"}
              onClick={() => setTheme(isDark ? "light" : "dark")}
            />
          }
        >
          {isDark ? (
            <Sun data-icon="inline-start" />
          ) : (
            <Moon data-icon="inline-start" />
          )}
        </TooltipTrigger>
        <TooltipContent>{isDark ? "Light theme" : "Dark theme"}</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="MCP Server"
              onClick={() => void navigate({ to: "/mcp-server" })}
            />
          }
        >
          <Server data-icon="inline-start" />
        </TooltipTrigger>
        <TooltipContent>MCP Server</TooltipContent>
      </Tooltip>

      <div className="hidden items-center gap-0.5 sm:flex">
        <Separator orientation="vertical" className="mx-1 h-5" />

        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="X placeholder"
              />
            }
          >
            <X data-icon="inline-start" />
          </TooltipTrigger>
          <TooltipContent>X link coming soon</TooltipContent>
        </Tooltip>
        <Separator orientation="vertical" className="mx-1 h-5" />
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Account placeholder"
              />
            }
          >
            <Avatar size="sm">
              <AvatarFallback className="bg-primary text-primary-foreground">
                S
              </AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>Account coming soon</TooltipContent>
        </Tooltip>
      </div>

      <Button
        render={<Link to={get(allAccessItem, "href")} />}
        nativeButton={false}
        className="ml-1 hidden sm:inline-flex"
      >
        Get All-access
      </Button>
    </>
  );
};

export default HeaderActions;
