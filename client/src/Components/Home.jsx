import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-black via-black to-black overflow-hidden">
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* Main Section (Left and Right Split) */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center px-12 w-full pt-20 space-y-6 md:space-y-0 md:space-x-12 mt-40">
        {/* Left Section (Text) */}
        <div className="text-white w-full md:w-1/2 text-center space-y-6 ">
          <h1 className="text-5xl font-bold tracking-wide">
            Stream With Us
          </h1>
          <p className="text-lg text-gray-300">
            Join a vibrant community of streamers. Share your story, showcase your talents, and connect with viewers across the world.
          </p>
          <button
            onClick={() => navigate("/stream")}
            className="px-6 py-3 border border-white text-white font-medium text-lg rounded-full hover:bg-white hover:text-black transition duration-300"
          >
            Start Streaming
          </button>
        </div>

        {/* Right Section (Images of Users Streaming) */}
        <div className="w-full md:w-1/2 flex justify-center space-x-6">
          <img
            src="https://via.placeholder.com/150"
            alt="Streamer 1"
            className="rounded-full shadow-lg w-32 h-32"
          />
          <img
            src="https://via.placeholder.com/150"
            alt="Streamer 2"
            className="rounded-full shadow-lg w-32 h-32"
          />
          <img
            src="https://via.placeholder.com/150"
            alt="Streamer 3"
            className="rounded-full shadow-lg w-32 h-32"
          />
        </div>
      </div>

      {/* Carousel Section Above Footer */}
      <div className="mt-36 w-full bg-black py-10">
        <h2 className="text-center text-white text-3xl mb-5">You Can Stream Too!</h2>
        <Carousel
          autoPlay
          infiniteLoop
          interval={2000}
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
          swipeable={false}
          className="w-4/5 mx-auto"
          dynamicHeight={false}
          emulateTouch={true}
          showArrows={false}
        >
          <div className="flex space-x-6">
            <img
              src="https://via.placeholder.com/150"
              alt="User 1"
              className="rounded-full shadow-lg w-32 h-32"
            />
            <img
              src="https://via.placeholder.com/150"
              alt="User 2"
              className="rounded-full shadow-lg w-32 h-32"
            />
            <img
              src="https://via.placeholder.com/150"
              alt="User 3"
              className="rounded-full shadow-lg w-32 h-32"
            />
          </div>
          <div className="flex space-x-6">
            <img
              src="https://via.placeholder.com/150"
              alt="User 4"
              className="rounded-full shadow-lg w-32 h-32"
            />
            <img
              src="https://via.placeholder.com/150"
              alt="User 5"
              className="rounded-full shadow-lg w-32 h-32"
            />
            <img
              src="https://via.placeholder.com/150"
              alt="User 6"
              className="rounded-full shadow-lg w-32 h-32"
            />
            <img
              src="https://via.placeholder.com/150"
              alt="User 6"
              className="rounded-full shadow-lg w-32 h-32"
            />
            <img
              src="https://via.placeholder.com/150"
              alt="User 6"
              className="rounded-full shadow-lg w-32 h-32"
            />
            
          </div>
        </Carousel>
      </div>

      {/* Footer Section */}
      <footer className="w-full bg-gray-800 py-6 mt-10">
        <div className="text-center text-white">
          <p>&copy; 2025 StreamApp. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
