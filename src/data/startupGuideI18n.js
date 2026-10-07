// Home navigation guidance. Describe the controls actually available on Home:
// mobile profile tools above and section navigation below, or the desktop rail.
// Preserve sentence copy; rows and emphasis carry the visual hierarchy.
export const startupGuideLabels = {
    en: {
        desktop: "Explore the sidebar",
        mobile: "Explore the site",
        desktopDetail: [
            {icon: "left", text: "Open a **page** on the left."},
            {icon: "settings", tone: "tools", text: "Below the page links, choose your **language** or switch **light/dark mode**."},
        ],
        mobileDetail: [],
        top: [
            {icon: "up", tone: "tools", accents: ["tools", "tools", "download"], text: "Use the buttons above to change **language**, switch **light/dark mode** or download my **résumé**."},
        ],
        bottom: [
            {icon: "down", text: "Choose a **section** below."},
            {icon: "up", text: "Use its **top menu** for more pages."},
        ],
    },
    de: {
        desktop: "Entdecke das Menü",
        mobile: "Entdecke die Website",
        desktopDetail: [
            {icon: "left", text: "Öffne links eine **Seite**."},
            {icon: "settings", tone: "tools", text: "Unter den Seitenlinks kannst du die **Sprache** wählen oder zwischen **Hell und Dunkel** wechseln."},
        ],
        mobileDetail: [],
        top: [
            {icon: "up", tone: "tools", accents: ["tools", "tools", "download"], text: "Oben kannst du die **Sprache** wählen, zwischen **Hell und Dunkel** wechseln oder meinen **Lebenslauf** herunterladen."},
        ],
        bottom: [
            {icon: "down", text: "Wähle unten einen **Bereich**."},
            {icon: "up", text: "Weitere Seiten findest du in seinem **Menü oben**."},
        ],
    },
    hr: {
        desktop: "Istraži bočni izbornik",
        mobile: "Upoznaj stranicu",
        desktopDetail: [
            {icon: "left", text: "Otvori **stranicu** lijevo."},
            {icon: "settings", tone: "tools", text: "Ispod poveznica možeš promijeniti **jezik** ili odabrati **svijetli ili tamni prikaz**."},
        ],
        mobileDetail: [],
        top: [
            {icon: "up", tone: "tools", accents: ["tools", "tools", "download"], text: "Gore možeš promijeniti **jezik**, odabrati **svijetli ili tamni prikaz** ili preuzeti moj **životopis**."},
        ],
        bottom: [
            {icon: "down", text: "Dolje odaberi **odjeljak**."},
            {icon: "up", text: "Njegove ostale stranice otvori u **gornjem izborniku**."},
        ],
    },
    tr: {
        desktop: "Yan menüyü keşfet",
        mobile: "Siteyi keşfet",
        desktopDetail: [
            {icon: "left", text: "Soldan bir **sayfa** aç."},
            {icon: "settings", tone: "tools", text: "Sayfa bağlantılarının altından **dili** ve **açık/koyu görünümü** değiştirebilirsin."},
        ],
        mobileDetail: [],
        top: [
            {icon: "up", tone: "tools", accents: ["tools", "tools", "download"], text: "Yukarıdaki düğmelerden **dili** ve **açık/koyu görünümü** değiştirebilir, **özgeçmişimi** indirebilirsin."},
        ],
        bottom: [
            {icon: "down", text: "Alttan bir **bölüm** seç."},
            {icon: "up", text: "Bölümün diğer sayfalarını **üst menüden** aç."},
        ],
    },
}
