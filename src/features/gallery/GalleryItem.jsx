import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { getOptimizedImageUrl } from './galleryApi';
import { Maximize2, ExternalLink } from 'lucide-react';

export default function GalleryItem({
  photo,
  likesCount = 0,
  onLike,
  onOpenLightbox,
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  const thumbUrl = getOptimizedImageUrl(photo, 400, 260);

  const handleLikeClick = (e) => {
    e.stopPropagation();
    setIsBouncing(true);
    onLike(photo.id);
    setTimeout(() => setIsBouncing(false), 250);
  };

  return (
    <article
      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-3 sm:p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 group"
      data-testid={`gallery-item-${photo.id}`}
    >
      {/* Photo Container on the left */}
      <div
        className="relative w-full sm:w-64 md:w-72 aspect-[16/10] bg-slate-100 rounded-xl overflow-hidden shrink-0 cursor-pointer shadow-inner"
        onClick={() => onOpenLightbox && onOpenLightbox(photo)}
        title="Click to view full size"
      >
        {/* Placeholder skeleton while loading */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 skeleton-shimmer" />
        )}

        <img
          src={thumbUrl}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setHasError(true);
            setIsLoaded(true);
          }}
          className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Hover Overlay with Lightbox indicator */}
        <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
          <span className="p-2 bg-black/40 backdrop-blur-md rounded-full shadow-lg">
            <Maximize2 className="w-5 h-5" />
          </span>
        </div>
      </div>

      {/* Details Container on the right */}
      <div className="flex-1 flex flex-wrap items-center gap-3 sm:gap-4 py-1">
        {/* Author Label (Pixel-matching "Author: Vadim Sherbakov" from photo-gallery.png) */}
        <div className="text-base sm:text-lg font-normal text-slate-800">
          <span className="font-semibold text-slate-900">Author:</span>{' '}
          <span className="text-slate-700">{photo.author}</span>
        </div>

        {/* FontAwesome Thumbs Up Icon & Count (Mandatory Assignment 2 Requirement) */}
        <button
          type="button"
          onClick={handleLikeClick}
          aria-label={`Like photo by ${photo.author}`}
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all duration-150 active:scale-90 cursor-pointer ${
            likesCount > 0
              ? 'bg-blue-50 text-blue-600 hover:bg-blue-100 ring-1 ring-blue-400/30 shadow-xs'
              : 'bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-blue-600 ring-1 ring-slate-200'
          } ${isBouncing ? 'scale-125 text-blue-600' : ''}`}
          title="Click to thumbs up"
        >
          {/* Official FontAwesome Thumbs Up Icon */}
          <FontAwesomeIcon
            icon={faThumbsUp}
            className={`text-lg text-blue-600 transition-transform ${
              isBouncing ? 'animate-bounce-short' : ''
            }`}
          />
          {/* Like Count initialized to 0 */}
          <span
            className="tabular-nums font-bold text-sm text-slate-800"
            data-testid={`thumbs-count-${photo.id}`}
          >
            {likesCount}
          </span>
        </button>

        {/* Dimensions badge & Unsplash source link */}
        {photo.width && photo.height && (
          <span className="hidden md:inline-flex text-[11px] text-slate-400 font-mono bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
            {photo.width} × {photo.height}
          </span>
        )}

        {photo.url && (
          <a
            href={photo.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="hidden lg:inline-flex items-center gap-1 text-xs text-slate-400 hover:text-blue-600 transition-colors ml-auto"
            title="View original on Unsplash"
          >
            <span>Source</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </article>
  );
}
