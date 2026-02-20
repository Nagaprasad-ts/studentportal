export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-9 p-1 items-center justify-center rounded-md dark:bg-foreground text-sidebar-primary-foreground">
                {/* <AppLogoIcon className="size-5 fill-current text-white dark:text-black" /> */}
                <img src="/images/logo.png" alt="Logo" className=""/>
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    New Horizon College
                </span>
            </div>
        </>
    );
}
