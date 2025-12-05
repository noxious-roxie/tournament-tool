export default function handler(req, res) {
  try {
    const text = req.body?.text?.toLowerCase() || "";

    const gens = ["SV", "SS", "SM", "ORAS", "BW", "DPP", "ADV", "GSC", "RBY"];

    // all alias names the OP might contain
    const baseTiers = [
      { short: "OU", names: ["ou", "overused"] },
      { short: "UU", names: ["uu", "underused"] },
      { short: "RU", names: ["ru", "rarelyused"] },
      { short: "NU", names: ["nu", "neverused"] },
      { short: "PU", names: ["pu"] },
      { short: "ZU", names: ["zu", "zeroused"] },
      { short: "LC", names: ["lc", "little cup", "littlecup"] },
      { short: "Doubles", names: ["doubles"] },
      { short: "2v2", names: ["2v2", "2v2 doubles"] },
      { short: "Ubers", names: ["ubers"] },
      { short: "Anything Goes", names: ["anything goes", "ag"] }
    ];

    const ALL = [];

    // generate all 99 tiers
    gens.forEach(gen => {
      baseTiers.forEach(tier => {
        const shortName = `${gen} ${tier.short}`;
        ALL.push({
          output: shortName,
          searchTerms: tier.names.map(n => `${gen.toLowerCase()} ${n}`)
        });
      });
    });

    // detect which of the 99 appear in the text
    const found = ALL.filter(t =>
      t.searchTerms.some(term => text.includes(term))
    ).map(t => t.output);

    res.status(200).json({
      tiers: [...new Set(found)] // remove duplicates just in case
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
