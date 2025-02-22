import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import React, {Suspense} from "react";
import {Routes , Route} from "react-router-dom";

export default function App() {

    const Login = React.lazy(() => import("./components/Login/Login.tsx"))
    const Register = React.lazy(() => import("./components/Registration/Registration.tsx"))
    const Home = React.lazy(() => import("./components/Home/Home.tsx"))

    const pages = [
        {name: "Login" , path:"/login" , element: <Login />},
        {name: "Registration" , path:"/" , element: <Register />},
        {name: "Home" , path:"/home" , element: <Home />},
    ]

    return (
        <div className={"h-screen w-screen"}>
            <div className="flex h-full justify-center items-center">
                {/*<Login></Login>*/}
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        {pages &&
                            pages.map((page, key) => (
                                <Route key={key} path={page.path} element={page.element}/>
                            ))}
                    </Routes>
                </Suspense>
            </div>
        </div>
    )
}