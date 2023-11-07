'use client'
import Bottom from 'src/app/components/Bottom';
import Drawer from 'src/app/components/Drawer';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React, {useState, useContext, useEffect} from 'react';
import 'tailwindcss/tailwind.css'
import Appbar from 'src/app/components/Appbar';
import { ThemeContext } from "src/app/contexts/ThemeContext";
import { fetchProducts, apiUrlProdutcs } from 'src/app/utils/api'
import Link from 'next/link';



const AdminProductsEditPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState();

  const handleMenuToggle  = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    console.log("Admin Product Edit atualizou");
}, [theme])


  const { data: session } = useSession();
  const router = useRouter();


  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
        const productsData = await fetchProducts();
        setProducts(productsData);
    }
    getProducts();
  }, []);

  const dropBox = ({ apiUrlProdutcs }) => {
    const [products, setOptions] = useState([]);
    const router = useRouter();
  
    useEffect(() => {
      fetch(apiUrlProdutcs)
        .then((response) => response.json())
        .then((data) => {
          setOptions(data);
        });
    }, []);
};


  const handleEdit = async (event) => {
    if (confirm('Are you sure you want to edit this product?')){
    event.preventDefault();
  
    // Obtém o valor do campo de texto
    const name = event.target.name.value;
    const name2 = event.target.name2.value
    

    // Cria o objeto JSON da requisição
    const data = {
      name, name2,
    };
  
    // Envia a requisição
    const response = await fetch(`http://localhost:3001/products`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    // Trata a resposta
    if (response.status === 200) {
      // A requisição foi bem-sucedida
      window.location.reload()
      alert(`Product update successfully!`);
    } else {
      // A requisição falhou
      alert(`Error update product: ${response.status}`);
    }
  }};
  
 
  if (session) {
    return (
<main className={`container mx-auto max-w-screen-lg min-h-screen ${theme === 'dark' ? 'bg-stone-600 text-white' : 'bg-white'}`}>
        <Appbar onMenuToggle={handleMenuToggle}></Appbar>
        <Drawer isOpen={isDrawerOpen} onClose={handleMenuToggle}></Drawer>
        
        <div className="mt-2 container mx-auto max-w-screen-lg flex justify-center flex-col items-center md:flex-row">
        <Link href="/adm/productAdd">
              <button className="bg-orange-500 text-white border-none mt-2 ml-2 mr-2 py-2 px-6 rounded-lg shadow-md hover:bg-orange-600 hover:shadow-lg">
              Add Product
              </button>
              </Link>                      

        <Link href="/adm/productDelete">
              <button className="bg-orange-500 text-white border-none mt-2 ml-2 mr-2 py-2 px-4 rounded-lg shadow-md hover:bg-orange-600 hover:shadow-lg">
              Delete Product
              </button>
              </Link>  
        
        <Link href="/adm">
              <button className="bg-orange-500 text-white border-none mt-2 ml-2 mr-2 py-2 px-6 rounded-lg shadow-md hover:bg-orange-600 hover:shadow-lg">
              Admin Panel
              </button>
              </Link>

              <button className="bg-red-500 text-white border-none mt-2 ml-2 mr-2 py-2 px-10 rounded-lg shadow-md hover:bg-red-600 hover:shadow-lg"
                onClick={() => {signOut()}}>
                Sign Out
              </button>
        </div>

        <h1 className='container mx-auto pt-7 grid grid-cols-1 gap-2 place-items-center max-w-screen-lg text-2xl font-bold'>
         Edit Product</h1>

        <div className="container mx-auto max-w-screen-lg flex justify-center flex-col items-center mt-2">                
        <form className="container mx-auto max-w-screen-lg pl-5 pr-5 flex justify-center flex-col items-center" onSubmit={handleEdit}>
        <select className="container mb-4 bg-white max-w-screen-lg pl-5 pr-5 h-6 flex justify-center flex-col items-center ring-2 rounded-lg ring-zinc-950 text-black text-center"
           name="name" value={router.query.dropBox} onChange={(e) => router.push({ query: { dropBox: e.target.value } })}>
          {products.map((option) => (
         <option key={option.id} value={option.id}>{option.title}</option>
        ))}
        </select>
        <input className="ring-2 rounded-lg ring-zinc-950 text-black text-center " type="text" name="name2" placeholder="New Category Name" required/>
        <button className="mt-4 bg-orange-400 text-white border-none mt-2 ml-2 mr-2 py-2 px-6 rounded-lg shadow-md hover:bg-orange-500 hover:shadow-lg" type="submit">Edit</button>
        </form>
        </div>

        <Bottom></Bottom>
      </main>
    );
  }
  return (
    <main className={`container mx-auto max-w-screen-lg min-h-screen ${theme === 'dark' ? 'bg-stone-600' : 'bg-white'}`}>
      <Appbar onMenuToggle={handleMenuToggle}></Appbar>
      <Drawer isOpen={isDrawerOpen} onClose={handleMenuToggle}></Drawer>
      <div className="container mx-auto py-10 grid grid-cols-1 gap-4 place-items-center max-w-screen-sm">
      <h1 className='text-xl font-semibold text-rose-400'> You are not currently logged in!</h1>
      <button className="bg-orange-500 text-white border-none py-2 px-4 rounded-lg shadow-md hover:bg-orange-600 hover:shadow-lg"
      onClick={() => signIn()}>
      Sign in with Google
      </button>       
      </div>
      <Bottom></Bottom>
    </main>
  );

}
export default AdminProductsEditPage;