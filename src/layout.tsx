import React, { useState } from "react";
import Navbar from "./components/container/Navbar/Navbar";
import Sidebar from "./components/container/Sidebar/Sidebar";
// import Modal from "./Modal/Modal";
// import Footer from "./Footer";

interface LayoutProps {
    title?: string;
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <main className="flex bg-slate-100">
        {/* <div className="relative">
          <Sidebar/>
        </div> */}
        <div className="flex flex-col w-full min-h-[100vh]">
            <div className="relative w-full px-5">
              <Navbar title={title ?? '*'}/>
            </div>
            <div className="flex  px-5 gap-3 w-full h-full">
                {children}
            </div>
        </div>
        {/* <Modal/>    */}
    </main>
  );
};

export default Layout;

// export async function getServerSideProps(context) {
//   return {
//     props: {},
//   };
// }

