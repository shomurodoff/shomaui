import type { MouseEventHandler, ReactNode } from "react";
import { Link } from "@tanstack/react-router";

import type { CatalogItem } from "./data";

type CatalogLinkProps = {
  item: CatalogItem;
  children?: ReactNode;
  className?: string;
  ariaLabel?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

const getLinkProps = ({ className, ariaLabel, onClick }: CatalogLinkProps) => ({
  className,
  onClick,
  "aria-label": ariaLabel,
});

export function CatalogItemLink(props: CatalogLinkProps) {
  const linkProps = getLinkProps(props);

  switch (props.item.kind) {
    case "components":
      return <Link to="/components/$slug" params={{ slug: props.item.slug }} {...linkProps}>{props.children}</Link>;
    case "backgrounds":
      return <Link to="/backgrounds/$slug" params={{ slug: props.item.slug }} {...linkProps}>{props.children}</Link>;
    case "effects":
      return <Link to="/effects/$slug" params={{ slug: props.item.slug }} {...linkProps}>{props.children}</Link>;
    case "animations":
      return <Link to="/animations/$slug" params={{ slug: props.item.slug }} {...linkProps}>{props.children}</Link>;
    case "texts":
      return <Link to="/texts/$slug" params={{ slug: props.item.slug }} {...linkProps}>{props.children}</Link>;
  }
}

export function CatalogItemAnchor({ item }: { item: CatalogItem }) {
  return <CatalogItemLink item={item}>{item.name}</CatalogItemLink>;
}
