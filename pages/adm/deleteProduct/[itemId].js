'use client'
import 'tailwindcss/tailwind.css'
import Appbar from 'src/app/components/Appbar';
import Bottom from 'src/app/components/Bottom';
import Drawer from 'src/app/components/Drawer';
import React, {useContext, useEffect, useState} from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { fetchProducts } from 'src/app/utils/api.js'
import { CartContext } from 'src/app/contexts/CartContext';
import { ProductContainer, ProductImageProd, CardButton } from 'src/app/styles/ProductsStyles'
import { ThemeContext } from "src/app/contexts/ThemeContext"
import Link from 'next/link';
import axios from 'axios';

const AdminDeleteProductsIDPage = ({ product }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState();
  
  const handleMenuToggle  = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    console.log("");
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

  const dropBox = ({ apiUrlProducts }) => {
    const [products, setOptions] = useState([]);
    const router = useRouter();
  
    useEffect(() => {
      fetch(apiUrlProducts)
        .then((response) => response.json())
        .then((data) => {
          setOptions(data);
        });
    }, []);
};

const handleDelete = async (event) => {
  if (confirm('Are you sure you want to DELETE this product?')){  
  
  // Envia a requisição
  const response = await fetch(`http://localhost:3001/products/${product.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
  });

  // Trata a resposta
  if (response.status === 200) {
  // A requisição foi bem-sucedid
    alert(`Product deleted successfully!`)
    window.location.href = "/adm/productDelete"
  } else {
    // A requisição falhou
    alert(`Error delete product: ${response.status}`);
  }

}};


  if (session) {
  return (
    <main className={`${theme === 'dark' ? 'bg-stone-600 text-white' : 'bg-white'} container mx-auto max-w-screen-lg min-h-screen`}>
      <Appbar onMenuToggle={handleMenuToggle}></Appbar>
      <Drawer isOpen={isDrawerOpen} onClose={handleMenuToggle}></Drawer>

      <div className="mt-2 container mx-auto max-w-screen-lg flex justify-center flex-col items-center md:flex-row">
        <Link href="/adm/productAdd">
              <button className="bg-orange-500 text-white border-none mt-2 ml-2 mr-2 py-2 px-6 rounded-lg shadow-md hover:bg-orange-600 hover:shadow-lg">
              Add Product
              </button>
              </Link>                      

        <Link href="/adm/productEdit">
              <button className="bg-orange-500 text-white border-none mt-2 ml-2 mr-2 py-2 px-6 rounded-lg shadow-md hover:bg-orange-600 hover:shadow-lg">
              Edit Product
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

        <h1 className='container mx-auto pt-7 grid grid-cols-1 gap-2 place-items-center max-w-screen-lg text-2xl font-bold underline'>
         Product Id: {product.id} - Current Information</h1>


              <ProductContainer className={`${theme === 'dark' ? 'bg-stone-600' : 'bg-white'} container mx-auto max-w-screen-sm flex felx-row`}>
                <div className="grid grid-cols-1 gap-2 place-items-center w-1/4">
                  <ProductImageProd src={product.image}/>
                </div>
                <div className="pl-12 pt-2 w-3/4">
                    <h1 className='text-2xl font-bold'>{product.title}</h1>
                    <p className='break-words'>{product.description}</p>
                    <h2 className='mt-2'><b>Category: </b>{product.category}</h2>
                    <p className='mt-2'><b>Price: </b>${product.price}</p>                    
                    </div>
                  </ProductContainer>

        <h1 className='container mx-auto pt-0 grid grid-cols-1 gap-2 place-items-center max-w-screen-lg text-2xl font-bold underline mt-5'>
         Delete Product?</h1>

         <form className="container mx-auto max-w-screen-lg flex justify-center grid grid-cols-1 gap-2 place-content-center" onSubmit={handleDelete}>
            
            <div className="container mx-auto w-20 flex justify-center grid grid-cols-1 gap-1 place-content-center mb-3">
            <button className="mt-3 bg-red-700 text-white border-none py-2 rounded-lg shadow-md hover:bg-red-800 hover:shadow-lg" type="submit">Delete</button>
            </div> 
          </form>
          
          <div className="container mx-auto w-20 flex justify-center grid grid-cols-1 gap-1 place-content-center mb-16">
          <Link href={`/adm/productDelete`}>
                    <button className="bg-green-500 text-white border-none ml-2 mr-2 py-2 px-4 rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg">
                    Back
                    </button>
                    </Link>
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

export async function getServerSideProps({ params }) {
  const { itemId } = params;
  
  const productResponse = await axios.get(`http://localhost:3001/products/${itemId}`)
  const product = productResponse.data;

  return{
      props: {
          product,
      }, 
  };
}


export default  AdminDeleteProductsIDPage;