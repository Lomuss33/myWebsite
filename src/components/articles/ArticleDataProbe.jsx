import "./ArticleDataProbe.scss"
import React, {useEffect, useMemo, useRef, useState} from "react"
import {createPortal} from "react-dom"
import Article from "./base/Article.jsx"
import StandardButton from "../buttons/StandardButton.jsx"
import CopyButton from "../buttons/CopyButton.jsx"
import {useLanguage} from "../../providers/LanguageProvider.jsx"

const HIDDEN_TEXT = "No data returned. Access may be blocked, denied, or intentionally hidden."
const LIST_PREVIEW_COUNT = 2
const PROBE_POPUP_THEME_VAR_NAMES = [
    "--probe-popup-backdrop",
    "--probe-popup-surface",
    "--probe-popup-border",
    "--probe-popup-shadow",
    "--probe-popup-text",
    "--probe-popup-text-soft",
    "--probe-popup-query-bg",
    "--probe-popup-query-border",
    "--probe-popup-go-bg",
    "--probe-popup-go-text",
    "--probe-popup-cancel-bg",
    "--probe-popup-cancel-text",
    "--probe-accent",
]
const PROBE_WHAT = {
    secure_context: "Whether the page runs in a trusted browser mode that unlocks restricted web capabilities.",
    user_agent: "The legacy browser identification string sent for compatibility with old sites and servers.",
    ua_ch_basic: "A structured browser identity summary with brand, platform, and mobile hints.",
    ua_ch_entropy: "A richer set of client hints that may expose architecture, bitness, model, and exact version info.",
    languages: "Your preferred language list as reported by the browser.",
    timezone: "The named region your system clock is configured to use.",
    local_time: "The current date-time string generated from your device clock.",
    referrer: "The page or site that led the browser here, if one was sent.",
    do_not_track: "A browser privacy preference flag requesting reduced tracking.",
    cookies: "Whether the browser currently allows small site data files for sessions and state.",
    online: "The browser's basic guess about whether network access exists.",
    screen: "The full size of the connected display in CSS pixels.",
    viewport: "The usable page area inside the browser window right now.",
    dpr: "The ratio between CSS pixels and physical screen pixels.",
    touch_points: "How many simultaneous touch contacts the device reports it can handle.",
    cpu_cores: "The number of logical processing threads the browser exposes.",
    device_memory: "A coarse memory tier used by browsers for performance decisions.",
    network_hints: "Approximate connection quality signals like speed class, latency, and data saver state.",
    storage_estimate: "An estimate of browser-managed disk usage and remaining quota for this site.",
    persistent_storage: "Whether site data is protected from automatic eviction when storage gets tight.",
    battery: "Current power and charging information from the device battery subsystem.",
    media_device_counts: "How many audio and video input/output devices the browser can enumerate.",
    gpu_renderer: "The graphics adapter and driver identity exposed through WebGL.",
    local_fingerprint: "A locally computed signature derived from several visible browser and device traits.",
    geolocation: "Your physical position estimate derived from location services.",
    notifications: "Permission to let the site show system-level alerts outside the page.",
    clipboard_read: "The current text content sitting in the system copy buffer.",
    camera_mic_labels: "The names of connected capture devices after access is granted.",
    screen_share: "Metadata about the display, window, or tab you choose to share.",
    bluetooth: "A chooser for nearby short-range wireless devices the browser can talk to.",
    webusb: "A chooser for directly attached peripherals exposed over USB.",
    webserial: "A chooser for hardware that communicates over serial ports.",
    webhid: "A chooser for generic human-interface peripherals like controllers or input devices.",
    file_picker: "The names and sizes of files you explicitly choose from your device.",
    directory_picker: "The name of a folder you explicitly choose from your device.",
    contacts: "Selected people entries from the device address book.",
    midi: "Connected music input and output gear visible through the browser.",
    public_ip_v4: "Your outward-facing network address on the older internet routing standard.",
    public_ip_v6: "Your outward-facing network address on the newer internet routing standard.",
}

const DATA_PROBE_UI = {
    en: {
        hiddenText: "No data returned. Access may be blocked, denied, or intentionally hidden.",
        searchTitle: "Search Google?",
        searchSectionDescription: "This will open a new tab to research this signal group.",
        searchProbeDescription: "This will open a new tab to research this signal.",
        searchEyebrow: "External search",
        cancel: "Cancel",
        go: "Go",
        autoVisibleSignals: "Auto-visible signals",
        clickToRequestProbes: "Click-to-request probes",
        externalIpChecks: "External IP checks",
        sectionExternalEyebrow: "External lookup",
        sectionExternalTitle: "Public IP",
        sectionExternalDescription: "Shows the address that outside services see. Nothing is fetched until you click one of the buttons.",
        sectionPermissionEyebrow: "Permission gated",
        sectionPermissionTitle: "Ask for more",
        sectionPermissionDescription: "These checks stay dormant until you unlock the section and explicitly ask for each permission or hardware chooser.",
        sectionPassiveEyebrow: "Passive reads",
        sectionPassiveTitle: "Visible without asking",
        sectionPassiveDescription: "These values are exposed by the browser immediately, without prompts, and are enough to describe a device surprisingly well.",
        passiveQueuedDescription: "Passive probes are queued until the browser is idle so this section does not stall page transitions.",
        unlockInteractions: "Unlock interactions",
        request: "Request",
        copy: "Copy",
        details: "Details",
        what: "What",
        how: "How",
        why: "Why",
        signals: "signals",
        showLess: "Show less",
        showMore: "Show more",
        searchGoogleFor: "Search Google for",
        badges: {
            ok: "AVAILABLE",
            pending: "CHECKING",
            idle: "READY",
            unsupported: "NOT SUPPORTED",
            hidden: "DENIED/HIDDEN"
        },
        statusText: {
            requestPending: "Request in progress...",
            passivePending: "Collecting locally exposed values...",
            thirdPartyIdle: "No external request has been sent yet. Use the button to fetch it deliberately.",
            requestIdle: "Waiting for your click. Nothing is requested until you trigger it.",
            unsupported: "This browser or context does not expose this capability.",
            explanationUnavailable: "Explanation unavailable."
        },
        buttons: {
            sendTest: "Send test",
            fetchPublicIPv4: "Fetch public IPv4",
            fetchPublicIPv6: "Fetch public IPv6"
        }
    },
    de: {
        hiddenText: "Keine Daten zurueckgegeben. Der Zugriff ist moeglicherweise blockiert, verweigert oder absichtlich verborgen.",
        searchTitle: "Bei Google suchen?",
        searchSectionDescription: "Dies oeffnet einen neuen Tab, um diese Signalgruppe genauer zu recherchieren.",
        searchProbeDescription: "Dies oeffnet einen neuen Tab, um dieses Signal genauer zu recherchieren.",
        searchEyebrow: "Externe Suche",
        cancel: "Abbrechen",
        go: "Los",
        autoVisibleSignals: "Automatisch sichtbare Signale",
        clickToRequestProbes: "Per Klick anfragbare Abfragen",
        externalIpChecks: "Externe IP-Abfragen",
        sectionExternalEyebrow: "Externe Abfrage",
        sectionExternalTitle: "Oeffentliche IP",
        sectionExternalDescription: "Zeigt die Adresse, die externe Dienste von dir sehen. Es wird nichts abgefragt, bis du auf einen der Buttons klickst.",
        sectionPermissionEyebrow: "Berechtigungsbasiert",
        sectionPermissionTitle: "Mehr anfragen",
        sectionPermissionDescription: "Diese Abfragen bleiben inaktiv, bis du den Bereich freischaltest und jede Berechtigung oder Hardware-Auswahl bewusst anstoesst.",
        sectionPassiveEyebrow: "Passive Auslesung",
        sectionPassiveTitle: "Ohne Nachfrage sichtbar",
        sectionPassiveDescription: "Diese Werte liefert der Browser sofort und ohne Rueckfrage. Zusammen beschreiben sie ein Geraet erstaunlich genau.",
        passiveQueuedDescription: "Passive Abfragen werden erst gestartet, wenn der Browser Leerlauf hat, damit dieser Bereich Seitenwechsel nicht ausbremst.",
        unlockInteractions: "Interaktionen freischalten",
        request: "Anfragen",
        copy: "Kopieren",
        details: "Details",
        what: "Was",
        how: "Wie",
        why: "Warum",
        signals: "Signale",
        showLess: "Weniger zeigen",
        showMore: "Mehr zeigen",
        searchGoogleFor: "Google-Suche fuer",
        badges: {
            ok: "VERFUEGBAR",
            pending: "PRUEFT",
            idle: "BEREIT",
            unsupported: "NICHT UNTERSTUETZT",
            hidden: "VERWEIGERT/VERBORGEN"
        },
        statusText: {
            requestPending: "Anfrage laeuft...",
            passivePending: "Lokal sichtbare Werte werden gesammelt...",
            thirdPartyIdle: "Es wurde noch keine externe Anfrage gesendet. Nutze den Button, um sie bewusst auszufuehren.",
            requestIdle: "Wartet auf deinen Klick. Es wird nichts angefragt, bis du es ausloest.",
            unsupported: "Dieser Browser oder Kontext stellt diese Faehigkeit nicht bereit.",
            explanationUnavailable: "Keine Erklaerung verfuegbar."
        },
        buttons: {
            sendTest: "Test senden",
            fetchPublicIPv4: "Oeffentliche IPv4 abrufen",
            fetchPublicIPv6: "Oeffentliche IPv6 abrufen"
        }
    },
    hr: {
        hiddenText: "Nema vracenih podataka. Pristup je mozda blokiran, odbijen ili namjerno skriven.",
        searchTitle: "Pretraziti na Googleu?",
        searchSectionDescription: "Otvorit ce se nova kartica za dodatno istrazivanje ove skupine signala.",
        searchProbeDescription: "Otvorit ce se nova kartica za dodatno istrazivanje ovog signala.",
        searchEyebrow: "Vanjska pretraga",
        cancel: "Odustani",
        go: "Idi",
        autoVisibleSignals: "Automatski vidljivi signali",
        clickToRequestProbes: "Provjere na klik",
        externalIpChecks: "Vanjske IP provjere",
        sectionExternalEyebrow: "Vanjski upit",
        sectionExternalTitle: "Javna IP adresa",
        sectionExternalDescription: "Prikazuje adresu koju vanjske usluge vide. Nista se ne dohvaca dok ne kliknes jedan od gumba.",
        sectionPermissionEyebrow: "Uz dopustenje",
        sectionPermissionTitle: "Zatrazi vise",
        sectionPermissionDescription: "Ove provjere miruju dok ne otkljucas odjeljak i izricito ne zatrazis svako dopustenje ili odabir hardvera.",
        sectionPassiveEyebrow: "Pasivno citanje",
        sectionPassiveTitle: "Vidljivo bez pitanja",
        sectionPassiveDescription: "Ove vrijednosti preglednik otkriva odmah, bez ikakvog upita, i iznenadujuce dobro opisuju uredaj.",
        passiveQueuedDescription: "Pasivne provjere cekaju da preglednik ude u mirovanje kako ovaj odjeljak ne bi usporavao prijelaze stranice.",
        unlockInteractions: "Otkljucaj interakcije",
        request: "Zatrazi",
        copy: "Kopiraj",
        details: "Detalji",
        what: "Sto",
        how: "Kako",
        why: "Zasto",
        signals: "signala",
        showLess: "Prikazi manje",
        showMore: "Prikazi vise",
        searchGoogleFor: "Pretrazi Google za",
        badges: {
            ok: "DOSTUPNO",
            pending: "PROVJERA",
            idle: "SPREMNO",
            unsupported: "NIJE PODRZANO",
            hidden: "ODBIJENO/SKRIVENO"
        },
        statusText: {
            requestPending: "Zahtjev je u tijeku...",
            passivePending: "Prikupljaju se lokalno vidljive vrijednosti...",
            thirdPartyIdle: "Jos nije poslan nijedan vanjski zahtjev. Upotrijebi gumb ako to zelis namjerno uciniti.",
            requestIdle: "Ceka tvoj klik. Nista se ne trazi dok to sam ne pokrenes.",
            unsupported: "Ovaj preglednik ili kontekst ne izlaze ovu mogucnost.",
            explanationUnavailable: "Objasnjenje nije dostupno."
        },
        buttons: {
            sendTest: "Posalji test",
            fetchPublicIPv4: "Dohvati javni IPv4",
            fetchPublicIPv6: "Dohvati javni IPv6"
        }
    },
    tr: {
        hiddenText: "Veri donmedi. Erisim engellenmis, reddedilmis ya da bilincli olarak gizlenmis olabilir.",
        searchTitle: "Google'da ara?",
        searchSectionDescription: "Bu, bu sinyal grubunu arastirmak icin yeni bir sekme acar.",
        searchProbeDescription: "Bu, bu sinyali arastirmak icin yeni bir sekme acar.",
        searchEyebrow: "Harici arama",
        cancel: "Iptal",
        go: "Git",
        autoVisibleSignals: "Otomatik gorunen sinyaller",
        clickToRequestProbes: "Tiklayarak istenen yoklamalar",
        externalIpChecks: "Harici IP kontrolleri",
        sectionExternalEyebrow: "Harici sorgu",
        sectionExternalTitle: "Genel IP",
        sectionExternalDescription: "Dis servislerin gordugu adresi gosterir. Dugmelerden birine tiklayana kadar hicbir sey cekilmez.",
        sectionPermissionEyebrow: "Izin gerektirir",
        sectionPermissionTitle: "Daha fazlasini iste",
        sectionPermissionDescription: "Bu kontroller, bolumu acana ve her izin ya da donanim secicisini acikca istemene kadar pasif kalir.",
        sectionPassiveEyebrow: "Pasif okumalar",
        sectionPassiveTitle: "Sormadan gorunenler",
        sectionPassiveDescription: "Tarayici bu degerleri aninda ve izin istemeden aciga cikarir; birlikte bir cihazi sasirtici derecede iyi tarif ederler.",
        passiveQueuedDescription: "Pasif yoklamalar, bu bolum sayfa gecislerini yavaslatmasin diye tarayici bosta kalana kadar bekletilir.",
        unlockInteractions: "Etkilesimleri ac",
        request: "Iste",
        copy: "Kopyala",
        details: "Detaylar",
        what: "Ne",
        how: "Nasil",
        why: "Neden",
        signals: "sinyal",
        showLess: "Daha az goster",
        showMore: "Daha fazla goster",
        searchGoogleFor: "Google'da ara:",
        badges: {
            ok: "MEVCUT",
            pending: "KONTROL EDIYOR",
            idle: "HAZIR",
            unsupported: "DESTEKLENMIYOR",
            hidden: "REDDEDILDI/GIZLI"
        },
        statusText: {
            requestPending: "Istek suruyor...",
            passivePending: "Yerel olarak gorunen degerler toplanıyor...",
            thirdPartyIdle: "Henuz harici bir istek gonderilmedi. Bilincli olarak cekmek icin dugmeyi kullan.",
            requestIdle: "Tiklamani bekliyor. Sen tetiklemeden hicbir sey istenmez.",
            unsupported: "Bu tarayici veya baglam bu yetenegi sunmuyor.",
            explanationUnavailable: "Aciklama mevcut degil."
        },
        buttons: {
            sendTest: "Test gonder",
            fetchPublicIPv4: "Genel IPv4'u getir",
            fetchPublicIPv6: "Genel IPv6'yi getir"
        }
    }
}

