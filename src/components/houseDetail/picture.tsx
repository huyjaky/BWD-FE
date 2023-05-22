interface PictureProps {
  arrImg: { Path: string }[];
}

const Picture = ({ arrImg }: PictureProps) => {
  return (
    <div
      className="w-full h-[450px] grid
    grid-cols-layoutPicture grid-rows-layoutPicture grid-areas-layoutPicture
    ">
      <div className="grid-in-h1">
        <img src={arrImg[0].Path} alt="" className="object-cover" />
      </div>
      <img src={arrImg[1].Path} alt="" className="grid-in-h2 " />
      <img src={arrImg[2].Path} alt="" className="grid-in-h3" />
      <img src={arrImg[3].Path} alt="" className="grid-in-h4" />
      <img src={arrImg[4].Path} alt="" className="grid-in-h5" />
    </div>
  );
};
export default Picture;
