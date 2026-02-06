'use client';

import { useState, useEffect, useCallback } from 'react';

export function useCarousel(itemCount, autoRotateInterval = 4000) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const next = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % itemCount);
    }, [itemCount]);

    const prev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + itemCount) % itemCount);
    }, [itemCount]);

    const goTo = useCallback((index) => {
        setCurrentIndex(index);
    }, []);

    useEffect(() => {
        if (isPaused || !autoRotateInterval) return;

        const interval = setInterval(next, autoRotateInterval);

        return () => clearInterval(interval);
    }, [isPaused, autoRotateInterval, next]);

    return {
        currentIndex,
        next,
        prev,
        goTo,
        pause: () => setIsPaused(true),
        resume: () => setIsPaused(false),
    };
}
'use client';

import { useState, useEffect, useCallback } from 'react';

export function useCarousel(itemCount, autoRotateInterval = 4000) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const next = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % itemCount);
    }, [itemCount]);

    const prev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + itemCount) % itemCount);
    }, [itemCount]);

    const goTo = useCallback((index) => {
        setCurrentIndex(index);
    }, []);

    useEffect(() => {
        if (isPaused || !autoRotateInterval) return;

        const interval = setInterval(next, autoRotateInterval);

        return () => clearInterval(interval);
    }, [isPaused, autoRotateInterval, next]);

    return {
        currentIndex,
        next,
        prev,
        goTo,
        pause: () => setIsPaused(true),
        resume: () => setIsPaused(false),
    };
}
