import {
  ChevronDown,
  ChevronUp,
  Clapperboard,
  Home,
  Ticket,
  Mail,
  UserCog,
  ShieldQuestion,
  Calendar,
} from "lucide-react"
import { Children, ElementType, ReactNode, useState } from "react"
import { Button, buttonStyles } from "../components/Button"
import { twMerge } from "tailwind-merge"
import { categorias } from "../data/sidebar"
import { useSidebarContext } from "../contexts/SidebarContext"
import { PageHeaderFirstSection } from "./PageHeader_old"
import { Link } from "react-router-dom"

export function Sidebar() {
  const { isLargeOpen, isSmallOpen, close } = useSidebarContext()

  return (
    <>
      <aside
        className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 bg-black text-white ${
        isLargeOpen ? "lg:hidden" : "lg:flex"
        }`}
      >
        <SmallSidebarItem Icon={Home} title="Home" url="/" />
        <SmallSidebarItem Icon={Ticket} title="Mis eTickets" url="/tickets" />
        <SmallSidebarItem
          Icon={Clapperboard}
          title="Cartelera"
          url="/cartelera"
        />
        <SmallSidebarItem Icon={Mail} title="Contacto" url="/contacto" />
      </aside>
      {isSmallOpen && (
        <div
          onClick={close}
          className="lg:hidden fixed inset-0 z-[999] bg-secondary-dark opacity-50"
        />
      )}
      <aside
      className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 bg-black text-white ${
      isLargeOpen ? "lg:flex" : "lg:hidden"
      } ${isSmallOpen ? "flex z-[999] max-h-screen" : "hidden"}`}
      >

        <div className="lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white">
          <PageHeaderFirstSection />
        </div>
        <LargeSidebarSection>
          <LargeSidebarItem isActive IconOrImgUrl={Home} title="Home" url="/" />
          <LargeSidebarItem
            IconOrImgUrl={Ticket}
            title="Mis eTickets"
            url="/tickets"
          />
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection visibleItemCount={5}>
          <LargeSidebarItem
            IconOrImgUrl={Clapperboard}
            title="Cartelera"
            url="/cartelera"
          />
          <LargeSidebarItem
            IconOrImgUrl={Calendar}
            title="Eventos"
            url="/eventos"
          />
          <LargeSidebarItem
            IconOrImgUrl={UserCog}
            title="Eres productor?"
            url="/productores"
          />
          <LargeSidebarItem
            IconOrImgUrl={Mail}
            title="Contacto"
            url="/contacto"
          />
                    <LargeSidebarItem
            IconOrImgUrl={ShieldQuestion}
            title="Preguntas"
            url="/preguntas"
          />
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Categorias">
          {categorias.map(categorias => (
            <LargeSidebarItem
              key={categorias.id}
              IconOrImgUrl={categorias.imgUrl}
              title={categorias.channelName}
              url={`/@${categorias.id}`}
            />
          ))}
        </LargeSidebarSection>
        <hr />
      </aside>
    </>
  )
}

type SmallSidebarItemProps = {
  Icon: ElementType
  title: string
  url: string
}

function SmallSidebarItem({ Icon, title, url }: SmallSidebarItemProps) {
  return (
    <Link
      to={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        "py-4 px-1 flex flex-col items-center rounded-lg gap-1"
      )}
    >
      <Icon className="w-6 h-6" />
      <div className="text-sm">{title}</div>
    </Link>
  )
}

type LargeSidebarSectionProps = {
  children: ReactNode
  title?: string
  visibleItemCount?: number
}

function LargeSidebarSection({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
}: LargeSidebarSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const childrenArray = Children.toArray(children).flat()
  const showExpandButton = childrenArray.length > visibleItemCount
  const visibleChildren = isExpanded
    ? childrenArray
    : childrenArray.slice(0, visibleItemCount)
  const ButtonIcon = isExpanded ? ChevronUp : ChevronDown

  return (
    <div>
      {title && <div className="ml-4 mt-2 text-lg mb-1">{title}</div>}
      {visibleChildren}
      {showExpandButton && (
        <Button
          onClick={() => setIsExpanded(e => !e)}
          variant="ghost"
          className="w-full flex items-center rounded-lg gap-4 p-3"
        >
          <ButtonIcon className="w-6 h-6" />
          <div>{isExpanded ? "Show Less" : "Show More"}</div>
        </Button>
      )}
    </div>
  )
}

type LargeSidebarItemProps = {
  IconOrImgUrl: ElementType | string
  title: string
  url: string
  isActive?: boolean
}

function LargeSidebarItem({
  IconOrImgUrl,
  title,
  url,
  isActive = false,
}: LargeSidebarItemProps) {
  return (
    <Link
      to={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        `w-full flex items-center rounded-lg gap-4 p-3 ${
          isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined
        }`
      )}
    >
      {typeof IconOrImgUrl === "string" ? (
        <img src={IconOrImgUrl} className="w-6 h-6 rounded-full" />
      ) : (
        <IconOrImgUrl className="w-6 h-6" />
      )}
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </Link>
  )
}
