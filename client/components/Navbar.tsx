"use client";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { useTheme } from "next-themes";

// Lottie
import menuBlackAnim from "../public/assets/lottie/menuBlack.json";
import menuWhiteAnim from "../public/assets/lottie/menuWhite.json";

const Navbar = () => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const { resolvedTheme } = useTheme();

  const [isAnimating, setIsAnimating] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  const isDarkMode = resolvedTheme === "dark";

  useEffect(() => {
    setMounted(true);

    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();

    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const linkStyles =
    "relative text-zinc-200 after:absolute after:-bottom-1 after:left-1/2 after:h-[2px] after:w-[90%] after:origin-center after:-translate-x-1/2 after:scale-x-0 after:bg-zinc-700 after:transition-transform after:duration-300 hover:after:scale-x-100 md:text-zinc-700 md:dark:text-zinc-300 dark:text-zinc-700 dark:after:bg-zinc-300";

  const handleMenuClick = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    if (!isMenuOpen) {
      lottieRef.current?.goToAndStop(0, true);
      lottieRef.current?.playSegments([0, 50], true);
      setIsMenuOpen(true);
    } else {
      lottieRef.current?.playSegments([50, 0], true);
      setIsMenuOpen(false);
    }
  };

  if (!mounted) return null;

  return (
    <>
      {isMobile && (
        <button
          onClick={handleMenuClick}
          className="flex h-[39px] items-center overflow-hidden"
        >
          <Lottie
            className="relative -right-14"
            lottieRef={lottieRef}
            animationData={isDarkMode ? menuWhiteAnim : menuBlackAnim}
            style={{
              height: 150,
              pointerEvents: isAnimating ? "none" : "auto",
            }}
            autoplay={false}
            loop={false}
            onComplete={() => setIsAnimating(false)}
          />
        </button>
      )}

      <div
        style={{
          opacity: isMenuOpen || !isMobile ? 1 : 0,
        }}
        className="absolute top-full w-full rounded-lg bg-black px-5 py-3 transition-opacity duration-300 md:static md:flex md:w-2/3 md:items-center md:justify-between md:bg-transparent lg:w-3/5 dark:bg-white dark:md:bg-transparent"
      >
        <nav>
          <ul className="flex flex-col gap-3 md:flex-row md:gap-5">
            <li>
              <Link href="/inicio" className={linkStyles}>
                Início
              </Link>
            </li>
            <li>
              <Link href="/produtos" className={linkStyles}>
                Produtos
              </Link>
            </li>
          </ul>
        </nav>

        <div className="mt-5 flex items-center gap-5 md:mt-0">
          <Link href="/entrar" className={linkStyles}>
            Entrar
          </Link>
          <Link
            href="/cadastrar"
            className="rounded-lg border-2 border-black bg-white px-8 py-3 text-black duration-300 hover:scale-105 hover:bg-transparent hover:text-black md:bg-black md:text-zinc-200 dark:border-white dark:bg-black dark:text-white dark:hover:bg-transparent dark:hover:text-white md:dark:bg-white md:dark:text-black"
          >
            Cadastrar
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
