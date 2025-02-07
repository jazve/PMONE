import styled from "@emotion/styled"
import Link from "next/link"

const NavBar: React.FC = () => {
  const links = [{ id: 0, name: "AI图谱", to: "/aimap" },{ id: 1, name: "关于", to: "/about" }]
  return (
    <StyledWrapper className="">
      <ul>
        {links.map((link) => (
          <li key={link.id}>
            <Link href={link.to}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </StyledWrapper>
  )
}

export default NavBar

const StyledWrapper = styled.div`
  flex-shrink: 0;
  ul {
    display: flex;
    flex-direction: row;
    li {
      display: block;
      margin:0rem 1rem;
      font-size: 0.875rem;
      color: ${({ theme }) => theme.colors.gray11};
    }
  }
`
