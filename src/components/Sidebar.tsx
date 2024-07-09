import { GoHome, GoHomeFill, GoSearch } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";

const links = [
  { icon1: <GoHome />, icon2: <GoHomeFill />, href: "", label: "Home" },
  { icon1: <GoSearch />, icon2: <GoSearch />, href: "search", label: "Search" },
];
const Sidebar = () => {
  const location = useLocation();

  return (
    <header className="flex flex-col gap-5 p-4 text-white">
      {links.map((item) => (
        <Link
          to={`/${item.href}`}
          className={`flex items-center gap-3 text-2xl ${
            location.pathname === `/${item.href}` ? "text-white" : "text-gray"
          }`}
          key={item.label}
        >
          <div>
            {location.pathname === `/${item.href}` ? item.icon2 : item.icon1}
          </div>
          <div className="hidden lg:block text-lg">{item.label}</div>
        </Link>
      ))}
    </header>
  );
};

export default Sidebar;
