"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ColorSelect({ onStateChange }){

    const handleChange = (colorValue: string) => {
        onStateChange(colorValue);
    }
    return(
        <div className="m-2">
            <Select onValueChange={handleChange}>
                <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select a color mark" />
                </SelectTrigger>
                <SelectContent color="white">
                <SelectGroup>
                    <SelectLabel>Color</SelectLabel>
                    <SelectItem value="red">🔴</SelectItem>
                    <SelectItem value="orange">🟠</SelectItem>
                    <SelectItem value="yellow">🟡</SelectItem>
                    <SelectItem value="green">🟢</SelectItem>
                    <SelectItem value="blue">🔵</SelectItem>
                    <SelectItem value="purple">🟣</SelectItem>
                </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}