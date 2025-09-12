import React from "react";
import { useCallback, useEffect, useState } from "react";
// RENAMED: Import the Particles component from @tsparticles/react as ParticlesComponent
import ParticlesComponent, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import './Particles.css';

const Particles = () => { // This is YOUR component declaration
    const [ init, setInit ] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    // It's good practice to wrap callback functions in useCallback
    const particlesLoaded = useCallback((container) => {
        console.log(container);
    }, []);

    // You can define options outside the return statement for cleaner code
    const particlesOptions = {
        background: {
            color: {
                value: "linear-gradient(89deg, #FF5EDF 0%, #04C8DE 100%);",
            },
        },
        fpsLimit: 150,
        // interactivity: {
        //     events: {
        //         onClick: {
        //             enable: true,
        //             mode: "push",
        //         },
        //         onHover: {
        //             enable: true,
        //             mode: "repulse",
        //         },
        //         resize: true,
        //     },
        //     modes: {
        //         push: {
        //             quantity: 4,
        //         },
        //         repulse: {
        //             distance: 200,
        //             duration: 0.4,
        //         },
        //     },
        // },
        particles: {
            color: {
                value: "#ffffff",
            },
            links: {
                color: "#ffffff",
                distance: 300,
                enable: true,
                opacity: 0.5,
                width: 1,
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "bounce",
                },
                random: false,
                speed: 5,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 100,
            },
            opacity: {
                value: 0.5,
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 5 },
            },
        },
        detectRetina: true,
    };

    return (
        <>
            {init && (
                <ParticlesComponent className="particles"// USE THE RENAMED COMPONENT HERE
                    id="tsparticles"
                    particlesLoaded={particlesLoaded}
                    options={particlesOptions}
                />
            )}
             </>
    );
};

export default Particles;