import Image from "next/image";
import Menu from "../components/menu/menu";
import SearchInput from "../components/search";
import categories from "@/../data/categories.json";
import products from "@/../data/products.json";
import Wrapper from "@/components/body/wrapper";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: 'Расчет себестоимости продукции "ООО ИНЖЕЛАЙН"'
}

export default function Home() {
  return (
    <main className="flex flex-col gap-8 p-4 min-h-screen">
      <header className='flex justify-between px-8'>
        <Image
          src="/logo/logo-horizontal.svg"
          alt='Logo'
          width={300}
          height={43}
        />
        <Image
          src="/icons/help.svg"
          className="aspect-square"
          alt='Help'
          width={25}
          height={25}
        />
      </header>
      <div className="main-block px-10">
        <Menu products={products} categories={categories} />
        <div className="v_divider ml-1" />
        <div className="flex flex-col w-full h-full">
          <SearchInput products={products} />
          <Suspense>
            <Wrapper />
          </Suspense>
        </div>
      </div>
      <footer>
        <p className="text-end text-gray-400">Расчет себестоимости продукции &quot;ООО ИНЖЕЛАЙН&quot;</p>
      </footer>
    </main>
  );
}
