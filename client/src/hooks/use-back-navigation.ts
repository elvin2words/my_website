import { useCallback, useEffect } from "react";
import { useLocation } from "wouter";

const CURRENT_PATH_KEY = "mps.currentPath";
const BACK_FLAG_KEY = "mps.backNavInProgress";
const BACK_DEST_KEY = "mps.backNavDestination";
const PAGE_MEMORY_PREFIX = "mps.backTarget:";

function pageMemoryKey(pathname: string) {
  return `${PAGE_MEMORY_PREFIX}${pathname}`;
}

export function useBackNavigation(fallbackPath = "/") {
  const [location, navigate] = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const lastPath = sessionStorage.getItem(CURRENT_PATH_KEY);
    const backInProgress = sessionStorage.getItem(BACK_FLAG_KEY) === "1";
    const backDestination = sessionStorage.getItem(BACK_DEST_KEY);
    const skipCapture = backInProgress && backDestination === location;

    if (!skipCapture && lastPath && lastPath !== location) {
      sessionStorage.setItem(pageMemoryKey(location), lastPath);
    }

    if (skipCapture) {
      sessionStorage.removeItem(BACK_FLAG_KEY);
      sessionStorage.removeItem(BACK_DEST_KEY);
    }

    sessionStorage.setItem(CURRENT_PATH_KEY, location);
  }, [location]);

  return useCallback(() => {
    if (typeof window === "undefined") {
      navigate(fallbackPath);
      return;
    }

    const backTarget = sessionStorage.getItem(pageMemoryKey(location));
    if (backTarget && backTarget !== location) {
      sessionStorage.setItem(BACK_FLAG_KEY, "1");
      sessionStorage.setItem(BACK_DEST_KEY, backTarget);
      navigate(backTarget);
      return;
    }

    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    navigate(fallbackPath);
  }, [fallbackPath, location, navigate]);
}
