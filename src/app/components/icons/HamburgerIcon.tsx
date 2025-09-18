import Image from 'next/image';

const HamburgerIcon: React.FC = () => (
  <Image
    src="/hambmenu.svg"
    alt="Menu"
    width={24}
    height={24}
    className="h-6 w-6"
  />
);

export default HamburgerIcon;