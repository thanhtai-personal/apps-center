import { GlowingJump } from "./GlowingJump";
import { GlowingBall } from "./GlowingBall";
import { GlowingLine } from "./GlowingLight";
import { DrawingBorderButton as DrawingBorderButtonComponent } from "./DrawingBorderButton";
import { RippleButton as RippleButtonComponent } from "./RippleButton";
import { CursorCustom as CursorCustomComponent } from "./CursorCustom";
import { CursorShadow as CursorShadowComponent } from "./CursorShadow";
import { BlackHole as BlackHoleComponent } from "./BlackHole";
import { SpaceIn as SpaceInComponent } from "./SpaceIn";
import { WaterText as WaterTextComponent } from "./WaterText";
import { BubbleWrapper as BubbleWrapperComponent } from "./BubbleWrapper";
import { PlasmaBall as PlasmaBallComponent } from "./PlasmaBall";
import { TypeWriter as TypeWriterComponent } from "./TypeWriter";
import { LoadingBlock as LoadingBlockComponent } from "./LoadingBlock";
import "./tailwind.css"

export namespace Animates {
  export const GlowingJumpAnim = GlowingJump
  export const GlowingBallAnim = GlowingBall
  export const GlowingLineAnim = GlowingLine
  export const DrawingBorderButton = DrawingBorderButtonComponent
  export const RippleButton = RippleButtonComponent
  export const CursorCustom = CursorCustomComponent
  export const CursorShadow = CursorShadowComponent
  export const BlackHole = BlackHoleComponent
  export const SpaceIn = SpaceInComponent
  export const WaterText = WaterTextComponent
  export const BubbleWrapper = BubbleWrapperComponent
  export const PlasmaBall = PlasmaBallComponent
  export const TypeWriter = TypeWriterComponent
  export const LoadingBlock = LoadingBlockComponent
}