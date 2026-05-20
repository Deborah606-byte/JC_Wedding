import { useEffect } from 'react'

const SUFFIX = 'Josephine & Christopher'

export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · ${SUFFIX}` : `${SUFFIX} · October 24, 2026`
  }, [title])
}
