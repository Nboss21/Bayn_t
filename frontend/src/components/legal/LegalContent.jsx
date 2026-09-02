import React from 'react';

const LegalContent = () => {
  return (
    <div className="space-y-16 text-[#3a453a] text-[14px] leading-[1.8] font-light max-w-3xl">
      <div>
        <p>
          Welcome to Ethio Beauty Academy. We respect your privacy and are committed to protecting your personal<br className="hidden md:block"/>
          data. This privacy policy will inform you as to how we look after your personal data when you visit our website<br className="hidden md:block"/>
          (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
        </p>
      </div>

      <section id="section-1" className="scroll-mt-32">
        <h2 className="text-3xl font-serif text-[#2a362a] mb-6">1. Information Collection</h2>
        <p className="mb-6">
          We may collect, use, store and transfer different kinds of personal data about you which we have grouped<br className="hidden md:block"/>
          together as follows:
        </p>
        <ul className="space-y-4 pl-4">
          <li className="relative before:content-[''] before:absolute before:w-1.5 before:h-1.5 before:bg-[#2a362a] before:rounded-full before:left-[-1rem] before:top-2.5">
            <strong className="font-semibold text-[#2a362a]">Identity Data</strong> includes first name, maiden name, last name, username or similar identifier, marital status, title, date of birth and gender.
          </li>
          <li className="relative before:content-[''] before:absolute before:w-1.5 before:h-1.5 before:bg-[#2a362a] before:rounded-full before:left-[-1rem] before:top-2.5">
            <strong className="font-semibold text-[#2a362a]">Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.
          </li>
          <li className="relative before:content-[''] before:absolute before:w-1.5 before:h-1.5 before:bg-[#2a362a] before:rounded-full before:left-[-1rem] before:top-2.5">
            <strong className="font-semibold text-[#2a362a]">Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.
          </li>
        </ul>
      </section>

      <section id="section-2" className="scroll-mt-32">
        <h2 className="text-3xl font-serif text-[#2a362a] mb-6">2. Use of Information</h2>
        <p className="mb-6">
          We will only use your personal data when the law allows us to. Most commonly, we will use your personal data<br className="hidden md:block"/>
          in the following circumstances:
        </p>
        <div className="bg-[#f6efe7] border-l-4 border-[#a87b52] p-8 mb-6">
          <p className="italic text-[#5c4d3c]">
            "Where we need to perform the contract we are about to enter into or have entered into with you."
          </p>
        </div>
        <p>
          Where it is necessary for our legitimate interests (or those of a third party) and your interests and<br className="hidden md:block"/>
          fundamental rights do not override those interests. Where we need to comply with a legal obligation.
        </p>
      </section>

      <section id="section-3" className="scroll-mt-32">
        <h2 className="text-3xl font-serif text-[#2a362a] mb-6">3. Data Protection</h2>
        <p>
          We have put in place appropriate security measures to prevent your personal data from being accidentally<br className="hidden md:block"/>
          lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to<br className="hidden md:block"/>
          know.
        </p>
      </section>

      <section id="section-4" className="scroll-mt-32">
        <h2 className="text-3xl font-serif text-[#2a362a] mb-6">4. Cookie Policy</h2>
        <p>
          You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access<br className="hidden md:block"/>
          cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly.
        </p>
      </section>

      <section id="section-5" className="scroll-mt-32">
        <h2 className="text-3xl font-serif text-[#2a362a] mb-6">5. Terms of Service</h2>
        <p>
          By accessing and using our academy's website and services, you accept and agree to be bound by the terms<br className="hidden md:block"/>
          and provisions of this agreement. Any participation in our courses or use of our resources constitutes<br className="hidden md:block"/>
          acceptance of this agreement.
        </p>
      </section>

      <section id="section-6" className="scroll-mt-32">
        <h2 className="text-3xl font-serif text-[#2a362a] mb-6">6. Contact Information</h2>
        <p>
          If you have any questions about this privacy policy or our privacy practices, please contact us.<br className="hidden md:block"/>
          You can reach our Data Protection Officer at privacy@ethiobeautyacademy.com or via mail at our registered<br className="hidden md:block"/>
          office address.
        </p>
      </section>
    </div>
  );
};

export default LegalContent;

