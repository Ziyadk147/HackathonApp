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

 export default  function Login () {
    return (
        <Card className="w-[350px] p-4">
            <CardHeader>
                <CardTitle>Create project</CardTitle>
                <CardDescription>Deploy your new project in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Email</Label>
                            <Input id="email" placeholder="Name of your project" type={"email"} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" placeholder="Enter Password" />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button>Cancel</Button>
                <Button variant="default" onClick={() => console.log("clicked")}>Deploy</Button>
            </CardFooter>
        </Card>
    )
}
