import Navbar from "@/components/navbar";
import Sidebarr from "@/components/sidebarr";


const DashboardLayout = (
    {children} : {children : React.ReactNode}
) => {
    return ( 
        <div className="h-full relative">
            <div className="hidden md:flex sticky top-0 z-900">
                   <Sidebarr />
            </div>
            <main className="overflow-y-scroll">
                <Navbar />
                {children}
            </main>     



            {/* <div className="hidden h-full md:flex md:w-72 md:flex-col sm:fixed overflow-y-scroll md:inset-y-0 z-[80]  text-white">
                 <div className="h-full">
                   <Sidebarr />
                 </div>
            </div>
            <main className="md:pl-72">
                <Navbar />
                {children}
            </main> */}
        </div>
     );
}
 
export default DashboardLayout;