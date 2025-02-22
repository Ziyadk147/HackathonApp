import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";

// @ts-ignore
export default function GeneralModal({title , description , buttonName , mainContent , footerContent}){
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-bg p-4">{buttonName}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] p-10 bg-main">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                {mainContent ?? <> </>}
            </DialogContent>
            {footerContent && (<DialogFooter>
                {footerContent}
            </DialogFooter>)}
        </Dialog>
    )
}