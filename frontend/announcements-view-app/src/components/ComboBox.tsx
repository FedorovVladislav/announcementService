import {Button} from "@/components/ui/button"
import {Command, CommandEmpty, CommandGroup, CommandItem, CommandList,} from "@/components/ui/command"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import {CaretSortIcon, CheckIcon} from "@radix-ui/react-icons";
import * as React from "react";
import {ComboBoxData} from "@/types/internal/ComboBoxData.ts";
import {cn} from "@/lib/utils"

export function ComboBox(props: {
    optionValues: ComboBoxData[]
}) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(-1)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {value
                        ? props.optionValues.find((framework) => framework.value === value)?.label
                        : "Select framework..."}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]">
                <Command>
                    <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {props.optionValues.map((framework) => (
                                <CommandItem
                                    key={framework.value}
                                    value={String(framework.value)}
                                    onSelect={(currentValue) => {
                                        setValue(Number(currentValue) === value ? -1 : Number(currentValue))
                                        setOpen(false)
                                    }}
                                >
                                    <CheckIcon
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === framework.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {framework.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}