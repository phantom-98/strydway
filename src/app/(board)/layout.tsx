

export default function BoardLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    return (
        <>
        <div className="sm:hidden w-screen h-screen">
            {children}
        </div>
        <div className="hidden sm:flex justify-center items-center w-screen h-screen">
            <p className="text-2xl font-bold">Please use mobile device to access this app</p>
        </div>
        </>
    )
}