import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function checkDate(date: Date | undefined): Date{
    if(date === undefined){
        return new Date()
    }
    return date
}