import Image from "next/image";

// Component
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="relative container mx-auto flex items-center justify-between py-3">
      <Image
        className="dark:invert"
        src="/assets/icons/logo.svg"
        alt="Logo"
        height={39}
        width={166}
        priority
      />

      <Navbar />
    </header>
  );
};

export default Header;
