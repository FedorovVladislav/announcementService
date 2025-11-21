"use client"

import {Button} from "@/components/ui/button"
import {SearchIcon} from "lucide-react"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {ColumnDef, flexRender, getCoreRowModel, useReactTable,} from "@tanstack/react-table"
import {ControllerRenderProps, FieldValues} from "react-hook-form";
import {useEffect, useState} from "react";
import {searchWifi} from "@/api/ApiManager.ts";
import {useAppDispatch, useAppSelector} from "@/hook/AppDispatch.ts";
import {WifiElement} from "@/types/json_data/wifi_search/WifiElement.ts";
import ReloadBtn from "@/components/customelements/ReloadBtn.tsx";

interface DataTableProps {
    value?: ControllerRenderProps<FieldValues, string>
}

const columns: ColumnDef<WifiElement>[] = [
    {
        accessorKey: "SSID",
        header: "Имя сети",
    },
    {
        accessorKey: "RSSI",
        header: "Уровень сигнала",
    },
    {
        accessorKey: "AUTH",
        header: "Тип защиты",
    }
]

export function WifiSelectDialog({value}: DataTableProps) {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const data = useAppSelector(state => state.setting.wifiData.scan_list);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    useEffect(() => {
        if (open) {
            searchWifi(dispatch);
            table.toggleAllPageRowsSelected(false);
        }
    }, [open]);

    function reloadWifi() {
        searchWifi(dispatch);
        table.toggleAllPageRowsSelected(false);
    }

    return (
        <Dialog onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button type="button" variant="inInput" size="inInput">
                    <SearchIcon className="h-5 w-5"/>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[900px]">
                <DialogHeader>
                    <DialogTitle>Выбор Wifi сети</DialogTitle>
                    <DialogDescription>Необходимо выбрать строку с сетью и нажать "Выбрать"</DialogDescription>
                </DialogHeader>
                <div className="w-full">
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id}>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                </TableHead>
                                            )
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                            onClick={() => {
                                                table.toggleAllPageRowsSelected(false);
                                                row.toggleSelected(true);
                                            }}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="h-24 text-center">
                                            Сети не найтены...
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
                <DialogFooter  className={"flex flex-wrap justify-center space-x-5"}>
                    <ReloadBtn onClick={() => reloadWifi()}/>
                    <DialogClose asChild>
                        <Button type="submit" disabled={table.getFilteredSelectedRowModel().rows.length === 0}
                                onClick={() => {
                                    value?.onChange(table.getFilteredSelectedRowModel().rows[0].original.name)
                                }}>Выбрать</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">Закрыть</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}