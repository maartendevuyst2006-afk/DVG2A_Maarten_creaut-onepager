# Weave-prompts voor de AI-beelden

Model: **Nano Banana 2 Lite** (Weave), aspect ratio **4:3**, resolutie **1K**.
Stijl: zachte, matte 3D-klei-illustratie in het v2-palet. Geen tekst in de beelden.

Werkwijze voor consistentie: eerst `intro.jpg` gemaakt, daarna die als **referentiebeeld** (images-input) meegegeven aan elk volgend beeld.

| Bestand | Onderdeel | Status |
|---|---|---|
| `intro.jpg` | Intro (hero) | Gegenereerd via Claude Code + Weave MCP |
| `beeldbewerking.jpg` | Beeldbewerking: acties & batch | Gegenereerd via Claude Code + Weave MCP |
| `social-media.jpg` | Social media: Figma automation | Gegenereerd via Claude Code + Figma MCP (Figma AI, gemini-3.1-flash-lite-image), zonder referentiebeeld |
| `content-generatie.jpg` | Content generatie: Weave & Claude Cowork | Gegenereerd via Claude Code + Figma MCP (Figma AI, gemini-3.1-flash-lite-image), zonder referentiebeeld |
| `vibe-coding.jpg` | Vibe coding & web | Gegenereerd via Claude Code + Figma MCP (Figma AI, gemini-3.1-flash-lite-image), zonder referentiebeeld |
| `e-mailmarketing.jpg` | E-mailmarketing & newsletters | Gegenereerd via Claude Code + Figma MCP (Figma AI, gemini-3.1-flash-lite-image), zonder referentiebeeld |

Weave liet via de agent maar 2 gratis runs toe. De andere 4 zijn gemaakt met Figma AI (generate_image via de Figma MCP), met dezelfde prompts; omdat Figma AI geen referentiebeeld aanneemt, staat de volledige stijlbeschrijving in elke prompt. De pagina verwijst naar alle zes de bestanden. Sla een nieuw beeld op met exact de bestandsnaam hierboven in deze map `images/`; het verschijnt dan vanzelf op de juiste plek.

---

## intro.jpg

> Soft matte 3D clay illustration, handmade plasticine look, rounded chunky shapes, gentle soft studio lighting, subtle soft shadows. Strict warm color palette: dark charcoal grey background (#32312D), burnt orange (#DA7702), soft peach (#FEC097), deep burgundy (#8A1820), warm off-white (#F5E6DF), tiny accents of red (#E83E3E). Subject: a small friendly clay machine with a conveyor belt that takes in one blank card and outputs many colorful poster card variations in different sizes, square, tall and wide, stacked neatly at the end. Minimal composition, objects centered with generous empty background. Absolutely no text, no letters, no numbers, no logos, no words anywhere.

## beeldbewerking.jpg (referentie: intro.jpg)

> Create a NEW scene in exactly the same soft matte 3D clay illustration style, lighting, dark charcoal background and warm color palette as the reference image (burnt orange, soft peach, deep burgundy, warm off-white, tiny red accents). Subject: a neat stack of clay photo prints of small product bottles moving along a clay conveyor belt; a friendly clay stamp presses a small round burgundy seal onto each print; the prints come out larger with an extended background. Minimal composition, generous empty background. Absolutely no text, no letters, no numbers, no logos, no words anywhere.

## social-media.jpg (referentie: intro.jpg)

> Create a NEW scene in exactly the same soft matte 3D clay illustration style, lighting, dark charcoal background and warm color palette as the reference image (burnt orange, soft peach, deep burgundy, warm off-white, tiny red accents). Subject: a clay smartphone standing upright showing a grid of colorful square post tiles, next to it a tall clay story card and a wide clay banner card in matching colors, all fed by a small clay spreadsheet grid sheet connected with a soft clay tube. Minimal composition, generous empty background. Absolutely no text, no letters, no numbers, no logos, no words anywhere.

## content-generatie.jpg (referentie: intro.jpg)

Tweede poging via Figma AI, met deze toevoeging achter de stijlbeschrijving: *Seamless infinite dark charcoal grey studio backdrop (#32312D): the floor and the wall are the same dark charcoal color with no horizon line. There is NO table, NO light surface, NO white or beige floor; all objects rest directly on the dark charcoal ground.*


> Create a NEW scene in exactly the same soft matte 3D clay illustration style, lighting, dark charcoal background and warm color palette as the reference image (burnt orange, soft peach, deep burgundy, warm off-white, tiny red accents). Subject: a friendly clay photo camera producing a fan of abstract clay picture cards and a small clay film strip, while a cute little clay helper robot neatly stacks paper documents and pins cards onto a small planning board. Minimal composition, generous empty background. Absolutely no text, no letters, no numbers, no logos, no words anywhere.

## vibe-coding.jpg (referentie: intro.jpg)

> Create a NEW scene in exactly the same soft matte 3D clay illustration style, lighting, dark charcoal background and warm color palette as the reference image (burnt orange, soft peach, deep burgundy, warm off-white, tiny red accents). Subject: an open clay laptop whose screen shows abstract colored horizontal clay bars like code blocks (no characters), a soft clay speech bubble floating towards it, and a clay puzzle piece clicking into the side of the laptop like a plugin, with a small clay globe nearby. Minimal composition, generous empty background. Absolutely no text, no letters, no numbers, no logos, no words anywhere.

## e-mailmarketing.jpg (referentie: intro.jpg)

> Create a NEW scene in exactly the same soft matte 3D clay illustration style, lighting, dark charcoal background and warm color palette as the reference image (burnt orange, soft peach, deep burgundy, warm off-white, tiny red accents). Subject: a small clay sign-up form card on the left, and a neat sequence of three clay envelopes travelling along a gentle curved clay path to a friendly round clay mailbox on the right. Minimal composition, generous empty background. Absolutely no text, no letters, no numbers, no logos, no words anywhere.
