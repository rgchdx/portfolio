import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
 
//helper function to make everything work with tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
