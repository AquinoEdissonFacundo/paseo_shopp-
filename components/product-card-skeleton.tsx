'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm h-full flex flex-col animate-pulse">
      <CardContent className="p-0 relative">
        <div className="relative aspect-square overflow-hidden bg-muted/50">
          <div className="absolute inset-0 bg-gradient-to-br from-muted via-muted/50 to-muted/30" />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 sm:gap-3 p-3 sm:p-4 md:p-5 flex-1 bg-gradient-to-b from-card to-card/95">
        <div className="w-full flex-1 min-h-0 space-y-2">
          <div className="h-5 sm:h-6 bg-muted/50 rounded w-3/4" />
          <div className="h-4 sm:h-5 bg-muted/50 rounded w-full" />
          <div className="h-4 sm:h-5 bg-muted/50 rounded w-2/3" />
        </div>
        <div className="flex w-full items-center justify-between gap-2 sm:gap-3 flex-wrap sm:flex-nowrap mt-auto">
          <div className="flex flex-col min-w-0 flex-1 space-y-2">
            <div className="h-6 sm:h-7 md:h-8 bg-muted/50 rounded w-24" />
            <div className="h-3 sm:h-4 bg-muted/50 rounded w-16" />
          </div>
          <div className="h-8 sm:h-9 md:h-10 bg-muted/50 rounded w-20 sm:w-24 flex-shrink-0" />
        </div>
      </CardFooter>
    </Card>
  );
}
