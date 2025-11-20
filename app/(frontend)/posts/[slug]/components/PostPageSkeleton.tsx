import Container from "@/components/BlogContainer"

export default function PostPageSkeleton() {
    return (
        <Container>
            {/* Blog Header Skeleton */}
            <div className="mb-20 mt-8 flex flex-col items-center md:mb-12 md:flex-row md:justify-between">
                <div className="h-10 w-48 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
            </div>

            <article>
                {/* Post Header Skeleton */}
                <div className="max-w-2xl mx-auto">
                    {/* Title */}
                    <div className="mb-12 text-center md:text-left">
                        <div className="h-12 w-3/4 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800 mb-4" />
                        <div className="h-12 w-1/2 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
                    </div>

                    {/* Avatar (Mobile) */}
                    <div className="mb-6 block md:hidden">
                        <div className="flex items-center">
                            <div className="h-12 w-12 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800 mr-4" />
                            <div className="h-6 w-32 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
                        </div>
                    </div>

                    {/* Avatar (Desktop) */}
                    <div className="hidden md:mb-12 md:block">
                        <div className="flex items-center">
                            <div className="h-12 w-12 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800 mr-4" />
                            <div className="h-6 w-32 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
                        </div>
                    </div>

                    {/* Cover Image */}
                    <div className="mb-8 sm:mx-0 md:mb-16">
                        <div className="aspect-video w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
                    </div>

                    {/* Date */}
                    <div className="mx-auto max-w-2xl">
                        <div className="mb-6 text-lg">
                            <div className="h-6 w-32 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
                        </div>
                    </div>
                </div>

                {/* Post Body Skeleton */}
                <div className="mx-auto max-w-2xl">
                    <div className="space-y-4">
                        <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                        <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                        <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                        <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                    </div>
                </div>
            </article>
        </Container>
    )
}
