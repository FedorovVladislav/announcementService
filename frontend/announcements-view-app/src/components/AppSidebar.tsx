import {
    BarChart,
    Captions,
    GlobeLock,
    HardDriveDownload,
    LogOutIcon,
    Phone,
    Settings,
    Unplug
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import {Link, useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {setActiveLink} from "@/store/variables/variablesReducer.ts";
import {useAppDispatch, useAppSelector} from "@/hook/AppDispatch.ts";
import type {RootState} from "@/store";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {logoutUser} from "@/store/auth/actionCreators.ts";
import {Separator} from "@/components/ui/separator.tsx";

// Menu items.
const items = [
    {
        title: "Статус устройства",
        url: "/status",
        icon: BarChart,
    },
    {
        title: "Объявления",
        url: "/announcement",
        icon: Settings,
    },
    {
        title: "TCP подключение",
        url: "/tcp",
        icon: GlobeLock,
    },
    {
        title: "Последовательные порты",
        url: "/serialPorts",
        icon: Unplug,
    },
    {
        title: "Канал связи",
        url: "/gprs",
        icon: Phone,
    },
    {
        title: "Журнал сообщений",
        url: "/log",
        icon: Captions,
    },
    {
        title: "Физический интерфейс",
        url: "/hardData",
        icon: HardDriveDownload,
    },
]

export function AppSidebar() {
    const {setOpenMobile} = useSidebar();
    const activeLink = useAppSelector((state: RootState) => state.variables.activeLink);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userName = useAppSelector((state: RootState) => state.auth.username)
    const handleLogoutClick = () => {
        dispatch(logoutUser(navigate));
    };
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>ПТМ-01</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton size="lg" asChild>
                                        <Link to={item.url}>
                                            <Button
                                                onClick={() => {
                                                    dispatch(setActiveLink(item.url));
                                                    setOpenMobile(false)
                                                }}
                                                variant={item.url === activeLink ? 'default' : 'secondary'}
                                                className={'gap-2 justify-start w-full'}
                                            >
                                                {item.icon && <item.icon size={20}/>}
                                                <span>{item.title}</span>
                                            </Button>

                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <div className='absolute left-0 bottom-3 w-full px-3'>
                    <Separator className='absolute -top-3 left-0 w-full'/>
                    <div className='flex justify-between items-center w-full'>
                        <div className='flex gap-2'>
                            <Avatar className='h-5 w-5'>
                                <AvatarImage src='https://github.com/max-programming.png'/>
                                <AvatarFallback>Max Programming</AvatarFallback>
                            </Avatar>
                            <span>{userName}</span>
                        </div>
                        <Button onClick={handleLogoutClick} size="sm" variant="outline">
                            <LogOutIcon size="16"/>
                        </Button>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}