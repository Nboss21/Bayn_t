import React from 'react';
import Reveal from './Reveal';

const ImageReveal = ({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  rounded = 'rounded-2xl',
  hover = true,
  children,
  ...rest
}) => (
  <Reveal y={48} className={`${rounded} ${className}`}>
    <div className="group relative h-full w-full overflow-hidden">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        draggable={false}
        className={`h-full w-full object-cover will-change-transform transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${hover ? 'group-hover:scale-[1.06]' : ''} ${imgClassName}`}
        {...rest}
      />
      {children}
    </div>
  </Reveal>
);

export default ImageReveal;