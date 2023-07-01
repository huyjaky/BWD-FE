import Step11CHome from '@/components/CreateHome/Step/Step11CHome';
import { useEffect } from 'react';

const Test = () => {
  useEffect(() => {
    document.getElementById('tram')?.classList.add('tram2');
  }, []);
  return (
    <>
      {/* className tram 2 se duoc them vao the div co id la tram khi cau lenh
    document.getElementById('tram')?.classList.add('tram2'); duoc thuc hien */}
      <div id="tram" className="w-full h-full"></div>
      <div className="carousel overflow-x-hidden carousel-center max-w-md p-4 space-x-4 bg-neutral rounded-box w-screen h-[300px]">
        <div className="carousel-item">
          <img src="https://i.pinimg.com/564x/83/de/4b/83de4b3706360674108710d4339133f8.jpg" className="rounded-box" />
        </div>
        <div className="carousel-item">
          <img src="https://i.pinimg.com/564x/83/de/4b/83de4b3706360674108710d4339133f8.jpg" className="rounded-box" />
        </div>
        <div className="carousel-item">
          <img src="https://i.pinimg.com/564x/83/de/4b/83de4b3706360674108710d4339133f8.jpg" className="rounded-box" />
        </div>
        <div className="carousel-item">
          <img src="https://i.pinimg.com/564x/83/de/4b/83de4b3706360674108710d4339133f8.jpg" className="rounded-box" />
        </div>
        <div className="carousel-item">
          <img src="https://i.pinimg.com/564x/83/de/4b/83de4b3706360674108710d4339133f8.jpg" className="rounded-box" />
        </div>
        {/* <div className="carousel-item">
          <img src="/images/stock/photo-1559181567-c3190ca9959b.jpg" className="rounded-box" />
        </div>
        <div className="carousel-item">
          <img src="/images/stock/photo-1601004890684-d8cbf643f5f2.jpg" className="rounded-box" />
        </div> */}
      </div>
    </>
  );
};

export default Test;
