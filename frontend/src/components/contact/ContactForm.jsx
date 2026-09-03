import React from 'react';

const ContactForm = () => {
  return (
    <div className="bg-white p-10 md:p-14 w-full flex-grow">
      <h2 className="font-serif text-[36px] text-[#1a1a1a] mb-10">
        Send a Message
      </h2>
      
      <form className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <label className="text-[12px] text-[#666666]">Full Name</label>
          <input 
            type="text" 
            placeholder="Jane Doe" 
            className="border-b border-[#eaeaea] pb-3 text-[14px] outline-none focus:border-[#666666] placeholder-[#cccccc] bg-transparent w-full"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[12px] text-[#666666]">Email Address</label>
          <input 
            type="email" 
            placeholder="jane@example.com" 
            className="border-b border-[#eaeaea] pb-3 text-[14px] outline-none focus:border-[#666666] placeholder-[#cccccc] bg-transparent w-full"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[12px] text-[#666666]">Your Message</label>
          <textarea 
            placeholder="How can we help you?" 
            rows="4"
            className="border-b border-[#eaeaea] pb-3 text-[14px] outline-none focus:border-[#666666] placeholder-[#cccccc] bg-transparent w-full resize-none"
          ></textarea>
        </div>

        <button 
          type="button" 
          className="mt-4 bg-[#e5ca65] hover:bg-[#d6bc5b] text-[#1a1a1a] font-bold text-[12px] tracking-[0.1em] py-4 px-8 w-fit transition-colors uppercase"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;

