import { Card, CardContent } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

export const ProductCardSkeleton = () => {
    return (
        <section>
            <div className="flex items-center justify-between mb-3">
                <Skeleton className="h-10 w-40" />
                <Skeleton className="h-10 w-80" />
            </div>
            <div className="grid max-sm:place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {
                    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
                        <Card className="max-w-xs bg-background rounded-lg overflow-hidden transition-all p-4 space-y-2" key={i}>
                            <CardContent className='p-0 space-y-2'>
                                <Skeleton className="w-full h-48" />
                                <Skeleton className="h-6 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </CardContent>
                        </Card>
                    ))
                }
            </div>
        </section>
    )
}
