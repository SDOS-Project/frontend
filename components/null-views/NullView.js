import Image from 'next/image';

export default function NullView({ imgSrc, heading, desc }) {
  return (
    <main className="w-full h-auto flex flex-col justify-center items-center py-12 p-10 gap-12">
      <Image
        loading="lazy"
        src={imgSrc}
        alt="No Projects Found"
        width={200}
        height={200}
        className="w-1/2 md:w-1/3 mx-auto"
      />
      <div className="w-full items-center flex flex-col gap-2">
        <h1 className="body-2xlarge font-semibold text-primary-main">
          {heading}
        </h1>
        <p className="body-normal">{desc}</p>
      </div>
    </main>
  );
}
