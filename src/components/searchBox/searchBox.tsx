interface SearchBoxProps {
  onSelectAddress: (address: string, latitude: number | null, longitude: number | null) => void;
  defaultValue: string;
}

const SearchBox = ({ onSelectAddress, defaultValue }: SearchBoxProps) => {
  return <div></div>;
};

export default SearchBox;
