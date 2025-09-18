import Image from 'next/image';

interface LeafIconProps {
  size?: 'sm' | 'md';
}

const LeafIcon: React.FC<LeafIconProps> = ({ size = 'md' }) => {
  const dimensions = size === 'sm' ? { width: 12, height: 12 } : { width: 16, height: 16 };
  const sizeClasses = size === 'sm' ? 'h-3 w-3' : 'h-4 w-4';
  
  return (
    <Image
      src="/leaf.svg"
      alt="Leaf"
      width={dimensions.width}
      height={dimensions.height}
      className={`${sizeClasses} text-green-600`}
    />
  );
};

export default LeafIcon;