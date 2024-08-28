'use client';

import React, { useState, useTransition } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form"
import { Button } from '@/components/ui/button';
import { InputField } from '@/components/input-field';
import { useRouter } from 'next/navigation';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { registerSchema } from '@/schemas';
import CardWrapper from '@/components/auth/card-wrapper';
import { RadioField } from '@/components/radio-field';
import axios, { AxiosError } from "axios"
import { ApiResponse } from '@/types/ApiResponse';
import { login } from '@/app/lib';
import * as z from "zod";


const Register = () => {
    const [status, setStatus] = useState<{ error?: string; success?: string }>({});
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            role: "team-member",
        }
    });

    const submitForm = (data: z.infer<typeof registerSchema>) => { 
        startTransition(async () => {
            try {
                const { data: response } = await axios.post<ApiResponse>("/api/auth/register", data); 
                if (!response.success) {
                    setStatus({ error: response.message });
                } else {
                    setStatus({ success: response.message });
                    await login(response.data);
                    router.replace('/dashboard');
                }
            } catch (error) {
                const axiosError = error as AxiosError<ApiResponse>;
                const errorMessage = axiosError.response?.data?.message || "Something went wrong. Please try again.";
                setStatus({ error: errorMessage });
            }
        });
    };

    return (
        <CardWrapper
            cardTitle="Register"
            backText="Already have an account?"
            backButtonLabel="Login"
            backButtonHref="/login"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(submitForm)} className='space-y-3'>
                    <InputField
                        name='email'
                        label='Email'
                        placeholder='Your email address'
                        control={form.control}
                    />
                    <InputField
                        name='password'
                        type='password'
                        label='Password'
                        placeholder='Enter password'
                        control={form.control}
                    />
                    <RadioField
                        name='role'
                        control={form.control}
                    />
                    {status.error && <FormError message={status.error} />}
                    {status.success && <FormSuccess message={status.success} />}
                    <Button disabled={isPending} type='submit' className='w-full'>
                        {isPending ? "Registering..." : "Register"}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};

export default Register;
