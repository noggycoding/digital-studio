import React from 'react';
import './SectionSkeleton.css';

export default function SectionSkeleton() {
  return (
    <div className="section-skeleton">
      <div className="skeleton-container">
        {/* Title skeleton */}
        <div className="skeleton-title"></div>
        {/* Subtitle skeleton */}
        <div className="skeleton-subtitle"></div>
        
        {/* Content blocks skeleton */}
        <div className="skeleton-grid">
          {[1, 2, 3].map(i => (
            <div key={i} className="skeleton-card">
              <div className="skeleton-img"></div>
              <div className="skeleton-text skeleton-text-1"></div>
              <div className="skeleton-text skeleton-text-2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
