import Image from 'next/image';

function WhyChooseUs() {
    return (
        <div className="p-4 flex flex-col items-center justify-center gap-4">
            <Image
                loading="lazy"
                src={'/assets/logo.png'}
                alt="Logo"
                width={200}
                height={200}
                className="w-48 mx-auto"
            />
            <p className="body-2xlarge text-center font-semibold">
                Why Choose Our Platform?
            </p>
            <p className="w-full lg:w-1/2 text-center font-light body-small">
                Experience the synergy of academia and industry with our platform.
                Connect with a diverse network of professionals, navigate projects
                easily with our user-friendly interface, and enjoy secure, efficient
                collaboration for your research endeavors. We prioritize confidentiality
                and precision from start to finish, ensuring your projects reach their
                full potential.
            </p>
        </div>
    );
}

export default WhyChooseUs;
