# Patches für Projects.tsx und CTACounter.tsx

## 1. Stapel-Effekt (CTACounter fährt über Projects)

In `page.tsx`:

```tsx
import { RisingPanel } from '@/components/animations/RisingPanel';

<Projects />
<RisingPanel overlap={10} radius={36}>
  <CTACounter />
</RisingPanel>
```

An `Projects.tsx` und `CTACounter.tsx` selbst ist dafür **keine** Änderung
nötig. Wichtig: der Elternknoten darf kein `overflow: hidden` haben, sonst
wird der negative Randabstand abgeschnitten.

---

## 2. Projects.tsx — Scroll-Sperre reparieren

Der aktuelle Code sperrt die Seite nicht, solange Lenis läuft.

```diff
+ import { lockScroll, unlockScroll } from '@/lib/lenis';

  useEffect(() => {
-   if (activeProject !== null) {
-     document.body.style.overflow = 'hidden';
-   } else {
-     document.body.style.overflow = '';
-   }
-   return () => { document.body.style.overflow = ''; };
+   if (activeProject !== null) lockScroll();
+   else unlockScroll();
+   return () => unlockScroll();
  }, [activeProject]);
```

## 3. Projects.tsx — doppelte Plugin-Registrierung entfernen

```diff
- import { useGSAP } from '@gsap/react';
- import gsap from 'gsap';
- import { ScrollTrigger } from 'gsap/ScrollTrigger';
- gsap.registerPlugin(useGSAP, ScrollTrigger);
+ import { gsap, useGSAP } from '@/lib/gsap';
```

`lib/gsap.ts` registriert bereits einmal zentral. Zweimal registrieren legt
die globalen `gsap.defaults()` still, die dort gesetzt werden.

## 4. Projects.tsx — `filter` nicht scrubben

```diff
- { yPercent: 20, rotation: 10, scale: 0.85, filter: 'contrast(150%)' },
- { yPercent: 0, rotation: 0, scale: 1, filter: 'contrast(100%)', ease: 'none', ... }
+ { yPercent: 20, rotation: 8, scale: 0.88 },
+ { yPercent: 0, rotation: 0, scale: 1, ease: 'none', ... }
```

`filter` erzwingt jeden Frame ein Repaint und kann nicht an den Compositor
übergeben werden — bei acht scrubbenden Karten ist das der teuerste Posten
der ganzen Seite. `transform` allein reicht optisch völlig.

## 5. Projects.tsx — `gridArea` ohne Grid

Die Vorschau nutzt `gridArea: 'title'`, `'subtitle'`, `'meta'`, `'box-left'`,
`'box-right'` — ohne `display: grid` und ohne `grid-template-areas` sind alle
fünf Angaben wirkungslos. Entweder in `globals.css` ergänzen:

```css
.preview-item-grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: auto 1fr auto auto;
  grid-template-areas:
    "box-left  title     box-right"
    "box-left  title     box-right"
    ".         subtitle  ."
    ".         meta      .";
  align-items: center;
}
```

…oder die `gridArea`-Angaben durch Flexbox ersetzen.

## 6. Projects.tsx — Tastaturbedienung

Die Karten sind `div`s mit `onClick`. Per Tastatur nicht erreichbar:

```diff
  <div
+   role="button"
+   tabIndex={0}
+   onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPreview(index); } }}
    onClick={() => openPreview(index)}
```

Dasselbe gilt für den Schließen-Button: `Escape` sollte `closePreview()`
auslösen.

## 7. Projects.tsx — ungenutzte Daten

`PROJECTS_DATA` enthält acht Einträge, gerendert werden per `.slice(0, 4)`
nur vier. Entweder alle acht zeigen oder das Array kürzen — sonst wandern
tote Daten ins Bundle.

---

## 8. CTACounter.tsx — Blur nicht scrubben

```diff
- { scale: 1.25, filter: 'blur(5px) brightness(0.6)' },
- { scale: 1, filter: 'blur(0px) brightness(0.4)', ease: 'none', ... }
+ { scale: 1.25 },
+ { scale: 1, ease: 'none', ... }
```

Für die Abdunklung stattdessen die bereits vorhandene Overlay-Ebene nutzen:

```diff
- <div className="absolute inset-0 bg-black/40" />
+ <div className="absolute inset-0 bg-black/55" />
```

Ein vollflächiges `blur()` über die gesamte Scroll-Länge ist der teuerste
Effekt auf der Seite und bringt optisch fast nichts.

## 9. CTACounter.tsx — Zähler-Einflug entschlacken

```diff
- { y: 60, opacity: 0, scale: 0.9, rotationX: 15 },
- { y: 0, opacity: 1, scale: 1, rotationX: 0, duration: 1.2, stagger: 0.1, ease: 'back.out(1.2)', ... }
+ { y: 24, opacity: 0 },
+ { y: 0, opacity: 1, duration: 1.0, stagger: 0.08, ease: 'expo.out', ... }
```

Vier gleichzeitige Eigenschaften plus `back.out` lesen sich als Vorlage.
Eine kurze, klare Bewegung wirkt teurer als eine zusammengesetzte.

## 10. CTACounter.tsx — Zähler runden

```diff
- onUpdate: function() { ... Math.floor(this.targets()[0].val) + '+' }
+ // besser: snap statt Math.floor, dann ist der Wert schon ganzzahlig
+ snap: { val: 1 },
```

## 11. Farbige Schlagschatten entfernen

```diff
- className="shadow-2xl shadow-[#FF3131]/20"
+ className=""
```

Ein farbiger Glow um den Button ist ein Stilmittel aus dem SaaS-Umfeld und
steht quer zu der nüchternen, editorialen Sprache des restlichen Auftritts.

## 12. Ticker.tsx — Schleife an die Kopienzahl binden

```diff
- {[...items, ...items, ...items, ...items].map(...)}
+ {[...items, ...items].map(...)}

- gsap.to('.ticker-track', { xPercent: -25, ... })
+ gsap.to('.ticker-track', { xPercent: -50, ... })
```

Zwei Kopien und `-50%` ist die kleinste Konstruktion, die lückenlos
schließt. Vier Kopien vervierfachen nur das DOM.
