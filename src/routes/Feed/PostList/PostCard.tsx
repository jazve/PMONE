import Link from "next/link"
import { CONFIG } from "site.config"
import { formatDate } from "src/libs/utils"
import Tag from "../../../components/Tag"
import { TPost } from "../../../types"
import Image from "next/image"
import Category from "../../../components/Category"
import styled from "@emotion/styled"

type Props = {
  data: TPost
}

const PostCard: React.FC<Props> = ({ data }) => {
  const category = (data.category && data.category?.[0]) || undefined

  return (
    <StyledWrapper href={`/${data.slug}`}>
      <article>
        
        {data.thumbnail && data.thumbnail !== " " && (
          <div className="thumbnail">
            <Image
              src={data.thumbnail}
              fill
              alt={data.title}
              css={{ objectFit: "cover" }}
            />
          </div>
        )}

        <div data-thumb={!!data.thumbnail && data.thumbnail !== ""} data-category={!!category} className="content">
        {/* {category && (
          <div className="category">
            <Category>{category}</Category>
          </div>
        )} */}
          <header className="top">
            <h2>{data.title}</h2>
          </header>
          <div className="date">
            <div className="content">
              {formatDate(
                data?.date?.start_date || data.createdTime,
                CONFIG.lang
              )}
            </div>
          </div>
          <div className="summary">
            <p>{data.summary}</p>
          </div>
          <div className="tags">
            {data.tags &&
              data.tags.map((tag: string, idx: number) => (
                <Tag key={idx}>{tag}</Tag>
              ))}
          </div>
        </div>
      </article>
    </StyledWrapper>
  )
}

export default PostCard

const StyledWrapper = styled(Link)`
  article {
    overflow: hidden;
    position: relative;
    margin-bottom: 2rem;
    padding: 3rem;
    border-bottom: 1px solid;
    border-color: rgba(0,0,0,.075);
    // border-radius: 1rem;
    background-color: ${({ theme }) =>
      theme.scheme === "light" ? "none" : "none"};
    transition-property: box-shadow;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
    transition: background-color 0.3s ease, border-radius 0.3s ease, margin 0.3s ease, padding 0.3s ease;

    @media (min-width: 768px) {
      // padding: 1rem;
    }

    :hover {
      h2 {
        text-decoration: underline;
      }
      

      // 文字添加下划线
      // box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      //   0 4px 6px -2px rgba(0, 0, 0, 0.05);
        background-color: ${({ theme }) => theme.scheme === "light" ? "white" : theme.colors.gray4};
        border-radius: 0.875rem;
        border: none;
        padding: 4rem 3rem;
        // margin: 2.5rem 0;
      //   transition: background-color 0.3s ease, border-radius 0.3s ease, margin 0.3s ease, padding 0.3s ease;
    }
    > .category {
      // position: absolute;
      margin: 1rem 0;
      // z-index: 10;
    }

    > .thumbnail {
      position: relative;
      border-radius: 1rem;
      width: 100%;
      background-color: ${({ theme }) => theme.colors.gray2};
      padding-bottom: 66%;

      img {
        border-radius: 1rem;
      }

      @media (min-width: 1024px) {
        padding-bottom: 50%;
      }
    }
    > .content {
      padding-top: 1rem;

      &[data-thumb="false"] {
        padding-top: 0rem;
      }
      &[data-category="false"] {
        padding-top: 0rem;
      }
      > .top {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        @media (min-width: 768px) {
          flex-direction: row;
          align-items: baseline;
        }
        h2 {
          margin-bottom: 0.5rem;
          font-size: 18px !important;
          line-height: 1.75rem;
          font-weight: bold;

          cursor: pointer;

          @media (min-width: 768px) {
            font-size: 1.25rem;
            line-height: 1.75rem;
          }
        }
      }
      > .date {
        display: flex;
        margin-bottom: 1rem;
        gap: 0.5rem;
        align-items: center;
        .content {
          font-size: 0.875rem;
          line-height: 1.25rem;
          color: ${({ theme }) => theme.colors.gray10};
          @media (min-width: 768px) {
            margin-left: 0;
          }
        }
      }
      > .summary {
        margin-bottom: 1rem;
        p {
          display: none;
          font-size: 14px !important;
          line-height: 1.5rem;
          color: ${({ theme }) => theme.colors.gray11};

          @media (min-width: 768px) {
            display: block;
          }
        }
      }
      > .tags {
        display: flex;
        gap: 0.5rem;
      }
    }
  }
`
