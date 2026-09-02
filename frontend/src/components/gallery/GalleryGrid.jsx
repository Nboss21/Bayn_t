import React from 'react';
import woman1 from '../../assets/womans/woman 1.png';
import woman2 from '../../assets/womans/woman 2.png';
import woman3 from '../../assets/womans/woman 3.png';
import woman4 from '../../assets/womans/woman 4.png';
import woman5 from '../../assets/womans/woman 5.jpg';
import woman6 from '../../assets/womans/woman 6.png';
import woman7 from '../../assets/womans/woman 7.jpg';

const GalleryGrid = () => {
  return (
    <div className="w-full flex justify-center py-4 px-4 bg-[#fdfbf8] pb-32">
      <div className="w-full max-w-[800px] flex flex-col gap-4 md:gap-6">
        
        <div className="grid grid-cols-3 gap-4 md:gap-6">
          {/* Row 1 */}
          <div className="col-span-2">
            <img src={woman1} alt="Woman 1" className="w-full h-[300px] md:h-[450px] object-cover" />
          </div>
          <div className="col-span-1">
            <img src={woman2} alt="Woman 2" className="w-full h-[300px] md:h-[450px] object-cover" />
          </div>

          {/* Row 2 */}
          <div className="col-span-1">
            <img src={woman3} alt="Woman 3" className="w-full h-[200px] md:h-[250px] object-cover" />
          </div>
          <div className="col-span-2">
            <img src={woman4} alt="Woman 4" className="w-full h-[200px] md:h-[250px] object-cover" />
          </div>

          {/* Row 3 */}
          <div className="col-span-1">
            <img src={woman5} alt="Woman 5" className="w-full h-[150px] md:h-[250px] object-cover" />
          </div>
          <div className="col-span-1">
            <img src={woman6} alt="Woman 6" className="w-full h-[150px] md:h-[250px] object-cover" />
          </div>
          <div className="col-span-1">
            <img src={woman7} alt="Woman 7" className="w-full h-[150px] md:h-[250px] object-cover" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default GalleryGrid;
