"use client";

import { memo } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '../ui/button';

interface CardWrapperProps {
    children: React.ReactNode;
    cardTitle: string;
    backButtonLabel?: string;
    backText?: string;
    backButtonHref?: string;
}

export const CardWrapper: React.FC<CardWrapperProps> = ({
    children,
    cardTitle,
    backButtonLabel,
    backButtonHref,
    backText,
}) => {
    return (
        <Card className="w-full max-w-md mx-auto shadow-lg">
            <CardHeader className='text-center'>
                <CardTitle className="text-3xl font-bold">{cardTitle}</CardTitle>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {backButtonHref && (
                <CardFooter>
                    <div className='w-full text-sm text-center text-muted-foreground'>
                        {backText}{" "}
                        <Button variant={"link"} className='px-0'>
                            <Link href={backButtonHref} aria-label={backButtonLabel}>
                                {backButtonLabel}
                            </Link>
                        </Button>
                    </div>
                </CardFooter>
            )}
        </Card>
    );
}

export default memo(CardWrapper);
