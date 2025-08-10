// components/CustomCursor.jsx
import useCursor from '../hooks/useCursor';
import '../styles/cursor.css';

const CustomCursor = () => {
  useCursor();
  return <div className="custom-cursor" />;
};

export default CustomCursor;
