// Process :hi: => <svg><use xlink:href="#hi"></svg>

// same as UNESCAPE_MD_RE plus a space
let UNESCAPE_RE = /\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;


function svg(state, silent) {
  let found,
      content,
      token,
      max = state.posMax,
      start = state.pos;

  if (state.src.charCodeAt(start) !== 0x3A/* : */) { return false; }
  if (silent) { return false; } // don't run any pairs in validation mode
  if (start + 2 >= max) { return false; }

  state.pos = start + 1;

  while (state.pos < max) {
    if (state.src.charCodeAt(state.pos) === 0x3A/* : */) {
      found = true;
      break;
    }

    state.md.inline.skipToken(state);
  }

  if (!found || start + 1 === state.pos) {
    state.pos = start;
    return false;
  }

  content = state.src.slice(start + 1, state.pos);

  // don't allow unescaped spaces/newlines inside
  if (content.match(/(^|[^\\])(\\\\)*\s/)) {
    state.pos = start;
    return false;
  }

  // found!
  state.posMax = state.pos;
  state.pos = start + 1;

  // Earlier we checked !silent, but this implementation does not need it
  token         = state.push('svg_open', 'svg', 1);
  token.attrPush(["class", "icon"]);
  token.markup  = ":";

  token         = state.push("svg_use", "use", 0);
  token.attrPush(["xlink:href", `#${content.replace(UNESCAPE_RE, "$1")}`]);

  //token         = state.push('text', '', 0);
  //token.content = content.replace(UNESCAPE_RE, '$1');

  token = state.push('svg_close', 'svg', -1);
  token.markup = ":";

  state.pos = state.posMax + 1;
  state.posMax = max;
  return true;
}


module.exports = function sub_plugin(md) {
  md.inline.ruler.after('emphasis', 'svg_inline', svg);
};