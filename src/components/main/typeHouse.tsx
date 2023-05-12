import { useScroll } from 'framer-motion';
import { useRef } from 'react';

const TypeHouse = () => {
  const imgArr: { title: string; path: string }[] = [
    {
      title: 'Room',
      path: 'https://a0.muscache.com/pictures/7630c83f-96a8-4232-9a10-0398661e2e6f.jpg'
    },
    {
      title: 'Design',
      path: 'https://a0.muscache.com/pictures/50861fca-582c-4bcc-89d3-857fb7ca6528.jpg'
    },
    {
      title: 'Hanoks',
      path: 'https://a0.muscache.com/pictures/51f5cf64-5821-400c-8033-8a10c7787d69.jpg'
    },
    {
      title: 'Amazing pools',
      path: 'https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg'
    },
    {
      title: 'Beachfront',
      path: 'https://a0.muscache.com/pictures/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c.jpg'
    },
    {
      title: 'Omg',
      path: 'https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg'
    },
    {
      title: 'Cabins',
      path: 'https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg'
    },
    {
      title: 'Trending',
      path: 'https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg'
    },
    {
      title: 'Lakefront',
      path: 'https://a0.muscache.com/pictures/677a041d-7264-4c45-bb72-52bff21eb6e8.jpg'
    },
    {
      title: 'Iconic cities',
      path: 'https://a0.muscache.com/pictures/ed8b9e47-609b-44c2-9768-33e6a22eccb2.jpg'
    },
    {
      title: 'Yurts',
      path: 'https://a0.muscache.com/pictures/4759a0a7-96a8-4dcd-9490-ed785af6df14.jpg'
    },
    {
      title: 'Castles',
      path: 'https://a0.muscache.com/pictures/1b6a8b70-a3b6-48b5-88e1-2243d9172c06.jpg'
    },
    {
      title: 'Barns',
      path: 'https://a0.muscache.com/pictures/f60700bc-8ab5-424c-912b-6ef17abc479a.jpg'
    },
    {
      title: 'Acrtic',
      path: 'https://a0.muscache.com/pictures/8b44f770-7156-4c7b-b4d3-d92549c8652f.jpg'
    },
    {
      title: 'Golfing',
      path: 'https://a0.muscache.com/pictures/6b639c8d-cf9b-41fb-91a0-91af9d7677cc.jpg'
    },
    {
      title: 'Surfing',
      path: 'https://a0.muscache.com/pictures/957f8022-dfd7-426c-99fd-77ed792f6d7a.jpg'
    },
    {
      title: 'Amazing views',
      path: 'https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg'
    },
    {
      title: 'Boats',
      path: 'https://a0.muscache.com/pictures/687a8682-68b3-4f21-8d71-3c3aef6c1110.jpg'
    },
    {
      title: 'Farms',
      path: 'https://a0.muscache.com/pictures/aaa02c2d-9f0d-4c41-878a-68c12ec6c6bd.jpg'
    },
    {
      title: 'Skiing',
      path: 'https://a0.muscache.com/pictures/aaa02c2d-9f0d-4c41-878a-68c12ec6c6bd.jpg'
    },
    {
      title: 'Domes',
      path: 'https://a0.muscache.com/pictures/89faf9ae-bbbc-4bc4-aecd-cc15bf36cbca.jpg'
    },
    {
      title: 'National parks',
      path: 'https://a0.muscache.com/pictures/c0a24c04-ce1f-490c-833f-987613930eca.jpg'
    },
    {
      title: 'Beach',
      path: 'https://a0.muscache.com/pictures/10ce1091-c854-40f3-a2fb-defc2995bcaf.jpg'
    },
    {
      title: 'Lake',
      path: 'https://a0.muscache.com/pictures/a4634ca6-1407-4864-ab97-6e141967d782.jpg'
    },
    {
      title: 'Houseboats',
      path: 'https://a0.muscache.com/pictures/c027ff1a-b89c-4331-ae04-f8dee1cdc287.jpg'
    },
    {
      title: 'Islands',
      path: 'https://a0.muscache.com/pictures/8e507f16-4943-4be9-b707-59bd38d56309.jpg'
    },
    {
      title: 'Caves',
      path: 'https://a0.muscache.com/pictures/4221e293-4770-4ea8-a4fa-9972158d4004.jpg'
    }
  ];
  const slide = useRef<HTMLInputElement>(null);
  const {} = useScroll({ container: slide });

  return (
    <div className="w-full h-full relative z-10">
      <div
        className="grid grid-flow-col w-full h-fit overflow-scroll overflow-y-hidden"
        ref={slide}
      >
        {imgArr.map((item: { title: string; path: string }, index: number) => {
          return (
            <div
              key={index}
              className="w-fit h-full flex flex-col mx-[20px] box-border
            py-3 relative after:absolute after:w-0 after:h-[3px] after:bottom-0 after:bg-slate-600
            after:hover:w-full after:transition-all after:duration-500
          "
            >
              <div className="w-full h-fit flex">
                <img src={`${item.path}`} alt="" className="w-[30px] h-[30px] m-auto" />
              </div>
              <span className="w-full h-fit text-[15px] whitespace-nowrap">{item.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TypeHouse;
