// One glossary for the whole site: order chips use `meaning`, GlossaryTerm cards show all of it.
export type Gloss = { say?: string; meaning: string }

export const glossary: Record<string, Gloss> = {
  // the order code
  Kopi: { say: 'KOH-pee', meaning: 'coffee, with condensed milk unless you say otherwise' },
  Teh: { say: 'teh', meaning: 'tea, with condensed milk unless you say otherwise' },
  Susu: { say: 'SOO-soo', meaning: 'condensed milk. The default. Sits at the bottom until stirred' },
  O: { say: 'oh', meaning: 'no milk at all' },
  C: { say: 'see', meaning: 'evaporated milk, a little sugar' },
  Biasa: { say: 'bee-AH-sah', meaning: 'normal sweet, which is very sweet' },
  'Siew Dai': { say: 'see-oh DYE', meaning: 'less sweet. Hokkien. Kurang manis, basically' },
  Kosong: { say: 'KOH-song', meaning: 'empty: no sugar' },
  Gau: { say: 'gow', meaning: 'thick, strong. More powder, less water' },
  Peng: { say: 'peng', meaning: 'iced' },

  // words in the copy
  'kurang manis': { say: 'KOO-rahng MAH-nis', meaning: 'Malay for “less sweet”. How you ask for less sugar, and the magazine’s name' },
  kopitiam: { say: 'KOH-pee-tee-am', meaning: 'a traditional coffee shop. Marble tables, ceiling fans, an uncle at the till' },
  bandung: { say: 'BAHN-doong', meaning: 'rose syrup stirred into milk. Pink, sweet, served at every wedding' },
  tebu: { say: 'TEH-boo', meaning: 'sugarcane. Air tebu is the juice, pressed to order' },
  tarik: { say: 'TAH-reek', meaning: '“pulled”. Teh tarik is poured from height between two mugs until it froths' },
  Myvi: { say: 'MY-vee', meaning: 'Malaysia’s favourite small hatchback. Fits 400 magazines, apparently' },
}
