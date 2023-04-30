import { LayoutProps } from '@/models/layoutprops';
import Auth from '../Auth/auth';
import { FaAirbnb } from "react-icons/fa";


const LoginLayout = ({ children }: LayoutProps) => {
  return (
    <Auth>
      
      <div>{children}</div>
    </Auth>
  );
};
export default LoginLayout;