const DATA_PROBE_TRANSLATIONS = {
    de: {
        secure_context: { title: "Sicherer Kontext", what: "Ob die Seite in einem vertrauenswuerdigen Browsermodus laeuft, der eingeschraenkte Web-Faehigkeiten freischaltet.", how: "Aus window.isSecureContext gelesen.", why: "Viele hardware-nahe APIs (USB/Bluetooth/Clipboard/Medien) funktionieren nur ueber HTTPS." },
        user_agent: { title: "User-Agent", what: "Die alte Browser-Kennung, die aus Kompatibilitaetsgruenden an alte Websites und Server gesendet wird.", how: "Aus navigator.userAgent gelesen.", why: "Eine auslaufende Kompatibilitaetskette; verraet oft OS, Browser-Builds und Geraeteklasse." },
        ua_ch_basic: { title: "UA-CH (grundlegend)", what: "Eine strukturierte Browser-Zusammenfassung mit Marke, Plattform und Mobile-Hinweisen.", how: "Aus navigator.userAgentData gelesen (falls unterstuetzt).", why: "Strukturierter als User-Agent; kann Plattform und Marken-Versionen offenlegen." },
        ua_ch_entropy: { title: "UA-CH (hohe Entropie)", what: "Ein detaillierterer Satz von Client Hints, der Architektur, Bitness, Modell und exakte Versionsinfos preisgeben kann.", how: "Ueber navigator.userAgentData.getHighEntropyValues() angefragt.", why: "Praezisere Geraetehinweise wie Architektur/Bitness/Modell in manchen Browsern." },
        languages: { title: "Sprachen", what: "Deine bevorzugte Sprachliste, wie sie der Browser meldet.", how: "Aus navigator.languages gelesen.", why: "Passt oft zu OS- und Tastatur-Setup; kann Region und Nutzerpraeferenzen verraten." },
        timezone: { title: "Zeitzone", what: "Die benannte Region, fuer die deine Systemuhr konfiguriert ist.", how: "Aus Intl.DateTimeFormat().resolvedOptions().timeZone gelesen.", why: "Sehr gut fuer Regionsrueckschluesse und relevant fuer Zeitstempel, Logs, Debugging und Datenschutz." },
        local_time: { title: "Lokale Zeit", what: "Die aktuelle Datums-/Zeit-Zeichenkette, erzeugt von deiner Geraeteuhr.", how: "Mit new Date().toString() erzeugt.", why: "Kann Uhrenabweichungen und Locale-Formatierung zeigen; nuetzlich fuer Time-Sync-Debugging." },
        referrer: { title: "Referrer", what: "Die Seite oder Website, von der der Browser hierher kam, falls sie mitgesendet wurde.", how: "Aus document.referrer gelesen.", why: "Zeigt Navigationspfade; gut fuer Debugging, aber potenziell datenschutzsensibel." },
        do_not_track: { title: "Do Not Track", what: "Ein Browser-Datenschutzsignal, das reduziertes Tracking anfordert.", how: "Aus navigator.doNotTrack gelesen.", why: "Ein veralteter Datenschutz-Hinweis, der nicht immer respektiert wird, aber trotzdem eine Praeferenz zeigt." },
        cookies: { title: "Cookies aktiviert", what: "Ob der Browser aktuell kleine Website-Datendateien fuer Sitzungen und Zustand zulaesst.", how: "Aus navigator.cookieEnabled gelesen.", why: "Wichtige Speicher-Voraussetzung; betrifft Sessions, Login und Tracking." },
        online: { title: "Online", what: "Die grundlegende Schaetzung des Browsers, ob Netz-Zugang vorhanden ist.", how: "Aus navigator.onLine gelesen.", why: "Nur ein Hinweis, aber trotzdem nuetzlich fuer UX und Diagnose von Offline-Fehlern." },
        screen: { title: "Bildschirm", what: "Die volle Groesse des angeschlossenen Displays in CSS-Pixeln.", how: "Aus screen.width / screen.height gelesen.", why: "Hinweise auf Panel und Skalierung; haeufig in Fingerprinting und Layout-Entscheidungen genutzt." },
        viewport: { title: "Viewport", what: "Der aktuell nutzbare Seitenbereich innerhalb des Browserfensters.", how: "Aus window.innerWidth / window.innerHeight gelesen.", why: "Das, was die Seite wirklich nutzen kann; aendert sich durch Browser-UI, Zoom und Splitscreen." },
        dpr: { title: "Geraete-Pixel-Verhaeltnis", what: "Das Verhaeltnis zwischen CSS-Pixeln und echten Bildschirm-Pixeln.", how: "Aus window.devicePixelRatio gelesen.", why: "Hinweis auf HiDPI und Skalierung; beeinflusst Schaerfe und Performance." },
        touch_points: { title: "Touch-Punkte", what: "Wie viele gleichzeitige Beruehrungen das Geraet laut Browser verarbeiten kann.", how: "Aus navigator.maxTouchPoints gelesen.", why: "Hinweis auf Touch-Hardware; hilft beim Erkennen von Phone/Tablet/2-in-1." },
        cpu_cores: { title: "CPU-Kerne (logisch)", what: "Die Zahl logischer Verarbeitungsthreads, die der Browser offenlegt.", how: "Aus navigator.hardwareConcurrency gelesen.", why: "Grober CPU-Tier-Hinweis; relevant fuer Performance und Parallelisierung." },
        device_memory: { title: "Geraetespeicher (ca.)", what: "Eine grobe RAM-Klasse, die Browser fuer Performance-Entscheidungen verwenden.", how: "Aus navigator.deviceMemory gelesen (falls unterstuetzt).", why: "Sehr grobe RAM-Stufe; genutzt fuer Heuristiken und Fingerprinting." },
        network_hints: { title: "Netzwerk-Hinweise", what: "Ungefaehre Verbindungsqualitaets-Signale wie Geschwindigkeitsklasse, Latenz und Datensparmodus.", how: "Aus navigator.connection gelesen (falls unterstuetzt).", why: "Hinweise auf Funk-/Link-Qualitaet; oft erkennbar, ob mobil oder kabelgebunden und ob Data Saver aktiv ist." },
        storage_estimate: { title: "Speicher-Schaetzung", what: "Eine Schaetzung von Browser-Speichernutzung und verbleibendem Kontingent fuer diese Website.", how: "Aus navigator.storage.estimate() gelesen (falls unterstuetzt).", why: "Wie viel Plattenplatz der Browser nutzen kann; wichtig fuer Caching, Offline und grosse Apps." },
        persistent_storage: { title: "Persistenter Speicher", what: "Ob Website-Daten vor automatischem Entfernen geschuetzt sind, wenn Speicher knapp wird.", how: "Aus navigator.storage.persisted() gelesen (falls unterstuetzt).", why: "Wenn false, kann der Browser gespeicherte Daten unter Druck verwerfen." },
        battery: { title: "Akku", what: "Aktuelle Strom- und Ladeinformationen aus dem Akku-Subsystem des Geraets.", how: "Aus navigator.getBattery() gelesen (falls unterstuetzt).", why: "Hinweis auf Energiezustand, vor allem mobil/laptop; kann Performance-Modi beeinflussen." },
        media_device_counts: { title: "Mediengeraete (Anzahl)", what: "Wie viele Audio- und Video-Ein-/Ausgabegeraete der Browser auflisten kann.", how: "Ueber navigator.mediaDevices.enumerateDevices() gezaehlt (sicherer Kontext).", why: "Peripherie-Hinweise wie Mikros/Kameras/Ausgabegeraete; koennen erstaunlich eindeutig sein." },
        gpu_renderer: { title: "GPU-Renderer/Hersteller", what: "Die ueber WebGL offengelegte Identitaet von Grafikadapter und Treiber.", how: "Per WebGL + WEBGL_debug_renderer_info gelesen (falls vorhanden).", why: "GPU-Modellhinweise sind sehr fingerprintbar und korrelieren mit Performance-Klasse." },
        local_fingerprint: { title: "Lokaler Fingerprint-Hash", what: "Eine lokal berechnete Signatur aus mehreren sichtbaren Browser- und Geraete-Merkmalen.", how: "SHA-256 ueber ein Buendel der oben gezeigten Werte (lokal berechnet).", why: "Zeigt, wie eindeutig du schon wirken kannst, ohne irgendeine Berechtigung anzufordern." },
        geolocation: { title: "Geolokalisierung", what: "Deine physische Positions-Schaetzung aus Ortungsdiensten.", how: "Ueber navigator.geolocation.getCurrentPosition() angefragt.", why: "Meist GPS/WLAN/Mobilfunk-Triangulation. Sehr sensibel und sehr realweltlich." },
        notifications: { title: "Benachrichtigungen", what: "Die Berechtigung, dass die Website systemweite Hinweise ausserhalb der Seite anzeigen darf.", how: "Ueber Notification.requestPermission() angefragt.", why: "Dauerhafte Berechtigung. Gute UX-Funktion, aber auch Spam- und Missbrauchsvektor." },
        clipboard_read: { title: "Zwischenablage lesen", what: "Der aktuelle Textinhalt, der im System-Clipboard liegt.", how: "Ueber navigator.clipboard.readText() angefragt (User-Geste).", why: "Die Zwischenablage kann Passwoerter, Schluessel und private Nachrichten enthalten. Extrem sensibel." },
        camera_mic_labels: { title: "Kamera- und Mikrofon-Namen", what: "Die Namen angeschlossener Aufnahmegeraete nach erteilter Freigabe.", how: "Fordert getUserMedia an und liest dann die Labels ueber enumerateDevices().", why: "Offenbart Capture-Hardware wie Headsets/Webcams. Praktisch fuer Setups, aber auch fingerprintbar." },
        screen_share: { title: "Bildschirmfreigabe-Metadaten", what: "Metadaten ueber Display, Fenster oder Tab, den du zur Freigabe waehlst.", how: "Ueber navigator.mediaDevices.getDisplayMedia() angefragt.", why: "Zeigt, welche Freigabequelle du gewaehlt hast. Sensibel, auch ohne Pixel auszulesen." },
        bluetooth: { title: "Bluetooth-Geraeteauswahl", what: "Eine Auswahl fuer nahe drahtlose Kurzstrecken-Geraete, mit denen der Browser kommunizieren kann.", how: "Ueber navigator.bluetooth.requestDevice() angefragt (Chooser).", why: "Nahe Hardware ist ein grosser Kontext-Leak. Stark fuer IoT, heikel fuer Privatsphaere." },
        webusb: { title: "WebUSB-Auswahl", what: "Eine Auswahl direkt angeschlossener Peripherie, die ueber USB fuer den Browser sichtbar gemacht wird.", how: "Ueber navigator.usb.requestDevice() angefragt (Chooser).", why: "Direkter USB-Zugriff fuer Dev-Boards und Hardware-Tools. Sehr maechtig, wenn erlaubt." },
        webserial: { title: "WebSerial-Auswahl", what: "Eine Auswahl fuer Hardware, die ueber serielle Ports kommuniziert.", how: "Ueber navigator.serial.requestPort() angefragt (Chooser).", why: "Serielle Konsolen fuer Embedded-Geraete wie Arduino, ESP oder Router. Ideal fuer Hardware-Hacking." },
        webhid: { title: "WebHID-Auswahl", what: "Eine Auswahl fuer generische Human-Interface-Geraete wie Controller oder Eingabegeraete.", how: "Ueber navigator.hid.requestDevice() angefragt (Chooser).", why: "HID bedeutet Tastaturen, Maeuse, Gamepads. Kann angeschlossene Peripherie offenlegen." },
        file_picker: { title: "Dateiauswahl", what: "Die Namen und Groessen von Dateien, die du bewusst auf deinem Geraet auswaehlst.", how: "Ueber showOpenFilePicker() angefragt (du waehlst).", why: "Schon Metadaten wie Dateiname und Groesse koennen Kontext verraten. Inhalte werden hier nicht gelesen." },
        directory_picker: { title: "Ordnerauswahl", what: "Der Name eines Ordners, den du bewusst auf deinem Geraet auswaehlst.", how: "Ueber showDirectoryPicker() angefragt (du waehlst).", why: "Ordnernamen koennen Projekt- oder Firmenkontext verraten. Wir zeigen nur den Namen." },
        contacts: { title: "Kontaktauswahl", what: "Ausgewaehlte Personeneintraege aus dem Adressbuch des Geraets.", how: "Ueber navigator.contacts.select() angefragt (falls unterstuetzt).", why: "Sozialer Graph plus Telefon-/E-Mail-Daten. Von Natur aus sehr sensibel." },
        midi: { title: "MIDI-Geraete", what: "Angeschlossene Musik-Ein- und Ausgabegeraete, die der Browser sehen kann.", how: "Ueber navigator.requestMIDIAccess() angefragt (falls unterstuetzt).", why: "Hinweis auf Musik-Hardware und Peripherie. Macht Spass und ist ueberraschend identifizierend." },
        public_ip_v4: { title: "Oeffentliche IP (IPv4)", what: "Deine nach aussen sichtbare Netzwerkadresse im aelteren Internet-Adressstandard.", how: "Von https://api.ipify.org?format=json abgerufen.", why: "Deine Internet-Adresse nach aussen, nicht deine LAN-IP. Genau diese sehen Server." },
        public_ip_v6: { title: "Oeffentliche IP (IPv6)", what: "Deine nach aussen sichtbare Netzwerkadresse im neueren Internet-Adressstandard.", how: "Von https://api64.ipify.org?format=json abgerufen.", why: "Wenn dein Netzwerk IPv6 unterstuetzt, kann sie pro Geraet oder pro Netzwerk stabil und eindeutig sein." }
    },
    hr: {
        secure_context: { title: "Siguran kontekst", what: "Pokazuje radi li stranica u pouzdanom nacinu preglednika koji otkljucava ogranicene web mogucnosti.", how: "Cita se iz window.isSecureContext.", why: "Mnogi hardverski API-ji poput USB-a, Bluetootha, medija ili clipboarda rade samo preko HTTPS-a." },
        user_agent: { title: "User-Agent", what: "Stari identifikacijski niz preglednika koji se salje radi kompatibilnosti sa starijim stranicama i serverima.", how: "Cita se iz navigator.userAgent.", why: "Kompatibilnosni niz koji cesto otkriva OS, verziju preglednika i klasu uredaja." },
        ua_ch_basic: { title: "UA-CH (osnovno)", what: "Strukturirani sazetak identiteta preglednika s markom, platformom i mobilnim naznakama.", how: "Cita se iz navigator.userAgentData (ako je podrzano).", why: "Strukturiranije od User-Agenta; moze otkriti platformu i verzije brandova." },
        ua_ch_entropy: { title: "UA-CH (visoka entropija)", what: "Detaljniji skup client hintova koji moze otkriti arhitekturu, bitnost, model i tocne verzije.", how: "Trazi se preko navigator.userAgentData.getHighEntropyValues().", why: "Na nekim preglednicima daje preciznije podatke poput arhitekture, bitnosti i modela." },
        languages: { title: "Jezici", what: "Popis jezicnih postavki koje preglednik prijavljuje kao tvoje preferencije.", how: "Cita se iz navigator.languages.", why: "Cesto odgovara OS-u i tipkovnici te moze otkriti regiju i korisnicke navike." },
        timezone: { title: "Vremenska zona", what: "Nazvana regija koju koristi sistemski sat na uredaju.", how: "Cita se iz Intl.DateTimeFormat().resolvedOptions().timeZone.", why: "Vrlo dobro pogada regiju i bitna je za vremenske oznake, logove i privatnost." },
        local_time: { title: "Lokalno vrijeme", what: "Trenutni zapis datuma i vremena generiran s uredaja.", how: "Generira se iz new Date().toString().", why: "Moze otkriti pomak sata i lokalni format; korisno za dijagnostiku sinkronizacije vremena." },
        referrer: { title: "Referrer", what: "Stranica ili web-mjesto s kojeg je preglednik dosao ovamo, ako je podatak poslan.", how: "Cita se iz document.referrer.", why: "Pokazuje put navigacije; korisno za debugiranje, ali i osjetljivo za privatnost." },
        do_not_track: { title: "Do Not Track", what: "Zastavica privatnosti preglednika koja trazi manje pracenja.", how: "Cita se iz navigator.doNotTrack.", why: "Zastarjeli signal privatnosti koji se ne postuje uvijek, ali i dalje otkriva korisnicku preferenciju." },
        cookies: { title: "Cookies ukljuceni", what: "Pokazuje dopusta li preglednik male datoteke podataka za sesije i stanje stranice.", how: "Cita se iz navigator.cookieEnabled.", why: "Bitno za sesije, prijavu i pracenje; osnovni indikator spremanja stanja." },
        online: { title: "Online", what: "Osnovna procjena preglednika postoji li mrezna povezanost.", how: "Cita se iz navigator.onLine.", why: "Samo je nagovjestaj, ali je koristan za UX i dijagnostiku offline problema." },
        screen: { title: "Zaslon", what: "Puna velicina povezanog zaslona u CSS pikselima.", how: "Cita se iz screen.width / screen.height.", why: "Daje tragove o panelu i skaliranju; cesto se koristi u fingerprintingu i odlukama o rasporedu." },
        viewport: { title: "Viewport", what: "Trenutno upotrebljivo podrucje stranice unutar prozora preglednika.", how: "Cita se iz window.innerWidth / window.innerHeight.", why: "To je prostor koji stranica stvarno ima; mijenja se zbog sucelja, zooma i podijeljenog zaslona." },
        dpr: { title: "Omjer piksela uredaja", what: "Omjer izmedu CSS piksela i fizickih piksela zaslona.", how: "Cita se iz window.devicePixelRatio.", why: "Pokazuje HiDPI i skaliranje; utjece na ostrinu prikaza i performanse." },
        touch_points: { title: "Tocke dodira", what: "Koliko istodobnih dodira uredaj moze prijaviti pregledniku.", how: "Cita se iz navigator.maxTouchPoints.", why: "Otkriva prisutnost touch hardvera i pomaze prepoznati mobitel, tablet ili 2-u-1 uredaj." },
        cpu_cores: { title: "CPU jezgre (logicke)", what: "Broj logickih dretvi koje preglednik izlae.", how: "Cita se iz navigator.hardwareConcurrency.", why: "Grubi pokazatelj procesorske klase; vazno za performanse i paralelne zadatke." },
        device_memory: { title: "Memorija uredaja (otprilike)", what: "Gruba klasa RAM-a koju preglednici koriste za procjene performansi.", how: "Cita se iz navigator.deviceMemory (ako je podrzano).", why: "Vrlo grub pokazatelj memorije; koristi se za heuristike i fingerprinting." },
        network_hints: { title: "Mrezni signali", what: "Priblizni signali kvalitete veze poput brzine, latencije i stednje podataka.", how: "Cita se iz navigator.connection (ako je podrzano).", why: "Daje tragove o kvaliteti veze te o tome je li uredaj na mobilnoj ili zicnoj mrezi i koristi li stednju podataka." },
        storage_estimate: { title: "Procjena pohrane", what: "Procjena zauzeca i preostalog kvotnog prostora kojim preglednik upravlja za ovu stranicu.", how: "Cita se iz navigator.storage.estimate() (ako je podrzano).", why: "Pokazuje koliko diska preglednik moze koristiti; bitno za cache, offline rad i vece aplikacije." },
        persistent_storage: { title: "Trajna pohrana", what: "Pokazuje jesu li podaci stranice zasticeni od automatskog brisanja kada ponestane prostora.", how: "Cita se iz navigator.storage.persisted() (ako je podrzano).", why: "Ako je false, preglednik moze izbaciti spremljene podatke kad je prostor pod pritiskom." },
        battery: { title: "Baterija", what: "Trenutne informacije o napajanju i punjenju iz baterijskog podsustava uredaja.", how: "Cita se iz navigator.getBattery() (ako je podrzano).", why: "Daje signal o energetskom stanju, osobito na prijenosnim uredajima, i moze utjecati na performanse." },
        media_device_counts: { title: "Medijski uredaji (broj)", what: "Koliko audio i video ulaznih/izlaznih uredaja preglednik moze pobrojati.", how: "Broji se preko navigator.mediaDevices.enumerateDevices() (siguran kontekst).", why: "Otkriva periferiju poput mikrofona, kamera i izlaza; moze biti iznenadujuce prepoznatljivo." },
        gpu_renderer: { title: "GPU renderer/proizvodac", what: "Identitet grafickog adaptera i drivera koji se moze dobiti preko WebGL-a.", how: "Cita se preko WebGL + WEBGL_debug_renderer_info (ako je dostupno).", why: "Podaci o GPU-u su vrlo pogodni za fingerprinting i cesto prate razinu performansi." },
        local_fingerprint: { title: "Lokalni hash otiska", what: "Lokalno izracunat potpis izveden iz vise vidljivih obiljezja preglednika i uredaja.", how: "SHA-256 nad skupom gore prikazanih vrijednosti (izracun lokalno).", why: "Pokazuje koliko jedinstveno mozes izgledati i bez trazenja ikakvih dopustenja." },
        geolocation: { title: "Geolokacija", what: "Procjena tvoje fizicke pozicije dobivena iz lokacijskih usluga.", how: "Trazi se preko navigator.geolocation.getCurrentPosition().", why: "Najcesce koristi GPS, Wi-Fi ili bazne stanice. Vrlo osjetljivo i vrlo stvarno." },
        notifications: { title: "Obavijesti", what: "Dopustenje da stranica prikazuje sistemske obavijesti izvan same stranice.", how: "Trazi se preko Notification.requestPermission().", why: "Trajno dopustenje. Korisno za UX, ali i potencijalni kanal za spam ili zloupotrebu." },
        clipboard_read: { title: "Citanje meduspremnika", what: "Trenutni tekstualni sadrzaj koji se nalazi u sistemskom meduspremniku.", how: "Trazi se preko navigator.clipboard.readText() (uz korisnicku gestu).", why: "Clipboard moze sadrzavati lozinke, kljuceve i privatne poruke. Izuzetno osjetljivo." },
        camera_mic_labels: { title: "Nazivi kamere i mikrofona", what: "Nazivi spojenih uredaja za snimanje nakon sto je pristup odobren.", how: "Trazi getUserMedia, a zatim cita nazive preko enumerateDevices().", why: "Otkriva capture hardver poput slusalica ili web-kamera. Korisno za setup, ali i pogodno za fingerprinting." },
        screen_share: { title: "Metapodaci dijeljenja zaslona", what: "Metapodaci o zaslonu, prozoru ili tabu koji odaberes za dijeljenje.", how: "Trazi se preko navigator.mediaDevices.getDisplayMedia().", why: "Pokazuje sto si odabrao za dijeljenje. Osjetljivo je i bez citanja samih piksela." },
        bluetooth: { title: "Odabir Bluetooth uredaja", what: "Odabir obliznjih bezicnih uredaja kratkog dometa s kojima preglednik moze komunicirati.", how: "Trazi se preko navigator.bluetooth.requestDevice() (birac).", why: "Obliznji hardver otkriva puno konteksta. Mocno za IoT, neugodno za privatnost." },
        webusb: { title: "WebUSB odabir", what: "Odabir izravno spojenih periferija izlozenih pregledniku preko USB-a.", how: "Trazi se preko navigator.usb.requestDevice() (birac).", why: "Izravan USB pristup za razvojne plocice i hardverske alate. Vrlo mocno kad je omoguceno." },
        webserial: { title: "WebSerial odabir", what: "Odabir hardvera koji komunicira preko serijskih portova.", how: "Trazi se preko navigator.serial.requestPort() (birac).", why: "Serijske konzole za embedded uredaje poput Arduino, ESP ili routera. Odlicno za hardverski hacking." },
        webhid: { title: "WebHID odabir", what: "Odabir generickih HID periferija poput kontrolera ili ulaznih uredaja.", how: "Trazi se preko navigator.hid.requestDevice() (birac).", why: "HID ukljucuje tipkovnice, miseve i gamepadove. Moze otkriti spojenu periferiju." },
        file_picker: { title: "Odabir datoteka", what: "Nazivi i velicine datoteka koje izricito odaberes na uredaju.", how: "Trazi se preko showOpenFilePicker() (ti biras).", why: "Cak i metapodaci poput imena i velicine mogu otkriti kontekst. Sadrzaj se ovdje ne cita." },
        directory_picker: { title: "Odabir mape", what: "Naziv mape koju izricito odaberes na uredaju.", how: "Trazi se preko showDirectoryPicker() (ti biras).", why: "Nazivi mapa mogu otkriti projektni ili poslovni kontekst. Ovdje prikazujemo samo naziv." },
        contacts: { title: "Odabir kontakata", what: "Odabrani unosi osoba iz adresara uredaja.", how: "Trazi se preko navigator.contacts.select() (ako je podrzano).", why: "Drustvena mreza odnosa plus telefon i e-mail. Vrlo osjetljivo po samoj prirodi." },
        midi: { title: "MIDI uredaji", what: "Spojena glazbena ulazna i izlazna oprema vidljiva pregledniku.", how: "Trazi se preko navigator.requestMIDIAccess() (ako je podrzano).", why: "Otkriva glazbeni hardver i periferiju. Zabavno, ali i iznenadujuce prepoznatljivo." },
        public_ip_v4: { title: "Javna IP (IPv4)", what: "Tvoja vanjska mrezna adresa na starijem internetskom standardu.", how: "Dohvaca se s https://api.ipify.org?format=json.", why: "To je adresa koju vidi internet, a ne tvoja lokalna LAN IP adresa. Upravo nju vide serveri." },
        public_ip_v6: { title: "Javna IP (IPv6)", what: "Tvoja vanjska mrezna adresa na novijem internetskom standardu.", how: "Dohvaca se s https://api64.ipify.org?format=json.", why: "Ako mreza podrzava IPv6, ova adresa moze biti stabilna i vrlo jedinstvena po uredaju ili mrezi." }
    },
    tr: {
        secure_context: { title: "Guvenli baglam", what: "Sayfanin, kisitli web yeteneklerini acan guvenilir bir tarayici modunda calisip calismadigini gosterir.", how: "window.isSecureContext uzerinden okunur.", why: "USB, Bluetooth, clipboard ve medya gibi donanimla iliskili bircok API yalnizca HTTPS uzerinde calisir." },
        user_agent: { title: "User-Agent", what: "Eski siteler ve sunucularla uyumluluk icin gonderilen geleneksel tarayici kimlik dizesi.", how: "navigator.userAgent uzerinden okunur.", why: "Eski ama sizdiran bir uyumluluk dizisi; genellikle isletim sistemi, tarayici surumu ve cihaz sinifi hakkinda ipucu verir." },
        ua_ch_basic: { title: "UA-CH (temel)", what: "Marka, platform ve mobil ipuclari iceren yapilandirilmis tarayici kimligi ozeti.", how: "Destekleniyorsa navigator.userAgentData uzerinden okunur.", why: "User-Agent'tan daha yapilidir; platformu ve marka surumlerini gosterebilir." },
        ua_ch_entropy: { title: "UA-CH (yuksek entropi)", what: "Mimari, bitlik, model ve tam surum gibi bilgileri aciga cikarabilen daha zengin istemci ipuclari kumesi.", how: "navigator.userAgentData.getHighEntropyValues() ile istenir.", why: "Bazi tarayicilarda mimari, bitlik ve model gibi daha hassas cihaz ipuclari verir." },
        languages: { title: "Diller", what: "Tarayicinin bildirdigi tercih edilen diller listesi.", how: "navigator.languages uzerinden okunur.", why: "Cogu zaman isletim sistemi ve klavye kurulumuyla uyusur; bolgeyi ve kullanici tercihlerini sezdirebilir." },
        timezone: { title: "Saat dilimi", what: "Sistem saatinin kullandigi adlandirilmis bolge.", how: "Intl.DateTimeFormat().resolvedOptions().timeZone uzerinden okunur.", why: "Bolgeyi tahmin etmek icin gucludur ve zaman damgalari, loglar, hata ayiklama ve gizlilik icin onemlidir." },
        local_time: { title: "Yerel saat", what: "Cihaz saatinden uretilen anlik tarih-saat dizesi.", how: "new Date().toString() ile uretilir.", why: "Saat kaymasi ve yerel bicimlendirme hakkinda ipucu verir; zaman senkronizasyonu sorunlarini ayiklamada kullanislidir." },
        referrer: { title: "Referrer", what: "Tarayicinin buraya gelirken geldigi sayfa veya site, eger gonderildiyse.", how: "document.referrer uzerinden okunur.", why: "Gezinme yolunu gosterir; hata ayiklama icin yararlidir ama gizlilik acisindan hassas olabilir." },
        do_not_track: { title: "Do Not Track", what: "Daha az izleme talep eden tarayici gizlilik tercihi bayragi.", how: "navigator.doNotTrack uzerinden okunur.", why: "Her zaman dikkate alinmayan eski bir gizlilik sinyali olsa da kullanici tercihine dair ipucu verir." },
        cookies: { title: "Cookie'ler acik", what: "Tarayicinin oturum ve durum icin kucuk site veri dosyalarina izin verip vermedigini gosterir.", how: "navigator.cookieEnabled uzerinden okunur.", why: "Oturumlar, kimlik dogrulama ve takip icin temel bir depolama kosuludur." },
        online: { title: "Cevrim ici", what: "Tarayicinin ag erisimi olup olmadigina dair temel tahmini.", how: "navigator.onLine uzerinden okunur.", why: "Sadece bir ipucu olsa da UX ve cevrimdisi hata tespiti icin yararlidir." },
        screen: { title: "Ekran", what: "Bagli ekranin CSS piksel cinsinden tam boyutu.", how: "screen.width / screen.height uzerinden okunur.", why: "Panel ve olceklendirme hakkinda ipucu verir; fingerprinting ve yerlesim kararlarinda sik kullanilir." },
        viewport: { title: "Gorunum alani", what: "Tarayici penceresi icinde sayfanin su anda kullanabildigi alan.", how: "window.innerWidth / window.innerHeight uzerinden okunur.", why: "Sayfanin gercekte kullanabildigi alandir; tarayici arayuzu, zoom ve bolunmus ekranla degisir." },
        dpr: { title: "Cihaz piksel orani", what: "CSS pikselleri ile fiziksel ekran pikselleri arasindaki oran.", how: "window.devicePixelRatio uzerinden okunur.", why: "Yuksek DPI ve olceklendirme hakkinda ipucu verir; goruntu keskinligi ve performansi etkiler." },
        touch_points: { title: "Dokunus noktasi", what: "Cihazin ayni anda kac dokunusu destekledigini tarayiciya bildirdigi bilgi.", how: "navigator.maxTouchPoints uzerinden okunur.", why: "Dokunmatik donanim varligini gosterir; telefon, tablet veya 2'si 1 arada cihazlarin ayirt edilmesine yardimci olur." },
        cpu_cores: { title: "CPU cekirdegi (mantiksal)", what: "Tarayicinin aciga cikardigi mantiksal is parcacigi sayisi.", how: "navigator.hardwareConcurrency uzerinden okunur.", why: "Kabaca CPU sinifini gosterir; performans ve paralel yuk kararlarini etkiler." },
        device_memory: { title: "Cihaz bellegi (yaklasik)", what: "Tarayicilarin performans kararlari icin kullandigi kaba bir RAM sinifi.", how: "Destekleniyorsa navigator.deviceMemory uzerinden okunur.", why: "Cok kaba bir bellek gostergesidir; sezgisel kararlar ve fingerprinting icin kullanilir." },
        network_hints: { title: "Ag ipuclari", what: "Hiz sinifi, gecikme ve veri tasarrufu durumu gibi yaklasik baglanti kalitesi sinyalleri.", how: "Destekleniyorsa navigator.connection uzerinden okunur.", why: "Mobil mi kablolu mu oldugunu ve veri tasarrufu durumunu sezdirebilen baglanti kalitesi ipuclari verir." },
        storage_estimate: { title: "Depolama tahmini", what: "Bu site icin tarayicinin yonettigi disk kullanimina ve kalan kotaya dair tahmin.", how: "Destekleniyorsa navigator.storage.estimate() uzerinden okunur.", why: "Tarayicinin ne kadar disk kullanabildigini gosterir; onbellek, offline kullanim ve buyuk uygulamalar icin onemlidir." },
        persistent_storage: { title: "Kalici depolama", what: "Site verilerinin depolama alani daraldiginda otomatik temizlemeye karsi korunup korunmadigi.", how: "Destekleniyorsa navigator.storage.persisted() uzerinden okunur.", why: "False ise tarayici, depolama baskisi altinda verileri silebilir." },
        battery: { title: "Pil", what: "Cihazin pil alt sisteminden gelen guncel guc ve sarj bilgileri.", how: "Destekleniyorsa navigator.getBattery() uzerinden okunur.", why: "Ozellikle mobil ve laptoplarda guc durumuna dair ipucu verir; performans modlarini etkileyebilir." },
        media_device_counts: { title: "Medya cihazlari (sayilar)", what: "Tarayicinin sayabildigi ses ve video giris/cikis cihazlarinin adedi.", how: "Guvenli baglamda navigator.mediaDevices.enumerateDevices() ile sayilir.", why: "Mikrofon, kamera ve cikis cihazlari gibi periferilere dair ipucu verir; sasirtici derecede ayirt edici olabilir." },
        gpu_renderer: { title: "GPU renderer/uretici", what: "WebGL uzerinden aciga cikan grafik bagdastiricisi ve surucu kimligi.", how: "Varsa WebGL + WEBGL_debug_renderer_info ile okunur.", why: "GPU model ipuclari fingerprinting acisindan cok gucludur ve performans seviyesiyle iliskilidir." },
        local_fingerprint: { title: "Yerel fingerprint hash'i", what: "Birden fazla gorunur tarayici ve cihaz ozelliginden turetilen yerel bir imza.", how: "Yukarida gosterilen degerler paketinin SHA-256 ozeti yerel olarak hesaplanir.", why: "Izin istemeden bile ne kadar ayirt edici gorunebilecegini gosterir." },
        geolocation: { title: "Konum", what: "Konum servislerinden elde edilen fiziksel konum tahmini.", how: "navigator.geolocation.getCurrentPosition() ile istenir.", why: "Genellikle GPS, Wi-Fi veya baz istasyonu ucgenlemesi kullanir. Cok hassastir ve dogrudan gercek dunyaya baglanir." },
        notifications: { title: "Bildirimler", what: "Sitenin sayfa disinda sistem duzeyinde bildirim gosterebilmesi icin gereken izin.", how: "Notification.requestPermission() ile istenir.", why: "Kalici bir izindir. UX icin yararlidir ama spam ve kotuye kullanim riski de tasir." },
        clipboard_read: { title: "Pano okuma", what: "Sistem panosunda duran guncel metin icerigi.", how: "Kullanici hareketiyle navigator.clipboard.readText() uzerinden istenir.", why: "Pano; sifreler, anahtarlar ve ozel mesajlar icerebilir. Son derece hassastir." },
        camera_mic_labels: { title: "Kamera ve mikrofon etiketleri", what: "Erisim verildikten sonra bagli yakalama cihazlarinin adlari.", how: "getUserMedia ister, sonra etiketleri enumerateDevices() ile okur.", why: "Kulaklik, webcam gibi yakalama donanimini gosterir. Kurulum icin yararlidir ama fingerprinting'e de aciktir." },
        screen_share: { title: "Ekran paylasimi meta verisi", what: "Paylasmak icin sectigin ekran, pencere veya sekmeye dair meta veriler.", how: "navigator.mediaDevices.getDisplayMedia() ile istenir.", why: "Hangi yuzeyi sectigini gosterir. Pikseller okunmasa bile hassastir." },
        bluetooth: { title: "Bluetooth cihaz secici", what: "Tarayicinin konusabildigi yakin menzilli kablosuz cihazlari secmek icin bir secici.", how: "navigator.bluetooth.requestDevice() ile istenir (secici).", why: "Yakin donanim buyuk bir baglam sizintisidir. IoT icin guclu, gizlilik icin tedirgin edici." },
        webusb: { title: "WebUSB secici", what: "USB uzerinden tarayiciya acilan dogrudan bagli cevre birimleri icin secici.", how: "navigator.usb.requestDevice() ile istenir (secici).", why: "Gelisim kartlari ve donanim araclari icin dogrudan USB erisimi saglar. Acikken cok gucludur." },
        webserial: { title: "WebSerial secici", what: "Seri portlar uzerinden iletisim kuran donanim icin secici.", how: "navigator.serial.requestPort() ile istenir (secici).", why: "Arduino, ESP ve router gibi cihazlarin seri konsollari icin idealdir. Donanim hackleme icin cok kullanislidir." },
        webhid: { title: "WebHID secici", what: "Kontrol cihazlari veya giris birimleri gibi genel insan-arayuz cevreleri icin secici.", how: "navigator.hid.requestDevice() ile istenir (secici).", why: "HID; klavye, fare ve gamepad demektir. Bagli cevre birimlerini aciga cikarabilir." },
        file_picker: { title: "Dosya secici", what: "Cihazindan bilerek sectigin dosyalarin adlari ve boyutlari.", how: "showOpenFilePicker() ile istenir (sen secersin).", why: "Dosya adi ve boyutu gibi meta veriler bile baglam sizdirabilir. Icerik burada okunmaz." },
        directory_picker: { title: "Klasor secici", what: "Cihazindan bilerek sectigin bir klasorun adi.", how: "showDirectoryPicker() ile istenir (sen secersin).", why: "Klasor adlari proje veya sirket baglamini aciga cikarabilir. Burada sadece adi gosterilir." },
        contacts: { title: "Kisi secici", what: "Cihaz adres defterinden secilen kisi kayitlari.", how: "Destekleniyorsa navigator.contacts.select() ile istenir.", why: "Sosyal baglantilar, telefon ve e-posta bilgilerinin aciga cikmasi anlamina gelir. Tasarimi geregi cok hassastir." },
        midi: { title: "MIDI cihazlari", what: "Tarayicinin gorebildigi bagli muzik giris ve cikis ekipmanlari.", how: "Destekleniyorsa navigator.requestMIDIAccess() ile istenir.", why: "Muzik donanimi ve cevre birimlerine dair ipucu verir. Eglencelidir ama sasirtici derecede ayirt edicidir." },
        public_ip_v4: { title: "Genel IP (IPv4)", what: "Eski internet yonlendirme standardindaki disa bakan ag adresin.", how: "https://api.ipify.org?format=json adresinden cekilir.", why: "Bu senin LAN IP'n degil, sunucularin gordugu internet adresindir." },
        public_ip_v6: { title: "Genel IP (IPv6)", what: "Yeni internet yonlendirme standardindaki disa bakan ag adresin.", how: "https://api64.ipify.org?format=json adresinden cekilir.", why: "Agin IPv6 destekliyorsa bu adres cihaz veya ag bazinda daha stabil ve benzersiz olabilir." }
    }
}

