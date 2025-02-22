import TableCrud from "../TableCrud/TableCrud";
import { Card } from "../ui/card";

export default function Home(){
    return (
        <div className={"flex flex-col h-full w-screen justify-center items-center"}>
            <Card className={"w-full bg-stone-100 p-4"}>
                <TableCrud></TableCrud>
            </Card>
        </div>
    )
}