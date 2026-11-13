import React, { useState, useEffect, useCallback, useMemo } from 'react';
import GalleryItem from './GalleryItem';
import GallerySkeleton from './GallerySkeleton';
import LightboxModal from './LightboxModal';
import { fetchPhotos } from './galleryApi';
import { useInfiniteScroll } from './useInfiniteScroll';
import { Search, RefreshCw, AlertCircle, Sparkles, Image as ImageIcon } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

export default function GalleryContainer() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Store likes count map by photo ID { [photoId]: number }
  const [likesMap, setLikesMap] = useState(() => {
    try {
      const saved = localStorage.getItem('exactspace_gallery_likes');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Save likes map to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('exactspace_gallery_likes', JSON.stringify(likesMap));
    } catch (err) {
      console.warn('Failed to save likes to localStorage:', err);
    }
  }, [likesMap]);

  // Load photos for a specific page
  const loadPage = useCallback(async (pageNum) => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    setError(null);

    try {
      const newItems = await fetchPhotos(pageNum, 10);

      if (!newItems || newItems.length === 0) {
        setHasMore(false);
      } else {
        setPhotos((prev) => {
          // Filter out any potential duplicates by id
          const existingIds = new Set(prev.map((p) => p.id));
          const uniqueItems = newItems.filter((p) => !existingIds.has(p.id));
          return [...prev, ...uniqueItems];
        });
        setPage(pageNum);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch photos');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore]);

  // Initial load
  useEffect(() => {
    loadPage(1);
  }, []);

  // Handler for loading the next page when reaching the bottom
  const handleLoadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      loadPage(page + 1);
    }
  }, [isLoading, hasMore, page, loadPage]);

  // Infinite Scroll hook setup
  const { sentinelRef } = useInfiniteScroll({
    onLoadMore: handleLoadMore,
    hasMore,
    isLoading,
  });

  // Handler for thumbs up clicks: increments count as many times as clicked
  const handleLike = (photoId) => {
    setLikesMap((prev) => ({
      ...prev,
      [photoId]: (prev[photoId] || 0) + 1,
    }));
  };

  // Filter photos by search query (author name)
  const filteredPhotos = useMemo(() => {
    if (!searchQuery.trim()) return photos;
    return photos.filter((p) =>
      p.author.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );
  }, [photos, searchQuery]);

  // Calculate total gallery likes
  const totalLikes = useMemo(() => {
    return Object.values(likesMap).reduce((sum, count) => sum + count, 0);
  }, [likesMap]);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Top Header matching reference photo-gallery.png ("Photo gallery") */}
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
                  Photo gallery
                </h1>
                <span className="text-xs bg-blue-100 text-blue-700 font-semibold px-2.5 py-1 rounded-full font-mono">
                  Assignment 2
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-1">
                Infinite scroll implementation powered by Picsum paginated feeds with FontAwesome interactions.
              </p>
            </div>

            {/* Quick Stats Pill */}
            <div className="flex items-center gap-3 self-start sm:self-auto">
              <div className="flex items-center gap-2 bg-white border border-slate-200/90 rounded-2xl px-4 py-2 shadow-xs">
                <ImageIcon className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-medium text-slate-600">
                  <strong className="text-slate-900">{photos.length}</strong> photos loaded
                </span>
              </div>
              <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-2xl px-4 py-2 shadow-xs">
                <FontAwesomeIcon icon={faThumbsUp} className="text-blue-600 text-sm" />
                <span className="text-xs font-semibold text-blue-900">
                  {totalLikes} likes given
                </span>
              </div>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by author name (e.g. Vadim, Alex)..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs placeholder:text-slate-400 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Auto-loads on scroll</span>
              <span className="text-slate-300">•</span>
              <span>Page: {page}</span>
            </div>
          </div>
        </header>

        {/* 1-Column Photo List (Exact requirement from Assignment 2) */}
        <section className="space-y-4" aria-label="Photo gallery list">
          {filteredPhotos.map((photo) => (
            <GalleryItem
              key={photo.id}
              photo={photo}
              likesCount={likesMap[photo.id] || 0}
              onLike={handleLike}
              onOpenLightbox={setSelectedPhoto}
            />
          ))}

          {/* Empty search results state */}
          {filteredPhotos.length === 0 && !isLoading && (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200 p-8">
              <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <h3 className="text-base font-semibold text-slate-700">No photos found</h3>
              <p className="text-xs text-slate-400 mt-1">
                No authors match "{searchQuery}". Try clearing your search query.
              </p>
            </div>
          )}

          {/* Loading Skeletons */}
          {isLoading && <GallerySkeleton count={3} />}

          {/* Error Banner with Retry */}
          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-sm flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>{error}</span>
              </div>
              <button
                type="button"
                onClick={() => loadPage(page)}
                className="px-3 py-1 bg-white border border-rose-300 text-rose-700 rounded-lg text-xs font-semibold hover:bg-rose-100 flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry</span>
              </button>
            </div>
          )}

          {/* Sentinel element observed by IntersectionObserver for infinite scroll */}
          <div ref={sentinelRef} className="h-10 -mt-2" />

          {/* End of feed banner */}
          {!hasMore && (
            <div className="text-center py-8 border-t border-slate-200 mt-8 text-slate-400 text-xs font-medium">
              <Sparkles className="w-4 h-4 mx-auto mb-1 text-amber-500" />
              <span>You've reached the end of the gallery. All articles loaded!</span>
            </div>
          )}
        </section>
      </div>

      {/* Lightbox Modal for high-res preview */}
      {selectedPhoto && (
        <LightboxModal
          photo={selectedPhoto}
          likesCount={likesMap[selectedPhoto.id] || 0}
          onLike={handleLike}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </div>
  );
}
