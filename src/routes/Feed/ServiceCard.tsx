import { CONFIG } from "site.config"
import React from "react"
import { AiFillCodeSandboxCircle,AiFillAppstore,AiFillFilePpt,AiFillExperiment,AiFillPlayCircle } from "react-icons/ai"
import styled from "@emotion/styled"
import { Emoji } from "src/components/Emoji"

const ServiceCard: React.FC = () => {
  if (!CONFIG.projects) return null
  return (
    <>
      <StyledTitle>
        主要项目
      </StyledTitle>
      <StyledWrapper>
        <a>
            <AiFillAppstore className="icon" />
          <div className="name">商显OS设计（2023）</div>
        </a>
        <a>
            <AiFillFilePpt className="icon" />
          <div className="name">氧气PPT（2022）</div>
          </a>
        <a>
            <AiFillCodeSandboxCircle className="icon" />
          <div className="name">校早（2016-2023）</div>
          </a>
      </StyledWrapper>
      <StyledTitle>
        实验项目
      </StyledTitle>
      <StyledWrapper>
        <a>
            <AiFillPlayCircle className="icon" />
          <div className="name">视频读书</div>
        </a>
        <a>
            <AiFillExperiment className="icon" />
          <div className="name">AI产品经理</div>
          </a>
      </StyledWrapper>
    </>
  )
}

export default ServiceCard

const StyledTitle = styled.div`
  padding: 0.25rem;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
`

const StyledWrapper = styled.div`
  display: flex;
  padding: 0.25rem;
  margin-bottom: 1.5rem;
  flex-direction: column;
  border-radius: 1rem;
  background-color: ${({ theme }) =>
    theme.scheme === "light" ? "rgba(0, 0, 0, 0.03)" : "rgba(40, 40, 40, 0.3)"};
  > a {
    display: flex;
    padding: 0.75rem;
    gap: 0.75rem;
    align-items: center;
    border-radius: 1rem;
    color: ${({ theme }) => theme.colors.gray11};
    cursor: pointer;

    :hover {
      color: ${({ theme }) => theme.colors.gray12};
      background-color: ${({ theme }) => theme.colors.gray5};
    }
    .icon {
      font-size: 1.5rem;
      line-height: 2rem;
    }
    .name {
      font-size: 0.875rem;
      line-height: 1.25rem;
    }
  }
`