function getDataProbeUi(languageId) {
    return DATA_PROBE_UI[languageId] || DATA_PROBE_UI.en
}

function localizeProbeDefinitions(probes, languageId, ui) {
    const translations = DATA_PROBE_TRANSLATIONS[languageId] || {}
    return probes.map(probe => {
        const translated = translations[probe.id] || {}
        const localizedProbe = {
            ...probe,
            title: translated.title || probe.title,
            how: translated.how || probe.how,
            why: translated.why || probe.why,
            what: translated.what || probe.what || PROBE_WHAT[probe.id] || ui.statusText.explanationUnavailable
        }

        if(localizedProbe.extraAction?.label === DATA_PROBE_UI.en.buttons.sendTest) {
            localizedProbe.extraAction = {
                ...localizedProbe.extraAction,
                label: ui.buttons.sendTest
            }
        }

        if(localizedProbe.id === "public_ip_v4") {
            localizedProbe.buttonLabel = ui.buttons.fetchPublicIPv4
        }
        else if(localizedProbe.id === "public_ip_v6") {
            localizedProbe.buttonLabel = ui.buttons.fetchPublicIPv6
        }

        return localizedProbe
    })
}

function ArticleDataProbe({ dataWrapper }) {
    const language = useLanguage()
    const selectedLanguageId = language.getSelectedLanguage()?.id || "en"
    const ui = useMemo(() => getDataProbeUi(selectedLanguageId), [selectedLanguageId])
    const [unlocked, setUnlocked] = useState(false)
    const [probeStates, setProbeStates] = useState({})
    const [expanded, setExpanded] = useState({})
    const [listExpanded, setListExpanded] = useState({})
    const [passiveInitReady, setPassiveInitReady] = useState(false)
    const [searchConfirmTarget, setSearchConfirmTarget] = useState(null)
    const didInitRef = useRef(false)
    const searchConfirmTriggerRef = useRef(null)

    const passiveProbeDefs = useMemo(() => ([
        {
            id: "secure_context",
            icon: "fa-solid fa-lock",
            title: "Secure context",
            how: "Read from window.isSecureContext.",
            why: "A lot of hardware-adjacent APIs (USB/Bluetooth/clipboard/media) only work on HTTPS.",
            run: async () => String(Boolean(window.isSecureContext))
        },
        {
            id: "user_agent",
            icon: "fa-solid fa-id-card",
            title: "User-Agent",
            how: "Read from navigator.userAgent.",
            why: "Leaky compatibility string; often hints OS + browser builds and device class.",
            run: async () => navigator?.userAgent || null
        },
        {
            id: "ua_ch_basic",
            icon: "fa-solid fa-fingerprint",
            title: "UA-CH (basic)",
            how: "Read from navigator.userAgentData (if supported).",
            why: "More structured than User-Agent; can reveal platform and brand versions.",
            supported: () => Boolean(navigator?.userAgentData),
            run: async () => {
                const uad = navigator?.userAgentData
                if (!uad) return null
                const brands = Array.isArray(uad.brands) ? uad.brands : []
                const brandsText = brands.map(b => `${b.brand} ${b.version}`).join(", ")
                const out = []
                if (brandsText) out.push(`brands: ${brandsText}`)
                if (uad.platform) out.push(`platform: ${uad.platform}`)
                if (typeof uad.mobile === "boolean") out.push(`mobile: ${uad.mobile}`)
                return out.join("\n") || null
            }
        },
        {
            id: "ua_ch_entropy",
            icon: "fa-solid fa-microchip",
            title: "UA-CH (high entropy)",
            how: "Requested via navigator.userAgentData.getHighEntropyValues().",
            why: "More precise device hints like architecture/bitness/model on some browsers.",
            supported: () => Boolean(navigator?.userAgentData?.getHighEntropyValues),
            run: async () => {
                const uad = navigator?.userAgentData
                if (!uad?.getHighEntropyValues) return null
                const values = await uad.getHighEntropyValues([
                    "platformVersion",
                    "architecture",
                    "model",
                    "uaFullVersion",
                    "bitness",
                    "wow64",
                ])
                return safePretty(values)
            }
        },
        {
            id: "languages",
            icon: "fa-solid fa-language",
            title: "Languages",
            how: "Read from navigator.languages.",
            why: "Often matches OS + keyboard setup; can hint region and user preferences.",
            run: async () => {
                const langs = navigator?.languages
                return (Array.isArray(langs) && langs.length) ? langs.join(", ") : null
            }
        },
        {
            id: "timezone",
            icon: "fa-regular fa-clock",
            title: "Time zone",
            how: "Read from Intl.DateTimeFormat().resolvedOptions().timeZone.",
            why: "Great at inferring region and affects timestamps/logs (debugging + privacy).",
            run: async () => Intl.DateTimeFormat().resolvedOptions().timeZone || null
        },
        {
            id: "local_time",
            icon: "fa-solid fa-calendar-day",
            title: "Local time",
            how: "Generated from new Date().toString().",
            why: "Can reveal clock drift and locale formatting; useful for debugging time sync issues.",
            run: async () => new Date().toString()
        },
        {
            id: "referrer",
            icon: "fa-solid fa-link",
            title: "Referrer",
            how: "Read from document.referrer.",
            why: "Shows navigation path; useful for debugging but can be privacy sensitive.",
            run: async () => document?.referrer || null
        },
        {
            id: "do_not_track",
            icon: "fa-solid fa-user-shield",
            title: "Do Not Track",
            how: "Read from navigator.doNotTrack.",
            why: "A legacy privacy signal (not consistently honored) but still a preference hint.",
            run: async () => navigator?.doNotTrack || null
        },
        {
            id: "cookies",
            icon: "fa-solid fa-cookie-bite",
            title: "Cookies enabled",
            how: "Read from navigator.cookieEnabled.",
            why: "Storage capability gate; affects sessions, auth, and tracking.",
            run: async () => String(Boolean(navigator?.cookieEnabled))
        },
        {
            id: "online",
            icon: "fa-solid fa-wifi",
            title: "Online",
            how: "Read from navigator.onLine.",
            why: "Only a hint; still useful for UX and diagnosing offline failures.",
            run: async () => String(Boolean(navigator?.onLine))
        },
        {
            id: "screen",
            icon: "fa-solid fa-display",
            title: "Screen",
            how: "Read from screen.width / screen.height.",
            why: "Panel + scaling hints; common in device fingerprinting and layout decisions.",
            run: async () => {
                const w = window?.screen?.width
                const h = window?.screen?.height
                return (w && h) ? `${w} x ${h}` : null
            }
        },
        {
            id: "viewport",
            icon: "fa-solid fa-up-right-and-down-left-from-center",
            title: "Viewport",
            how: "Read from window.innerWidth / window.innerHeight.",
            why: "What the page can actually use; changes with browser UI, zoom, split-screen.",
            run: async () => {
                const w = window?.innerWidth
                const h = window?.innerHeight
                return (w && h) ? `${w} x ${h}` : null
            }
        },
        {
            id: "dpr",
            icon: "fa-solid fa-maximize",
            title: "Device pixel ratio",
            how: "Read from window.devicePixelRatio.",
            why: "High-DPI + scaling hint; affects rendering sharpness and performance.",
            run: async () => String(window?.devicePixelRatio || 1)
        },
        {
            id: "touch_points",
            icon: "fa-regular fa-hand-pointer",
            title: "Touch points",
            how: "Read from navigator.maxTouchPoints.",
            why: "Touch hardware presence; helps infer phone/tablet/2-in-1 devices.",
            run: async () => String(navigator?.maxTouchPoints ?? 0)
        },
        {
            id: "cpu_cores",
            icon: "fa-solid fa-cubes",
            title: "CPU cores (logical)",
            how: "Read from navigator.hardwareConcurrency.",
            why: "Rough CPU tier hint; affects performance/parallel workload decisions.",
            run: async () => {
                const c = navigator?.hardwareConcurrency
                return Number.isFinite(Number(c)) ? String(c) : null
            }
        },
        {
            id: "device_memory",
            icon: "fa-solid fa-memory",
            title: "Device memory (approx.)",
            how: "Read from navigator.deviceMemory (if supported).",
            why: "Very rough RAM class; used for performance heuristics and fingerprinting.",
            run: async () => {
                const m = navigator?.deviceMemory
                return Number.isFinite(Number(m)) ? `${m} GB` : null
            }
        },
        {
            id: "network_hints",
            icon: "fa-solid fa-signal",
            title: "Network hints",
            how: "Read from navigator.connection (if supported).",
            why: "Radio/link quality hints; often indicates mobile vs wired and data-saving mode.",
            supported: () => Boolean(navigator?.connection || navigator?.mozConnection || navigator?.webkitConnection),
            run: async () => {
                const c = navigator?.connection || navigator?.mozConnection || navigator?.webkitConnection
                if (!c) return null
                const out = []
                if (c.effectiveType) out.push(`effectiveType: ${c.effectiveType}`)
                if (Number.isFinite(Number(c.downlink))) out.push(`downlink: ${c.downlink} Mbps`)
                if (Number.isFinite(Number(c.rtt))) out.push(`rtt: ${c.rtt} ms`)
                if (typeof c.saveData === "boolean") out.push(`saveData: ${c.saveData}`)
                return out.join("\n") || null
            }
        },
        {
            id: "storage_estimate",
            icon: "fa-solid fa-database",
            title: "Storage estimate",
            how: "Read from navigator.storage.estimate() (if supported).",
            why: "How much disk the browser can use; impacts caching, offline, and large apps.",
            supported: () => Boolean(navigator?.storage?.estimate),
            run: async () => {
                if (!navigator?.storage?.estimate) return null
                const est = await navigator.storage.estimate()
                const usage = Number.isFinite(Number(est?.usage)) ? formatBytes(est.usage) : null
                const quota = Number.isFinite(Number(est?.quota)) ? formatBytes(est.quota) : null
                const out = []
                if (usage) out.push(`usage: ${usage}`)
                if (quota) out.push(`quota: ${quota}`)
                return out.join("\n") || null
            }
        },
        {
            id: "persistent_storage",
            icon: "fa-solid fa-warehouse",
            title: "Persistent storage",
            how: "Read from navigator.storage.persisted() (if supported).",
            why: "If false, the browser may evict storage under pressure.",
            supported: () => Boolean(navigator?.storage?.persisted),
            run: async () => {
                if (!navigator?.storage?.persisted) return null
                return String(Boolean(await navigator.storage.persisted()))
            }
        },
        {
            id: "battery",
            icon: "fa-solid fa-battery-half",
            title: "Battery",
            how: "Read from navigator.getBattery() (if supported).",
            why: "Power state hint (mostly mobile/laptop); can influence performance modes.",
            supported: () => Boolean(navigator?.getBattery),
            run: async () => {
                if (!navigator?.getBattery) return null
                const b = await navigator.getBattery()
                if (!b) return null
                const out = [
                    `charging: ${Boolean(b.charging)}`,
                    `level: ${Math.round((b.level ?? 0) * 100)}%`,
                ]
                if (Number.isFinite(Number(b.chargingTime))) out.push(`chargingTime: ${formatSeconds(b.chargingTime)}`)
                if (Number.isFinite(Number(b.dischargingTime))) out.push(`dischargingTime: ${formatSeconds(b.dischargingTime)}`)
                return out.join("\n") || null
            }
        },
        {
            id: "media_device_counts",
            icon: "fa-solid fa-video",
            title: "Media devices (counts)",
            how: "Counted via navigator.mediaDevices.enumerateDevices() (secure context).",
            why: "Peripheral hints (mics/cams/output devices); can be surprisingly identifying.",
            supported: () => Boolean(window?.isSecureContext && navigator?.mediaDevices?.enumerateDevices),
            run: async () => {
                if (!window?.isSecureContext) return null
                if (!navigator?.mediaDevices?.enumerateDevices) return null
                const devices = await navigator.mediaDevices.enumerateDevices()
                const counts = devices.reduce((acc, d) => {
                    acc[d.kind] = (acc[d.kind] || 0) + 1
                    return acc
                }, {})
                const out = []
                if (counts.audioinput) out.push(`audio inputs: ${counts.audioinput}`)
                if (counts.videoinput) out.push(`video inputs: ${counts.videoinput}`)
                if (counts.audiooutput) out.push(`audio outputs: ${counts.audiooutput}`)
                return out.join("\n") || null
            }
        },
        {
            id: "gpu_renderer",
            icon: "fa-solid fa-meteor",
            title: "GPU renderer/vendor",
            how: "Read via WebGL + WEBGL_debug_renderer_info (if exposed).",
            why: "GPU model hints are very fingerprintable and correlate with performance tier.",
            supported: () => {
                try {
                    const canvas = document.createElement("canvas")
                    return Boolean(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
                }
                catch (_) {
                    return false
                }
            },
            run: async () => getWebglRendererInfo()
        },
        {
            id: "local_fingerprint",
            icon: "fa-solid fa-skull",
            title: "Local fingerprint hash",
            how: "SHA-256 of a bundle of values shown above (computed locally).",
            why: "Demonstrates how unique you can look even without asking for permissions.",
            run: async () => {
                const parts = [
                    `ua=${navigator?.userAgent || ""}`,
                    `langs=${Array.isArray(navigator?.languages) ? navigator.languages.join(",") : ""}`,
                    `tz=${Intl.DateTimeFormat().resolvedOptions().timeZone || ""}`,
                    `screen=${window?.screen?.width || ""}x${window?.screen?.height || ""}`,
                    `vp=${window?.innerWidth || ""}x${window?.innerHeight || ""}`,
                    `dpr=${window?.devicePixelRatio || 1}`,
                    `cores=${navigator?.hardwareConcurrency || ""}`,
                    `mem=${navigator?.deviceMemory || ""}`,
                    `touch=${navigator?.maxTouchPoints ?? 0}`,
                    `secure=${Boolean(window?.isSecureContext)}`,
                ].join("|")

                const hex = await sha256Hex(parts)
                return hex ? `${hex.slice(0, 16)}...` : null
            }
        },
    ]), [])

    const requestProbeDefs = useMemo(() => ([
        {
            id: "geolocation",
            icon: "fa-solid fa-location-dot",
            title: "Geolocation",
            how: "Requested via navigator.geolocation.getCurrentPosition().",
            why: "Usually GPS/Wi-Fi/cell triangulation. Very sensitive and very real-world.",
            supported: () => "geolocation" in navigator,
            request: async () => {
                const pos = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject, {
                        enableHighAccuracy: true,
                        timeout: 15000,
                        maximumAge: 0,
                    })
                })
                const c = pos?.coords
                if (!c) return null
                return [
                    `lat: ${c.latitude}`,
                    `lng: ${c.longitude}`,
                    Number.isFinite(Number(c.accuracy)) ? `accuracy: ${Math.round(c.accuracy)} m` : null,
                ].filter(Boolean).join("\n")
            }
        },
        {
            id: "notifications",
            icon: "fa-regular fa-bell",
            title: "Notifications",
            how: "Requested via Notification.requestPermission().",
            why: "Persistent permission. Great UX feature, also a spam/abuse vector.",
            supported: () => "Notification" in window,
            request: async () => {
                const perm = await Notification.requestPermission()
                return `permission: ${perm}`
            },
            extraAction: {
                label: "Send test",
                icon: "fa-solid fa-paper-plane",
                run: async () => {
                    if (!("Notification" in window)) return null
                    if (Notification.permission !== "granted") return null
                    try {
                        new Notification("Permission granted", { body: "Triggered by your click." })
                        return "sent"
                    }
                    catch (_) {
                        return null
                    }
                }
            }
        },
        {
            id: "clipboard_read",
            icon: "fa-solid fa-clipboard",
            title: "Clipboard read",
            how: "Requested via navigator.clipboard.readText() (user gesture).",
            why: "Clipboard can contain passwords, keys, and private messages. Extremely sensitive.",
            supported: () => Boolean(navigator?.clipboard?.readText),
            request: async () => {
                const text = await navigator.clipboard.readText()
                const trimmed = String(text ?? "")
                if (!trimmed) return null
                const preview = trimmed.length > 400 ? `${trimmed.slice(0, 400)}...` : trimmed
                return `length: ${trimmed.length}\n\n${preview}`
            }
        },
        {
            id: "camera_mic_labels",
            icon: "fa-solid fa-camera",
            title: "Camera + microphone labels",
            how: "Requests getUserMedia, then reads enumerateDevices() labels.",
            why: "Reveals capture hardware (headsets/webcams). Useful for setup, fingerprintable too.",
            supported: () => Boolean(navigator?.mediaDevices?.getUserMedia && navigator?.mediaDevices?.enumerateDevices),
            request: async () => {
                if (!window?.isSecureContext) return null
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
                try {
                    const devices = await navigator.mediaDevices.enumerateDevices()
                    const aud = devices.filter(d => d.kind === "audioinput").map(d => d.label).filter(Boolean)
                    const vid = devices.filter(d => d.kind === "videoinput").map(d => d.label).filter(Boolean)
                    const out = []
                    out.push(`audio inputs: ${aud.length}`)
                    if (aud.length) out.push(...aud.slice(0, 6).map(l => `- ${l}`))
                    out.push(`video inputs: ${vid.length}`)
                    if (vid.length) out.push(...vid.slice(0, 6).map(l => `- ${l}`))
                    return out.join("\n") || null
                }
                finally {
                    stream.getTracks().forEach(t => t.stop())
                }
            }
        },
        {
            id: "screen_share",
            icon: "fa-solid fa-desktop",
            title: "Screen share metadata",
            how: "Requested via navigator.mediaDevices.getDisplayMedia().",
            why: "Shows what surface you chose. Still sensitive even without reading pixels.",
            supported: () => Boolean(navigator?.mediaDevices?.getDisplayMedia),
            request: async () => {
                if (!window?.isSecureContext) return null
                const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false })
                try {
                    const track = stream.getVideoTracks()[0]
                    if (!track) return null
                    const settings = typeof track.getSettings === "function" ? track.getSettings() : {}
                    const out = []
                    if (track.label) out.push(`label: ${track.label}`)
                    if (settings.displaySurface) out.push(`displaySurface: ${settings.displaySurface}`)
                    if (settings.width && settings.height) out.push(`resolution: ${settings.width} x ${settings.height}`)
                    return out.join("\n") || null
                }
                finally {
                    stream.getTracks().forEach(t => t.stop())
                }
            }
        },
        {
            id: "bluetooth",
            icon: "fa-brands fa-bluetooth",
            title: "Bluetooth device chooser",
            how: "Requested via navigator.bluetooth.requestDevice() (chooser).",
            why: "Nearby hardware is a huge context leak. Powerful for IoT, scary for privacy.",
            supported: () => Boolean(navigator?.bluetooth?.requestDevice),
            request: async () => {
                if (!window?.isSecureContext) return null
                const device = await navigator.bluetooth.requestDevice({ acceptAllDevices: true })
                return device ? `name: ${device.name || "(no name)"}` : null
            }
        },
        {
            id: "webusb",
            icon: "fa-brands fa-usb",
            title: "WebUSB chooser",
            how: "Requested via navigator.usb.requestDevice() (chooser).",
            why: "Direct USB access for dev boards/hardware tools. Very powerful when enabled.",
            supported: () => Boolean(navigator?.usb?.requestDevice),
            request: async () => {
                if (!window?.isSecureContext) return null
                const device = await navigator.usb.requestDevice({ filters: [] })
                if (!device) return null
                const out = []
                if (device.manufacturerName) out.push(`manufacturer: ${device.manufacturerName}`)
                if (device.productName) out.push(`product: ${device.productName}`)
                if (Number.isFinite(Number(device.vendorId))) out.push(`vendorId: ${device.vendorId}`)
                if (Number.isFinite(Number(device.productId))) out.push(`productId: ${device.productId}`)
                return out.join("\n") || null
            }
        },
        {
            id: "webserial",
            icon: "fa-solid fa-terminal",
            title: "WebSerial chooser",
            how: "Requested via navigator.serial.requestPort() (chooser).",
            why: "Serial consoles for embedded devices (Arduino/ESP/routers). Great for hardware hacking.",
            supported: () => Boolean(navigator?.serial?.requestPort),
            request: async () => {
                if (!window?.isSecureContext) return null
                const port = await navigator.serial.requestPort()
                const info = typeof port?.getInfo === "function" ? port.getInfo() : null
                return info ? safePretty(info) : "selected"
            }
        },
        {
            id: "webhid",
            icon: "fa-solid fa-gamepad",
            title: "WebHID chooser",
            how: "Requested via navigator.hid.requestDevice() (chooser).",
            why: "HID = keyboards, mice, gamepads. Can reveal connected peripherals.",
            supported: () => Boolean(navigator?.hid?.requestDevice),
            request: async () => {
                if (!window?.isSecureContext) return null
                const devices = await navigator.hid.requestDevice({ filters: [] })
                const d = devices?.[0]
                if (!d) return null
                const out = []
                if (d.productName) out.push(`product: ${d.productName}`)
                if (Number.isFinite(Number(d.vendorId))) out.push(`vendorId: ${d.vendorId}`)
                if (Number.isFinite(Number(d.productId))) out.push(`productId: ${d.productId}`)
                return out.join("\n") || null
            }
        },
        {
            id: "file_picker",
            icon: "fa-regular fa-file",
            title: "File picker",
            how: "Requested via showOpenFilePicker() (you choose).",
            why: "Even metadata like filename/size can leak context. Contents are not read here.",
            supported: () => typeof window?.showOpenFilePicker === "function",
            request: async () => {
                const handles = await window.showOpenFilePicker({ multiple: true })
                if (!handles?.length) return null
                const lines = []
                for (const h of handles.slice(0, 5)) {
                    try {
                        const f = await h.getFile()
                        lines.push(`${f.name} (${formatBytes(f.size)})`)
                    }
                    catch (_) {
                        lines.push(`${h.name || "file"} (metadata hidden)`)
                    }
                }
                return lines.join("\n") || null
            }
        },
        {
            id: "directory_picker",
            icon: "fa-regular fa-folder-open",
            title: "Directory picker",
            how: "Requested via showDirectoryPicker() (you choose).",
            why: "Directory names can reveal project/company context. We only show the name.",
            supported: () => typeof window?.showDirectoryPicker === "function",
            request: async () => {
                const handle = await window.showDirectoryPicker()
                return handle?.name || null
            }
        },
        {
            id: "contacts",
            icon: "fa-solid fa-address-book",
            title: "Contacts picker",
            how: "Requested via navigator.contacts.select() (if supported).",
            why: "Social graph + phone/email exposure. Very sensitive by design.",
            supported: () => Boolean(navigator?.contacts?.select),
            request: async () => {
                const props = ["name", "email", "tel", "address"]
                const result = await navigator.contacts.select(props, { multiple: true })
                if (!Array.isArray(result) || result.length === 0) return null
                const first = result[0] || {}
                return safePretty({
                    count: result.length,
                    first: {
                        name: first.name?.[0],
                        email: first.email?.[0],
                        tel: first.tel?.[0],
                    }
                })
            }
        },
        {
            id: "midi",
            icon: "fa-solid fa-music",
            title: "MIDI devices",
            how: "Requested via navigator.requestMIDIAccess() (if supported).",
            why: "Music hardware/peripheral hint. Fun and surprisingly identifying.",
            supported: () => typeof navigator?.requestMIDIAccess === "function",
            request: async () => {
                const access = await navigator.requestMIDIAccess({ sysex: false })
                const inputs = Array.from(access.inputs?.values?.() || [])
                const outputs = Array.from(access.outputs?.values?.() || [])
                const out = []
                out.push(`inputs: ${inputs.length}`)
                if (inputs.length) out.push(...inputs.slice(0, 6).map(i => `- ${i.name || "input"}`))
                out.push(`outputs: ${outputs.length}`)
                if (outputs.length) out.push(...outputs.slice(0, 6).map(o => `- ${o.name || "output"}`))
                return out.join("\n") || null
            }
        },
    ]), [])

    const publicIpProbeDefs = useMemo(() => ([
        {
            id: "public_ip_v4",
            icon: "fa-solid fa-globe",
            title: "Public IP (IPv4)",
            how: "Fetched from https://api.ipify.org?format=json.",
            why: "Your internet-facing address (not your LAN IP). This is the one servers see.",
            buttonLabel: "Fetch public IPv4",
            url: "https://api.ipify.org?format=json"
        },
        {
            id: "public_ip_v6",
            icon: "fa-solid fa-earth-europe",
            title: "Public IP (IPv6)",
            how: "Fetched from https://api64.ipify.org?format=json.",
            why: "If your network supports IPv6, this can be stable/unique per device or per network.",
            buttonLabel: "Fetch public IPv6",
            url: "https://api64.ipify.org?format=json"
        },
    ]), [])

    const passiveProbes = useMemo(() => {
        return localizeProbeDefinitions(passiveProbeDefs, selectedLanguageId, ui)
    }, [passiveProbeDefs, selectedLanguageId, ui])

    const requestProbes = useMemo(() => {
        return localizeProbeDefinitions(requestProbeDefs, selectedLanguageId, ui)
    }, [requestProbeDefs, selectedLanguageId, ui])

    const publicIpProbes = useMemo(() => {
        return localizeProbeDefinitions(publicIpProbeDefs, selectedLanguageId, ui)
    }, [publicIpProbeDefs, selectedLanguageId, ui])

    useEffect(() => {
        if(passiveInitReady)
            return

        let timeoutId = null
        let idleId = null
        const trigger = () => setPassiveInitReady(true)

        if(typeof window !== "undefined" && "requestIdleCallback" in window) {
            idleId = window.requestIdleCallback(trigger, { timeout: 700 })
        }
        else {
            timeoutId = window.setTimeout(trigger, 220)
        }

        return () => {
            if(timeoutId !== null) window.clearTimeout(timeoutId)
            if(idleId !== null && typeof window !== "undefined" && "cancelIdleCallback" in window) {
                window.cancelIdleCallback(idleId)
            }
        }
    }, [passiveInitReady])

    useEffect(() => {
        if (!passiveInitReady || didInitRef.current) return
        didInitRef.current = true
        const init = {}
        for (const p of passiveProbes) init[p.id] = { status: "pending", value: null }
        setProbeStates(prev => ({ ...init, ...prev }))
        Promise.allSettled(passiveProbes.map(p => {
            if (typeof p.supported === "function" && !safeBool(p.supported())) {
                setProbeStates(prev => ({ ...prev, [p.id]: { status: "unsupported", value: null } }))
                return Promise.resolve()
            }
            return runProbe(p.id, p.run, true)
        }))
    }, [passiveInitReady, passiveProbes])

    const runProbe = async (id, fn, markPending = true) => {
        if (markPending) setProbeStates(prev => ({ ...prev, [id]: { status: "pending", value: null } }))
        try {
            const value = await fn()
            if (!value || String(value).trim().length === 0) {
                setProbeStates(prev => ({ ...prev, [id]: { status: "hidden", value: null } }))
                return
            }
            setProbeStates(prev => ({ ...prev, [id]: { status: "ok", value: String(value) } }))
        }
        catch (_) {
            setProbeStates(prev => ({ ...prev, [id]: { status: "error", value: null } }))
        }
    }

    const runRequestProbe = async (probe) => {
        if (!safeBool(probe?.supported?.())) {
            setProbeStates(prev => ({ ...prev, [probe.id]: { status: "unsupported", value: null } }))
            return
        }

        await runProbe(probe.id, probe.request, true)
    }

    const runExtraAction = async (probe) => {
        if (!probe?.extraAction?.run) return
        await runProbe(`${probe.id}__extra`, probe.extraAction.run, true)
    }

    const runPublicIp = async (probe) => {
        if (typeof fetch !== "function") {
            setProbeStates(prev => ({ ...prev, [probe.id]: { status: "unsupported", value: null } }))
            return
        }
        await runProbe(probe.id, async () => {
            const res = await fetch(probe.url, { method: "GET" })
            if (!res.ok) return null
            const json = await res.json().catch(() => null)
            return json?.ip || null
        }, true)
    }

    const toggleExpanded = (id) => {
        setExpanded(prev => ({ ...prev, [id]: !prev?.[id] }))
    }

    const toggleListExpanded = (id) => {
        setListExpanded(prev => ({ ...prev, [id]: !prev?.[id] }))
    }

    const openSearchConfirm = ({ title, variableId, querySource = "", scopeLabel, triggerElement = null }) => {
        if (!title || !(querySource || variableId)) return

        const queryTail = querySource || variableId
        const query = `${title} ${queryTail}`
        const searchUrl = buildGoogleSearchUrl(query)
        const description = scopeLabel === "section" ?
            ui.searchSectionDescription :
            ui.searchProbeDescription

        if (triggerElement instanceof HTMLElement) {
            searchConfirmTriggerRef.current = triggerElement
        }

        setSearchConfirmTarget({
            key: `${title}:${queryTail}`,
            title: ui.searchTitle,
            description,
            query,
            searchUrl,
            themeVars: readProbePopupThemeVars(triggerElement)
        })
    }

    const closeSearchConfirm = () => {
        setSearchConfirmTarget(null)

        const triggerElement = searchConfirmTriggerRef.current
        searchConfirmTriggerRef.current = null
        if (triggerElement instanceof HTMLElement && document.contains(triggerElement)) {
            window.requestAnimationFrame(() => {
                triggerElement.focus()
            })
        }
    }

    const confirmSearchAndOpen = () => {
        if (searchConfirmTarget?.searchUrl && typeof window?.open === "function") {
            window.open(searchConfirmTarget.searchUrl, "_blank", "noopener,noreferrer")
        }
        closeSearchConfirm()
    }

    const autoCount = passiveProbes.length
    const requestCount = requestProbes.length
    const publicCount = publicIpProbes.length
    const requestListExpanded = Boolean(listExpanded?.permission_gated)
    const passiveListExpanded = Boolean(listExpanded?.passive_reads)
    const visibleRequestProbes = requestListExpanded ? requestProbes : requestProbes.slice(0, LIST_PREVIEW_COUNT)
    const visiblePassiveProbes = passiveListExpanded ? passiveProbes : passiveProbes.slice(0, LIST_PREVIEW_COUNT)

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
                        <span className={`article-data-probe-summary-label`}>{ui.autoVisibleSignals}</span>
                    </div>

                <div className={`article-data-probe-summary-chip`}>
                    <i className={`fa-solid fa-hand-pointer`}/>
                    <span className={`article-data-probe-summary-value`}>{requestCount}</span>
                    <span className={`article-data-probe-summary-label`}>{ui.clickToRequestProbes}</span>
                </div>

                <div className={`article-data-probe-summary-chip`}>
                    <i className={`fa-solid fa-globe`}/>
                    <span className={`article-data-probe-summary-value`}>{publicCount}</span>
                    <span className={`article-data-probe-summary-label`}>{ui.externalIpChecks}</span>
                </div>
            </div>

            <ProbeSection
                icon={`fa-solid fa-globe`}
                eyebrow={ui.sectionExternalEyebrow}
                title={ui.sectionExternalTitle}
                description={ui.sectionExternalDescription}
                count={publicCount}
                accent={`accent-external`}
                searchId={`public_ip`}
                onIconClick={openSearchConfirm}
                ui={ui}>
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
                                   onIconClick={openSearchConfirm}
                                   ui={ui}/>
                    ))}
                </div>
            </ProbeSection>

            <ProbeSection
                icon={`fa-solid fa-hand`}
                eyebrow={ui.sectionPermissionEyebrow}
                title={ui.sectionPermissionTitle}
                description={ui.sectionPermissionDescription}
                count={requestCount}
                accent={`accent-interactive`}
                searchId={`permission_gated`}
                onIconClick={openSearchConfirm}
                actions={!unlocked ? (
                    <StandardButton variant={`contrast`}
                                    className={`article-data-probe-unlock-btn`}
                                    label={ui.unlockInteractions}
                                    faIcon={`fa-solid fa-unlock`}
                                    onClick={() => setUnlocked(true)}/>
                ) : null}
                ui={ui}>
                {unlocked && (
                    <>
                        <div className={`article-data-probe-grid article-data-probe-grid-fixed-two`}>
                            {visibleRequestProbes.map(p => (
                                <ProbeItem key={p.id}
                                           probe={p}
                                           state={probeStates[p.id]}
                                           showRequest={true}
                                           requestLabel={ui.request}
                                           onRequest={() => runRequestProbe(p)}
                                           extraAction={p.extraAction ? () => runExtraAction(p) : null}
                                           extraLabel={p.extraAction?.label}
                                           extraIcon={p.extraAction?.icon}
                                           extraState={probeStates[`${p.id}__extra`]}
                                           expanded={Boolean(expanded?.[p.id])}
                                           onToggleExpand={() => toggleExpanded(p.id)}
                                           onIconClick={openSearchConfirm}
                                           ui={ui}/>
                            ))}
                        </div>

                        <ProbeListToggle expanded={requestListExpanded}
                                         visibleCount={visibleRequestProbes.length}
                                         totalCount={requestCount}
                                         onToggle={() => toggleListExpanded("permission_gated")}
                                         ui={ui}/>
                    </>
                )}
            </ProbeSection>

            <ProbeSection
                icon={`fa-solid fa-eye`}
                eyebrow={ui.sectionPassiveEyebrow}
                title={ui.sectionPassiveTitle}
                description={ui.sectionPassiveDescription}
                count={autoCount}
                accent={`accent-passive`}
                searchId={`passive_reads`}
                onIconClick={openSearchConfirm}
                ui={ui}>
                {!passiveInitReady && (
                    <div className={`article-data-probe-block-description text-3 mb-3`}>
                        {ui.passiveQueuedDescription}
                    </div>
                )}
                <div className={`article-data-probe-grid article-data-probe-grid-fixed-two`}>
                    {visiblePassiveProbes.map(p => (
                        <ProbeItem key={p.id}
                                   probe={p}
                                   state={probeStates[p.id]}
                                   expanded={Boolean(expanded?.[p.id])}
                                   onToggleExpand={() => toggleExpanded(p.id)}
                                   onIconClick={openSearchConfirm}
                                   ui={ui}/>
                    ))}
                </div>

                <ProbeListToggle expanded={passiveListExpanded}
                                 visibleCount={visiblePassiveProbes.length}
                                 totalCount={autoCount}
                                 onToggle={() => toggleListExpanded("passive_reads")}
                                 ui={ui}/>
            </ProbeSection>

            <ProbeSearchPopup target={searchConfirmTarget}
                              onCancel={closeSearchConfirm}
                              onGo={confirmSearchAndOpen}
                              ui={ui}/>
        </Article>
    )
}

