
import SmoothScrolling from '@/components/SmoothScrolling';
import React, { Suspense } from 'react';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main>
            <Suspense>
                <SmoothScrolling>{children}</SmoothScrolling>
            </Suspense>
        </main>
    );
}
