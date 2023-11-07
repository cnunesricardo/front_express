import React,{ useContext, useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import { ThemeContext } from "src/app/contexts/ThemeContext";



function Appbar({onMenuToggle}) {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    console.log('atualiza appbar')
  }, [theme]);

  return (
    <div className={`container mx-auto max-w-screen-lg flex justify-between items-center p-4 h-16
      ${theme === 'dark' ? 'bg-amber-700' : 'bg-amber-300'}
    
    `}>
      <div className={``}>

        <Link href="/">
        <Image className={`${theme === 'dark' ? 'invert brightness-[0.25]' : ''}`}
          src="/logo.png"
          width={150}
          height={150}
          alt="Logo Fashion Store"
        />
        </Link>

      </div>
      <button className={`${theme === 'dark' ? 'white' : ''}`} onClick={onMenuToggle}>
        <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
      </button>
    </div>
  )
}

export default Appbar;