
import { FireFilled } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const Logo = ({ showText }) => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  return (
    <div className="logo">
      <div className="logo-icon">
        <FireFilled />
      </div>
      {showText && (
        <div className={`pl-2 text-lg font-bold ${isDarkMode ? "text-white" : "text-black"}`}>
          foryourlife
        </div>
      )}
    </div>
  )
}

export default Logo