import React from 'react';

interface GoogleMapProps {
  src: string;
  width?: string;
  height?: string;
  title?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  src,
  width = '600',
  height = '450',
  title = 'Google Map Location',
}) => {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', paddingBottom: `${(parseInt(height) / parseInt(width)) * 100}%` }}>
      <iframe
        src={src}
        width={width}
        height={height}
        style={{ border: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
      ></iframe>
    </div>
  );
};

export default GoogleMap;