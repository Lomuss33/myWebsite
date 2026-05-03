import "./NotificationsLayer.scss"
import React, {useEffect, useState} from 'react'
import Notification from "./Notification.jsx"

function NotificationsLayer({ target, onNotificationDismissed = null }) {
    return (
        <>
            {target && (
                <div className={`notifications-layer`}>
                    <Notification id={`notification`}
                                  type={target.type}
                                  title={target.title}
                                  message={target.message}
                                  compact={target.compact}
                                  durationMs={target.durationMs}
                                  onDismiss={onNotificationDismissed}/>
                </div>
            )}
        </>
    )
}

export default NotificationsLayer
