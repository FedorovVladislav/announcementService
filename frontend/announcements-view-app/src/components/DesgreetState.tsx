import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {ColumnDef, flexRender, getCoreRowModel, Row, useReactTable,} from "@tanstack/react-table"
import {Switch} from "@/components/ui/switch.tsx";
import {DigitState} from "@/types/json_data/state/Status.ts/DigitalState.ts";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card.tsx";
import {RefreshCwIcon, ToggleLeftIcon, ToggleRightIcon} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "@/hook/AppDispatch.ts";
import {RootState} from "@/store";
import {setPinsParams} from "@/api/ApiManager.ts";
import {Settings} from "@/types/json_data/settings/Settings.ts";
import {descreetInputModeNameMap, descreetOutputModeNameMap} from "@/types/internal/OptionsData.ts";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({columns, data}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })
    return (
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
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default function DiscreetState({data, isOutput}) {
    const columnsWithControl: ColumnDef<DigitState>[] = [
        {
            header: "№",
            cell: ({row}) => (
                <div> {(row.index + 1)}</div>
            ),
        },
        {
            accessorKey: "Mode",
            header: "Режим",
            cell: ({row}) => (
                <div>{descreetOutputModeNameMap.get(row.original.mode) ?? "Режим не определен"}</div>
            ),
        },
        {
            accessorKey: "Val",
            header: "Состояние",
            cell: ({row}) => (
                <div className="items-center flex-row w-full">
                    {row.original.state === 1 ? <ToggleRightIcon color="SeaGreen"/> : <ToggleLeftIcon color="Tomato"/>}
                </div>
            ),
        },
        {
            header: "Управление",
            cell: ({row}) => SetValueDialog(row)
        }
    ]

    const columns: ColumnDef<DigitState>[] = [
        {
            header: "№",
            cell: ({row}) => (
                <div> {(row.index + 1)}</div>
            ),
        },
        {
            accessorKey: "Mode",
            header: "Режим",
            cell: ({row}) => (
                <div>{descreetInputModeNameMap.get(row.original.mode) ?? "Режим не определен"}</div>
            ),
        },
        {
            accessorKey: "Val",
            header: "Состояние",
            cell: ({row}) => (
                <div className="items-center">
                    {1 == row.original.state ? <ToggleRightIcon color="SeaGreen"/> : <ToggleLeftIcon color="Tomato"/>}
                </div>
            ),
        }
    ]
    return (
        <DataTable columns={isOutput ? columnsWithControl : columns} data={data}/>
    )
}

function SetValueDialog(row: Row<DigitState>): JSX.Element {
    const settings = useAppSelector((state: RootState) => state.setting.status?.pins.d_output)
    const dispatch = useAppDispatch();
    const [state, setState] = useState(Number(row.original.state));
    return <HoverCard>
        <HoverCardTrigger><RefreshCwIcon/></HoverCardTrigger>
        <HoverCardContent className="w-fit">
            <div className="flex flex-col space-y-5  justify-center items-center">
                <p>Смена значения</p>
                <Switch checked={state == 1} onCheckedChange={(e) => setState(e ? 1 : 0)
                }/>
                <Button onClick={() => {
                    const oldElement: DigitState = settings[row.index];
                    const newArray: [DigitState] = [...settings.slice(0, row.index), {
                        ...oldElement,
                        state: state
                    }, ...settings.slice(row.index + 1)];
                    const newSettins: Settings = {pins: {d_output: newArray}};
                    setPinsParams(newSettins, dispatch);
                }}> Применить</Button>
            </div>
        </HoverCardContent>
    </HoverCard>;
}
