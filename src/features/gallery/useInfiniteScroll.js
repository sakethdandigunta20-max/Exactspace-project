import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook to trigger infinite scrolling using IntersectionObserver
 */
export function useInfiniteScroll({ onLoadMore, hasMore, isLoading, rootMargin = '250px' }) {
  const sentinelRef = useRef(null);
  const observerRef = useRef(null);

  const handleIntersect = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !isLoading) {
        onLoadMore();
      }
    },
    [onLoadMore, hasMore, isLoading]
  );

  useEffect(() => {
    if (!sentinelRef.current) return;

    if ('IntersectionObserver' in window) {
      observerRef.current = new IntersectionObserver(handleIntersect, {
        root: null,
        rootMargin,
        threshold: 0.1,
      });

      observerRef.current.observe(sentinelRef.current);
    } else {
      // Fallback for older browsers: window scroll event listener
      const handleScroll = () => {
        if (
          window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
          hasMore &&
          !isLoading
        ) {
          onLoadMore();
        }
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleIntersect, rootMargin, hasMore, isLoading]);

  return { sentinelRef };
}
