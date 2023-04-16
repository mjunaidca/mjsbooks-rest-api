import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12 sm:p-24 mb-6 sm:mb-0.5">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="absolute left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Warrior: Muhammad Junaid Shaukat
        </p>
      </div>

      <div className="relative flex flex-col place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        <h1 className="text-4xl pb-4 text-center md:text-6xl font-bold text-gray-900 mt-20 lg:mt-4 ">
          Books Rest API
        </h1>
        <p className="  text-base text-center mx-auto  sm:text-lg md:text-xl text-gray-900 mt-4">
          Assignment 04: Simple Books API using Next.js 13 and Neon. Fully
          functional with SQL calls to Neon Database!
        </p>
      </div>

      <div className="mb-32 mt-10 md:mt-28 flex flex-col justify-center lg:mb-0 text-left">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-50 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30">
          <h2 className={`${inter.className} mb-3 text-2xl font-semibold`}>
            EndPoints
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <ul
            className={`${inter.className} m-0 text-gray-600 max-w-lg text-base sm:text-lg gap-6 list-outside`}
          >
            <li>GET /api/status - Check API status</li>
            <li>GET /api/books - List books (filter: type, limit: 1-20)</li>
            <li>GET /api/books/:bookId - Get book details</li>
            <li>POST /api-clients/ - Register API client</li>
            <li className="font-semibold m-2 mb-2">Middleware applied:</li>
            <li>POST /orders - Submit a new order (bookId, customerName)</li>
            <li>GET /orders - View all orders for a client</li>
            <li>GET /orders/:orderId - View an existing order</li>
            <li>PATCH /orders/:orderId - Update order (customerName)</li>
            <li>DELETE /orders/:orderId - Delete an existing order</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