function ProbeSection({ icon, eyebrow, title, description, count, accent, actions = null, children, searchId = "", onIconClick = null, ui }) {
    const clickable = Boolean(searchId && onIconClick)
    const handleActivate = (triggerElement = null) => {
        if (!clickable) return
        onIconClick({ title, variableId: searchId, querySource: searchId, scopeLabel: "section", triggerElement })
    }
    const handleClick = (event) => {
        event.preventDefault()
        event.stopPropagation()
        handleActivate(event.currentTarget)
    }
    const handleKeyDown = (event) => {
        if (!clickable) return
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            event.stopPropagation()
            handleActivate(event.currentTarget)
        }
    }

    return (
        <section className={`article-data-probe-block ${accent || ""}`}>
            <div className={`article-data-probe-block-header`}>
                <div className={`article-data-probe-block-lead`}>
                    <div className={`article-data-probe-block-icon ${clickable ? "article-data-probe-block-icon-clickable" : ""}`}
                         role={clickable ? "button" : undefined}
                         tabIndex={clickable ? 0 : undefined}
                         aria-label={clickable ? `${ui.searchGoogleFor} ${title}` : undefined}
                         onClick={clickable ? handleClick : undefined}
                         onKeyDown={clickable ? handleKeyDown : undefined}>
                        <i className={icon}/>
                    </div>

                    <div className={`article-data-probe-block-copy`}>
                        {eyebrow && (
                            <div className={`article-data-probe-block-eyebrow text-4`}>{eyebrow}</div>
                        )}

                        <h5 className={`article-data-probe-block-title mb-0`}>{title}</h5>

                        {description && (
                            <div className={`article-data-probe-block-description text-3`}>{description}</div>
                        )}

                    </div>
                </div>

                <div className={`article-data-probe-block-controls`}>
                    <div className={`article-data-probe-block-count`}>
                        <span className={`article-data-probe-block-count-value`}>{count}</span>
                        <span className={`article-data-probe-block-count-label`}>{ui.signals}</span>
                    </div>

                    {actions}
                </div>
            </div>

            <div className={`article-data-probe-block-body`}>
                {children}
            </div>
        </section>
    )
}

