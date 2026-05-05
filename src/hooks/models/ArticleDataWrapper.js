/**
 * @author Lovro Music
 * @date 2025-05-10
 * @description This class is a wrapper for the article data. It provides methods to parse and validate the data loaded from a section's JSON file.
 */

import ArticleItemDataWrapper from "./ArticleItemDataWrapper.js"
import {_loggingUtils} from "../utils/_logging-utils.js"

const utils = {
    log: _loggingUtils
}

export default class ArticleDataWrapper {
    /** @const **/
    static CATEGORY_ALL = "category_all"

    /**
     * @param {Object} section
     * @param {Object} rawData
     * @param {Object} language
     * @param {Object} theme
     * @param {Number} id
     */
    constructor(section, rawData, language, theme, id) {
        this._items = this._parseItems(rawData, language, theme)
        this._section = section
        this._orderedItems = null
        this._filteredItemsByCategory = new Map()

        this.id = id
        this.component = rawData.component
        this.locales = this._parseLocales(rawData, language)
        this.settings = this._parseSettings(rawData)
        this.categories = this._parseCategories(rawData, language)

        this._evaluate()
    }

    /**
     * @param {Object} rawData
     * @param {Object} language
     * @private
     */
    _parseLocales(rawData, language) {
        const rawLocales = rawData.locales || {}

        return {
            contactThankYouTitle: language.getTranslation(rawLocales, "contact_thank_you_title", undefined),
            contactThankYouBody: language.getTranslation(rawLocales, "contact_thank_you_body", undefined),
            contactThankYouFooter: language.getTranslation(rawLocales, "contact_thank_you_footer", undefined),
            complaintTitle: language.getTranslation(rawLocales, "complaint_title", undefined),
            complaintIntro: language.getTranslation(rawLocales, "complaint_intro", undefined),
            complaintNote: language.getTranslation(rawLocales, "complaint_note", undefined),
            complaintDestinationLabel: language.getTranslation(rawLocales, "complaint_destination_label", undefined),
            complaintNowhereLabel: language.getTranslation(rawLocales, "complaint_nowhere_label", undefined),
            complaintYouWhereLabel: language.getTranslation(rawLocales, "complaint_you_where_label", undefined),
            complaintKnjigaLabel: language.getTranslation(rawLocales, "complaint_knjiga_label", undefined),
            complaintAnzeigeLabel: language.getTranslation(rawLocales, "complaint_anzeige_label", undefined),
            complaintNowhereTip: language.getTranslation(rawLocales, "complaint_nowhere_tip", undefined),
            complaintYouWhereTip: language.getTranslation(rawLocales, "complaint_you_where_tip", undefined),
            complaintAnzeigeTip: language.getTranslation(rawLocales, "complaint_anzeige_tip", undefined),
            complaintEmailLabel: language.getTranslation(rawLocales, "complaint_email_label", undefined),
            complaintSentTitle: language.getTranslation(rawLocales, "complaint_sent_title", undefined),
            complaintSentBody: language.getTranslation(rawLocales, "complaint_sent_body", undefined),
            complaintPopupTitle: language.getTranslation(rawLocales, "complaint_popup_title", undefined),
            complaintPopupBody: language.getTranslation(rawLocales, "complaint_popup_body", undefined),
            title: language.getTranslation(rawLocales, "title", null),
        }
    }

    /**
     * @param {Object} rawData
     * @private
     */
    _parseSettings(rawData) {
        const rawSettings = rawData.settings || {}

        return {
            // General Settings...
            orderItemsBy: rawSettings["order_items_by"] || "id",
            orderItemsSort: rawSettings["order_items_sort"] || "asc",

            // - ArticleInlineList
            displayAsListIfWidthIsLowerThan: rawSettings["display_as_list_if_width_is_lower_than"] || undefined,
            inlineListMaxItems: rawSettings["inline_list_max_items"] || undefined,

            // - ArticleText
            keepImageRow: Boolean(rawSettings["keepImageRow"]) || undefined,
            textLayoutMode: rawSettings["text_layout_mode"] || "default",

            // - ArticleFeature
            featureLayoutMode: rawSettings["feature_layout_mode"] || "default",
            featureStackOrder: rawSettings["feature_stack_order"] || "media_text",
            featureSplitMinWidth: rawSettings["feature_split_min_width"] || undefined,
            featureSplitHeightTolerance: rawSettings["feature_split_height_tolerance"] || 0,
            featureImageAspectRatio: rawSettings["feature_image_aspect_ratio"] || undefined,
            featureImageMobileAspectRatio: rawSettings["feature_image_mobile_aspect_ratio"] || undefined,
            featureImageViewportHeight: rawSettings["feature_image_viewport_height"] || undefined,
            featureTextFitToMediaHeight: rawSettings["feature_text_fit_to_media_height"] === undefined ?
                undefined :
                Boolean(rawSettings["feature_text_fit_to_media_height"]),
            featureTextFitMinScale: rawSettings["feature_text_fit_min_scale"] || undefined,
            featureTextFitMaxScale: rawSettings["feature_text_fit_max_scale"] || undefined,
            featureEmbed: rawSettings["feature_embed"] || undefined,
            featureEmbedPosition: rawSettings["feature_embed_position"] || undefined,
            featureEmbedSourceItemId: Number.isFinite(Number(rawSettings["feature_embed_source_item_id"])) ?
                Number(rawSettings["feature_embed_source_item_id"]) :
                undefined,
            featureEmbedHideSourceItem: rawSettings["feature_embed_hide_source_item"] === undefined ?
                true :
                Boolean(rawSettings["feature_embed_hide_source_item"]),
            featureInteractiveItemIds: Array.isArray(rawSettings["feature_interactive_item_ids"]) ?
                rawSettings["feature_interactive_item_ids"]
                    .map(itemId => Number(itemId))
                    .filter(itemId => Number.isFinite(itemId)) :
                [],

            // - ArticleSkills
            maxItemsPerRow: rawSettings["max_items_per_row"] || undefined,
            maxRowsCollapseThreshold: rawSettings["max_rows_collapse_threshold"] || undefined,
            columnLayout: rawSettings["column_layout"] || undefined,
            avatarImageMode: rawSettings["avatar_image_mode"] || undefined,
            roundIcons: Boolean(rawSettings["round_icons"]) || undefined,
            showItemNumbers: Boolean(rawSettings["show_item_numbers"]) || undefined,

            // - ArticleContactForm
            emailJsPublicKey: rawSettings["email_js_public_key"] || undefined,
            emailJsServiceId: rawSettings["email_js_service_id"] || undefined,
            emailJsTemplateId: rawSettings["email_js_template_id"] || undefined,
            emailJsComplaintTemplateId: rawSettings["email_js_complaint_template_id"] || undefined,
            emailJsResumeTemplateId: rawSettings["email_js_resume_template_id"] || undefined,
        }
    }

