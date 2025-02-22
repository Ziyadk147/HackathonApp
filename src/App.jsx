import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import React, {Suspense} from "react";
import {Routes , Route} from "react-router-dom";
import Navbar from "@/components/NavBar/NavBar.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";

export default function App() {

    const Login = React.lazy(() => import("./components/Login/Login.tsx"))
    const Register = React.lazy(() => import("./components/Registration/Registration.tsx"))
    const Home = React.lazy(() => import("./components/Home/Home.tsx"))
    const Authentication = React.lazy(() => import("./components/Authentication/Authentication.tsx"))

    const pages = [
        {name: "authentication" , path:"/" , element: <Authentication />},
        {name: "Home" , path:"/home" , element: <Home />},
    ]

    return (
        <div className={"h-screen w-screen bg-custom"}>
            <div className="flex flex-col h-screen justify-center items-center">
                {/*<Login></Login>*/}

                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        {pages &&
                            pages.map((page, key) => (
                                <Route key={key} path={page.path} element={page.element}/>
                            ))}
                    </Routes>
                    <Toaster></Toaster>
                </Suspense>
            </div>
        </div>
    )
}