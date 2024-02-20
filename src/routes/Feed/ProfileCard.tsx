import { CONFIG } from "site.config"
import Image from "next/image"
import React from "react"
import styled from "@emotion/styled"
import { Emoji } from "src/components/Emoji"

type Props = {}

const ProfileCard: React.FC<Props> = () => {
  return (
    <StyledWrapper>
      {/* <div className="title">
        关于我
      </div> */}
      <div className="content">
        <div className="top">
          <Image src={CONFIG.profile.image} alt="" />
          <div className= "new">
            <div className="name">{CONFIG.profile.name}</div>
            <div className="role">{CONFIG.profile.role}</div>
            {/* <div className="bio">{CONFIG.profile.bio}</div> */}
          </div>
        </div>
      </div>
    </StyledWrapper>
  )
}

export default ProfileCard

const StyledWrapper = styled.div`
  > .title {
    padding: 0.25rem;
    margin-bottom: 0.75rem;
  }
  > .content {
    margin-bottom: 1.5rem;
    border-radius: 1rem !important;
    width: 100%;
    background-color: ${({ theme }) =>
      theme.scheme === "light" ? "rgba(0, 0, 0, 0.03)" : "rgba(40, 40, 40, 0.3)"};
    @media (min-width: 768px) {
      padding: 1rem;
    }
    @media (min-width: 1024px) {
      padding: 1rem;
    }
    .top {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: start;
      gap: 0.5rem;
      width: 100%;

      img {
        display: block;
        position: relative !important;
        width: 56px;
        height: 56px;
        border-radius: 50%;
      }

      .new {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        .name {
          font-size: 16px;
          line-height: 1.75rem;
          font-weight: 700;
        }
        .role {
          font-size: 0.875rem;
          line-height: 1.25rem;
          color: ${({ theme }) => theme.colors.gray11};
        }
        .bio {
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
          line-height: 1.25rem;
        }
      }
      
    }
    .mid {
      display: flex;
      padding: 0.5rem;
      flex-direction: column;
      align-items: center;
    }
  }
`
