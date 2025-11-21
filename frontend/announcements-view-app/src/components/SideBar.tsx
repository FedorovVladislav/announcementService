'use client';

import {Separator} from "@/components/ui/separator.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {logoutUser} from "@/store/auth/actionCreators.ts";
import {useAppDispatch, useAppSelector} from "@/hook/AppDispatch.ts";
import {RootState} from "@/store";
import {SidebarButton} from "@/components/SidebarButton.tsx";
import {
    BarChart,
    CableIcon,
    Captions,
    GlobeLock,
    HardDriveDownload,
    LogOutIcon,
    LucideChevronsLeftRight,
    Phone,
    Settings,
    Unplug
} from "lucide-react";
import {ThemeModeToggle} from "@/components/customelements/ThemeModeToggle.tsx";

export function Sidebar() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const userName = useAppSelector((state: RootState) => state.auth.userName)
    const isConnected = useAppSelector((state: RootState) => state.setting.isConnect);
    const isRequest = useAppSelector((state: RootState) => state.setting.isRequest);
    const handleLogoutClick = () => {
        dispatch(logoutUser(navigate));
    };
    return (
        <aside className='w-[270px] max-w-xs h-screen fixed left-0 top-0 z-40 border-r '>
            <div className='h-full px-6 py-4'>
                <h3 className='mx-3 text-lg font-semibold text-foreground'>ПТМ-01</h3>
                <div className='mt-5'>
                    <div className='flex flex-col gap-1 w-full space-y-1.5'>
                        <SidebarButton to="/status" icon={BarChart}>Статус устройства</SidebarButton>
                        <SidebarButton to="/settings" icon={Settings}>Системные настройки</SidebarButton>
                        <SidebarButton to="/tcp" icon={GlobeLock}>TCP connection</SidebarButton>
                        <SidebarButton to="/serialPorts" icon={Unplug}>Последовательные порты</SidebarButton>
                        <SidebarButton to="/gprs" icon={Phone}>Канал связи</SidebarButton>
                        <SidebarButton to="/log" icon={Captions}>Лог</SidebarButton>
                        <SidebarButton to="/hardData" icon={HardDriveDownload}>Физический интерфейс</SidebarButton>
                        {/*     <SidebarButton to="/testPage" icon={TestTube}>testPage</SidebarButton>*/}
                    </div>
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
                            <ThemeModeToggle/>
                            <CableIcon color={isConnected ? "green" : "red"}/>
                            <LucideChevronsLeftRight color={isRequest ? "yellow" : "red"}/>
                            <Button onClick={handleLogoutClick} size="sm" variant="outline">
                                <LogOutIcon size="16"/>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}