    /**
     * @param rawData
     * @param language
     * @param theme
     * @return {ArticleItemDataWrapper[]}
     * @private
     */
    _parseItems(rawData, language, theme) {
        const rawItems = rawData.items || []
        return rawItems.map((rawItem, key) => {
            return new ArticleItemDataWrapper(this, rawItem, language, theme, key + 1)
        })
    }

    /**
     * @param rawData
     * @param language
     * @return {Array}
     * @private
     */
    _parseCategories(rawData, language) {
        const categoryIds = this._resolveCategoryIds(rawData)

        if(categoryIds.length === 0)
            return []

        const categories = [{
            id: ArticleDataWrapper.CATEGORY_ALL,
            key: 0,
            all: true,
            label: language.getTranslation(rawData.locales, ArticleDataWrapper.CATEGORY_ALL),
            count: this.orderedItems.length
        }]

        categoryIds.forEach(categoryId => {
            categories.push({
                id: categoryId,
                key: categories.length,
                all: false,
                label: language.getTranslation(rawData.locales, categoryId),
                count: this.getOrderedItemsFilteredBy(categoryId).length,
            })
        })

        this._items.forEach(item => {
            item.category = categories.find(category => category.id === item.categoryId)
        })

        return categories
    }

    _resolveCategoryIds(rawData) {
        const settings = rawData.settings || {}
        const categorizeBy = settings["categorize_by"]

        if(Array.isArray(categorizeBy)) {
            return categorizeBy.filter(categoryId => typeof categoryId === "string" && categoryId.length > 0)
        }

        if(typeof categorizeBy !== "string" || categorizeBy.length === 0) {
            return []
        }

        // Support legacy data that stored category ids on a named item field
        // such as "category" instead of the canonical "categoryId".
        const rawItems = rawData.items || []
        const categoryIds = rawItems.map(item => {
            return item?.[`${categorizeBy}Id`] || item?.[categorizeBy]
        })

        return [...new Set(categoryIds.filter(categoryId => typeof categoryId === "string" && categoryId.length > 0))]
    }

    get uniqueId() {
        return `article-${this.id}-section-${this._section?.id}`
    }

    get sectionId() {
        return this._section?.id
    }

    get orderedItems() {
        if(this._orderedItems)
            return this._orderedItems

        const { orderItemsBy, orderItemsSort } = this.settings
        this._orderedItems = this._items.slice().sort((a, b) => {
            const aValue = a[orderItemsBy]
            const bValue = b[orderItemsBy]

            if (aValue < bValue) return orderItemsSort === "asc" ? -1 : 1
            if (aValue > bValue) return orderItemsSort === "asc" ? 1 : -1
            return 0
        })

        return this._orderedItems
    }

    getOrderedItemsFilteredBy(categoryId) {
        if(!categoryId || categoryId === "category_all")
            return this.orderedItems

        if(this._filteredItemsByCategory.has(categoryId))
            return this._filteredItemsByCategory.get(categoryId)

        const filteredItems = this.orderedItems.filter(item => {
            return item.categoryId === categoryId
        })
        this._filteredItemsByCategory.set(categoryId, filteredItems)
        return filteredItems
    }

    _evaluate() {
        // Check if all items have a valid categoryId...
        const categories = this.categories.map(category => category.id)
        this._items.forEach(item => {
            if(categories.length > 1 && !categories.includes(item.categoryId)) {
                utils.log.warn(
                    "ArticleDataWrapper",
                    `Item ${item.id} has an invalid categoryId "${item.categoryId}".`
                )
            }
        })
    }
}
