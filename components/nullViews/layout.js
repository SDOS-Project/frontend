export default function NullViewLayout({ children }) {
    return (
        <main className="w-full h-auto flex flex-col justify-center items-center py-12 p-10 gap-12">
            {children}
        </main>
    );
}
