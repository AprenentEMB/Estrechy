import { useRef, useEffect, useCallback } from "react";
import { animate, type AnimationPlaybackControls } from "framer-motion";
import { FrontBody, SideBody, type BodyPartRefs } from "./BodyParts";
import {
  EXERCISE_ANIMATIONS,
  DEFAULT_ANIMATION,
} from "../data/exerciseAnimations";
import { useTheme } from "../hooks/useTheme";

interface AnimatedExerciseBodyProps {
  exerciseId: string;
  isPlaying: boolean;
}

export function AnimatedExerciseBody({
  exerciseId,
  isPlaying,
}: AnimatedExerciseBodyProps) {
  const t = useTheme();
  const headRef = useRef<SVGEllipseElement>(null);
  const neckRef = useRef<SVGPathElement>(null);
  const shoulderLeftRef = useRef<SVGPathElement>(null);
  const shoulderRightRef = useRef<SVGPathElement>(null);
  const chestRef = useRef<SVGPathElement>(null);
  const armLeftRef = useRef<SVGPathElement>(null);
  const armRightRef = useRef<SVGPathElement>(null);
  const wristLeftRef = useRef<SVGEllipseElement>(null);
  const wristRightRef = useRef<SVGEllipseElement>(null);
  const abdomenRef = useRef<SVGPathElement>(null);
  const lowerBackRef = useRef<SVGPathElement>(null);
  const upperBackRef = useRef<SVGPathElement>(null);
  const hipsRef = useRef<SVGPathElement>(null);
  const legLeftUpperRef = useRef<SVGPathElement>(null);
  const legRightUpperRef = useRef<SVGPathElement>(null);
  const kneeLeftRef = useRef<SVGEllipseElement>(null);
  const kneeRightRef = useRef<SVGEllipseElement>(null);
  const legLeftLowerRef = useRef<SVGPathElement>(null);
  const legRightLowerRef = useRef<SVGPathElement>(null);

  const refs: BodyPartRefs = {
    head: headRef,
    neck: neckRef,
    shoulderLeft: shoulderLeftRef,
    shoulderRight: shoulderRightRef,
    chest: chestRef,
    armLeft: armLeftRef,
    armRight: armRightRef,
    wristLeft: wristLeftRef,
    wristRight: wristRightRef,
    abdomen: abdomenRef,
    lowerBack: lowerBackRef,
    upperBack: upperBackRef,
    hips: hipsRef,
    legLeftUpper: legLeftUpperRef,
    legRightUpper: legRightUpperRef,
    kneeLeft: kneeLeftRef,
    kneeRight: kneeRightRef,
    legLeftLower: legLeftLowerRef,
    legRightLower: legRightLowerRef,
  };

  const controlsRef = useRef<AnimationPlaybackControls[]>([]);

  const refMap: Record<string, React.RefObject<SVGElement | null>> = {
    head: headRef,
    neck: neckRef,
    shoulderLeft: shoulderLeftRef,
    shoulderRight: shoulderRightRef,
    chest: chestRef,
    armLeft: armLeftRef,
    armRight: armRightRef,
    wristLeft: wristLeftRef,
    wristRight: wristRightRef,
    abdomen: abdomenRef,
    lowerBack: lowerBackRef,
    upperBack: upperBackRef,
    hips: hipsRef,
    legLeftUpper: legLeftUpperRef,
    legRightUpper: legRightUpperRef,
    kneeLeft: kneeLeftRef,
    kneeRight: kneeRightRef,
    legLeftLower: legLeftLowerRef,
    legRightLower: legRightLowerRef,
  };

  const stopAnimations = useCallback(() => {
    controlsRef.current.forEach((c) => c.stop());
    controlsRef.current = [];
  }, []);

  useEffect(() => {
    stopAnimations();

    const config = EXERCISE_ANIMATIONS[exerciseId] ?? DEFAULT_ANIMATION;
    const controls: AnimationPlaybackControls[] = [];

    // Small delay to ensure refs are attached after render
    const timer = setTimeout(() => {
      for (const [partKey, anim] of Object.entries(config.parts)) {
        const el = refMap[partKey]?.current;
        if (!el) continue;

        if (anim.style?.transformOrigin) {
          el.style.transformOrigin = anim.style.transformOrigin;
        }

        const ctrl = animate(el, anim.animate, anim.transition);

        if (!isPlaying) ctrl.pause();
        controls.push(ctrl);
      }

      controlsRef.current = controls;
    }, 50);

    return () => {
      clearTimeout(timer);
      stopAnimations();
    };
  }, [exerciseId]);

  useEffect(() => {
    controlsRef.current.forEach((c) => {
      if (isPlaying) c.play();
      else c.pause();
    });
  }, [isPlaying]);

  const config = EXERCISE_ANIMATIONS[exerciseId] ?? DEFAULT_ANIMATION;
  const sideViewExercises = [
    "cat-cow",
    "child-pose",
    "hip-flexor-stretch",
    "hamstring-stretch",
    "calf-stretch",
    "cobra",
    "thread-needle",
  ];
  const isSideView =
    config.view === "side" || sideViewExercises.includes(exerciseId);

  return (
    <div style={{ width: "100%", maxWidth: 220, margin: "0 auto" }}>
      <svg
        viewBox="0 0 200 460"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        <defs>
          <linearGradient id="anim-head-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={t.headGrad[0]} />
            <stop offset="100%" stopColor={t.headGrad[1]} />
          </linearGradient>
          <linearGradient id="anim-body-fill" x1="0.3" y1="0" x2="0.7" y2="1">
            <stop offset="0%" stopColor={t.bodyFill[0]} />
            <stop offset="100%" stopColor={t.bodyFill[1]} />
          </linearGradient>
          <linearGradient id="anim-limb-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={t.limbGrad[0]} />
            <stop offset="50%" stopColor={t.limbGrad[1]} />
            <stop offset="100%" stopColor={t.limbGrad[2]} />
          </linearGradient>
          <linearGradient id="head-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={t.headGrad[0]} />
            <stop offset="100%" stopColor={t.headGrad[1]} />
          </linearGradient>
          <linearGradient id="body-fill" x1="0.3" y1="0" x2="0.7" y2="1">
            <stop offset="0%" stopColor={t.bodyFill[0]} />
            <stop offset="100%" stopColor={t.bodyFill[1]} />
          </linearGradient>
          <linearGradient id="limb-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={t.limbGrad[0]} />
            <stop offset="50%" stopColor={t.limbGrad[1]} />
            <stop offset="100%" stopColor={t.limbGrad[2]} />
          </linearGradient>
          <filter id="soft-shadow" x="-20%" y="-5%" width="140%" height="120%">
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="3"
              floodColor={t.softShadowColor}
              floodOpacity={t.softShadowOpacity}
            />
          </filter>
        </defs>

        {isSideView ? (
          <SideBody partsRef={refs} />
        ) : (
          <FrontBody partsRef={refs} />
        )}
      </svg>
    </div>
  );
}
