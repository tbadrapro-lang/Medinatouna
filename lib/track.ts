export function track(event: string, data?: Record<string, string>) {
  if (typeof window !== 'undefined' && (window as any).va) {
    (window as any).va('event', { name: event, ...data })
  }
}
