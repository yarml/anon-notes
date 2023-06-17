import Link from "next/link";
import { mdiEarth, mdiLock, mdiNotePlus } from "@mdi/js";
import Icon from "@mdi/react";

export function SideBar() {
  return (
    <nav className="fixed top-0 bottom-0 flex w-16 h-screen flex-col bg-gray-900 text-white shadow">
      <div className="fixed flex flex-col top-0 w-16">
        <SideBarIcon icon={mdiEarth} tooltip="Public Notes" link="/" />
        <SideBarIcon icon={mdiLock} tooltip="Private Notes" link="/priv" />
      </div>
      <div className="fixed flex flex-col-reverse bottom-0 w-16">
        <SideBarIcon
          icon={mdiNotePlus}
          tooltip="Create Public Note"
          link="new"
        />
      </div>
    </nav>
  );
}

function SideBarIcon({
  icon,
  tooltip,
  link,
}: {
  icon: string;
  tooltip: string;
  link: string;
}) {
  return (
    <Link href={link}>
      <div className="sidebar-icon group">
        <Icon path={icon} size="32px" />
        <span className="sidebar-tooltip">{tooltip}</span>
      </div>
    </Link>
  );
}

