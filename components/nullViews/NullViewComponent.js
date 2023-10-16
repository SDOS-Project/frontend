import Image from "next/image"
import NullViewLayout from "./layout"

function NullViewComponent({ imgSrc, heading, desc }) {
    return (
        <NullViewLayout>
            <Image
                loading="lazy"
                src={imgSrc ?? "/assets/images/projectsNotFound.svg"}
                alt="No Projects Found"
                width={200}
                height={200}
                className="w-1/2 md:w-1/3 mx-auto"
            />
            <div className='w-full items-center flex flex-col gap-2'>
                <h1 className='body-2xlarge font-semibold text-primary-main'>{heading}</h1>
                <p className='body-normal'>{desc}</p>
            </div>
        </NullViewLayout>
    )
}

export default NullViewComponent