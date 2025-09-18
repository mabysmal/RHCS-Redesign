import Image from 'next/image';

interface CloseIconProps {
  className?: string;
}

const CloseIcon: React.FC<CloseIconProps> = ({ className = "" }) => (
  <Image
    src="/closeicon.svg"
    alt="Close"
    width={24}
    height={24}
    className={`h-6 w-6 ${className}`}
  />
);

export default CloseIcon;