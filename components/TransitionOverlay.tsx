"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTransition, CardRect } from "@/context/TransitionContext";

type Phase = "hidden" | "card" | "hero" | "returning";

function getHeroRect() {
  const vw = window.innerWidth;
  const pad = 64;
  const w = Math.min(760, vw - pad * 2);
  const l = (vw - w) / 2;
  return { left: l, top: 32, width: w, height: 420 };
}

function flipTransform(
  card: CardRect,
  hero: { left: number; top: number; width: number; height: number }
) {
  const scaleX = card.width / hero.width;
  const scaleY = card.height / hero.height;
  const tx = card.x + card.width / 2 - (hero.left + hero.width / 2);
  const ty = card.y + card.height / 2 - (hero.top + hero.height / 2);
  return `translate(${tx}px, ${ty}px) scale(${scaleX}, ${scaleY})`;
}

export default function TransitionOverlay() {
  const { clickedSlug, cardRect, thumbnail, setClickedSlug, setCardRect, setThumbnail } =
    useTransition();
  const pathname = usePathname();

  const [phase, setPhase] = useState<Phase>("hidden");
  const [frozenRect, setFrozenRect] = useState<CardRect | null>(null);
  const [frozenThumb, setFrozenThumb] = useState<string | null>(null);
  const [heroRect, setHeroRect] = useState<ReturnType<typeof getHeroRect> | null>(null);

  // Step 1: Card clicked → freeze state, render at card position
  useEffect(() => {
    if (clickedSlug && cardRect && thumbnail && phase === "hidden") {
      setFrozenRect(cardRect);
      setFrozenThumb(thumbnail);
      setHeroRect(getHeroRect());
      setPhase("card");
    }
  }, [clickedSlug, cardRect, thumbnail, phase]);

  // Step 2: After one paint at card position, animate to hero
  useEffect(() => {
    if (phase !== "card") return;
    let id1: number, id2: number;
    id1 = requestAnimationFrame(() => {
      id2 = requestAnimationFrame(() => setPhase("hero"));
    });
    return () => { cancelAnimationFrame(id1); cancelAnimationFrame(id2); };
  }, [phase]);

  // Step 3: Back navigation → collapse
  useEffect(() => {
    if (pathname === "/" && phase === "hero") {
      setPhase("returning");
      const t = setTimeout(() => {
        setPhase("hidden");
        setClickedSlug(null);
        setCardRect(null);
        setThumbnail(null);
        setFrozenRect(null);
        setFrozenThumb(null);
      }, 500);
      return () => clearTimeout(t);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, phase]);

  if (phase === "hidden" || !frozenRect || !frozenThumb || !heroRect) return null;

  const atCard = phase === "card" || phase === "returning";
  const transform = atCard ? flipTransform(frozenRect, heroRect) : "none";
  const opacity = phase === "returning" ? 0 : 1;
  const transitionCSS =
    phase === "card"
      ? "none"
      : phase === "returning"
      ? "transform 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.25s ease"
      : "transform 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.18s ease 0.32s";

  return (
    <div
      style={{
        position: "fixed",
        left: heroRect.left,
        top: heroRect.top,
        width: heroRect.width,
        height: heroRect.height,
        zIndex: 200,
        overflow: "hidden",
        pointerEvents: "none",
        transform,
        opacity,
        transformOrigin: "center center",
        transition: transitionCSS,
        willChange: "transform",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={frozenThumb}
        alt=""
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </div>
  );
}