function ProbeListToggle({ expanded, visibleCount, totalCount, onToggle, ui }) {
    if (totalCount <= LIST_PREVIEW_COUNT) return null

    const remaining = Math.max(0, totalCount - visibleCount)
    const label = expanded ? ui.showLess : `${ui.showMore} (${remaining})`

    return (
        <div className={`article-data-probe-list-footer`}>
            <StandardButton variant={`contrast`}
                            className={`article-data-probe-action-btn article-data-probe-list-toggle-btn`}
                            label={label}
                            faIcon={expanded ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}
                            onClick={onToggle}/>
        </div>
    )
}

function ProbeItem({
    probe,
    state,
    showRequest = false,
    requestLabel = "Request",
    onRequest = null,
    thirdParty = false,
    extraAction = null,
    extraLabel = null,
    extraIcon = null,
    extraState = null,
    expanded = false,
    onToggleExpand = null,
    onIconClick = null,
    ui,
}) {
    const status = state?.status || (showRequest ? "idle" : "pending")
    const value = state?.value || null
    const whatText = probe?.what || PROBE_WHAT[probe?.id] || ui.statusText.explanationUnavailable
    const clickable = Boolean(probe?.id && probe?.title && onIconClick)

    const badge = status === "ok" ? ui.badges.ok :
        status === "pending" ? ui.badges.pending :
            status === "idle" ? ui.badges.idle :
            status === "unsupported" ? ui.badges.unsupported :
                ui.badges.hidden
    const badgeClass = status === "ok" ? "badge-ok" :
        status === "pending" ? "badge-wait" :
            status === "idle" ? "badge-ready" :
            status === "unsupported" ? "badge-unsupported" :
                "badge-hidden"

    const fullText = getDisplayText(status, value, ui, { showRequest, thirdParty })
    const collapsedText = getCollapsedText(status, value, ui, { showRequest, thirdParty })
    const hasExtraDetails = Boolean(extraState?.status === "ok" && extraState?.value)
    const hasCollapsedPreview = status === "ok" && fullText !== collapsedText
    const canExpand = hasCollapsedPreview || hasExtraDetails
    const isExpanded = canExpand && expanded
    const requestIcon = thirdParty ? "fa-solid fa-globe" : "fa-solid fa-wand-magic-sparkles"
    const handleActivateIcon = (triggerElement = null) => {
        if (!clickable) return
        onIconClick({
            title: probe.title,
            variableId: probe.id,
            querySource: extractProbeQuerySource(probe),
            scopeLabel: "probe",
            triggerElement
        })
    }
    const handleIconClick = (event) => {
        event.preventDefault()
        event.stopPropagation()
        handleActivateIcon(event.currentTarget)
    }
    const handleIconKeyDown = (event) => {
        if (!clickable) return
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            event.stopPropagation()
            handleActivateIcon(event.currentTarget)
        }
    }

    return (
        <div className={`article-data-probe-item ${thirdParty ? "item-third-party" : ""} ${isExpanded ? "item-expanded" : ""}`}>
            <div className={`article-data-probe-item-head`}>
                <div className={`article-data-probe-item-icon ${clickable ? "article-data-probe-item-icon-clickable" : ""}`}
                     role={clickable ? "button" : undefined}
                     tabIndex={clickable ? 0 : undefined}
                     aria-label={clickable ? `${ui.searchGoogleFor} ${probe.title} (${probe.id})` : undefined}
                     onClick={clickable ? handleIconClick : undefined}
                     onKeyDown={clickable ? handleIconKeyDown : undefined}>
                    <i className={`${probe.icon}`}/>
                </div>

                <div className={`article-data-probe-item-head-content`}>
                    <div className={`article-data-probe-item-title`}>{probe.title}</div>
                    <div className={`article-data-probe-item-badge ${badgeClass}`}>{badge}</div>
                </div>
            </div>

            <div className={`article-data-probe-item-body`}>
                <div className={`article-data-probe-item-meta text-3`}>
                    <div className={`article-data-probe-item-meta-row`}>
                        <span className={`article-data-probe-item-meta-key`}>{ui.what}</span>
                        <span className={`article-data-probe-item-meta-value`}>{whatText}</span>
                    </div>
                    {probe?.how && (
                        <div className={`article-data-probe-item-meta-row`}>
                            <span className={`article-data-probe-item-meta-key`}>{ui.how}</span>
                            <span className={`article-data-probe-item-meta-value`}>{probe.how}</span>
                        </div>
                    )}
                    {probe?.why && (
                        <div className={`article-data-probe-item-meta-row`}>
                            <span className={`article-data-probe-item-meta-key`}>{ui.why}</span>
                            <span className={`article-data-probe-item-meta-value`}>{probe.why}</span>
                        </div>
                    )}
                </div>

                <div className={`article-data-probe-item-value-toolbar`}>
                    <div className={`article-data-probe-item-value-label`}>{ui.details}</div>

                    <div className={`article-data-probe-item-value-actions`}>
                        {showRequest && onRequest && (
                            <StandardButton variant={`contrast`}
                                            className={`article-data-probe-action-btn`}
                                            label={requestLabel}
                                            faIcon={requestIcon}
                                            onClick={onRequest}/>
                        )}

                        {showRequest && extraAction && extraLabel && (
                            <StandardButton variant={`contrast`}
                                            className={`article-data-probe-action-btn`}
                                            label={extraLabel}
                                            faIcon={extraIcon || "fa-solid fa-bolt"}
                                            onClick={extraAction}/>
                        )}

                        {(status === "ok" && value) && (
                            <CopyButton text={value}
                                        label={ui.copy}
                                        variant={`pill`}
                                        buttonClassName={`article-data-probe-item-copy`}/>
                        )}

                        {canExpand && onToggleExpand && (
                            <StandardButton variant={`contrast`}
                                            className={`article-data-probe-action-btn article-data-probe-expand-btn`}
                                            label={isExpanded ? ui.showLess : ui.showMore}
                                            faIcon={isExpanded ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}
                                            onClick={onToggleExpand}/>
                        )}
                    </div>
                </div>

                <pre className={`article-data-probe-item-value ${extraState?.status === "ok" && extraState?.value ? "has-following-extra" : ""}`}>
                    {isExpanded ? fullText : collapsedText}
                </pre>

                {isExpanded && extraState?.status === "ok" && extraState?.value && (
                    <pre className={`article-data-probe-item-value article-data-probe-item-extra`}>{extraState.value}</pre>
                )}
            </div>
        </div>
    )
}

