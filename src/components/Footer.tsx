export function Footer() {
  return (
    <footer className="bg-panel text-panel-foreground py-10">
      <div className="container flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <span className="font-extrabold lowercase text-lg">
          project profile<span style={{ color: '#FFD600' }}>.</span>
        </span>
        <div className="text-xs text-white/60 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
          <span>www.projectprofile.software</span>
          <span className="hidden sm:inline">·</span>
          <span>Project Profile Pty Ltd</span>
          <span className="hidden sm:inline">·</span>
          <span>ABN 57 674 795 745</span>
        </div>
      </div>
    </footer>
  )
}
