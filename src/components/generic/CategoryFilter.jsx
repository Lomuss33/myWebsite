import "./CategoryFilter.scss"
import React, {useLayoutEffect, useRef, useState} from 'react'
import {useUtils} from "../../hooks/utils.js"

function CategoryFilter({ categories, selectedCategoryId, setSelectedCategoryId, className = "" }) {
    const utils = useUtils()
    const containerRef = useRef(null)
    const categoryCount = categories.length || 1
    const compactColumnCount = Math.max(2, Math.ceil(categoryCount / 2))

    const [lastCategorySelectTime, setLastCategorySelectTime] = useState(0)

    const hoverClass = utils.device.canHoverWithFinePointer() ?
        `` :
        `category-filter-no-hover-effects`

    useLayoutEffect(() => {
        const container = containerRef.current
        if (!container) return

        const buttons = () => Array.from(container.querySelectorAll("button.category-filter-button"))

        let rafId = null
        const update = () => {
            if (rafId) cancelAnimationFrame(rafId)
            rafId = requestAnimationFrame(() => {
                const minRem = 0.58
                const maxRem = 0.85

                container.style.setProperty("--category-filter-font-size", `${maxRem}rem`)

                buttons().forEach((button) => {
                    const label = button.querySelector(".category-filter-button-label")
                    const count = button.querySelector(".category-filter-button-count")
                    const setSize = (rem) => button.style.setProperty("--category-filter-button-font-size", `${rem}rem`)
                    const fits = () => button.scrollWidth <= button.clientWidth + 1 &&
                        [label, count].filter(Boolean).every((part) => part.scrollWidth <= part.clientWidth + 1)

                    setSize(maxRem)
                    if (fits()) return

                    let low = minRem
                    let high = maxRem
                    for (let i = 0; i < 10; i++) {
                        const mid = (low + high) / 2
                        setSize(mid)
                        if (fits()) low = mid
                        else high = mid
                    }

                    setSize(low)
                })
            })
        }

        update()

        if (typeof ResizeObserver === "undefined") {
            return () => {
                if (rafId) cancelAnimationFrame(rafId)
            }
        }

        const observer = new ResizeObserver(() => update())
        observer.observe(container)

        return () => {
            observer.disconnect()
            if (rafId) cancelAnimationFrame(rafId)
        }
    }, [categories])

    const _select = (categoryId) => {
        const now = Date.now()
        if (!categoryId || now - lastCategorySelectTime < 50) {
            return
        }

        setLastCategorySelectTime(now)
        setSelectedCategoryId(categoryId)
    }

    return (
        <div
            ref={containerRef}
            className={`category-filter ${className}`}
            style={{
                "--category-filter-columns": categoryCount,
                "--category-filter-compact-columns": compactColumnCount
            }}>
            {categories.map((category, key) => (
                <CategoryFilterButton key={key}
                                      category={category}
                                      className={hoverClass}
                                      onClick={() => _select(category.id)}
                                      isSelected={category?.id === selectedCategoryId}/>
            ))}
        </div>
    )
}

function CategoryFilterButton({ category, isSelected, onClick, className = "" }) {
    const selectedClassName = isSelected ?
        `category-filter-button-selected` : ``

    const categoryMarks = {
        category_all: <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />,
        category_educational: <path d="m3 9 9-5 9 5-9 5-9-5Zm3.5 2.2V16c3.3 2.4 7.7 2.4 11 0v-4.8M21 9v6" />,
        category_professional: <path d="M3 8h18v12H3zM8 8V5h8v3M3 12h18M10 12v2h4v-2" />,
        category_personal: <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-8 9a8 8 0 0 1 16 0" />,
        category_practical: <path d="M4 18 15.5 6.5a3.54 3.54 0 0 1 5 5L9 23H4v-5Zm9-9 5 5M4 4h5M6.5 1.5v5" />,
        category_theoretical: <path d="M4 19V5m0 14h17M7 15l4-4 3 2 6-7M17 6h3v3" />,
        category_fun: <path d="m12 2 2.3 6.1L21 10l-5.2 3.8L16 21l-4-4-5 3 1.5-6.3L3 10l6.2-1.2L12 2Z" />,
        category_croatian: <path d="M3 5h18M3 10h18M3 15h18M3 20h18M8 3v18m8-18v18" />,
        category_german: <path d="M4 5h16M4 12h16M4 19h16" />
    }
    const categoryMark = categoryMarks[category.id]

    return (
        <button type={"button"}
                className={`category-filter-button ${className} ${selectedClassName} btn text-2`}
                data-category-id={category.id}
                onClick={onClick}
                data-selected={isSelected ? "true" : "false"}
                aria-pressed={isSelected}>
            {categoryMark && <svg className="category-filter-button-mark" viewBox="0 0 24 24" aria-hidden="true" focusable="false">{categoryMark}</svg>}
            <span className={`category-filter-button-label`}>{category.label}</span>
            <span className={`category-filter-button-count`}>({category.count})</span>
        </button>
    )
}

export default CategoryFilter
