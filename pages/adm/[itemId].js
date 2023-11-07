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

const AdminEditProductsIDPage = ({ product }) => {
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

        <h1 className='container mx-auto pt-0 grid grid-cols-1 gap-2 place-items-center max-w-screen-lg text-2xl font-bold underline'>
         Update Information:</h1>

         <form className="container mx-auto max-w-screen-lg flex justify-center grid grid-cols-1 gap-2 place-content-center">
            
            <div className="mt-0 container mx-auto max-w-screen-sm flex justify-center grid grid-cols-1 gap-1 place-content-center">
            <label for="title">Title:</label>
            <input className="text-black ring-2 rounded-lg ring-zinc-950" id="title" name="title" type="text" placeholder={product.title}/>
            </div>

            <div className="mt-2 container mx-auto max-w-screen-sm flex justify-center grid grid-cols-1 gap-1 place-content-center">
            <label for="description">Description:</label>
            <textarea className="text-black h-20 ring-2 rounded-lg ring-zinc-950" id="description" name="description" type="text" maxlength="250" placeholder={product.description}></textarea>
            </div>

            <div className="mt-2 container mx-auto max-w-screen-sm flex justify-center grid grid-cols-1 gap-1 place-content-center">
            <label for="category">Category:</label>
            <input className="text-black ring-2 rounded-lg ring-zinc-950 w-60" id="category" name="category" type="text" placeholder={product.category}/>
            </div>

            <div className="mt-2 container mx-auto max-w-screen-sm flex justify-center grid grid-cols-1 gap-1 place-content-center">
            <label for="price">Price:</label>
            <input className="text-black ring-2 rounded-lg ring-zinc-950 w-28" id="price" name="price" type="number" placeholder={product.price}/>
            </div>                               
            
            <div className="container mx-auto w-20 flex justify-center grid grid-cols-1 gap-1 place-content-center">
            <button className="bg-orange-400 text-center text-white border-none mt-2 py-2 px-6 rounded-lg shadow-md hover:bg-orange-500 hover:shadow-lg" type="submit">Edit</button>
            </div>
            
          </form>

          
        





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

export default  AdminEditProductsIDPage;