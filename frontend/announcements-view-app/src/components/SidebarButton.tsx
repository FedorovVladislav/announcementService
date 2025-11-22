import type {LucideIcon} from 'lucide-react';
import {Button} from './ui/button';
import {SheetClose} from "@/components/ui/sheet.tsx";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "@/hook/AppDispatch.ts";
import type {RootState} from "@/store";
import {setActiveLink} from "@/store/variables/variablesReducer.ts";
import * as React from "react";

interface SidebarButtonProps extends React.ComponentProps<"button"> {
    icon?: LucideIcon,
    to: string,
}

export function SidebarButton(props: SidebarButtonProps) {
    const activeLink = useAppSelector((state: RootState) => state.variables.activeLink);
    const dispatch = useAppDispatch();
    return (
        <Link to={props.to}>
            <Button
                onClick={() => dispatch(setActiveLink(props.to))}
                variant={props.to === activeLink ? 'default' : 'secondary'}
                className={'gap-2 justify-start w-full'}
                {...props}>
                {props.icon && <props.icon size={20}/>}
                <span>{props.children}</span>
            </Button>
        </Link>
    );
}

export function SidebarButtonSheet(props: SidebarButtonProps) {
    return (
        <SheetClose asChild>
            <SidebarButton {...props} />
        </SheetClose>
    );
}