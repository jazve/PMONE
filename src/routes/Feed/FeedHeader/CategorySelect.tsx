import useDropdown from "src/hooks/useDropdown"
import { useRouter } from "next/router"
import React from "react"
import { MdExpandMore } from "react-icons/md"
import { DEFAULT_CATEGORY } from "src/constants"
import styled from "@emotion/styled"
import { useCategoriesQuery } from "src/hooks/useCategoriesQuery"

type Props = {}

interface CategoryData {
  [key: string]: number;
}

const CategorySelect: React.FC<Props> = () => {
  const router = useRouter()
  const data: CategoryData = useCategoriesQuery()
  const [dropdownRef, opened, handleOpen] = useDropdown()

  const currentCategory = `${router.query.category || ``}` || DEFAULT_CATEGORY

  const handleOptionClick = (category: string) => {
    router.push({
      query: {
        ...router.query,
        category,
      },
    })
  }
  return (
    <StyledWrapper>
      <div ref={dropdownRef} className="wrapper" onClick={handleOpen}>
        {currentCategory} Posts <MdExpandMore />
      </div>
      {opened && (
        <div className="content">
          {Object.keys(data).map((key, idx) => (
            <div
              className="item"
              key={idx}
              onClick={() => handleOptionClick(key)}
            >
              {`${key} (${data[key]})`}
            </div>
          ))}
        </div>
      )}
    </StyledWrapper>
  )
}

export default CategorySelect
