import type { ComponentType } from "react";
import { mapValues } from "lodash";

import { PreviewFrame } from "./previews";
import {
  referenceComponentExports,
  type ReferenceComponentSlug,
} from "#/components/shomaui/components/reference-components";

export const referencePreviewBySlug = mapValues(
  referenceComponentExports,
  (Component) => {
    function ReferencePreview() {
      return (
        <PreviewFrame>
          <Component />
        </PreviewFrame>
      );
    }

    return ReferencePreview;
  },
) as Record<ReferenceComponentSlug, ComponentType>;

export const getReferencePreview = (
  slug: ReferenceComponentSlug,
): ComponentType => referencePreviewBySlug[slug];
