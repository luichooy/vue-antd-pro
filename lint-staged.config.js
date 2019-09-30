module.exports = {
  '*.{js,jsx,vue}': ['yarn lint', 'git add'],
  '*.{css}': ['stylelint --fix', 'git add'],
  '*.{scss}': ['stylelint --syntax=scss --fix', 'git add'],
  '*.{vue}': ['stylelint --fix', 'git add'],
  '*.{json}': ['prettier --write', 'git add']
}
