import  { useState, useEffect } from 'react';
import './PlatformsPage.css';

const PlatformsPage = () => {
  const [currentDiv, setCurrentDiv] = useState(0);

  // Data for the auto-scrolling divs
  const platforms = [
    {
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/1024px-YouTube_full-color_icon_%282017%29.svg.png',
      text: 'Stream live on YouTube with ease.',
      guideLink: '#',
    },
    {
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Facebook_icon_2013.svg/1024px-Facebook_icon_2013.svg.png',
      text: 'Go live on Facebook in just a click.',
      guideLink: '#',
    },
    {
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Twitch_Glitch_Logo_Purple.svg/1024px-Twitch_Glitch_Logo_Purple.svg.png',
      text: 'Start streaming on Twitch today.',
      guideLink: '#',
    },
  ];

  // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDiv((prev) => (prev + 1) % platforms.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [platforms.length]);

  return (
    <div className="platformsContainer">
      <Navbar />
      <div className="platformsContent">
        <div className="platformsWrapper">
          {platforms.map((platform, index) => (
            <div
              key={index}
              className="platformDiv"
              style={{
                transform: `translateX(${100 * (index - currentDiv)}%)`,
                opacity: index === currentDiv ? 1 : 0,
              }}
            >
              <img src={platform.logo} alt="Platform Logo" className="platformLogo" />
              <p className="platformText">{platform.text}</p>
              <button className="guideButton" onClick={() => window.open(platform.guideLink, '_blank')}>
                Guide
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlatformsPage;