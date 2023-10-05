function ErrorLayout({ children }) {
  return (
    <main className="h-[90vh] w-full flex flex-col md:flex-row justify-center items-center gap-10 md:gap-36">
      {children}
    </main>
  );
}

export default ErrorLayout;
