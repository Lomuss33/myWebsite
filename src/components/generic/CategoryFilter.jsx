import "./CategoryFilter.scss"
import React, {useLayoutEffect, useRef, useState} from 'react'
import {useUtils} from "../../hooks/utils.js"

function CategoryFilter({ categories, selectedCategoryId, setSelectedCategoryId, className = "" }) {
    const utils = useUtils()
    const containerRef = useRef(null)
    const categoryCount = categories.length || 1
    const compactColumnCount = Math.max(2, Math.ceil(categoryCount / 2))

    const [lastCategorySelectTime, setLastCategorySelectTime] = useState(0)

    const hoverClass = utils.device.isTouchDevice() ?
        `category-filter-no-hover-effects` :
        ``

    useLayoutEffect(() => {
        const container = containerRef.current
        if (!container) return

        const buttons = () => Array.from(container.querySelectorAll("button.category-filter-button"))

        const setFontSizeRem = (fontSizeRem) => {
            container.style.setProperty("--category-filter-font-size", `${fontSizeRem}rem`)
        }

        const fits = () => {
            const btns = buttons()
            if (btns.length === 0) return true
            return btns.every((btn) => btn.scrollWidth <= btn.clientWidth + 1)
        }

        let rafId = null
        const update = () => {
            if (rafId) cancelAnimationFrame(rafId)
            rafId = requestAnimationFrame(() => {
                const minRem = 0.52
                const maxRem = 0.85

                setFontSizeRem(maxRem)
                if (fits()) return

                let low = minRem
                let high = maxRem
                for (let i = 0; i < 10; i++) {
                    const mid = (low + high) / 2
                    setFontSizeRem(mid)
                    if (fits()) {
                        low = mid
                    } else {
                        high = mid
                    }
                }

                setFontSizeRem(low)
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

    return (
        <button type={"button"}
                className={`category-filter-button ${className} ${selectedClassName} btn text-2`}
                onClick={onClick}
                data-selected={isSelected ? "true" : "false"}
                aria-pressed={isSelected}>
            <span className={`category-filter-button-label`}>{category.label}</span>
            <span className={`category-filter-button-count`}>({category.count})</span>
        </button>
    )
}

export default CategoryFilter
