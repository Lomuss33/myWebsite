import React from 'react'
import MinesweeperTile from "../tiles/MinesweeperTile.jsx"
import GoldfishTile from "../tiles/GoldfishTile.jsx"
import PatronusTile from "../tiles/PatronusTile.jsx"
import { BarsTile, PulseBoxTile, SpinBoxesTile } from "../tiles/CssMotionTiles.jsx"
import {
    AndroidTile,
    DeepTile,
    DistanceTile,
    EmbroideryTile,
    FallingRingsTile,
    GridWaveTile,
    HexFlowBallsTile,
    HourglassTile,
    JuliaLinesTile,
    NoiceTile,
    OrbitCirclesTile,
    PixelPlopTile,
    PrismFieldTile,
    RopeLightTile,
    ShapeFieldTile,
    SoupShaderTile,
    SpiralDotsTile,
    TardisTile,
    ThreePolygonDemo5Tile,
    ThreeTunnelTile,
    TortuosityTraceTile
} from "../tiles/CanvasEngineTiles.jsx"
import { AMBIENT_TILE_SPECS, resolveAmbientTileId } from "./webArtRegistryData.js"

const ITEM_TILE_COMPONENTS_BY_ID = {
    1: SpiralDotsTile,
    2: GridWaveTile,
    3: ThreeTunnelTile,
    4: ThreePolygonDemo5Tile,
    6: OrbitCirclesTile,
    7: SpinBoxesTile,
    8: ShapeFieldTile,
    9: HourglassTile,
    10: NoiceTile,
    11: DistanceTile,
    12: AndroidTile,
    13: PulseBoxTile,
    14: BarsTile,
    15: DeepTile
}

const AMBIENT_TILE_COMPONENTS_BY_KEY = {
    "ambient-trace": TortuosityTraceTile,
    "ambient-hex": HexFlowBallsTile,
    "ambient-plop": PixelPlopTile,
    "ambient-julia": JuliaLinesTile,
    "ambient-mines": MinesweeperTile,
    "ambient-rings": FallingRingsTile,
    "ambient-prism": PrismFieldTile,
    "ambient-rope": RopeLightTile,
    "ambient-soup": SoupShaderTile,
    "ambient-tardis": TardisTile,
    "ambient-goldfish": GoldfishTile,
    "ambient-patronus": PatronusTile
}

export function WebArtTile({ itemWrapper, index, activate, locked, onReady }) {
    const itemId = Number(itemWrapper?.id)
    const Component = ITEM_TILE_COMPONENTS_BY_ID[itemId] || EmbroideryTile
    return (
        <Component itemWrapper={itemWrapper}
                   index={index}
                   activate={activate}
                   locked={locked}
                   onReady={onReady}/>
    )
}

export function buildAmbientTileDefinitions({ articleUniqueId, locked, onTileReady }) {
    return AMBIENT_TILE_SPECS.map((spec) => {
        const tileId = resolveAmbientTileId(articleUniqueId, spec)
        const Component = AMBIENT_TILE_COMPONENTS_BY_KEY[spec.key]
        return {
            key: spec.key,
            tileId,
            label: spec.label,
            placeholderKey: spec.placeholderKey,
            render: (isOpen) => {
                if(spec.key === "ambient-patronus") {
                    return <Component locked={locked || !isOpen}/>
                }
                return (
                    <Component readyId={tileId}
                               locked={locked || !isOpen}
                               onReady={onTileReady}/>
                )
            }
        }
    })
}
