/**
 * @author Lovro Music
 * @date 2025-05-10
 * @description This hook provides methods to interact with external APIs.
 */

import emailjs from "@emailjs/browser"
import {useConstants} from "./constants.js"
import {useUtils} from "./utils.js"
import {validateReportPayload, evaluateDescriptionQuality} from "../utils/bugReportValidator.js"

export const useApi = () => {
    const constants = useConstants()
    const utils = useUtils()

    const validators = {
        /**
         * @param {String} name
         * @param {String} email
         * @param {String} subject
         * @param {String} message
         */
        validateEmailRequest: (name, email, subject, message) => {
            const minWordCountForMessage = 3

            const validations = [
                { errorCode: constants.ErrorCodes.VALIDATION_EMPTY_FIELDS,      errorCondition: !name || !email || !subject || !message },
                { errorCode: constants.ErrorCodes.VALIDATION_EMAIL,             errorCondition: !utils.validation.validateEmail(email) },
                { errorCode: constants.ErrorCodes.VALIDATION_MESSAGE_LENGTH,    errorCondition: !utils.validation.isLongerThan(message, minWordCountForMessage),    messageParameter: minWordCountForMessage + 1},
                { errorCode: constants.ErrorCodes.VALIDATION_MESSAGE_SPAM,      errorCondition: utils.validation.isSpam(message) },
            ]

            const error = validations.find(validation => validation.errorCondition)
            return {
                success: !error,
                errorCode: error?.errorCode,
                errorParameter: error?.messageParameter,
                bundle: {
                    name: name,
                    from_name: name,
                    email: email,
                    from_email: email,
                    custom_subject: subject,
                    message: message,
                    custom_source: utils.url.getAbsoluteLocation(),
                    custom_source_name: "React Portfolio"
                }
            }
        },

        /**
         * @param {String} recipientEmail
         * @param {String} resumePdfUrlAbsolute
         * @param {String} resumeCvUrlAbsolute
         */
        validateResumeEmailRequest: (recipientEmail, resumePdfUrlAbsolute, resumeCvUrlAbsolute) => {
            const validations = [
                { errorCode: constants.ErrorCodes.VALIDATION_EMPTY_FIELDS,  errorCondition: !recipientEmail || !resumePdfUrlAbsolute || !resumeCvUrlAbsolute },
                { errorCode: constants.ErrorCodes.VALIDATION_EMAIL,         errorCondition: !utils.validation.validateEmail(recipientEmail) }
            ]

            const error = validations.find(validation => validation.errorCondition)
            return {
                success: !error,
                errorCode: error?.errorCode,
                bundle: {
                    to_email: recipientEmail,
                    recipient_email: recipientEmail,
                    name: "Lovro Musi\u0107",
                    from_name: "Lovro Musi\u0107",
                    from_email: "contact@lovro-music.de",
                    reply_to: "contact@lovro-music.de",
                    custom_subject: "Lovro Musi\u0107 - Resume",
                    resume_pdf_url: resumePdfUrlAbsolute,
                    resume_cv_url: resumeCvUrlAbsolute,
                    message: `Resume PDF: ${resumePdfUrlAbsolute}\nCV page: ${resumeCvUrlAbsolute}`,
                    custom_source: utils.url.getAbsoluteLocation(),
                    custom_source_name: "React Portfolio"
                }
            }
        },

        /**
         * @param {String} message
         * @param {String} recipientEmail
         */
        validateComplaintRequest: (message, recipientEmail = "trash@lovro-music.de") => {
            const trimmedMessage = String(message || "").trim()

            const validations = [
                { errorCode: constants.ErrorCodes.VALIDATION_EMPTY_FIELDS, errorCondition: !trimmedMessage },
                { errorCode: constants.ErrorCodes.VALIDATION_MESSAGE_SPAM, errorCondition: utils.validation.isSpam(trimmedMessage) }
            ]

            const error = validations.find(validation => validation.errorCondition)
            return {
                success: !error,
                errorCode: error?.errorCode,
                bundle: {
                    to_email: recipientEmail,
                    recipient_email: recipientEmail,
                    name: "Anonymous Complaint",
                    from_name: "Anonymous Complaint",
                    from_email: "anonymous@lovro-music.de",
                    reply_to: "anonymous@lovro-music.de",
                    custom_subject: "Website complaint",
                    message: trimmedMessage,
                    custom_source: utils.url.getAbsoluteLocation(),
                    custom_source_name: "Complaint Desk"
                }
            }
        },

        /**
         * @param {Object} reportInput
         */
        validateBugReportRequest: (reportInput = {}) => {
            const rawDescription = String(reportInput.description || "").trim()
            if(!rawDescription) {
                return {
                    success: false,
                    errorCode: constants.ErrorCodes.VALIDATION_EMPTY_FIELDS
                }
            }

            if(rawDescription.length < 10) {
                return {
                    success: false,
                    errorCode: constants.ErrorCodes.REPORT_DESCRIPTION_SHORT
                }
            }

            if(utils.validation.isSpam(rawDescription)) {
                return {
                    success: false,
                    errorCode: constants.ErrorCodes.VALIDATION_MESSAGE_SPAM
                }
            }

            const replyEmail = String(reportInput.replyEmail || "").trim()
            if(replyEmail && !utils.validation.validateEmail(replyEmail)) {
                return {
                    success: false,
                    errorCode: constants.ErrorCodes.VALIDATION_EMAIL
                }
            }

            const schemaCheck = validateReportPayload({
                version: 1,
                type: reportInput.type || "bug_report",
                description: rawDescription,
                affectedSection: reportInput.affectedSection || "",
                reproducibility: reportInput.reproducibility || "unsure",
                steps: reportInput.steps || "",
                expectedBehavior: reportInput.expectedBehavior || "",
                replyEmail,
                honeypot: reportInput.honeypot || "",
                turnstileToken: reportInput.turnstileToken || "",
                diagnostics: reportInput.diagnostics || {}
            })

            if(!schemaCheck.valid) {
                const mappedCode = schemaCheck.errorCode === "invalid_email" ?
                    constants.ErrorCodes.VALIDATION_EMAIL :
                    schemaCheck.errorCode === "spam_content" ?
                        constants.ErrorCodes.VALIDATION_MESSAGE_SPAM :
                        schemaCheck.errorCode === "description_too_short" ?
                            constants.ErrorCodes.REPORT_DESCRIPTION_SHORT :
                            constants.ErrorCodes.VALIDATION_EMPTY_FIELDS

                return {
                    success: false,
                    errorCode: mappedCode
                }
            }

            const quality = evaluateDescriptionQuality(rawDescription, {
                affectedSection: schemaCheck.sanitized.affectedSection,
                steps: schemaCheck.sanitized.steps,
                expectedBehavior: schemaCheck.sanitized.expectedBehavior
            })

            return {
                success: true,
                quality,
                bundle: schemaCheck.sanitized
            }
        }
    }

    const handlers = {
        /**
         * @return {Promise<{success: (*|boolean)}>}
         */
        dummyRequest: async () => {
            await new Promise((resolve) => setTimeout(resolve, 700))
            window._dummyRequestSuccess = !window._dummyRequestSuccess

            return {
                success: window._dummyRequestSuccess
            }
        },

        /**
         * @param {Object} validationBundle
         * @param {String} publicKey
         * @param {String} serviceId
         * @param {String} templateId
         * @return {Promise<{success: boolean}>}
         */
        sendEmailRequest: async (validationBundle, publicKey, serviceId, templateId) => {
            emailjs.init(publicKey)

            const response = {success: false}

            try {
                const result = await emailjs.send(serviceId, templateId, validationBundle)
                response.success = result.status === 200
            } catch (error) {
                response.success = false
            }

            return response
        },

        /**
         * @param {Object} reportBundle
         * @param {Object} options
         * @return {Promise<{success: boolean, reportId?: string, errorCode?: string, duplicate?: boolean}>}
         */
        submitBugReportRequest: async (reportBundle, options = {}) => {
            if(typeof window !== "undefined" && typeof window.__mockBugReportTransport === "function") {
                try {
                    const mockResult = await window.__mockBugReportTransport(reportBundle, options)
                    return {
                        success: Boolean(mockResult?.success),
                        reportId: mockResult?.reportId || "GOS-LOCAL-MOCK",
                        duplicate: Boolean(mockResult?.duplicate),
                        errorCode: mockResult?.errorCode
                    }
                }
                catch (_error) {
                    return {
                        success: false,
                        errorCode: constants.ErrorCodes.MESSAGE_SUBMIT_FAILED
                    }
                }
            }

            const endpoint = options.endpoint || import.meta.env.VITE_GRAIN_OF_SALT_ENDPOINT || "/api/grain-of-salt/report"

            try {
                const response = await fetch(endpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(reportBundle)
                })

                if(response.status === 429) {
                    return {
                        success: false,
                        errorCode: constants.ErrorCodes.REPORT_RATE_LIMITED
                    }
                }

                if(response.status === 404 || response.status === 405 || response.status === 503) {
                    if(options.emailJsFallback?.publicKey && options.emailJsFallback?.serviceId && options.emailJsFallback?.templateId) {
                        const fallbackBundle = {
                            to_email: options.emailJsFallback.recipientEmail || "trash@lovro-music.de",
                            recipient_email: options.emailJsFallback.recipientEmail || "trash@lovro-music.de",
                            name: "Grain of Salt Bug Report",
                            from_name: "Grain of Salt Bug Report",
                            from_email: reportBundle.replyEmail || "anonymous@lovro-music.de",
                            reply_to: reportBundle.replyEmail || "anonymous@lovro-music.de",
                            custom_subject: `[Bug Report] ${reportBundle.affectedSection || "website"} (${reportBundle.reproducibility || "unsure"})`,
                            message: [
                                `Description:\n${reportBundle.description}`,
                                reportBundle.steps ? `Steps:\n${reportBundle.steps}` : "",
                                reportBundle.expectedBehavior ? `Expected vs Actual:\n${reportBundle.expectedBehavior}` : "",
                                `Diagnostics:\n${JSON.stringify(reportBundle.diagnostics || {})}`
                            ].filter(Boolean).join("\n\n"),
                            custom_source: utils.url.getAbsoluteLocation(),
                            custom_source_name: "Grain of Salt Bug Intake"
                        }

                        const emailRes = await handlers.sendEmailRequest(
                            fallbackBundle,
                            options.emailJsFallback.publicKey,
                            options.emailJsFallback.serviceId,
                            options.emailJsFallback.templateId
                        )

                        if(emailRes.success) {
                            return {
                                success: true,
                                reportId: `GOS-${Date.now().toString(36).toUpperCase().slice(-6)}`
                            }
                        }
                    }

                    return {
                        success: false,
                        errorCode: constants.ErrorCodes.REPORT_UNAVAILABLE
                    }
                }

                const contentType = response.headers.get("content-type") || ""
                if(!contentType.includes("application/json")) {
                    return {
                        success: false,
                        errorCode: constants.ErrorCodes.REPORT_UNAVAILABLE
                    }
                }

                const data = await response.json()
                if(!response.ok || !data?.ok) {
                    return {
                        success: false,
                        errorCode: data?.errorCode === "rate_limited" ?
                            constants.ErrorCodes.REPORT_RATE_LIMITED :
                            constants.ErrorCodes.MESSAGE_SUBMIT_FAILED
                    }
                }

                return {
                    success: true,
                    reportId: data.reportId || "GOS-OK",
                    duplicate: Boolean(data.duplicate)
                }
            }
            catch (_error) {
                return {
                    success: false,
                    errorCode: constants.ErrorCodes.REPORT_UNAVAILABLE
                }
            }
        }
    }

    return {
        validators,
        handlers
    }
}
