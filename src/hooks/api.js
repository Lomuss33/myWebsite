/**
 * @author Lovro Music
 * @date 2025-05-10
 * @description This hook provides methods to interact with external APIs.
 */

import emailjs from "@emailjs/browser"
import {useConstants} from "./constants.js"
import {useUtils} from "./utils.js"

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
        }
    }

    return {
        validators,
        handlers
    }
}
