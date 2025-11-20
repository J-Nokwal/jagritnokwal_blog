
import SmoothScrolling from '@/components/SmoothScrolling';
import React from 'react';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <SmoothScrolling>{children}</SmoothScrolling>
        </section>
    );
}
