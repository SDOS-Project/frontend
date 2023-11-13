import { Email } from "@mui/icons-material";
import { Avatar, Skeleton } from "@mui/material";

export default function CoordinatorSkeleton() {
    return (
        <>
            {
                Array.from({ length: 4 }).map((_, i) => (
                    <div className="flex justify-between items-center" key={i}>
                        <div className="flex items-center gap-2">
                            <Avatar
                                className="w-8 h-8 sm:h-10 sm:w-10 body-small sm:body-normal">
                            </Avatar>
                            <Skeleton className="w-48 h-6" />
                        </div>
                        <div className="flex gap-2 items-center">
                            <Email className="body-normal" color="primary" />
                            <Skeleton className="w-48 h-6" />
                        </div>
                    </div>)
                )
            }
        </>
    );
}
