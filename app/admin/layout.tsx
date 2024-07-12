import { Nav, NavLink } from "@/components/Nav"

export const dynamic = "force-dynamic"

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Nav>
        <NavLink href="/admin">Dashboard</NavLink>
        <NavLink href="/admin/invoice">Invoice</NavLink>
        <NavLink href="/admin/leads">Lead Generator</NavLink>
        <NavLink href="/admin/mike">Ai Mike</NavLink>

      </Nav>
      <div className="container my-6">{children}</div>
    </>
  )
}