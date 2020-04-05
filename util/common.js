module.exports.keywordNormalizer = kw => {
  return kw.trim().replace(/\s\s+/g, "+");
};
