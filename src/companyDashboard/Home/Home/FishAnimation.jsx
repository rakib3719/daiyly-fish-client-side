
import { useSpring, animated } from '@react-spring/web';
import { FaFish } from 'react-icons/fa';

const FishAnimation = () => {
  const springProps = useSpring({
    from: { transform: 'translateX(-100px)' },
    to: { transform: 'translateX(100vw)' },
    config: { duration: 8000 },
    loop: true,
  });

  return (
    <div className="relative h-32 overflow-hidden bg-blue-200">
      <animated.div
        style={springProps}
        className="absolute bottom-0 flex items-center"
      >
        <FaFish size={40} className="text-blue-800 animate-ping" />
      </animated.div>
    </div>
  );
};

export default FishAnimation;
