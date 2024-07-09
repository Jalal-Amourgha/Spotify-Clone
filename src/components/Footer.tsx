import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import { footerLinks } from "../constants";

const Footer = () => {
  const socials = [
    { id: 1, icon: <FaInstagram /> },
    { id: 2, icon: <FaTwitter /> },
    { id: 3, icon: <FaFacebook /> },
  ];

  return (
    <footer className="mt-100 mb-[200px] bg-neutral-900 px-5 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
        {footerLinks.map((item) => (
          <div key={item.label}>
            <h1 className="text-lg font-medium mb-2">{item.label}</h1>
            <ul className="flex flex-col gap-2 text-gray">
              {item.links.map((link) => (
                <li
                  className="hover:text-white hover:underline cursor-pointer"
                  key={link.label}
                >
                  {link.label}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="flex items-start justify-end gap-5">
          {socials.map((social) => (
            <div
              className="h-10 w-10 bg-neutral-800 rounded-full flex items-center justify-center text-xl cursor-pointer"
              key={social.id}
            >
              {social.icon}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray w-full h-[1px] my-5"></div>
      <div className="flex justify-between items-center text-gray">
        <div className="flex items-center flex-wrap gap-4">
          <p>Legal</p>
          <p>Safety & Privacy Center</p>
          <p>Provacy Policy</p>
          <p>Cookies</p>
          <p>About Ads</p>
          <p>Accessibility</p>
        </div>
        <p>&#169; 2024 Spotify AB</p>
      </div>
    </footer>
  );
};

export default Footer;
