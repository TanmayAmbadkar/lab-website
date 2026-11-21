import React, { useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

const IntroAnimation = ({ isLoaded, onAnimationComplete }) => {
    const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    useEffect(() => {
        if (prefersReducedMotion && isLoaded) {
            onAnimationComplete();
        }
    }, [prefersReducedMotion, isLoaded, onAnimationComplete]);

    const overlaySpring = useSpring({
        from: { opacity: 1 },
        to: async (next) => {
            if (isLoaded && !prefersReducedMotion) {
                await next({ opacity: 0, config: { duration: 400 } });
                onAnimationComplete();
            }
        },
    });

    const boxSpring = useSpring({
        from: { transform: 'scale(0.95)', opacity: 0.9 },
        to: isLoaded && !prefersReducedMotion
            ? { transform: 'scale(1.08)', opacity: 0 }
            : { transform: 'scale(1)', opacity: 1 },
        config: { duration: 380 },
    });

    if (prefersReducedMotion && isLoaded) {
        return null;
    }

    return (
        <animated.div
            style={overlaySpring}
            aria-hidden="true"
            className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center gap-5 pointer-events-none"
        >
            <animated.div
                style={boxSpring}
                className={`w-12 h-12 rounded-xl border border-white/25 bg-white/5 shadow-lg shadow-blue-500/10 flex items-center justify-center ${
                    !isLoaded ? 'animate-pulse' : ''
                }`}
            >
                <div className="w-4 h-4 rounded-sm border border-blue-400/80" />
            </animated.div>
            <p className="text-xs uppercase tracking-[0.25em] text-gray-400 font-medium">
                The Neurosymbolic AI Lab
            </p>
        </animated.div>
    );
};

export default IntroAnimation;
