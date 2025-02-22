import TableCrud from "../TableCrud/TableCrud";
import { Card , CardHeader} from "../ui/card";
import Navbar from "@/components/NavBar/NavBar";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export default function Home(){
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    useEffect(() => {
        if(!token){
            navigate('/')
        }
    }, [token]);
    return (
        <>

            <div className={"flex flex-col h-full w-[80%] justify-center items-center"}>

                {/*<Card className={"w-full bg-stone-100 p-4"}>*/}
                <TableCrud></TableCrud>
                {/*</Card>*/}
            </div>
        </>

    )
}