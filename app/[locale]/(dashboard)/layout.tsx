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
        </div>
     );
}
 
export default DashboardLayout;