export default ArticleDataProbe

function ProbeSearchPopup({ target, onCancel, onGo, ui }) {
    const dialogRef = useRef(null)
    const cancelButtonRef = useRef(null)
    const goButtonRef = useRef(null)
    const titleId = "article-data-probe-search-popup-title"
    const descriptionId = "article-data-probe-search-popup-description"

    useEffect(() => {
        if (!target || !goButtonRef.current) return
        goButtonRef.current.focus()
    }, [target])

    useEffect(() => {
        if (!target) return

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = previousOverflow
        }
    }, [target])

    if (!target) return null

    const handleBackdropClick = (event) => {
        if (event.target !== event.currentTarget) return
        onCancel?.()
    }

    const handleKeyDown = (event) => {
        if (event.key === "Escape") {
            event.preventDefault()
            onCancel?.()
            return
        }

        if (event.key !== "Tab") return

        const focusable = [cancelButtonRef.current, goButtonRef.current].filter(Boolean)
        if (focusable.length === 0) return

        const currentIndex = focusable.indexOf(document.activeElement)
        if (event.shiftKey) {
            if (currentIndex <= 0) {
                event.preventDefault()
                focusable[focusable.length - 1].focus()
            }
            return
        }

        if (currentIndex === focusable.length - 1 || currentIndex === -1) {
            event.preventDefault()
            focusable[0].focus()
        }
    }

    return createPortal(
        <div className={`article-data-probe-search-popup-backdrop`}
             style={target.themeVars}
             onClick={handleBackdropClick}
             onKeyDown={handleKeyDown}>
            <div ref={dialogRef}
                 className={`article-data-probe-search-popup`}
                 role={`dialog`}
                 aria-modal={`true`}
                 aria-labelledby={titleId}
                 aria-describedby={descriptionId}
                 onClick={(event) => event.stopPropagation()}>
                <div className={`article-data-probe-search-popup-eyebrow`}>{ui.searchEyebrow}</div>
                <h5 id={titleId}
                    className={`article-data-probe-search-popup-title`}>{target.title}</h5>
                <p id={descriptionId}
                   className={`article-data-probe-search-popup-description`}>{target.description}</p>
                <div className={`article-data-probe-search-popup-query`}>
                    <code>{target.query}</code>
                </div>
                <div className={`article-data-probe-search-popup-actions`}>
                    <button ref={cancelButtonRef}
                            type={`button`}
                            className={`article-data-probe-search-popup-btn article-data-probe-search-popup-btn-cancel`}
                            onClick={onCancel}>
                        {ui.cancel}
                    </button>
                    <button ref={goButtonRef}
                            type={`button`}
                            className={`article-data-probe-search-popup-btn article-data-probe-search-popup-btn-go`}
                            onClick={onGo}>
                        {ui.go}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    )
}

