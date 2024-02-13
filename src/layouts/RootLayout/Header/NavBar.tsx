import styled from "@emotion/styled"
import Link from "next/link"

const NavBar: React.FC = () => {
  const links = [{ id: 1, name: "关于", to: "/about" },{ id: 1, name: "AI图谱", to: "/aimap" }]
  return (
    <StyledWrapper className="newnav">
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
  .newnav {
    display: flex;
    justify-content: flex-end;
    padding: 1rem 0;
    font-size: 0.875rem;
  }
  ul {
    display: flex;
    flex-direction: row;
    li {
      display: block;
      margin-left: 1rem;
      color: ${({ theme }) => theme.colors.gray11};
    }
  }
`
