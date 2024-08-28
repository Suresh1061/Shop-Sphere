import { Skeleton } from '@/components/ui/skeleton'

export const ProductDetailsSkeleton = () => {
    return (
        <div className="w-full max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="w-full flex justify-center">
                    <div className="w-full aspect-[4/3] rounded-lg overflow-hidden">
                        <Skeleton className='max-w-[500px] h-[400px]' />
                    </div>
                </div>
                <div className="space-y-6">
                    <Skeleton className=' h-8 w-full ' />
                    <Skeleton className=' h-8 w-full ' />
                    <Skeleton className="h-6 w-[250px]" />
                    <Skeleton className="h-6 w-[200px]" />
                </div>
            </div>
        </div>
    )
}
