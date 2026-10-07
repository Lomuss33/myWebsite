// Home navigation guidance. Describe the controls actually available on Home:
// mobile profile tools above and section navigation below, or the desktop rail.
// Give each action its own row; emphasis carries the visual hierarchy.
export const startupGuideLabels = {
    en: {
        desktop: "Explore the sidebar",
        mobile: "Explore the site",
        desktopDetail: [],
        desktopTop: [
            {icon: "left", tone: "download", text: "View or download my **résumé** here."},
        ],
        desktopMiddle: [
            {icon: "left", text: "Open a **page** here."},
        ],
        desktopBottom: [
            {icon: "theme", tone: "tools", accents: ["light", "dark"], text: "Switch **light**/**dark** mode here."},
            {icon: "language", tone: "language", text: "Change the **language** here."},
        ],
        mobileDetail: [],
        top: [
            {icon: "language", tone: "language", text: "Change the **language** above."},
            {icon: "theme", tone: "tools", accents: ["light", "dark"], text: "Switch **light**/**dark** mode above."},
            {icon: "resume", tone: "download", text: "View or download my **résumé**."},
        ],
        bottom: [
            {icon: "down", text: "Choose a **section** below."},
            {icon: "up", text: "Use its **top menu** for more pages."},
        ],
    },
    de: {
        desktop: "Entdecke das Menü",
        mobile: "Entdecke die Website",
        desktopDetail: [],
        desktopTop: [
            {icon: "left", tone: "download", text: "Hier meinen **Lebenslauf** ansehen oder herunterladen."},
        ],
        desktopMiddle: [
            {icon: "left", text: "Hier eine **Seite** öffnen."},
        ],
        desktopBottom: [
            {icon: "theme", tone: "tools", accents: ["light", "dark"], text: "Hier **Hell**/**Dunkel** wechseln."},
            {icon: "language", tone: "language", text: "Hier die **Sprache** ändern."},
        ],
        mobileDetail: [],
        top: [
            {icon: "language", tone: "language", text: "Oben die **Sprache** ändern."},
            {icon: "theme", tone: "tools", accents: ["light", "dark"], text: "Oben **Hell**/**Dunkel** wechseln."},
            {icon: "resume", tone: "download", text: "**Lebenslauf** ansehen / herunterladen."},
        ],
        bottom: [
            {icon: "down", text: "Wähle unten einen **Bereich**."},
            {icon: "up", text: "Weitere Seiten findest du in seinem **Menü oben**."},
        ],
    },
    hr: {
        desktop: "Istraži bočni izbornik",
        mobile: "Upoznaj stranicu",
        desktopDetail: [],
        desktopTop: [
            {icon: "left", tone: "download", text: "Ovdje otvori ili preuzmi moj **životopis**."},
        ],
        desktopMiddle: [
            {icon: "left", text: "Ovdje otvori **stranicu**."},
        ],
        desktopBottom: [
            {icon: "theme", tone: "tools", accents: ["light", "dark"], text: "Ovdje odaberi **svijetli**/**tamni** prikaz."},
            {icon: "language", tone: "language", text: "Ovdje promijeni **jezik**."},
        ],
        mobileDetail: [],
        top: [
            {icon: "language", tone: "language", text: "Gore promijeni **jezik**."},
            {icon: "theme", tone: "tools", accents: ["light", "dark"], text: "Gore odaberi **svijetli**/**tamni** prikaz."},
            {icon: "resume", tone: "download", text: "Otvori ili preuzmi moj **životopis**."},
        ],
        bottom: [
            {icon: "down", text: "Dolje odaberi **odjeljak**."},
            {icon: "up", text: "Njegove ostale stranice otvori u **gornjem izborniku**."},
        ],
    },
    tr: {
        desktop: "Yan menüyü keşfet",
        mobile: "Siteyi keşfet",
        desktopDetail: [],
        desktopTop: [
            {icon: "left", tone: "download", text: "**Özgeçmişimi** buradan görüntüle veya indir."},
        ],
        desktopMiddle: [
            {icon: "left", text: "Buradan bir **sayfa** aç."},
        ],
        desktopBottom: [
            {icon: "theme", tone: "tools", accents: ["light", "dark"], text: "**Açık**/**koyu** görünümü buradan değiştir."},
            {icon: "language", tone: "language", text: "**Dili** buradan değiştir."},
        ],
        mobileDetail: [],
        top: [
            {icon: "language", tone: "language", text: "**Dili** yukarıdan değiştir."},
            {icon: "theme", tone: "tools", accents: ["light", "dark"], text: "**Açık**/**koyu** görünümü yukarıdan değiştir."},
            {icon: "resume", tone: "download", text: "**Özgeçmişimi** görüntüle veya indir."},
        ],
        bottom: [
            {icon: "down", text: "Alttan bir **bölüm** seç."},
            {icon: "up", text: "Bölümün diğer sayfalarını **üst menüden** aç."},
        ],
    },
}
