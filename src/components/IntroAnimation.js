import React from 'react';
import { useSpring, animated } from 'react-spring';

const IntroAnimation = ({ isLoaded, onAnimationComplete }) => {
    // This animation handles the reveal sequence once data is loaded
    const revealAnimation = useSpring({
        // The animation starts when isLoaded becomes true
        from: { scale: 1, backgroundColor: 'black', opacity: 1 },
        to: async (next) => {
            if (isLoaded) {
                // The box expands to cover the screen
                await next({ scale: 50, config: { duration: 500, easing: t => t * t * t } });
                // The entire overlay fades out
                // await next({ opacity: 0, config: { duration: 500 } });
                onAnimationComplete(); // Signal completion
            }
        },
    });

    return (
        <>
            <style>
                {`
                    .intro-container-react {
                        position: fixed;
                        inset: 0;
                        z-index: 100;
                        background-color: transparent; /* The initial white screen */
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        overflow: hidden;
                    }

                    .loader-outline-react {
                        width: 60px;
                        height: 60px;
                        /* --- FIX: The background is now transparent --- */
                        background-color: black; 
                        border: 2px solid #0a0a0a; /* Black outline */
                        border-radius: 8px;
                    }
                `}
            </style>
            <div id="intro-container-react" className="intro-container-react">
                {/* If data is NOT loaded, it shows the pulsing outline loader.
                  If data IS loaded, it shows the animated solid box that will expand.
                */}
                {!isLoaded ? (
                    <div className="loader-outline-react animate-pulse"></div>
                ) : (
                    // This animated div gets its solid black background from the useSpring hook
                    <animated.div style={revealAnimation} className="loader-outline-react" />
                )}
            </div>
        </>
    );
};

export default IntroAnimation;

