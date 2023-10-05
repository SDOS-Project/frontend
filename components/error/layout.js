function ErrorLayout({ children }) {
  return (
    <main className="padding-layout-1 flex flex-col md:flex-row justify-center items-center gap-10 min-h-screen">
      {children}
    </main>
  );
}

export default ErrorLayout;