function buildGoogleSearchUrl(query) {
    return `https://www.google.com/search?q=${encodeURIComponent(query)}`
}

function readProbePopupThemeVars(triggerElement) {
    if (!(triggerElement instanceof HTMLElement)) return undefined

    const articleElement = triggerElement.closest("article.article-data-probe")
    if (!(articleElement instanceof HTMLElement)) return undefined

    const computedStyles = window.getComputedStyle(articleElement)
    return PROBE_POPUP_THEME_VAR_NAMES.reduce((acc, name) => {
        const value = computedStyles.getPropertyValue(name)?.trim()
        if (value) {
            acc[name] = value
        }
        return acc
    }, {})
}

function extractProbeQuerySource(probe) {
    const how = String(probe?.how || "").trim()
    if (!how) return probe?.id || ""

    const match = how.match(/(?:Read from|Requested via|Generated from|Fetched from|Counted via)\s+(.+?)(?:\s+\([^)]*\))?\.$/i)
    if (match?.[1]) {
        return normalizeQuerySource(match[1])
    }

    const requestThenReadMatch = how.match(/Requests?\s+(.+?),\s+then reads?\s+(.+?)\.$/i)
    if (requestThenReadMatch) {
        return normalizeQuerySource(`${requestThenReadMatch[1]} ${requestThenReadMatch[2]}`)
    }

    return normalizeQuerySource(how.replace(/\.$/, "")) || probe?.id || ""
}

