import Image from 'next/image';

function OurMission() {
    const data = [
        {
            imgSrc: '/assets/images/landing/collaboration.svg',
            heading: 'Collaboration Made Easy',
            desc: 'Facilitating effortless connections between academia and industry to foster ground-breaking research projects.',
        },
        {
            imgSrc: '/assets/images/landing/matchmaking.svg',
            heading: 'Matchmaking Efficiency',
            desc: "Leverage our intuitive matchmaking system to find the perfect industry or academic partner tailored to your project's needs.",
        },
        {
            imgSrc: '/assets/images/landing/security.svg',
            heading: 'Secure and Streamlined',
            desc: 'Engage in secure project management and real-time progress tracking, ensuring a seamless collaboration experience.',
        },
    ];
    return (
        <div className="px-6 lg:px-16 w-full">
            <div className="bg-primary-grey w-full p-6 rounded-lg lg:py-10 lg:px-16 lg:rounded-2xl">
                <h1 className="body-xlarge text-center font-semibold">
                    Seamless Academic-Industry Synergy
                </h1>
                <div className="mt-12 mb-2 flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-10 lg:gap-4 w-full">
                    {data.map((item, i) => (
                        <div className="w-52 lg:w-64 flex flex-col gap-2 lg:gap-4" key={i}>
                            <Image
                                loading="lazy"
                                src={item.imgSrc}
                                alt={item.heading}
                                width={200}
                                height={200}
                                className="w-full mx-auto mb-2 sm:mb-0"
                            />
                            <h1 className="body-large font-semibold text-center">
                                {item.heading}
                            </h1>
                            <p className="body-xsmall font-light text-center">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default OurMission;
