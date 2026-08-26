import type { ComponentType } from "react";

import { get, map } from "lodash";

import AvatarHoverCard from "#/components/shomaui/avatar-hover-card.tsx";
import AvatarSpringStack from "#/components/shomaui/avatar-spring-stack.tsx";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "#/components/shomaui/avatar.tsx";

const avatarPeople = [
  {
    name: "Ava Kim",
    src: "/assets/avatars/ava-kim.png",
    alt: "Ava Kim",
  },
  {
    name: "Rohan Patel",
    src: "/assets/avatars/rohan-patel.png",
    alt: "Rohan Patel",
  },
  {
    name: "Maya Brooks",
    src: "/assets/avatars/ava-kim-variant.png",
    alt: "Maya Brooks",
  },
];

export type AvatarExample = {
  id: string;
  slug: string;
  title: string;
  description: string;
  preview: ComponentType;
  previewClassName?: string;
  code: string;
};

const BasicAvatarPreview = () => {
  const person = get(avatarPeople, 0);

  return (
    <Avatar size="lg">
      <AvatarImage src={get(person, "src")} alt={get(person, "alt")} />
      <AvatarFallback>AK</AvatarFallback>
    </Avatar>
  );
};

const AvatarFallbackPreview = () => (
  <div className="flex items-center gap-3">
    <Avatar size="lg">
      <AvatarFallback>AJ</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarFallback>?</AvatarFallback>
    </Avatar>
  </div>
);

const AvatarGroupPreview = () => (
  <div className="flex flex-col items-center gap-8">
    <AvatarGroup>
      {map(avatarPeople, (person, index) => (
        <Avatar key={get(person, "name")} size="sm">
          <AvatarImage src={get(person, "src")} alt={get(person, "alt")} />
          <AvatarFallback>{get(person, "name[0]")}</AvatarFallback>
          {index === 0 && <AvatarBadge />}
        </Avatar>
      ))}
      <AvatarGroupCount>+4</AvatarGroupCount>
    </AvatarGroup>
    <AvatarSpringStack avatars={[...avatarPeople]} maxVisible={3} size={48} />
  </div>
);

const AvatarHoverCardPreview = () => {
  const person = get(avatarPeople, 0);

  return (
    <AvatarHoverCard
      imageSrc={get(person, "src")}
      imageAlt={get(person, "alt")}
      name="Ava Kim"
      username="avakim"
      description="Designing thoughtful tools for teams that move quickly."
      stats={[
        { label: "projects", value: "24" },
        { label: "followers", value: "1.8k" },
      ]}
    />
  );
};

const StaticAvatarHoverCardPreview = () => {
  const person = get(avatarPeople, 1);

  return (
    <AvatarHoverCard
      imageSrc={get(person, "src")}
      imageAlt={get(person, "alt")}
      name="Rohan Patel"
      username="rohanp"
      description="Building calm interfaces and reliable systems for growing teams."
      variant="static"
      stats={[
        { label: "projects", value: "18" },
        { label: "followers", value: "920" },
      ]}
    />
  );
};

const basicAvatarCode = `import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shomaui/avatar"

export function BasicAvatar() {
  return (
    <Avatar size="lg">
      <AvatarImage
        src="/assets/avatars/ava-kim.png"
        alt="Ava Kim"
      />
      <AvatarFallback>AK</AvatarFallback>
    </Avatar>
  )
}`;

const fallbackAvatarCode = `import {
  Avatar,
  AvatarFallback,
} from "@/components/shomaui/avatar"

export function AvatarWithFallback() {
  return (
    <div className="flex items-center gap-3">
      <Avatar size="lg">
        <AvatarFallback>AJ</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>?</AvatarFallback>
      </Avatar>
    </div>
  )
}`;

const groupAvatarCode = `import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/shomaui/avatar"
import AvatarSpringStack from "@/components/shomaui/avatar-spring-stack"
import { get, map } from "lodash"

const avatars = [
  { src: "/assets/avatars/ava-kim.png", alt: "Ava Kim" },
  { src: "/assets/avatars/rohan-patel.png", alt: "Rohan Patel" },
  { src: "/assets/avatars/ava-kim-variant.png", alt: "Maya Brooks" },
]

export function AvatarGroupExample() {
  return (
    <div className="flex flex-col items-center gap-8">
      <AvatarGroup>
        {map(avatars, (avatar) => (
          <Avatar key={get(avatar, "alt")} size="sm">
            <AvatarImage src={get(avatar, "src")} alt={get(avatar, "alt")} />
            <AvatarFallback>{get(avatar, "alt[0]", "?")}</AvatarFallback>
          </Avatar>
        ))}
        <AvatarGroupCount>+4</AvatarGroupCount>
      </AvatarGroup>
      <AvatarSpringStack avatars={avatars} maxVisible={3} size={48} />
    </div>
  )
}`;

const hoverCardCode = `import AvatarHoverCard from "@/components/shomaui/avatar-hover-card"

export function AvatarHoverCardExample() {
  return (
    <AvatarHoverCard
      imageSrc="/assets/avatars/ava-kim.png"
      imageAlt="Ava Kim"
      name="Ava Kim"
      username="avakim"
      description="Designing thoughtful tools for teams that move quickly."
      stats={[
        { label: "projects", value: "24" },
        { label: "followers", value: "1.8k" },
      ]}
    />
  )
}`;

const staticHoverCardCode = `import AvatarHoverCard from "@/components/shomaui/avatar-hover-card"

export function StaticAvatarHoverCardExample() {
  return (
    <AvatarHoverCard
      imageSrc="/assets/avatars/rohan-patel.png"
      imageAlt="Rohan Patel"
      name="Rohan Patel"
      username="rohanp"
      description="Building calm interfaces and reliable systems for growing teams."
      variant="static"
      stats={[
        { label: "projects", value: "18" },
        { label: "followers", value: "920" },
      ]}
    />
  )
}`;

export const avatarExamples: AvatarExample[] = [
  {
    id: "basic-avatar",
    slug: "avatar",
    title: "Basic avatar",
    description: "A profile image with an accessible fallback.",
    preview: BasicAvatarPreview,
    code: basicAvatarCode,
  },
  {
    id: "avatar-fallback",
    slug: "avatar",
    title: "Avatar with fallback",
    description: "Initials and fallback states for missing images.",
    preview: AvatarFallbackPreview,
    code: fallbackAvatarCode,
  },
  {
    id: "avatar-group",
    slug: "avatar-spring-stack",
    title: "Avatar group and spring stack",
    description: "Compact team presence with a subtle hover interaction.",
    preview: AvatarGroupPreview,
    code: groupAvatarCode,
  },
  {
    id: "avatar-hover-card",
    slug: "avatar-hover-card",
    title: "Avatar hover card",
    description: "Reveal profile context without leaving the current page.",
    preview: AvatarHoverCardPreview,
    previewClassName: "min-h-[22rem] items-start pt-16 sm:min-h-[24rem]",
    code: hoverCardCode,
  },
  {
    id: "avatar-hover-card-static",
    slug: "avatar-hover-card",
    title: "Avatar hover card — static trigger",
    description:
      "Keep the trigger avatar in place while the profile card opens.",
    preview: StaticAvatarHoverCardPreview,
    previewClassName: "min-h-[22rem] items-start pt-16 sm:min-h-[24rem]",
    code: staticHoverCardCode,
  },
];
