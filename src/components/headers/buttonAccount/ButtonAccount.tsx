import { selectPopoverContext } from '@/contexts';
import { useContext, useEffect, useRef } from 'react';
import { BsList } from 'react-icons/bs';
import { HiUserCircle } from 'react-icons/hi';

const ButtonAccount = () => {
  const {setIsLoginClick} = useContext(selectPopoverContext);
  const controlBar = useRef<HTMLInputElement>(null);

  // animation open control panel
  const handleOnclick = (event: any) => {
    if (!controlBar.current?.classList.contains('animate-controlPanelSlideDown')) {
      controlBar.current?.classList.remove('animate-controlPanelSlideUp');
      controlBar.current?.classList.add('animate-controlPanelSlideDown');
    }
  };

  useEffect(() => {

    // animation close control panel
    const handleControlPanel = (event: any) => {
      const isClick = controlBar.current?.contains(event.target);
      if (!isClick && controlBar.current?.classList.contains("animate-controlPanelSlideDown")) {
        controlBar.current?.classList.remove('animate-controlPanelSlideDown');
        controlBar.current?.classList.add('animate-controlPanelSlideUp');
      }
    };
    document.addEventListener('mousedown', handleControlPanel);
  }, []);


  return (
    <div
      className="w-fit p-1 rounded-full bg-white flex border-gray-400 hover:shadow-lg
            transition-all duration-500 border-2 relative"
      onClick={handleOnclick}
    >
      <BsList className="w-[30px] h-[30px]" />
      <HiUserCircle className="w-[40px] h-[30px]" />
      <div
        className="absolute translate-y-12 w-[250px] h-0 right-0 rounded-2xl border-[3px] bg-white
        overflow-hidden invisible
      "
        ref={controlBar}
      >
        <div className="w-full h-fit border-b-2">
          <button className="w-full py-4 text-left px-5" onClick={event=> setIsLoginClick(true)}>Login</button>
          <button className="w-full py-4 text-left px-5">Sign up</button>
        </div>
        <div className="w-full h-fit">
          <button className="w-full py-4 text-left px-5">Airbnb your home</button>
          <button className="w-full py-4 text-left px-5">Help</button>
        </div>
      </div>
    </div>
  );
};

export default ButtonAccount;
