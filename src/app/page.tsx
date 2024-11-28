import Image from "next/image";
import List from "../components/list/list";
import SearchInput from "../components/search";
import categories from "@/../data/categories.json";
import products from "@/../data/products.json";
import Wrapper from "@/components/body/wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Расчет себестоимости продукции "ООО ИНЖЕЛАЙН"'
}

export default function Home() {
  return (
    <main className="flex flex-col gap-8 p-4 h-screen">
      <header className='flex justify-between px-8'>
        <Image
          src="/logo/logo-horizontal.svg"
          alt='Logo'
          width={250}
          height={100}
        />
        <Image
          src="/icons/help.svg"
          alt='Help'
          width={25}
          height={25}
        />
      </header>
      <div className="main-block px-10">
        <div className="menu shadowed">
          <List products={products} categories={categories} />
        </div>
        <div className="flex flex-col w-full h-full">
          <SearchInput products={products} />
          <Wrapper />
        </div>
      </div>
      <footer>
        <p className="text-end text-gray-400">Расчет себестоимости продукции "ООО ИНЖЕЛАЙН"</p>
      </footer>
    </main>
  );
}
