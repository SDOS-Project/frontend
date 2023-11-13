import { Avatar, Skeleton } from "@mui/material"

function UpdatesSkeleton() {
    return (
        <>
            <div className="w-full flex justify-between items-center py-4 px-6 border-b">
                <p className="body-large font-medium text-primary-dark">
                    Updates (0)
                </p>
            </div>
            <div className="w-full flex flex-col gap-2 py-4 px-6 border-b">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="my-2 w-full">
                        <div className="flex gap-2 w-full">
                            <Avatar className="w-10 h-10 body-small" >
                            </Avatar>
                            <div className="flex flex-col w-full">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="w-52 h-6" />
                                    <Skeleton className="w-16 h-6" />
                                </div>
                                <Skeleton className="w-full h-6" />
                                <Skeleton className="w-full h-6" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default UpdatesSkeleton