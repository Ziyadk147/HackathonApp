import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Registration from "@/components/Registration/Registration";
import Login from "@/components/Login/Login"

export default function Authentication(){
    return (
        <Tabs defaultValue="account" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2 border  border-b-4 border-r-4 border-stone-950">
                <TabsTrigger value="account" className={"bg-bg border border-b-4 border-r-4 border-stone-950 mx-2"}>Register</TabsTrigger>
                <TabsTrigger value="password" className={"bg-bg border border-b-4 border-r-4 border-stone-950 mx-2  "}>Login</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
                <Registration></Registration>
            </TabsContent>
            <TabsContent value="password">
                <Login />
            </TabsContent>
        </Tabs>
    )
}