const DEFAULT_INTRO_COPY = {
    title: "Doors of the world behind an amazing art gallery.",
    guide: {
        eyebrow: "How to explore",
        lines: [
            [
                { text: "Enter the gallery", tone: "hero" },
                { text: " and browse the " },
                { text: "cards", tone: "glow" },
                { text: " at your own risk!", tone: "soft" }
            ],
            [
                { text: "Click, hold, or drag", tone: "action" },
                { text: " inside a card to have " },
                { text: "some fun.", tone: "glow" }
            ],
            [
                { text: "All pieces are unique, and beautiful.", tone: "hero" },
                { text: " " },
                { text: "Contact me to send or credit an idea.", tone: "soft" }
            ]
        ]
    },
    button: "Enter",
    preparing: "Preparing..."
}

const INTRO_COPY_BY_LANG = {
    en: DEFAULT_INTRO_COPY,
    de: {
        title: "T\u00fcren der Welt hinter einer erstaunlichen Kunstgalerie.",
        guide: {
            eyebrow: "So funktioniert es",
            lines: [
                "Betritt die Galerie und schau dir die Karten in Ruhe an.",
                "Klicke, tippe oder halte eine Karte, um das Werk darin sichtbar zu machen.",
                "Manche Werke reagieren anders, und einige brauchen einen kurzen Moment zum Laden."
            ]
        },
        button: "Eintreten",
        preparing: "Wird vorbereitet..."
    },
    hr: {
        title: "Vrata svijeta iza nevjerojatne umjetni\u010dke galerije.",
        guide: {
            eyebrow: "Kako istra\u017eivati",
            lines: [
                "U\u0111i u galeriju i istra\u017euj kartice svojim tempom.",
                "Klikni, dodirni ili pritisni karticu da otkrije\u0161 \u0161to skriva.",
                "Neki radovi reagiraju druga\u010dije, a nekima treba trenutak da se pripreme."
            ]
        },
        button: "U\u0111i",
        preparing: "Priprema se..."
    },
    tr: {
        title: "Muhte\u015fem bir sanat galerisinin ard\u0131ndaki d\u00fcnyan\u0131n kap\u0131lar\u0131.",
        guide: {
            eyebrow: "Nas\u0131l gezilir",
            lines: [
                "Galeriye girin ve kartlar\u0131 kendi temponuzda inceleyin.",
                "\u0130\u00e7indekini ortaya \u00e7\u0131karmak i\u00e7in karta t\u0131klay\u0131n, dokunun veya bas\u0131l\u0131 tutun.",
                "Baz\u0131 i\u015fler farkl\u0131 tepki verir ve baz\u0131lar\u0131n\u0131n haz\u0131rlanmas\u0131 biraz s\u00fcrebilir."
            ]
        },
        button: "Gir",
        preparing: "Haz\u0131rlan\u0131yor..."
    }
}

const CAROUSEL_LABELS_BY_LANG = {
    en: {
        gallery: "Web art gallery",
        next: "Next artwork",
        previous: "Previous artwork",
        last: "Last viewed artwork",
        jump: "Jump to artwork",
        jumpTo: "Show artwork",
        pin: "Open alongside current artwork",
        unpin: "Close extra window",
        pinLimit: "Three extra artworks are already open",
        pinned: "Extra artwork",
        addNext: "Add artwork"
    },
    de: {
        gallery: "Webkunst-Galerie",
        next: "Nächstes Werk",
        previous: "Vorheriges Werk",
        last: "Zuletzt angesehenes Werk",
        jump: "Werk auswählen",
        jumpTo: "Werk anzeigen",
        pin: "Neben dem aktuellen Werk öffnen",
        unpin: "Zusätzliches Fenster schließen",
        pinLimit: "Drei zusätzliche Werke sind bereits offen",
        pinned: "Zusätzliches Werk",
        addNext: "Werk hinzufügen"
    },
    hr: {
        gallery: "Galerija web umjetnosti",
        next: "Sljedeće djelo",
        previous: "Prethodno djelo",
        last: "Zadnje pregledano djelo",
        jump: "Odaberi djelo",
        jumpTo: "Prikaži djelo",
        pin: "Otvori uz trenutno djelo",
        unpin: "Zatvori dodatni prozor",
        pinLimit: "Već su otvorena tri dodatna djela",
        pinned: "Dodatno djelo",
        addNext: "Dodaj djelo"
    },
    tr: {
        gallery: "Web sanatı galerisi",
        next: "Sonraki eser",
        previous: "Önceki eser",
        last: "Son görüntülenen eser",
        jump: "Eser seç",
        jumpTo: "Eseri göster",
        pin: "Geçerli eserin yanında aç",
        unpin: "Ek pencereyi kapat",
        pinLimit: "Üç ek eser zaten açık",
        pinned: "Ek eser",
        addNext: "Eser ekle"
    }
}

const SUBMIT_FALLBACK_BY_LANG = {
    en: "Send yours!",
    de: "Sende deine!",
    hr: "Pošalji svoju!",
    tr: "Sen de gönder!"
}

const CLICK_FALLBACK_BY_LANG = {
    en: "Click",
    de: "Klicken",
    hr: "Klikni",
    tr: "Tıkla"
}

export function getWebArtIntroCopy(languageId = "en") {
    return INTRO_COPY_BY_LANG[languageId] || DEFAULT_INTRO_COPY
}

export function getWebArtCarouselLabels(languageId = "en") {
    return CAROUSEL_LABELS_BY_LANG[languageId]
}

export function resolveWebArtActionLabels(language, languageId = "en") {
    let submitTileLabel = language?.getString?.("send_yours")
    if(typeof submitTileLabel !== "string" || submitTileLabel.startsWith("locale:")) {
        submitTileLabel = SUBMIT_FALLBACK_BY_LANG[languageId] || SUBMIT_FALLBACK_BY_LANG.en
    }

    let clickTileLabel = language?.getString?.("click")
    if(typeof clickTileLabel !== "string" || clickTileLabel.startsWith("locale:")) {
        clickTileLabel = CLICK_FALLBACK_BY_LANG[languageId] || CLICK_FALLBACK_BY_LANG.en
    }

    return {
        submitTileLabel,
        clickTileLabel,
        introHideLabel: "hide"
    }
}
