import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"
import { useEffect, useRef } from "react"

const Toaster = ({
  containerAriaLabel = "Notifications",
  ...props
}: ToasterProps) => {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const removeLibraryTabIndex = () => {
      host
        .querySelectorAll<HTMLElement>(
          'section[aria-live][tabindex], ol[data-sonner-toaster][tabindex]'
        )
        .forEach((element) => element.removeAttribute("tabindex"))
      host
        .querySelectorAll<HTMLElement>("section[aria-live][aria-label]")
        .forEach((element) =>
          element.setAttribute("aria-label", containerAriaLabel)
        )
    }

    removeLibraryTabIndex()

    const observer = new MutationObserver(removeLibraryTabIndex)
    observer.observe(host, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["tabindex"],
    })

    return () => observer.disconnect()
  }, [containerAriaLabel])

  return (
    <div ref={hostRef} data-sonner-host>
      <Sonner
        theme="dark"
        className="toaster group"
        icons={{
          success: (
            <CircleCheckIcon className="size-4" />
          ),
          info: (
            <InfoIcon className="size-4" />
          ),
          warning: (
            <TriangleAlertIcon className="size-4" />
          ),
          error: (
            <OctagonXIcon className="size-4" />
          ),
          loading: (
            <Loader2Icon className="size-4 animate-spin" />
          ),
        }}
        style={
          {
            "--normal-bg": "var(--popover)",
            "--normal-text": "var(--popover-foreground)",
            "--normal-border": "var(--border)",
            "--border-radius": "var(--radius)",
          } as React.CSSProperties
        }
        toastOptions={{
          classNames: {
            toast: "cn-toast",
          },
        }}
        containerAriaLabel={containerAriaLabel}
        {...props}
      />
    </div>
  )
}

export { Toaster }
