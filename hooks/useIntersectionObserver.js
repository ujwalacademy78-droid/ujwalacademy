'use client';

import { useEffect, useState, useRef } from 'react';

export function useIntersectionObserver(options = {}) {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
            }
        }, {
            threshold: options.threshold || 0.3,
            rootMargin: options.rootMargin || '0px 0px -100px 0px',
        });

        const currentElement = elementRef.current;
        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [options.threshold, options.rootMargin]);

    return [elementRef, isVisible];
}
'use client';

import { useEffect, useState, useRef } from 'react';

export function useIntersectionObserver(options = {}) {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
            }
        }, {
            threshold: options.threshold || 0.3,
            rootMargin: options.rootMargin || '0px 0px -100px 0px',
        });

        const currentElement = elementRef.current;
        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [options.threshold, options.rootMargin]);

    return [elementRef, isVisible];
}
