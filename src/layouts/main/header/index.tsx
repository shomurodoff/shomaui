import { useState } from "react";
import { TooltipProvider } from "#/components/ui/tooltip";
import DesktopNavigation from "./desktop-navigation";
import HeaderActions from "./header-actions";
import Logo from "./logo";
import MobileNavigation from "./mobile-navigation";
import SearchCommand from "./search-command";
const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <TooltipProvider delay={200}>
      <header className="fixed top-0 z-40 w-full border-b bg-background">
        <div className="relative mx-auto flex h-16 w-full items-center justify-between gap-4 px-4 sm:px-6 lg:px-7">
          <Logo />

          <DesktopNavigation />

          <div className="flex shrink-0 items-center gap-0.5">
            <HeaderActions onSearchOpen={() => setSearchOpen(true)} />
            <div className="lg:hidden">
              <MobileNavigation />
            </div>
          </div>
        </div>
      </header>
      <SearchCommand open={searchOpen} onOpenChange={setSearchOpen} />
    </TooltipProvider>
  );
};

export default Header;
