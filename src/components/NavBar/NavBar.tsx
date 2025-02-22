
import * as React from 'react'

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

import {Button} from "@/components/ui/button";

export default function Navbar() {
    return (
        <NavigationMenu className="w-screen flex flex-row justify-end">
            <NavigationMenuList className=" ">


            </NavigationMenuList>
        </NavigationMenu>
    )
}
