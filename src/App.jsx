import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import Login from './components/Login/Login.tsx'
export default function App() {
    return (
        <div className={"h-screen w-screen"}>
            <div className="flex h-full justify-center items-center">
                <Login></Login>
            </div>
        </div>
    )
}