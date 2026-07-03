"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  const query = window.matchMedia("(max-width: 767px), (pointer: coarse)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getMobileSnapshot() {
  return window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
}

function getServerSnapshot() {
  return true;
}

/** true sur mobile / tactile — animations simplifiées, contenu visible immédiatement */
export function useIsMobileExperience() {
  return useSyncExternalStore(subscribe, getMobileSnapshot, getServerSnapshot);
}

export function useMotionHidden<T extends Record<string, unknown>>(hidden: T): false | T {
  const isMobile = useIsMobileExperience();
  return isMobile ? false : hidden;
}