function normalizeQuerySource(value) {
    return String(value || "")
        .replace(/\blabels?\b/gi, "")
        .replace(/\(if supported\)/gi, "")
        .replace(/\(secure context\)/gi, "")
        .replace(/\(if exposed\)/gi, "")
        .replace(/\(you choose\)/gi, "")
        .replace(/\(chooser\)/gi, "")
        .replace(/\(user gesture\)/gi, "")
        .replace(/\s+/g, " ")
        .trim()
}

function safePretty(value) {
    try {
        return JSON.stringify(value, null, 2)
    }
    catch (_) {
        return null
    }
}

function safeBool(value) {
    try {
        return Boolean(value)
    }
    catch (_) {
        return false
    }
}

function formatBytes(bytes) {
    const b = Number(bytes)
    if (!Number.isFinite(b) || b < 0) return null
    const units = ["B", "KB", "MB", "GB", "TB"]
    let i = 0
    let v = b
    while (v >= 1024 && i < units.length - 1) {
        v /= 1024
        i += 1
    }
    const digits = i === 0 ? 0 : v < 10 ? 2 : v < 100 ? 1 : 0
    return `${v.toFixed(digits)} ${units[i]}`
}

function formatSeconds(seconds) {
    const s = Number(seconds)
    if (!Number.isFinite(s)) return null
    if (s === Infinity) return "infinite"
    const m = Math.floor(s / 60)
    const r = Math.floor(s % 60)
    if (m <= 0) return `${r}s`
    return `${m}m ${r}s`
}

async function sha256Hex(text) {
    try {
        if (!window?.crypto?.subtle || typeof TextEncoder === "undefined") return null
        const data = new TextEncoder().encode(String(text))
        const digest = await window.crypto.subtle.digest("SHA-256", data)
        const bytes = new Uint8Array(digest)
        return Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("")
    }
    catch (_) {
        return null
    }
}

function getWebglRendererInfo() {
    try {
        const canvas = document.createElement("canvas")
        const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
        if (!gl) return null
        const ext = gl.getExtension("WEBGL_debug_renderer_info")
        if (!ext) return null
        const vendor = gl.getParameter(ext.UNMASKED_VENDOR_WEBGL)
        const renderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)
        const out = []
        if (vendor) out.push(`vendor: ${vendor}`)
        if (renderer) out.push(`renderer: ${renderer}`)
        return out.join("\n") || null
    }
    catch (_) {
        return null
    }
}

function getDisplayText(status, value, ui, options = {}) {
    const { showRequest = false, thirdParty = false } = options
    if (status === "ok" && value) return String(value)
    if (status === "pending") {
        return showRequest ? ui.statusText.requestPending : ui.statusText.passivePending
    }
    if (status === "idle") {
        return thirdParty ?
            ui.statusText.thirdPartyIdle :
            ui.statusText.requestIdle
    }
    if (status === "unsupported") return ui.statusText.unsupported
    return ui.hiddenText
}

function getCollapsedText(status, value, ui, options = {}) {
    if (status === "ok" && value) {
        const text = String(value)
        const lines = text.split("\n")
        const shown = lines.slice(0, 3)
        let joined = shown.join("\n")
        if (joined.length > 420) {
            joined = truncateText(joined, 420)
        }
        const remaining = Math.max(0, lines.length - shown.length)
        if (remaining > 0) {
            joined = `${joined}\n… (+${remaining} lines)`
        }
        return joined
    }
    return getDisplayText(status, value, ui, options)
}

function truncateText(text, maxChars) {
    const s = String(text || "")
    if (s.length <= maxChars) return s
    const cut = Math.max(0, maxChars - 1)
    return s.slice(0, cut) + "…"
}
