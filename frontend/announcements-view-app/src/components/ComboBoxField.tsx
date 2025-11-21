"use client"

import * as React from "react"
import {CaretSortIcon, CheckIcon} from "@radix-ui/react-icons"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Command, CommandEmpty, CommandGroup, CommandItem, CommandList,} from "@/components/ui/command"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import {ComboBoxData} from "@/types/internal/ComboBoxData.ts";
import {ControllerRenderProps, FieldValues} from "react-hook-form";

export function ComboboxField(props: {
    field: ControllerRenderProps<FieldValues, string>,
    optionValues: ComboBoxData[],
    initialValue: number
}) {
    const [open, setOpen] = React.useState(false)
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between">
                    {props.field.value
                        ? props.optionValues.find((framework) => framework.value === props.field.value)?.label
                        : "Не задано"}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]">
                <Command>
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                        <CommandList>
                            {props.optionValues.map((framework) => (
                                <CommandItem
                                    key={framework.value}
                                    value={String(framework.value)}
                                    onSelect={(currentValue) => {
                                        props.field.onChange(Number(currentValue))
                                        setOpen(false)
                                    }}>
                                    {framework.label}
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            props.field.value === framework.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandList>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}