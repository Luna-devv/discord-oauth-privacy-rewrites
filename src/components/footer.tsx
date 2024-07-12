import { ReactNode }from "react";
import { BsDiscord, BsGithub } from "react-icons/bs";
import { SiKofi } from "react-icons/si";

export function Footer() {
    return (
        <div className="flex items-center gap-1 pb-2">
            <ExternalSite
                href="https://discord.gg/yYd6YKHQZH"
                icon={<BsDiscord className="ml-1" />}
            >
                Support
            </ExternalSite>

            <div className="ml-auto" />

            <ExternalSite
                href="https://wamellow.com?utm_source=chrome-extension"
                icon={
                    <img
                        src="https://wamellow.com/waya-v3.jpg"
                        className="size-5 rounded-full"
                    />
                }
            >
                    Wamellow
            </ExternalSite>

            <ExternalSite
                href="https://lunish.nl"
                icon={
                    <img
                        src="https://avatars.githubusercontent.com/u/71079641?v=4"
                        className="size-5 rounded-full"
                    />
                }
            >
                    My Portfolio
            </ExternalSite>

            <ExternalSite
                href="https://ko-fi.com/mwlica"
                icon={<SiKofi className="size-4" />}
            />
            <ExternalSite
                href="https://github.com/Luna-devv/discord-oauth-privacy-rewrites"
                icon={<BsGithub className="size-5" />}
            />
        </div>
    );
}

function ExternalSite({
    icon,
    href,
    children
}: {
    icon: ReactNode;
    href: string;
    children?: ReactNode;
}) {
    return (
        <a
            className="rounded-2xl bg-[#1e1f22] hover:bg-[#1e1f22]/80 duration-200 p-1.5 text-white cursor-pointer flex items-center gap-1.5"
            href={href}
            target="_blank"
        >
            {icon}

            {children &&
                <span className="font-medium pr-1">
                    {children}
                </span>
            }
        </a>
    );
}
