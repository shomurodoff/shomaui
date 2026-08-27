import type { ComponentType } from "react";

import {
  ActionDropdown,
  AIChatInterface,
  AvatarExpand,
  BottomModal,
  ContactComposer,
  CounterUp,
  CurrencyConverterCard,
  DraggableList,
  FloatingChatWidget,
  FlipText,
  FollowCursorLabel,
  FolderAnimation,
  HolographicBackground,
  ImageCheckbox,
  LiquidButton,
  LikesCounter,
  MorphingButton,
  NativeUserCard,
  NestedList,
  NotificationBell,
  NotchCard,
  PreviewDetailsCard,
  QuickCommand,
  SocialLoginButton,
  UploadDropzone,
  VerifiedBadge,
  VolumeComponent,
} from "#/components/shomaui/components/tripled-components";

import { PreviewFrame } from "./previews";

const preview = (Component: ComponentType) => {
  function TripledPreview() {
    return (
      <PreviewFrame>
        <Component />
      </PreviewFrame>
    );
  }

  return TripledPreview;
};

export const NativeUserCardPreview = preview(NativeUserCard);
export const LikesCounterPreview = preview(LikesCounter);
export const SocialLoginButtonPreview = preview(SocialLoginButton);
export const NotificationBellPreview = preview(NotificationBell);
export const VerifiedBadgePreview = preview(VerifiedBadge);
export const MorphingButtonPreview = preview(MorphingButton);
export const LiquidButtonPreview = preview(LiquidButton);
export const AvatarExpandPreview = preview(AvatarExpand);
export const ImageCheckboxPreview = preview(ImageCheckbox);
export const BottomModalPreview = preview(BottomModal);
export const NestedListPreview = preview(NestedList);
export const ActionDropdownPreview = preview(ActionDropdown);
export const PreviewDetailsCardPreview = preview(PreviewDetailsCard);
export const DraggableListPreview = preview(DraggableList);
export const FollowCursorLabelPreview = preview(FollowCursorLabel);
export const HolographicBackgroundPreview = preview(HolographicBackground);
export const FolderAnimationPreview = preview(FolderAnimation);
export const CounterUpPreview = preview(CounterUp);
export const FlipTextPreview = preview(FlipText);
export const AIChatInterfacePreview = preview(AIChatInterface);
export const CurrencyConverterCardPreview = preview(CurrencyConverterCard);
export const FloatingChatWidgetPreview = preview(FloatingChatWidget);
export const VolumeComponentPreview = preview(VolumeComponent);
export const UploadDropzonePreview = preview(UploadDropzone);
export const ContactComposerPreview = preview(ContactComposer);
export const NotchCardPreview = preview(NotchCard);
export const QuickCommandPreview = preview(QuickCommand);
