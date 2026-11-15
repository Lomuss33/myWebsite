import "./ArticleDataProbe.scss"
import React from "react"
import Article from "./base/Article.jsx"
import StandardButton from "../buttons/StandardButton.jsx"
import {useDataProbeController} from "./dataProbe/useDataProbeController.js"
import {ProbeListToggle, ProbeSection} from "./dataProbe/components/ProbeSection.jsx"
import {ProbeItem} from "./dataProbe/components/ProbeItem.jsx"
import {ProbeSearchPopup} from "./dataProbe/components/ProbeSearchPopup.jsx"

function ArticleDataProbe({ dataWrapper }) {
    const {
        unlocked,
        setUnlocked,
        probeStates,
        expanded,
        passiveInitReady,
        searchConfirmTarget,
        publicIpProbes,
        autoCount,
        requestCount,
        publicCount,
        requestListExpanded,
        passiveListExpanded,
        visibleRequestProbes,
        visiblePassiveProbes,
        runRequestProbe,
        runExtraAction,
        runPublicIp,
        toggleExpanded,
        toggleListExpanded,
        openSearchConfirm,
        closeSearchConfirm,
        confirmSearchAndOpen,
    } = useDataProbeController()

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-data-probe`}>
            {dataWrapper.locales.description && (
                <p className={`article-data-probe-intro text-3`}
                   dangerouslySetInnerHTML={{__html: dataWrapper.locales.description}}/>
            )}

            <div className={`article-data-probe-summary`}>
                <div className={`article-data-probe-summary-chip`}>
                    <i className={`fa-solid fa-eye`}/>
                    <span className={`article-data-probe-summary-value`}>{autoCount}</span>
                    <span className={`article-data-probe-summary-label`}>Auto-visible signals</span>
                </div>

                <div className={`article-data-probe-summary-chip`}>
                    <i className={`fa-solid fa-hand-pointer`}/>
                    <span className={`article-data-probe-summary-value`}>{requestCount}</span>
                    <span className={`article-data-probe-summary-label`}>Click-to-request probes</span>
                </div>

                <div className={`article-data-probe-summary-chip`}>
                    <i className={`fa-solid fa-globe`}/>
                    <span className={`article-data-probe-summary-value`}>{publicCount}</span>
                    <span className={`article-data-probe-summary-label`}>External IP checks</span>
                </div>
            </div>

            <ProbeSection
                icon={`fa-solid fa-globe`}
                eyebrow={`External lookup`}
                title={`Public IP`}
                description={`Shows the address that outside services see. Nothing is fetched until you click one of the buttons.`}
                accent={`accent-external`}
                searchId={`public_ip`}
                onIconClick={openSearchConfirm}>
                <div className={`article-data-probe-grid article-data-probe-grid-compact`}>
                    {publicIpProbes.map(p => (
                        <ProbeItem key={p.id}
                                   probe={p}
                                   state={probeStates[p.id]}
                                   showRequest={true}
                                   requestLabel={p.buttonLabel}
                                   onRequest={() => runPublicIp(p)}
                                   thirdParty={true}
                                   expanded={Boolean(expanded?.[p.id])}
                                   onToggleExpand={() => toggleExpanded(p.id)}
                                   onIconClick={openSearchConfirm}/>
                    ))}
                </div>
            </ProbeSection>

            <ProbeSection
                icon={`fa-solid fa-hand`}
                eyebrow={`Permission gated`}
                title={`Ask for more`}
                description={`These checks stay dormant until you unlock the section and explicitly ask for each permission or hardware chooser.`}
                accent={`accent-interactive`}
                searchId={`permission_gated`}
                onIconClick={openSearchConfirm}
                actions={!unlocked ? (
                    <StandardButton variant={`contrast`}
                                    className={`article-data-probe-unlock-btn`}
                                    label={`Unlock interactions`}
                                    faIcon={`fa-solid fa-unlock`}
                                    onClick={() => setUnlocked(true)}/>
                ) : null}>
                {unlocked && (
                    <>
                        <div className={`article-data-probe-grid article-data-probe-grid-fixed-two`}>
                            {visibleRequestProbes.map(p => (
                                <ProbeItem key={p.id}
                                           probe={p}
                                           state={probeStates[p.id]}
                                           showRequest={true}
                                           requestLabel={`Request`}
                                           onRequest={() => runRequestProbe(p)}
                                           extraAction={p.extraAction ? () => runExtraAction(p) : null}
                                           extraLabel={p.extraAction?.label}
                                           extraIcon={p.extraAction?.icon}
                                           extraState={probeStates[`${p.id}__extra`]}
                                           expanded={Boolean(expanded?.[p.id])}
                                           onToggleExpand={() => toggleExpanded(p.id)}
                                           onIconClick={openSearchConfirm}/>
                            ))}
                        </div>

                        <ProbeListToggle expanded={requestListExpanded}
                                         visibleCount={visibleRequestProbes.length}
                                         totalCount={requestCount}
                                         onToggle={() => toggleListExpanded("permission_gated")}/>
                    </>
                )}
            </ProbeSection>

            <ProbeSection
                icon={`fa-solid fa-eye`}
                eyebrow={`Passive reads`}
                title={`Visible without asking`}
                description={`These values are exposed by the browser immediately, without prompts, and are enough to describe a device surprisingly well.`}
                accent={`accent-passive`}
                searchId={`passive_reads`}
                onIconClick={openSearchConfirm}>
                {!passiveInitReady && (
                    <div className={`article-data-probe-block-description text-3 mb-3`}>
                        Passive probes are queued until the browser is idle so this section does not stall page transitions.
                    </div>
                )}
                <div className={`article-data-probe-grid article-data-probe-grid-single-column`}>
                    {visiblePassiveProbes.map(p => (
                        <ProbeItem key={p.id}
                                   probe={p}
                                   state={probeStates[p.id]}
                                   expanded={Boolean(expanded?.[p.id])}
                                   onToggleExpand={() => toggleExpanded(p.id)}
                                   onIconClick={openSearchConfirm}/>
                    ))}
                </div>

                <ProbeListToggle expanded={passiveListExpanded}
                                 visibleCount={visiblePassiveProbes.length}
                                 totalCount={autoCount}
                                 onToggle={() => toggleListExpanded("passive_reads")}/>
            </ProbeSection>

            <ProbeSearchPopup target={searchConfirmTarget}
                              onCancel={closeSearchConfirm}
                              onGo={confirmSearchAndOpen}/>
        </Article>
    )
}

export default ArticleDataProbe
