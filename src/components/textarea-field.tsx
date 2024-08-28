import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Control } from "react-hook-form";
import { Textarea } from "./ui/textarea";

interface TextareaFieldProps {
    name: string;
    label: string;
    placeholder?: string;
    control: Control<any>;
}

export const TextareaField = ({
    name,
    label,
    placeholder,
    control,
}: TextareaFieldProps) => {
    return (
        <FormField
            name={name}
            control={control}
            render={({ field }) => (
                <FormItem>
                    <Label htmlFor={name}>{label}</Label>
                    <FormControl>
                        <Textarea
                            id={name}
                            placeholder={placeholder}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
