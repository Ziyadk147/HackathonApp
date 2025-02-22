import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import addNote from '@/Helpers/CRUD/addNote';
import updateNote from '@/Helpers/CRUD/updateNote';

export default function ModalButton({ edit = false, onUpdate, buttonName, title, buttonColor, description, initialData = {} }) {
    const [open, setOpen] = useState(false); // State for modal open/close

    const formik = useFormik({
        initialValues: {
            title: initialData.title || '',
            content: initialData.content || '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            content: Yup.string().min(6, 'Content must be at least 6 characters').required('Content is required'),
        }),
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            if (edit) {
                await updateNote(initialData.id, values.title, values.content);
            } else {
                await addNote(values.title, values.content);
            }
            setSubmitting(false);
            resetForm();
            if (onUpdate) onUpdate(); // Refresh notes
            setOpen(false); // Close modal after submission
        },
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className={`${buttonColor ?? "bg-main"} p-4 mx-2 border border-b-4 border-r-4 border-stone-950`} onClick={() => setOpen(true)}>
                    {buttonName || (edit ? 'Edit Note' : 'Create Note')}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] lg:max-w-[800px] bg-main border border-b-4 border-r-4 border-stone-950">
                <DialogHeader>
                    <DialogTitle>{edit ? 'Edit Your Note' : 'Create Your Note'}</DialogTitle>
                    <DialogDescription>{description || (edit ? 'Modify your note.' : 'Create a new note!')}</DialogDescription>
                </DialogHeader>
                <form onSubmit={formik.handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">Note Title</Label>
                        <Input
                            id="title"
                            name="title"
                            type="text"
                            className="col-span-3 border border-b-4 border-r-4 border-stone-950"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.title && formik.errors.title && (
                            <div className="text-red-500 mx-auto col-span-4 text-sm">{formik.errors.title}</div>
                        )}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="content" className="text-right">Note Content</Label>
                        <Textarea
                            id="content"
                            name="content"
                            className="col-span-3 border border-b-4 border-r-4 border-stone-950"
                            value={formik.values.content}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.content && formik.errors.content && (
                            <div className="text-red-500 mx-auto col-span-4 text-sm">{formik.errors.content}</div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button type="submit" className="bg-stone-100" disabled={formik.isSubmitting}>
                            {formik.isSubmitting ? (edit ? 'Updating...' : 'Saving...') : (edit ? 'Update Note' : 'Save Note')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
