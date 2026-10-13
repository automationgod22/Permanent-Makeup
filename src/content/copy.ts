/**
 * Page copy. Service names come from the studio's Instagram bio. Descriptions
 * explain what each technique is in general terms — they make no promises
 * about this studio's results, prices, timings or credentials.
 * `toConfirm` notes only render in review mode.
 */

export type ServiceKey = "brows" | "lips" | "eyes" | "smp";

export const services: {
  key: ServiceKey;
  name: string;
  summary: string;
  goodFor: string;
  toConfirm?: string;
}[] = [
  {
    key: "brows",
    name: "Ombré brows",
    summary:
      "A soft, powdered fill that starts light at the front and builds toward the tail. It reads like brow makeup, minus the pencil every morning.",
    goodFor: "Overplucked, sparse or uneven brows.",
  },
  {
    key: "lips",
    name: "Nude blush lips",
    summary:
      "A sheer wash of colour that evens out lip tone and softens the outline. The aim is your own lips, a little more defined.",
    goodFor: "Pale, uneven or undefined lip colour.",
  },
  {
    key: "eyes",
    name: "Eyes",
    summary:
      "Pigment placed along the lash line to frame the eye, so it looks defined without liner.",
    goodFor: "Anyone tired of redrawing liner, or with sparse lash lines.",
    toConfirm:
      "Instagram just says “Eyes”. Confirm the exact options (lash-line enhancement, eyeliner, or both).",
  },
  {
    key: "smp",
    name: "Scalp micropigmentation",
    summary:
      "Tiny pigment dots placed to mimic hair follicles, used to rebuild a hairline or make thinning areas look denser. It doesn’t grow hair; it changes how the scalp reads.",
    goodFor: "Receding hairlines and thinning density.",
  },
];

export const process: { title: string; body: string }[] = [
  {
    title: "Consultation",
    body: "Send a message with what you’d like done and a clear photo of the area. You’ll talk through the look you want, your skin and any previous work, and get pricing.",
  },
  {
    title: "Mapping and colour",
    body: "The shape is measured and drawn on before anything is permanent, and the pigment is matched to your skin and hair. Nothing starts until you approve it.",
  },
  {
    title: "The session",
    body: "Pigment goes in gradually, layer by layer, so the result can be built up rather than rushed.",
  },
  {
    title: "Healing",
    body: "Colour usually looks stronger at first, then softens as the skin settles. Your aftercare in these days shapes how it heals.",
  },
  {
    title: "Touch-up",
    body: "Permanent makeup is commonly finished in two visits. The follow-up refines the shape and evens any patches that faded while healing.",
  },
];

export const beforeVisit = [
  "Mention any medication, skin condition, pregnancy or breastfeeding, and recent treatments such as peels, retinoids or injectables. Some of these mean waiting, or checking with your doctor first.",
  "If you’ve had permanent makeup before, send a photo of it in advance.",
  "For lips, say if you get cold sores.",
];

export const aftercare = [
  "Keep the area clean and follow the written aftercare you’re given.",
  "Let flakes come off on their own. Picking pulls pigment out.",
  "Skip sweaty workouts, swimming, saunas and direct sun while it heals.",
  "No makeup or skincare actives on the treated area until it has healed.",
];

export const faqs: { q: string; a: string; toConfirm?: string }[] = [
  {
    q: "How much does it cost?",
    a: "Pricing isn’t listed here. Message the studio on Instagram with the service you’re interested in and you’ll get a quote.",
  },
  {
    q: "Does it hurt?",
    a: "Sensitivity varies from person to person and from area to area. Ask how numbing is handled when you book.",
    toConfirm: "Add the studio’s numbing approach if they want it stated.",
  },
  {
    q: "How long does it last?",
    a: "Permanent makeup fades gradually. How quickly depends on your skin, sun exposure and aftercare, and periodic colour refreshers keep it crisp.",
  },
  {
    q: "I already have old brow tattooing. Can it be redone?",
    a: "Send a photo when you message. Whether it can be worked over depends on the colour and shape of the existing work.",
  },
  {
    q: "Will SMP look like real hair?",
    a: "SMP recreates the look of closely cropped hair or adds density behind longer hair. Which approach suits you depends on your hair and goals, which is what the consultation is for.",
  },
  {
    q: "Where is the studio?",
    a: "Jersey City, New Jersey. Message on Instagram for the address and availability.",
    toConfirm: "Replace with the street address once confirmed (site.streetAddress).",
  },
];
