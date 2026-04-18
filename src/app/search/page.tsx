'use client';

import { Suspense } from 'react';
import SearchPageContent from './SearchPageContent';

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-40 mt-20">
        <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}
