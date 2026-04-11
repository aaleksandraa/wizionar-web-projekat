import { Link as RouterLink, LinkProps } from "react-router-dom";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { forwardRef, type FocusEventHandler, type MouseEventHandler, type TouchEventHandler } from "react";
import { prefetchRoute } from "@/lib/page-imports";

/**
 * Drop-in replacement for react-router-dom's Link that automatically
 * prefixes the `to` prop with the current language.
 */
const LocalizedLink = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, onMouseEnter, onFocus, onTouchStart, ...props }, ref) => {
    const localizedPath = useLocalizedPath();

    const localizedTo = typeof to === "string"
      ? localizedPath(to)
      : { ...to, pathname: localizedPath(to.pathname || "/") };

    const handlePrefetch = () => {
      const path = typeof localizedTo === "string" ? localizedTo : localizedTo.pathname;

      if (path) {
        prefetchRoute(path);
      }
    };

    const handleMouseEnter: MouseEventHandler<HTMLAnchorElement> = (event) => {
      onMouseEnter?.(event);
      handlePrefetch();
    };

    const handleFocus: FocusEventHandler<HTMLAnchorElement> = (event) => {
      onFocus?.(event);
      handlePrefetch();
    };

    const handleTouchStart: TouchEventHandler<HTMLAnchorElement> = (event) => {
      onTouchStart?.(event);
      handlePrefetch();
    };

    return (
      <RouterLink
        ref={ref}
        to={localizedTo}
        onMouseEnter={handleMouseEnter}
        onFocus={handleFocus}
        onTouchStart={handleTouchStart}
        {...props}
      />
    );
  }
);

LocalizedLink.displayName = "LocalizedLink";

export default LocalizedLink;
