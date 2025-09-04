import React, { useEffect } from 'react';

const IntroAnimation = ({ onAnimationComplete }) => {
    useEffect(() => {
        const introContainer = document.getElementById('intro-container-react');

        // Prevent body scrolling while animation is active
        document.body.style.overflow = 'hidden';

        // Trigger the animation by adding the 'is-animating' class after a short delay
        const startTimer = setTimeout(() => {
            if (introContainer) {
                introContainer.classList.add('is-animating');
            }
        }, 50);

        // Set a timer to call the completion callback and clean up
        const animationDuration = 2600; // 2.5s transition + 100ms buffer
        const endTimer = setTimeout(() => {
            onAnimationComplete();
            // Re-enable scrolling on the body
            document.body.style.overflow = 'auto';
        }, animationDuration);

        // Cleanup timers on component unmount
        return () => {
            clearTimeout(startTimer);
            clearTimeout(endTimer);
            // Ensure scrolling is re-enabled if the component unmounts early
            document.body.style.overflow = 'auto';
        };
    }, [onAnimationComplete]);

    return (
        <>
            <style>
                {`
                    /* The overlay container that holds the reveal effect */
                    .intro-container-react {
                        position: fixed;
                        inset: 0;
                        z-index: 100;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        pointer-events: none; /* Allows clicks to go through to the site below */
                    }

                    /* The core of the effect: a box with a massive border that shrinks */
                    .reveal-box-react {
                        position: absolute;
                        width: 100vw;
                        height: 100vh;
                        background-color: transparent;
                        border: 50vmax solid white;
                        box-sizing: border-box;
                        transition: border-width 2.5s cubic-bezier(0.86, 0, 0.07, 1);
                    }

                    /* The class that triggers the animation */
                    .intro-container-react.is-animating .reveal-box-react {
                        border-width: 0px;
                    }
                `}
            </style>
            <div id="intro-container-react" className="intro-container-react">
                <div className="reveal-box-react"></div>
            </div>
        </>
    );
};

export default IntroAnimation;

