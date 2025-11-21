import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {AppSidebar} from "@/components/AppSidebar.tsx";
import {Outlet} from "react-router-dom";

export default function LayOut(){
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full min-w-96">
                <SidebarTrigger/>
                    <Outlet/>
            </main>
        </SidebarProvider>
    );
}