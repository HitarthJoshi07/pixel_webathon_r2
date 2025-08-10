import React, { useState, useRef } from "react";

const Card = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const timeoutRef = useRef(null);

  // On hover in: flip immediately
  // On hover out: delay flip back by 2.5 seconds
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsFlipped(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsFlipped(false);
      resetTilt();
    }, 300);
  };

  // Calculate 3D tilt based on mouse position inside card
  const handleMouseMove = (e) => {
    if (!isFlipped) return; // only tilt when flipped

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; // x pos in card
    const y = e.clientY - rect.top;  // y pos in card

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const maxTilt = 15; // max degrees

    const rotateX = ((y - centerY) / centerY) * maxTilt * -1;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTilt({ rotateX, rotateY });
  };

  const resetTilt = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <>
      <style>{`
        :root {
          --clr-bg: #121212;
          --clr-white: #f5f5f5;
          --clr-light-grey: #c8c8c8;
          --clr-border-glow: rgba(255, 255, 255, 0.25);
          --border-radius: 18px;
          --transition-speed: 0.3s;
          --font-family: 'Montserrat', sans-serif;
        }

        .Card * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .Card {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: var(--clr-bg);
          font-family: var(--font-family);
          perspective: 1400px;
          padding: 24px;
          user-select: none;
        }

        .Card-wrapper {
          padding: 20px;
          border-radius: var(--border-radius);
        }

        .Card.container {
          width: 700px;
          max-width: 90vw;
          height: 420px;
          position: relative;
          border-radius: var(--border-radius);
          background: #1a1a1a;
          box-shadow:
            0 0 0 2px var(--clr-border-glow),
            inset 0 0 10px #000;
          transform-style: preserve-3d;
          cursor: pointer;
          outline-offset: 4px;
          will-change: transform;
          transition: transform var(--transition-speed) cubic-bezier(0.4, 0, 0.2, 1);
        }

        .Card.container.flipped {
          transform: rotateY(180deg);
        }

        /* We'll override transform inline for tilt, so keep transform-style and transition */
        .Card.container.tilted {
          transition: transform 0.1s ease;
        }

        .Card .side {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: var(--border-radius);
          color: var(--clr-white);
          padding: 48px 64px;
          box-sizing: border-box;
          backface-visibility: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          transform-style: preserve-3d;
          background-color: #222;
          box-shadow: inset 0 0 15px rgba(255, 255, 255, 0.04);
          user-select: text;
          pointer-events: auto;
          transition: box-shadow 0.3s ease;
        }

        .Card .front {
          z-index: 2;
          border: 1.5px solid var(--clr-border-glow);
          background-image: url("https://images.unsplash.com/photo-1508385082359-f0b6e2b97d14?auto=format&fit=crop&w=800&q=80");
          background-size: cover;
          background-position: center;
          box-shadow: inset 0 0 25px rgba(0, 0, 0, 0.85);
        }

        .Card .front .content {
          background: rgba(20, 20, 20, 0.8);
          border-radius: 14px;
          padding: 36px 32px;
          box-shadow: 0 12px 32px rgba(0,0,0,0.6);
          transform: translateZ(60px) scale(0.92);
          transition: transform 0.5s ease;
          color: var(--clr-white);
        }

        .Card.container.flipped .front .content {
          transform: translateZ(60px) scale(0.88);
          filter: brightness(0.85);
        }

        .Card .content h1 {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 14px;
          letter-spacing: 0.05em;
          color: var(--clr-white);
          text-shadow: 0 0 8px rgba(255,255,255,0.7);
          cursor: default;
          user-select: none;
          position: relative;
        }

        .Card .content h1::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: -16px;
          width: 80px;
          height: 4px;
          background: var(--clr-white);
          border-radius: 3px;
          transform: translateX(-50%);
          box-shadow: 0 0 12px var(--clr-white);
          transition: width 0.4s ease;
        }

        .Card .content h1:hover::after {
          width: 120px;
        }

        .Card .content p {
          margin-top: 30px;
          font-size: 1.15rem;
          line-height: 1.85;
          color: var(--clr-light-grey);
          letter-spacing: 0.02em;
          text-shadow: 0 0 4px rgba(0,0,0,0.8);
          user-select: text;
        }

        .Card .back {
          transform: rotateY(180deg);
          border: 1.5px solid var(--clr-border-glow);
          background-color: #1f1f1f;
          box-shadow: inset 0 0 22px rgba(255, 255, 255, 0.04);
          z-index: 1;
          overflow: hidden;
          pointer-events: none;
          display: flex;
          flex-direction: column;
        }

        .Card.container.flipped .back {
          pointer-events: auto;
        }

        .Card .back .content {
          background: rgba(28, 28, 28, 0.9);
          border-radius: 14px;
          padding: 36px 40px 44px 40px;
          box-shadow: 0 8px 30px rgba(255, 255, 255, 0.15);
          transform: translateZ(40px);
          color: var(--clr-white);
          flex: 1 1 auto;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }

        .Card .back h1 {
          font-size: 2.4rem;
          margin-bottom: 30px;
          text-align: center;
          color: var(--clr-white);
          text-shadow: 0 0 15px var(--clr-white);
          user-select: none;
          flex-shrink: 0;
        }

        .Card form {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          overflow: hidden;
        }

        .Card form label {
          font-size: 1.05rem;
          margin-bottom: 8px;
          font-weight: 600;
          color: var(--clr-light-grey);
          user-select: none;
          letter-spacing: 0.02em;
        }

        .Card form input[type="text"],
        .Card form input[type="email"],
        .Card form textarea {
          background: transparent;
          border: none;
          border-bottom: 2px solid #444;
          padding: 12px 10px 10px 10px;
          font-size: 1rem;
          color: var(--clr-white);
          margin-bottom: 28px;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          border-radius: 3px 3px 0 0;
          outline-offset: 3px;
          font-family: var(--font-family);
        }

        .Card form input[type="text"]:focus,
        .Card form input[type="email"]:focus,
        .Card form textarea:focus {
          border-bottom-color: var(--clr-white);
          box-shadow: 0 3px 8px rgba(255, 255, 255, 0.6);
          outline: none;
          background: rgba(255, 255, 255, 0.1);
          color: var(--clr-white);
        }

        .Card form textarea {
          resize: vertical;
          min-height: 100px;
          max-height: 160px;
          line-height: 1.5;
          flex-grow: 1;
          color: var(--clr-white);
        }

        .Card form input[type="submit"] {
          align-self: center;
          width: 140px;
          padding: 14px 0;
          border: 2.5px solid var(--clr-white);
          background: transparent;
          color: var(--clr-white);
          font-weight: 700;
          font-size: 1.15rem;
          border-radius: 32px;
          cursor: pointer;
          user-select: none;
          transition: all 0.35s ease;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .Card form input[type="submit"]:hover,
        .Card form input[type="submit"]:focus {
          background: var(--clr-white);
          color: var(--clr-bg);
          box-shadow:
            0 0 20px var(--clr-white),
            0 0 30px var(--clr-white),
            0 0 40px var(--clr-white);
          outline: none;
        }

        .Card .side::-webkit-scrollbar {
          width: 7px;
        }
        .Card .side::-webkit-scrollbar-track {
          background: transparent;
        }
        .Card .side::-webkit-scrollbar-thumb {
          background-color: var(--clr-white);
          border-radius: 5px;
        }

        @media (max-width: 768px) {
          .Card.container {
            height: 480px;
            width: 95vw;
            padding: 36px 28px;
          }
          .Card .front,
          .Card .back {
            padding: 28px 28px;
          }
          .Card .content h1 {
            font-size: 2.4rem;
          }
          .Card .content p {
            font-size: 1rem;
          }
          .Card form label {
            font-size: 1rem;
          }
          .Card form input[type="submit"] {
            width: 100%;
          }
        }
      `}</style>

      <div className="Card-wrapper">
        <div
          className={`Card container ${isFlipped ? "flipped" : ""}`}
          tabIndex={0}
          aria-label="3D flipping card with finance professional profile front and contact form back"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleMouseEnter}
          onBlur={handleMouseLeave}
          onMouseMove={handleMouseMove}
          style={{
            transform: isFlipped
              ? `rotateY(180deg) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`
              : "none",
            transition: isFlipped
              ? "transform 0.1s ease"
              : "transform var(--transition-speed) cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <div className="front side" aria-hidden={isFlipped}>
            <div className="content">
              <h1>Jordan Michaels</h1>
              <p>
                Experienced financial strategist focused on investment analysis,
                portfolio optimization, and market forecasting. Delivering clear
                insights and measurable results to drive your financial growth.
              </p>
            </div>
          </div>

          <div className="back side" aria-hidden={!isFlipped}>
            <div className="content">
              <h1>Contact Me</h1>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Thank you for your message. We'll be in touch soon.");
                }}
                aria-label="Contact form"
              >
                <label htmlFor="name-input">Full Name:</label>
                <input
                  id="name-input"
                  type="text"
                  placeholder="Jordan Michaels"
                  required
                  aria-required="true"
                />
                <label htmlFor="email-input">Email Address:</label>
                <input
                  id="email-input"
                  type="email"
                  placeholder="jordan.michaels@example.com"
                  required
                  aria-required="true"
                />
                <label htmlFor="message-textarea">Message:</label>
                <textarea
                  id="message-textarea"
                  placeholder="Write your message here..."
                  required
                  aria-required="true"
                ></textarea>
                <input type="submit" value="Send Message" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
