'use client'

import type { CSSProperties, MouseEvent, ReactNode } from 'react'
import { rememberCampaignPerson, withPostHogAttribution } from '@/lib/posthog-attribution'
import { atlasOrigin } from '@/lib/atlas-public-search'

type AtlasLinkProps = {
  href?: string
  children: ReactNode
  className?: string
  style?: CSSProperties
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void
}

/** Marketing → Atlas link that stamps PostHog identity just before navigation. */
export default function AtlasLink({
  href,
  children,
  className,
  style,
  onClick,
}: AtlasLinkProps) {
  const target = href || atlasOrigin()

  function stamp(event: MouseEvent<HTMLAnchorElement>) {
    rememberCampaignPerson()
    event.currentTarget.href = withPostHogAttribution(target)
    onClick?.(event)
  }

  return (
    <a href={target} className={className} style={style} onClick={stamp} onPointerDown={stamp}>
      {children}
    </a>
  )
}
