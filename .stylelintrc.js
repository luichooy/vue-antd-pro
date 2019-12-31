module.exports = {
  extends: 'stylelint-config-standard',
  plugins: [],
  processors: [],
  //   defaultSeverity: 'error', //指定应用到所有rules上的严格程度，可选值有‘warning','error'
  rules: {
    'font-family-no-missing-generic-family-keyword': null,
    'no-empty-source': null,
    'no-eol-whitespace': null,
    // 解决 vue 深度选择器  ::v-deep
    'selector-pseudo-element-no-unknown': null
  }
}
