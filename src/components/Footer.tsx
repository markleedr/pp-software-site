export function Footer() {
  return (
    <footer className="bg-white border-t border-border py-8">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
        <span className="font-extrabold lowercase text-foreground">
          project profile<span style={{ color: '#FFD600' }}>.</span>
        </span>
        <span className="text-muted-foreground text-xs">
          Part of Project Profile · Project Profile Pty Ltd · ABN 57 674 795 745
        </span>
      </div>
    </footer>
  )
}
