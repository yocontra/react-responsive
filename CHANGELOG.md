## Change Log

### v8.1.0

- Expose `toQuery` function for turning our MediaQuery objects into strings

### v8.0.3

- Republish of 8.0.1 - version 8.0.2 was causing issues for people and is deprecated.

### v8.0.1

- Include `src` folder in package for webpack to get proper sourcemaps

### v8.0.0

- Adds Hooks API to make everything way easier (Thanks to @Tomekmularczyk)
  - See README for more info on how to use it
- [BREAKING] Change `values` prop to `device`

### v7.0.0

- Adds Context support to make testing and server-side rendering much easier (Thanks to @Tomekmularczyk)
  - See README for more info on how to use it
- [BREAKING] Require React v16.8.0 or higher

### v6.1.2

- Fix issue with values prop changing (https://github.com/contra/react-responsive/issues/197)

### v6.1.1

- Fix `forceStatic` issue with previous release

### v6.1.0

- Fix `values` prop existence not forcing static query resolution (Thanks @Herdismaria)

### v6.0.0

- Require React v16.3.0 or higher
- Update and simplify all lifecycle functions
- Remove all support for wrapper elements
  - Previously, when either `component` or non-mediaquery props were provided, we would render a wrapper element. This behavior no longer exists.
  - The rendering logic is now a basic ternary - `matches ? props.children : null`
- Thanks to @whatknight for doing the work here.

### v5.0.0
- New changelog system, all manual now since the automated system was overcomplicated and missed things.
- Breaking: `values` property always takes precedence when provided, no matter what (https://github.com/contra/react-responsive/issues/161)

### v4.0.5 (2018/03/07 17:11 +00:00)
- [e61ec94](https://github.com/contra/react-responsive/commit/e61ec9482ae6ff17d3b73fab1fbcc445aab9e9aa) 4.0.5 (@contra)
- [a8ec8e6](https://github.com/contra/react-responsive/commit/a8ec8e63221fccaef245366cd707aae3c19cb233) pre-release (@contra)
- [#146](https://github.com/contra/react-responsive/pull/146) Guard against null children (@lunaleaps)
- [3b40652](https://github.com/contra/react-responsive/commit/3b40652acbca56dc644e1b36fa50cabdb106ccdb) Guard against null children (@lunaleaps)

### v4.0.4 (2018/02/09 22:43 +00:00)
- [77d37de](https://github.com/contra/react-responsive/commit/77d37de00c8ebeffe478ab0ef748d10b7862975a) 4.0.4 (@contra)
- [19191ed](https://github.com/contra/react-responsive/commit/19191ed2522460109bfff19f22d6b879925599d3) closes #140 (@contra)

### v4.0.3 (2017/11/22 03:26 +00:00)
- [191d938](https://github.com/contra/react-responsive/commit/191d9380d288b8de3dd6eeafd903db46b73d820a) 4.0.3 (@contra)
- [a035cc5](https://github.com/contra/react-responsive/commit/a035cc5be9e01dc42bffacb0d8b68c916a8d0637) closes #134 (@contra)

### v4.0.2 (2017/11/21 19:55 +00:00)
- [6e1a359](https://github.com/contra/react-responsive/commit/6e1a359f4f0c55db6823d321c86c10a2b76052a3) 4.0.2 (@contra)

### v4.0.1 (2017/11/21 15:54 +00:00)
- [2aa6b94](https://github.com/contra/react-responsive/commit/2aa6b94dfb6104d111f38c07eb99b13b9616ac37) 4.0.1 (@contra)
- [6908332](https://github.com/contra/react-responsive/commit/6908332218359646416d568c75bf6ef7e974b82f) maybe fixes #134 (@contra)

### v4.0.0 (2017/11/16 00:14 +00:00)
- [b78938d](https://github.com/contra/react-responsive/commit/b78938d9f51dea13cc14e3227fce3694cde9dc63) 4.0.0 (@contra)
- [bd1c554](https://github.com/contra/react-responsive/commit/bd1c5547a30483367479803799f264d160d86a1e) deps (@contra)
- [#132](https://github.com/contra/react-responsive/pull/132) fix: support React 16 fragments (@jessepinho)
- [aefef55](https://github.com/contra/react-responsive/commit/aefef5574caa63ee9387f0db1e88889d2e98a8f7) chore: build assets (@jessepinho)
- [184b88e](https://github.com/contra/react-responsive/commit/184b88e069d8ab5f4f7f41d027ce37a0b8920e2c) style: make wrapChildren one line (@jessepinho)
- [95edc69](https://github.com/contra/react-responsive/commit/95edc69daeffad4a4f8575f544ebd235fada10b3) feat: don't wrap strings, either (@jessepinho)
- [0436fb5](https://github.com/contra/react-responsive/commit/0436fb5fe5985d6ce9046d4baab68a83d1d77c20) chore: update React peer dependency (@jessepinho)
- [36f8372](https://github.com/contra/react-responsive/commit/36f837207e84f512c41ad66ac1fa60964f77148d) fix: support React 16 fragments (@jessepinho)
- [#130](https://github.com/contra/react-responsive/pull/130) docs(CHANGELOG): 3.0.0 (@evenchange4)
- [aaceb45](https://github.com/contra/react-responsive/commit/aaceb4599e9a6c6701d067cbffc33b7f95188458) docs(CHANGELOG): 3.0.0 (@evenchange4)
- [#129](https://github.com/contra/react-responsive/pull/129) Fix view duplication in common uses example (@sonaye)
- [55a0f47](https://github.com/contra/react-responsive/commit/55a0f47b99c5a31755399240cfbe6d0033da8866) Fix view duplication in common uses example (@sonaye)
- [edbd8e7](https://github.com/contra/react-responsive/commit/edbd8e7ce8d757ef902d0f59b3d29679ac9e2616) 3.0 (@contra)

### v3.0.0 (2017/10/18 00:14 +00:00)
- [8a318fe](https://github.com/contra/react-responsive/commit/8a318fe9ddf363b6a4e917a13d99b1098670175a) 3.0.0 (@contra)
- [6bf6814](https://github.com/contra/react-responsive/commit/6bf681491e6ed260f89db85f6dad191a84cd523b) deps (@contra)
- [#128](https://github.com/contra/react-responsive/pull/128) Fix linter and tests (@refinery29)
- [71b611e](https://github.com/contra/react-responsive/commit/71b611eeabc52b271ebd3127223dd7b4b7824df2) Fix repo attribution (@cribbles)
- [4e8186a](https://github.com/contra/react-responsive/commit/4e8186aeaae10c8ffe757e101e4e029ef8e9da4b) Fix test (import as default) (@cribbles)
- [ce0475b](https://github.com/contra/react-responsive/commit/ce0475bb4badf816aec2d73649b2c00fb63a932d) Lint (remove semicolon) (@cribbles)
- [73e2862](https://github.com/contra/react-responsive/commit/73e2862c3c30c4164527aa5afa7e441ecdbe3d91) Add toQuery to default exports (@cribbles)
- [#124](https://github.com/contra/react-responsive/pull/124) Export toQuery function directly since src folder is no longer exported (@morganmccrory)
- [f5d9b8b](https://github.com/contra/react-responsive/commit/f5d9b8b36270c9db7f8dfecf643eb09e5e3a6f30) Export toQuery function directly since src folder is no longer exported (@morganmccrory)
- [fb23be4](https://github.com/contra/react-responsive/commit/fb23be4358654eb6c614b9766fbcbd4a5daac304) log (@contra)

### v2.0.0 (2017/10/02 21:11 +00:00)
- [dee5570](https://github.com/contra/react-responsive/commit/dee55700f31e4fc54ab3faf1e974c3ee3c7abf21) 2.0.0 (@contra)
- [24ff262](https://github.com/contra/react-responsive/commit/24ff2623d0a9d4a864c1635190d7fa1da37f3eb0) stupid lock file (@contra)
- [cb120f8](https://github.com/contra/react-responsive/commit/cb120f8953c2e05aeac03530918a31d86d3be828) house clean (@contra)
- [1e05b0c](https://github.com/contra/react-responsive/commit/1e05b0c8ad22f2008cb83506146bea88014066b3) housekeeping (@contra)
- [14004ab](https://github.com/contra/react-responsive/commit/14004aba9ec54fd7b807abf6ed960a6cff87ada3) housekeeping (@contra)
- [8ff7425](https://github.com/contra/react-responsive/commit/8ff742533e3fdf8d113c945cbe9291c16b8b3278) rebuild (@contra)
- [#120](https://github.com/contra/react-responsive/pull/120) support react 16. (@whatknight)
- [6b300d7](https://github.com/contra/react-responsive/commit/6b300d7cc1bb340afa14eb046290a5d03064120b) Merge branch 'master' into react16 (@contra)
- [#119](https://github.com/contra/react-responsive/pull/119) Housekeeping (@whatknight)
- [#121](https://github.com/contra/react-responsive/pull/121) Update README.txt (@vpicone)
- [1d19af9](https://github.com/contra/react-responsive/commit/1d19af9a5e6ddf5baf11eb27f455165430cdd405) Update README.txt (@vpicone)
- [bb69da2](https://github.com/contra/react-responsive/commit/bb69da2e74b615132dd30c4eecad2b88080e5287) support react 16. (@whatknight)
- [e78cab9](https://github.com/contra/react-responsive/commit/e78cab9fafceb30195ffca6858df35560f3675b6) bump sinon (@whatknight)
- [8380bd9](https://github.com/contra/react-responsive/commit/8380bd91c3fbb73957f7410bd2512266f7c7053a) update webpack (@whatknight)
- [9429386](https://github.com/contra/react-responsive/commit/9429386ce0891c1904baadf725837e0a3f282746) remove transform runtime (@whatknight)
- [48b2a33](https://github.com/contra/react-responsive/commit/48b2a33ad9a6c61fbbbac6dad6f54838f949d61a) update test deps (@whatknight)
- [81d9d18](https://github.com/contra/react-responsive/commit/81d9d181d08634527b49bb62c66f5b2c72e606f1) update eslint (@whatknight)
- [307b31d](https://github.com/contra/react-responsive/commit/307b31d16cf4d336f50ad4c53739166e4bd1d80e) update babel config (@whatknight)
- [#117](https://github.com/contra/react-responsive/pull/117) Update README.md (@modosc)
- [0b4d019](https://github.com/contra/react-responsive/commit/0b4d0197d1011c3e5899cc6003556a6526350bc1) Update README.md (@modosc)
- [c55a77e](https://github.com/contra/react-responsive/commit/c55a77ec86c2db7d2aae4a3e67a08dba09a3a455) closes #116 (@contra)

### v1.3.4 (2017/07/14 21:36 +00:00)
- [c93ac7a](https://github.com/contra/react-responsive/commit/c93ac7a696a8d3f0f8a5b71ce7836375de13a28d) 1.3.4 (@contra)
- [#109](https://github.com/contra/react-responsive/pull/109) fix Cannot read property 'removeListener' of undefined (@modosc)
- [ea3d577](https://github.com/contra/react-responsive/commit/ea3d5774bc59fa06ad50d60e582a9f6da94b9bd5) update matchmediaquery@^0.2.1
- [3687115](https://github.com/contra/react-responsive/commit/3687115de3603cfb32eb5f3e4d3b9883b12f3ed3) fix Cannot read property 'removeListener' of undefined
- [83c2409](https://github.com/contra/react-responsive/commit/83c24092225fa20c96c4bded03e845cb4baf5bec) 1.3.3 (@contra)

### v1.3.3 (2017/07/14 19:32 +00:00)
- [58fdb89](https://github.com/contra/react-responsive/commit/58fdb89893de8a9ec5495624c19f54bcced220c3) 1.3.3 (@contra)
- [e3781d2](https://github.com/contra/react-responsive/commit/e3781d208f7d7528add58b9b69fb998fe8f1e94e) diff (@contra)
- [#108](https://github.com/contra/react-responsive/pull/108) fix PropTypes warnings, fix react-addons-test-utils deprecation, fix … (@modosc)
- [49919d0](https://github.com/contra/react-responsive/commit/49919d09b7a4e984873b570132ada5554300f071) fix PropTypes warnings, fix react-addons-test-utils deprecation, fix eslint to work with test/
- [9957f24](https://github.com/contra/react-responsive/commit/9957f2445bd4d16b8d2ae1ae8a335dc2c95d476f) 1.3.2 (@contra)

### v1.3.2 (2017/07/14 14:47 +00:00)
- [a595593](https://github.com/contra/react-responsive/commit/a595593f413b5012de57f8ca7eabec5490a7426c) 1.3.2 (@contra)
- [516f270](https://github.com/contra/react-responsive/commit/516f2703dd4f35611d60a399ebd61273140ff88e) merge (@contra)
- [40fe34e](https://github.com/contra/react-responsive/commit/40fe34e003669f44692aedb054079126bedc5bc4) build (@contra)
- [85ae4cd](https://github.com/contra/react-responsive/commit/85ae4cd10fb0ea98a313f4335590452893f329ad) build (@contra)
- [69cde10](https://github.com/contra/react-responsive/commit/69cde106d817b3f4df7cbdd540ed27edfcc7f2d8) changes (@contra)
- [#106](https://github.com/contra/react-responsive/pull/106) Fixing a memory leak. (@ncochard)
- [00af280](https://github.com/contra/react-responsive/commit/00af280f57d979963d6c1d445e9c8c088ee03b82) 1.3.1
- [1e8dcb9](https://github.com/contra/react-responsive/commit/1e8dcb9b790c4ce8cf24b96936f4d5760c3a3494) Created 'matchmediaquery' as a replacement for 'matchmedia'.
- [6df7684](https://github.com/contra/react-responsive/commit/6df7684736797589245a643eb72e8e243dd987be) Fix for a memory leak.
- [#102](https://github.com/contra/react-responsive/pull/102) Close #74 (@WRONGWAY4YOU)
- [7877b80](https://github.com/contra/react-responsive/commit/7877b8003dc8f69f6350304c319daa3e35351aae) Merge branch 'master' into iss74 (@wrongway4you)
- [374b290](https://github.com/contra/react-responsive/commit/374b290722e50c7bade5e136a08ad53671b7df4a) Close #74 (@wrongway4you)
- [4156475](https://github.com/contra/react-responsive/commit/4156475e882fa3f8098991a6b713dd743b24a739) Merge branch 'remove-npm-bin-prefixes' (@wrongway4you)
- [#101](https://github.com/contra/react-responsive/pull/101) Remove unneeded "$(npm bin)/" prefixes (@WRONGWAY4YOU)
- [adfaf69](https://github.com/contra/react-responsive/commit/adfaf69be82b56f91c66da7b17735aa4faa901f5) Remove unneeded "$(npm bin)/" prefixes in `package.json` (@wrongway4you)
- [#100](https://github.com/contra/react-responsive/pull/100) Document common use cases (@sonaye)
- [b917322](https://github.com/contra/react-responsive/commit/b917322352dbb68939f2e1f140a89e4836dad4d4) Document common use cases (@sonaye)

### v1.3.0 (2017/05/09 01:13 +00:00)
- [44a7bf8](https://github.com/contra/react-responsive/commit/44a7bf8bd6f4289c4a644d4d1cdefbc5b01523c2) 1.3.0 (@contra)
- [#97](https://github.com/contra/react-responsive/pull/97) Add onChange and onChangeBefore callbacks (@hiddenboox)
- [6cb52b1](https://github.com/contra/react-responsive/commit/6cb52b15a452f1189bd4f89a4c5ce41bee21fe02) Add onBeforeChange callback (@hiddenboox)
- [#96](https://github.com/contra/react-responsive/pull/96) Adding demo link to readme (@scottwarren)
- [5836dfe](https://github.com/contra/react-responsive/commit/5836dfee1e85675ba1ea796a0e3cc75bba77d580) Adding link to readme (@scottwarren)
- [2c6b00d](https://github.com/contra/react-responsive/commit/2c6b00da63091b3bada0b8fe6105e50e29b37fde) Add onChange callback (@d4rky-pl)

### v1.2.10 (2017/04/19 18:32 +00:00)
- [ab7ff5c](https://github.com/contra/react-responsive/commit/ab7ff5cddcba1f22f3ace26dd777bbc530449c6c) 1.2.10 (@contra)
- [4f8f916](https://github.com/contra/react-responsive/commit/4f8f91612d389b06cfed42723b3fe0b8e1a66f8c) build (@contra)

### v1.2.9 (2017/04/19 03:27 +00:00)
- [07849af](https://github.com/contra/react-responsive/commit/07849afe0f7aee32c4db3dd4323bb93dbf23f1d1) 1.2.9 (@contra)
- [#90](https://github.com/contra/react-responsive/pull/90) Replace proptypes in index file (@rmdort)
- [a4a9120](https://github.com/contra/react-responsive/commit/a4a912073dff91401196fd8bc0ff41253573c49d) Removed React proptype in index (@rmdort)
- [c1a8081](https://github.com/contra/react-responsive/commit/c1a8081809d91542f7ce77e13bec42cbc26cd067) Spellfix (@rmdort)
- [0d7ffb6](https://github.com/contra/react-responsive/commit/0d7ffb6cf27027d7f1e64157a4d1b7ba45ffb0b1) Replace react proptypes (@rmdort)
- [48c303f](https://github.com/contra/react-responsive/commit/48c303f7c47e1d553f4e4d5d639073e72f7822e7) build (@contra)

### v1.2.8 (2017/04/18 18:45 +00:00)
- [4778c1e](https://github.com/contra/react-responsive/commit/4778c1e3793bffe15fd66cc0f7c8cb30c7cc59f0) 1.2.8 (@contra)
- [#88](https://github.com/contra/react-responsive/pull/88) Added prop-type library for React 16 (@rmdort)
- [7039ef6](https://github.com/contra/react-responsive/commit/7039ef6e30e409d83a8cf5e3a894cfdb136d3582) Added prop-type library for react 16 (@rmdort)
- [#86](https://github.com/contra/react-responsive/pull/86) docs(readme): add install part (@kud)
- [4665934](https://github.com/contra/react-responsive/commit/4665934ac824bca12c009a98f40c71bc8f47a081) docs(readme): add install part (@kud)
- [8c53639](https://github.com/contra/react-responsive/commit/8c536392459673d46e0df3682adf42c8196b17e0) changelog (@contra)

### v1.2.7 (2017/03/14 16:17 +00:00)
- [ee6b142](https://github.com/contra/react-responsive/commit/ee6b1429caa0fefd6e6f7c9313fe54fe13a61d82) 1.2.7 (@contra)
- [#83](https://github.com/contra/react-responsive/pull/83) Add react 0.14.x as potential peer dep (@jesstelford)
- [29266f0](https://github.com/contra/react-responsive/commit/29266f0db6598feaebcd4dc9dc907cdda3bafc2f) Peer dep on all react versions (@jesstelford)
- [1007031](https://github.com/contra/react-responsive/commit/100703116f9649cf1e0e125a10c9384a9366ecd3) Add react 0.14.x as potential peer dep (@jesstelford)
- [bc69299](https://github.com/contra/react-responsive/commit/bc692990d149f8a08bad4a12df78691816f75e81) changes (@contra)

### v1.2.6 (2017/01/19 03:06 +00:00)
- [342621d](https://github.com/contra/react-responsive/commit/342621d0407ae2e590a33c280ec2ca39d8bf3e8e) 1.2.6 (@contra)
- [#78](https://github.com/contra/react-responsive/pull/78) Removed babel-polyfill (@vjancik)
- [ebfeec0](https://github.com/contra/react-responsive/commit/ebfeec0473b2ca8040dbe13e698fa08366a7808b) Removed babel-polyfill (@vjancik)
- [9b91c9c](https://github.com/contra/react-responsive/commit/9b91c9cc341693a8282199edaed04a9c4b7a7f7a) #66 (@contra)
- [56b794a](https://github.com/contra/react-responsive/commit/56b794a0fcac2a28c7bd87e7263ad2b93c52e348) dist fix (@contra)

### v1.2.4 (2016/11/24 00:51 +00:00)
- [5e8ae33](https://github.com/contra/react-responsive/commit/5e8ae33d53e390193cf289b9f2ce7a6f95c47d90) 1.2.4 (@contra)
- [708e250](https://github.com/contra/react-responsive/commit/708e25030963d967db7dcfa5b21f95bcd84832ed) only publish dist (@contra)
- [2b36c54](https://github.com/contra/react-responsive/commit/2b36c54847f084e1830a1bcd1c885b6ab5102185) changelog (@contra)

### v1.2.3 (2016/11/23 00:26 +00:00)
- [7d95ef1](https://github.com/contra/react-responsive/commit/7d95ef1d83e6acba43ac15aedda03eecdf66f6bf) 1.2.3 (@contra)
- [404924f](https://github.com/contra/react-responsive/commit/404924ff302378a30dbb4f438b237c955b5528b0) changelog fix (@contra)

### v1.2.2 (2016/11/22 23:57 +00:00)
- [d337ce3](https://github.com/contra/react-responsive/commit/d337ce35a00bbb383a656d7453e8b28a2b30ea87) 1.2.2 (@contra)
- [#70](https://github.com/contra/react-responsive/pull/70) Wrap children if it's single-element array (@Instamotor-Labs)
- [341fdec](https://github.com/contra/react-responsive/commit/341fdecc2c3f7f56529dc9941768690457a27c30) Wrap children if it's single-element array (@skydan)
- [#65](https://github.com/contra/react-responsive/pull/65) Use ES2015 (@whatknight)
- [1b07af3](https://github.com/contra/react-responsive/commit/1b07af3957c18a9aeaefdc7b989b75f29fb0ac5e) Clean up webpack file syntax. (@whatknight)
- [b72e2c0](https://github.com/contra/react-responsive/commit/b72e2c032f24eefd33580774ec370ac50d720bf2) Update source to ES2015 syntax. (@whatknight)
- [94dbf57](https://github.com/contra/react-responsive/commit/94dbf5717b0b4d4bc9ab2b934c0c1a1585c37b68) add gitbook stuff. (@whatknight)
- [6aa759d](https://github.com/contra/react-responsive/commit/6aa759d66ee7571c4ad8f3265a29dc121635ec80) autofix lint errors (@whatknight)
- [902d432](https://github.com/contra/react-responsive/commit/902d432d96ae7c9ff8012598a7fa75a89b3f8fd8) Use eslint instead of jshint. (@whatknight)
- [9b22166](https://github.com/contra/react-responsive/commit/9b22166668118b077a8a3e1025a09f5909d0a985) Remove gulp. (@whatknight)
- [2810466](https://github.com/contra/react-responsive/commit/28104666aafcf5d7a2babebe154cc52d10e186b7) Build using babel and webpack. (@whatknight)
- [43b5741](https://github.com/contra/react-responsive/commit/43b5741e79aa0e79fe04174c30d442c2b0ca5706) update author, license, and urls. (@whatknight)
- [477174c](https://github.com/contra/react-responsive/commit/477174c4e6738f9db913ee6f18924365bd9de019) 1.2.1 (@contra)
- [f185c21](https://github.com/contra/react-responsive/commit/f185c21d763f05a11c9e4768ada0acda722b9f9e) rebuild (@contra)
- [7895cde](https://github.com/contra/react-responsive/commit/7895cdee5fe3262c70aff29ab679044d9470f2b1) 1.2.0 (@contra)
- [#64](https://github.com/contra/react-responsive/pull/64) Pass function as children. (@whatknight)
- [5ce699b](https://github.com/contra/react-responsive/commit/5ce699bc02929f48da4a2cc32568d6905a0db346) Add space to readme. (@whatknight)
- [b27da86](https://github.com/contra/react-responsive/commit/b27da8658410a4a069858f9d1cd0c684f9a2df96) Update docs with new feature. (@whatknight)
- [80fddd9](https://github.com/contra/react-responsive/commit/80fddd971f9239ba885fa9892a80cd5081f7e401) Add ability to render with a function as the component child. (@whatknight)

### v1.1.5 (2016/09/15 04:13 +00:00)
- [b6364b6](https://github.com/contra/react-responsive/commit/b6364b6157a9fca972cdb9170bed494b805948da) 1.1.5 (@contra)
- [#62](https://github.com/contra/react-responsive/pull/62) Fix for Uncaught Invariant Violation #56. (@rhavill)
- [3199bef](https://github.com/contra/react-responsive/commit/3199bef42f9d715701e276740bb997c2b474b51c) Added unit test to make sure MediaQuery render function can handle an empty array as children.
- [fdb34e8](https://github.com/contra/react-responsive/commit/fdb34e8d830bc6d405b07afceca1dfb117808591) Fix for Uncaught Invariant Violation #56. Return null from render function when MediaQuery has no children.
- [#61](https://github.com/contra/react-responsive/pull/61) Small fixes to indentation in README (@TSMMark)
- [b75d5d8](https://github.com/contra/react-responsive/commit/b75d5d8a89604c294f8bf43f6ec74974421eae31) small fixes to indentation in README (@TSMMark)
- [eac6444](https://github.com/contra/react-responsive/commit/eac6444d4059268b4744679edd209e484d222758) 1.1.4 (@contra)
- [#58](https://github.com/contra/react-responsive/pull/58) Doesn't throw error with empty children (@nkov)
- [df33365](https://github.com/contra/react-responsive/commit/df333655bdb658d2046289ac19e7153594cb8cd9) doesnt throw error with empty children (@nkov)

### v1.1.3 (2016/04/25 17:03 +00:00)
- [ba1cb39](https://github.com/contra/react-responsive/commit/ba1cb39afa5259bda12ffe0dd7c57919c535397e) 1.1.3 (@contra)
- [#53](https://github.com/contra/react-responsive/pull/53) Always wrap children if it's a string. (@whatknight)
- [23f35cb](https://github.com/contra/react-responsive/commit/23f35cb2f4b9c906c267854077cb00f298c89e41) Always wrap children if it's a string. (@whatknight)
- [02dd120](https://github.com/contra/react-responsive/commit/02dd120d5f22acc744edca34723a0ec9131dc8d3) add dev dep for react (@contra)
- [#52](https://github.com/contra/react-responsive/pull/52) Add testing with jsdom. (@whatknight)
- [#51](https://github.com/contra/react-responsive/pull/51) Fix bug where string would cause invariant error. (@whatknight)
- [55707f1](https://github.com/contra/react-responsive/commit/55707f103ac9d53441943e80b96f0ece1b189ba5) Add testing with jsdom. (@whatknight)
- [7dacb42](https://github.com/contra/react-responsive/commit/7dacb423884bc00aefc5579674f498af0eede79a) Fix bug where string would cause invariant error. (@whatknight)

### v1.1.2 (2016/04/08 05:07 +00:00)
- [8d03ff0](https://github.com/contra/react-responsive/commit/8d03ff03e69d2c967a4c0c522523d0dc7af7c960) 1.1.2 (@contra)
- [#47](https://github.com/contra/react-responsive/pull/47) Bump react peer dependency to allow v15 (@cesarandreu)
- [87619fe](https://github.com/contra/react-responsive/commit/87619fe29ab529cd9e6b4e8a1a22dfc820b11a34) Bump react peer dependency to allow v15 (@cesarandreu)
- [#46](https://github.com/contra/react-responsive/pull/46) Use API to examine number of children (@jdlehman)
- [6c75c26](https://github.com/contra/react-responsive/commit/6c75c26970b2f4f58bdf947e379f487bcf660845) Use API to examine number of children (@jdlehman)
- [c82c671](https://github.com/contra/react-responsive/commit/c82c67172b9dbd17dcdc6dbd918cb1568423661c) 1.1.1 (@contra)
- [#39](https://github.com/contra/react-responsive/pull/39) fixed usage of Object.assign for older browsers (@pekeler)
- [ce639c9](https://github.com/contra/react-responsive/commit/ce639c9b61944add8a9a51e2b0accbdf89e7dea2) fixed usage of Object.assign for older browsers (@pekeler)

### v1.1.0 (2016/01/10 23:53 +00:00)
- [cfff39a](https://github.com/contra/react-responsive/commit/cfff39a73e1f8ffa48d8a74ac2a1d5816255e4ca) 1.1.0 (@contra)
- [#37](https://github.com/contra/react-responsive/pull/37) Without lodash (@pekeler)
- [ea47d21](https://github.com/contra/react-responsive/commit/ea47d21e49b91693c3aaecbc7af2706459dbfa0e) reverted spelling, dist (@pekeler)
- [26e540d](https://github.com/contra/react-responsive/commit/26e540d8e718d842e363807e8fef1d07b6eda6c3) reverted spelling (@pekeler)
- [1cd1947](https://github.com/contra/react-responsive/commit/1cd1947d71693b40e6afa784a93a5a52199d4128) readded old react versions (@pekeler)
- [#38](https://github.com/contra/react-responsive/pull/38) reverted stupid spelling (@pekeler)
- [996f15e](https://github.com/contra/react-responsive/commit/996f15eca95e735de7cdeb7c04c9eb3e8615f710) reverted stupid spelling (@pekeler)
- [#36](https://github.com/contra/react-responsive/pull/36) Newer dependencies (@pekeler)
- [83f461b](https://github.com/contra/react-responsive/commit/83f461bc6e2e7bdcd79c90e0c8064d850b452a1d) replaced lodash.omit with own implementation to reduce total file size (@pekeler)
- [4534c1f](https://github.com/contra/react-responsive/commit/4534c1fe9666987a864e1d769635407d120fcb33) make npm test work (@pekeler)
- [5cd9036](https://github.com/contra/react-responsive/commit/5cd9036e65c0f1b48c2268b73158e627013aade1) updated to latest dependecies, sample can't be easily backwards compatible with old react versions so we focus on the latest react (@pekeler)
- [29d0d08](https://github.com/contra/react-responsive/commit/29d0d081a352f8723507245ea9f223a144895650) more readme info (@contra)

### v1.0.1 (2015/11/13 20:28 +00:00)
- [b4ce24e](https://github.com/contra/react-responsive/commit/b4ce24ea423c062dfd4bace514b5614e119eb96c) 1.0.1 (@contra)
- [#32](https://github.com/contra/react-responsive/pull/32) Add children to excluded keys (@ch2ch3)
- [30b3f9f](https://github.com/contra/react-responsive/commit/30b3f9f8278bad15aad8b3fa8f393138c99b5610) Add children to excluded keys (@ch2ch3)

### v1.0.0 (2015/11/09 23:48 +00:00)
- [a20d7f3](https://github.com/contra/react-responsive/commit/a20d7f3f43758400cb266a8aadab7b4dede843e6) 1.0.0 (@contra)
- [#30](https://github.com/contra/react-responsive/pull/30) Do not require a component to wrap MediaQuery children (@jdlehman)
- [27c09e5](https://github.com/contra/react-responsive/commit/27c09e565d98f902d798ffd2f7348f1b5d71d54f) Pass props to single child even if not using a wrapper (@jdlehman)
- [56ecbb2](https://github.com/contra/react-responsive/commit/56ecbb26d014464b00fc1c0893b74a4e18b65225) Add documentation for component prop (@jdlehman)
- [4543f17](https://github.com/contra/react-responsive/commit/4543f172a744402c5dd4a686acfad49baf9ee47a) Do not require a component to wrap MediaQuery children (@jdlehman)

### v0.0.10 (2015/10/08 22:50 +00:00)
- [62af1d5](https://github.com/contra/react-responsive/commit/62af1d564767e7997af628b4764e330b8d29dae1) 0.0.10 (@contra)
- [#28](https://github.com/contra/react-responsive/pull/28) support react 0.14 (@0x80)
- [d1dc1e9](https://github.com/contra/react-responsive/commit/d1dc1e9d0a3c67427a368c9cc3f27f6493a4f2c6) support react 0.14 (@0x80)
- [#26](https://github.com/contra/react-responsive/pull/26) Allow for react 0.14.0-rc1 as peer-dependency (@npasserini)
- [b3e687d](https://github.com/contra/react-responsive/commit/b3e687d96fc6fbe28ddf421e6b7ca62e6434142e) Allow for react 0.14.0-rc1 as peer-dependency (@npasserini)

### v0.0.8 (2015/08/13 20:18 +00:00)
- [969736a](https://github.com/contra/react-responsive/commit/969736a6c4583fbf41a30bfeb94b470f01af9a2f) 0.0.8 (@contra)
- [#18](https://github.com/contra/react-responsive/pull/18) There is possible memory leak and bug leads to many listeners. It is … (@vavdav)
- [d435265](https://github.com/contra/react-responsive/commit/d4352658b07718d7286b71603eb4fef790d8bf12) There is possible memory leak and bug leads to many listeners. It is necessary to remove listener before creating new object. (@vavdav)
- [#17](https://github.com/contra/react-responsive/pull/17) Add support for React 0.14.0-beta1 (@frederickfogerty)
- [45861f7](https://github.com/contra/react-responsive/commit/45861f7dea95a4b7486be7949b7e08bee24bed74) Update package.json (@frederickfogerty)
- [84fb5a8](https://github.com/contra/react-responsive/commit/84fb5a849845c77ecdbd2a8c89524241a83f33b3) Add support for React 0.14.0-beta1 (@frederickfogerty)
- [#16](https://github.com/contra/react-responsive/pull/16) Use `hyphenate-style-name` module instead of React internal (@rexxars)
- [7046106](https://github.com/contra/react-responsive/commit/704610624d1ede95c0043e43a4be8fa6346315c3) Use `hyphenate-style-name` module instead of React internal (@rexxars)

### v0.0.7 (2015/07/22 06:22 +00:00)
- [4050ab3](https://github.com/contra/react-responsive/commit/4050ab3041ea7075e2f59c5a5acd95451d648aaa) 0.0.7 (@contra)
- [413b4e0](https://github.com/contra/react-responsive/commit/413b4e0c6b42b2f7ecf3d6a26566c4bc12d18c40) fix version range (@contra)
- [e1dc870](https://github.com/contra/react-responsive/commit/e1dc870ef10573b063248b105788dcbe8c3953af) Update package.json (@contra)

### v0.0.6 (2015/03/30 17:12 +00:00)
- [e9214ce](https://github.com/contra/react-responsive/commit/e9214cecfe74be5c5f9d8a7ba7d2e49c3221794c) 0.0.6 (@contra)
- [7bcb9b5](https://github.com/contra/react-responsive/commit/7bcb9b5595f1a6b759b2231717b97cfe4a111630) fix linting (@contra)
- [#12](https://github.com/contra/react-responsive/pull/12) Provide more flexible React peer dependency range (@colindresj)
- [7db99e3](https://github.com/contra/react-responsive/commit/7db99e321db4f4c24b7da759bb4247658208ec2f) Provide more flexible React peer dependency range (@colindresj)
- [#11](https://github.com/contra/react-responsive/pull/11) switch to matchmedia module for client/server abstraction (@phated)
- [7d05ab6](https://github.com/contra/react-responsive/commit/7d05ab60e7feb53d118ea94f92e5103bdae08627) change names to MediaQuery and add `all` type (@phated)
- [39ab71d](https://github.com/contra/react-responsive/commit/39ab71d2f60a238ae3ac78bc485f804f2e2fc07e) add type property (@phated)
- [6c6054a](https://github.com/contra/react-responsive/commit/6c6054a48df4620c301f31ffe6e456f0a2000142) update readme (@phated)
- [48e6c5d](https://github.com/contra/react-responsive/commit/48e6c5d6c3b8360603f2aeabb599b3c601cb74b9) update reactify, add example, use React.PropTypes.shape to define values (@phated)
- [759154b](https://github.com/contra/react-responsive/commit/759154bfb098aed3be707086d0448ec39cc42ffe) switch to matchmedia module for client/server abstraction (@phated)

### v0.0.5 (2015/02/17 23:42 +00:00)
- [72f4e25](https://github.com/contra/react-responsive/commit/72f4e250a311dfae0e2de95de6ae337a6a67cc9b) 0.0.5 (@contra)
- [acef7f0](https://github.com/contra/react-responsive/commit/acef7f0a437cba4c23e72e9c4e6bbf4bb0c6ccf9) lint fixes (@contra)
- [#10](https://github.com/contra/react-responsive/pull/10) fix usage of idiomatic react props (@ChrisSki)
- [27e9f25](https://github.com/contra/react-responsive/commit/27e9f25191bc119a11d6d3a1c2ae3ed22deb1b89) remove propTypes: types (@ChrisSki)
- [6f4b364](https://github.com/contra/react-responsive/commit/6f4b364718b3e031c24aff7dcd5f08419760f8a3) actually remove types this time (@ChrisSki)
- [dcdea6a](https://github.com/contra/react-responsive/commit/dcdea6a30efe29fa3fbc2b6e90c3164e29dcf0e1) remove types prop (@ChrisSki)
- [207a385](https://github.com/contra/react-responsive/commit/207a385ce17b2e21d22206d6dbfb9e09594c8c9b) fix usage of idiomatic react props (@ChrisSki)

### v0.0.4 (2015/02/09 09:15 +00:00)
- [4f91d06](https://github.com/contra/react-responsive/commit/4f91d063f1d4b3f739e261aa54d090a5bb5cb402) 0.0.4 (@contra)
- [609e3ae](https://github.com/contra/react-responsive/commit/609e3ae14dcbb8d0d99337c54ffbaba5514e77be) fix linter (@contra)
- [#9](https://github.com/contra/react-responsive/pull/9) mergeInto removed and window checked (@fvitullo)
- [c9eef42](https://github.com/contra/react-responsive/commit/c9eef42c24bf584e2bdc44150351d21d6db3ae1e) fixes #7
- [26f2e95](https://github.com/contra/react-responsive/commit/26f2e95b811ae4b81bc7654723b9d8fc57fc8e50) mergeInto replaced with object-assign

### v0.0.3 (2015/02/04 01:12 +00:00)
- [dcdb812](https://github.com/contra/react-responsive/commit/dcdb81278f20ede8e8e51fae07c8182ddd149cc3) 0.0.3 (@contra)
- [33fbeff](https://github.com/contra/react-responsive/commit/33fbeff74c3388d14765f8ee5a1125a09b676d8a) closes #6 (@contra)

### v0.0.2 (2015/01/27 20:11 +00:00)
- [085d2f3](https://github.com/contra/react-responsive/commit/085d2f353d0d0457359c199381f152796c5e155c) 0.0.2 (@contra)
- [f5674b6](https://github.com/contra/react-responsive/commit/f5674b602f575f9c50e1a37f0cbdd6ede2216fec) react 0.12 (@contra)
- [d6c4a4b](https://github.com/contra/react-responsive/commit/d6c4a4b29529a53e0a0c44358c23195dd0314f84) readme (@contra)
- [d713f0b](https://github.com/contra/react-responsive/commit/d713f0bf4c19bb6cdc54ec23c9dcb1d5d57f8071) docs (@contra)
- [af44f6c](https://github.com/contra/react-responsive/commit/af44f6c4914a62ca5fadbb770ab7c9b533eb294d) respond to prop changes (@contra)
- [1413782](https://github.com/contra/react-responsive/commit/14137828b3ea46d6d6fad317cd80550142afa949) basically done (@contra)
- [ec2ed95](https://github.com/contra/react-responsive/commit/ec2ed950203fa79d63a2b97cd24e2147d95df56c) start on js -> mq thing (@contra)
- [c145e0b](https://github.com/contra/react-responsive/commit/c145e0b1c72c331033ce50da632cc3392914dd0f) fixdemo (@contra)
- [ef59366](https://github.com/contra/react-responsive/commit/ef59366b7bc5482286978db358344875591ab200) demo (@contra)
- [8c08276](https://github.com/contra/react-responsive/commit/8c08276194109441d5766e83fe5d455d0a5dc9c1) yo (@contra)
- [891ed6e](https://github.com/contra/react-responsive/commit/891ed6ed57eb89c1de4b03d52519269f6cbac9e9) fix readme (@contra)
- [dc3fb1b](https://github.com/contra/react-responsive/commit/dc3fb1bdaf6d5f4f080a59c7981f760f9cb5ef13) initial (@contra)
