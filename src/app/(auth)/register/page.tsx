'use client';

import React, { useEffect, useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form"
import { Button } from '@/components/ui/button';
import InputField from '@/components/input-field';
import { useRouter } from 'next/navigation';
import CardWrapper from '@/components/auth/card-wrapper';
import FormError from '@/components/form-error';
import FormSuccess from '@/components/form-success';
import { generateToken } from '@/app/lib';
import { useRegisterMutation } from '@/store/baseApi';
import { registerSchema } from '@/schemas';
import RadioField from '@/components/radio-field';
import * as z from "zod";


const Register = () => {
    const [status, setStatus] = useState<{ error?: string; success?: string }>(
        {}
    );
    const [register, { isLoading, isError, error }] = useRegisterMutation();
    const router = useRouter();

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            role: "team-member",
        },
    });

    useEffect(() => {
        if (isError) {
            const errorMessage = error as {
                data: { message: string };
            };
            setStatus({ error: errorMessage.data.message });
        }
    }, [isError]);

    const submitForm = async (data: z.infer<typeof registerSchema>) => {
        const res = await register(data);
        if (res.data?.success) {
            setStatus({ success: res.data.message });
            await generateToken(res.data.data);
            router.push("/dashboard");
        }
    };

    return (
        <CardWrapper
            cardTitle="Register"
            backText="Already have an account?"
            backButtonLabel="Login"
            backButtonHref="/login"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(submitForm)} className="space-y-3">
                    <InputField
                        name="email"
                        label="Email"
                        placeholder="Your email address"
                        control={form.control}
                    />
                    <InputField
                        name="password"
                        type="password"
                        label="Password"
                        placeholder="Enter password"
                        control={form.control}
                    />
                    <RadioField name="role" control={form.control} />
                    {status.error && <FormError message={status.error} />}
                    {status.success && <FormSuccess message={status.success} />}
                    <Button disabled={isLoading} type="submit" className="w-full">
                        {isLoading ? "Registering..." : "Register"}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};

export default Register;
