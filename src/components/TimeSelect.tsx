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

export default function TimeSelect({ onStartHourChange, onStartMinuteChange, onEndHourChange, onEndMinuteChange }){

    const handleStartHourChange = (startHourValue: string) => {
        onStartHourChange(Number(startHourValue));
    }

    const handleStartMinuteChange = (startMinuteValue: string) => {
        onStartMinuteChange(Number(startMinuteValue))
    }

    const handleEndHourChange = (endHourValue: string) => {
        onEndHourChange(Number(endHourValue))
    }

    const handleEndMinuteChange = (endMinuteValue: string) => {
        onEndMinuteChange(Number(endMinuteValue))
    }
    
    return(
        <div className="flex m-4 justify-start items-center">
            <h1>From </h1>
            <Select onValueChange={handleStartHourChange}>
                <SelectTrigger className="bg-white m-2">
                <SelectValue placeholder="Select hour" />
                </SelectTrigger>
                <SelectContent color="white">
                <SelectGroup className="h-50">
                    <SelectLabel>Start Hour</SelectLabel>
                    <SelectItem value="00">00</SelectItem>
                    <SelectItem value="01">01</SelectItem>
                    <SelectItem value="02">02</SelectItem>
                    <SelectItem value="03">03</SelectItem>
                    <SelectItem value="04">04</SelectItem>
                    <SelectItem value="05">05</SelectItem>
                    <SelectItem value="06">06</SelectItem>
                    <SelectItem value="07">07</SelectItem>
                    <SelectItem value="08">08</SelectItem>
                    <SelectItem value="09">09</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="11">11</SelectItem>
                    <SelectItem value="12">12</SelectItem>
                    <SelectItem value="13">13</SelectItem>
                    <SelectItem value="14">14</SelectItem>
                    <SelectItem value="15">15</SelectItem>
                    <SelectItem value="16">16</SelectItem>
                    <SelectItem value="17">17</SelectItem>
                    <SelectItem value="18">18</SelectItem>
                    <SelectItem value="19">19</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="21">21</SelectItem>
                    <SelectItem value="22">22</SelectItem>
                    <SelectItem value="23">23</SelectItem>
                </SelectGroup>
                </SelectContent>
            </Select>

            <h1> : </h1>

            <Select onValueChange={handleStartMinuteChange}>
                <SelectTrigger className="bg-white m-2">
                <SelectValue placeholder="Select minute" />
                </SelectTrigger>
                <SelectContent color="white">
                <SelectGroup className="h-50">
                    <SelectLabel>Start Minute</SelectLabel>
                    <SelectItem value="00">00</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="30">30</SelectItem>
                    <SelectItem value="40">40</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                </SelectGroup>
                </SelectContent>
            </Select>
            
            <h1>to </h1>
            <Select onValueChange={handleEndHourChange}>
                <SelectTrigger className="bg-white m-2">
                <SelectValue placeholder="Select hour" />
                </SelectTrigger>
                <SelectContent color="white">
                <SelectGroup className="h-50">
                    <SelectLabel>Start Hour</SelectLabel>
                    <SelectItem value="00">00</SelectItem>
                    <SelectItem value="01">01</SelectItem>
                    <SelectItem value="02">02</SelectItem>
                    <SelectItem value="03">03</SelectItem>
                    <SelectItem value="04">04</SelectItem>
                    <SelectItem value="05">05</SelectItem>
                    <SelectItem value="06">06</SelectItem>
                    <SelectItem value="07">07</SelectItem>
                    <SelectItem value="08">08</SelectItem>
                    <SelectItem value="09">09</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="11">11</SelectItem>
                    <SelectItem value="12">12</SelectItem>
                    <SelectItem value="13">13</SelectItem>
                    <SelectItem value="14">14</SelectItem>
                    <SelectItem value="15">15</SelectItem>
                    <SelectItem value="16">16</SelectItem>
                    <SelectItem value="17">17</SelectItem>
                    <SelectItem value="18">18</SelectItem>
                    <SelectItem value="19">19</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="21">21</SelectItem>
                    <SelectItem value="22">22</SelectItem>
                    <SelectItem value="23">23</SelectItem>
                </SelectGroup>
                </SelectContent>
            </Select>

            <h1> : </h1>

            <Select onValueChange={handleEndMinuteChange}>
                <SelectTrigger className="bg-white m-2">
                <SelectValue placeholder="Select minute" />
                </SelectTrigger>
                <SelectContent color="white">
                <SelectGroup className="h-50">
                    <SelectLabel>Start Minute</SelectLabel>
                    <SelectItem value="00">00</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="30">30</SelectItem>
                    <SelectItem value="40">40</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                </SelectGroup>
                </SelectContent>
            </Select>

        </div>
    )
}