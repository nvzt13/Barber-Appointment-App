import { FacebookIcon, Instagram, TwitchIcon } from 'lucide-react';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-footerImage bg-cover bg-center bg-no-repeat py-16 text-white">
      <div className="container mx-auto px-8 lg:px-16">
        {/* Contact Information */}
        <div className="flex flex-col items-end text-right mb-12">
          <h1 className="text-5xl font-extrabold mb-8 text-center lg:text-right">İletişim Bilgileri</h1>

          <div className="flex flex-col space-y-6">
            <div>
              <h4 className="text-xl font-semibold">Adres</h4>
              <p className="text-lg">Örnek Cad. No:13 Bitlis/Merkez</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold">Telefon</h4>
              <p className="text-lg">0532 123 45 67</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold">Email</h4>
              <p className="text-lg">örnek@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center lg:justify-end space-x-6 mt-10">
          <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="hover:text-blue-500 transition-colors duration-300">
            <FacebookIcon size={32} />
          </a>
          <a href="https://www.twitter.com/" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors duration-300">
            <TwitchIcon size={32} />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="hover:text-pink-400 transition-colors duration-300">
            <Instagram size={32} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
