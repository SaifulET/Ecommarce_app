import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AnimatedLink({ to, children }) {
  const [fade, setFade] = useState(false);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    setFade(true);
    setTimeout(() => navigate(to), 500);
  };

  const containerStyle = {
    transition: 'opacity 0.5s ease-out',
    opacity: fade ? 0 : 1
  };

  return (
    <div style={containerStyle}>
      <a href={to} onClick={handleClick} style={{ textDecoration: 'none', color: 'inherit' }}>
        {children}
      </a>
    </div>
  );
}

export default AnimatedLink;
