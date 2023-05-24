# [1.6.0](https://github.com/shuttleday/shuttleday/compare/v1.5.3...v1.6.0) (2023-05-24)


### Features

* inject frontend envvars at runtime ([d282ff6](https://github.com/shuttleday/shuttleday/commit/d282ff6a899023f8d11fbcd2eb10a802d3d34d41))

## [1.5.3](https://github.com/shuttleday/shuttleday/compare/v1.5.2...v1.5.3) (2023-05-22)


### Bug Fixes

* token detection fixed ([e6f5021](https://github.com/shuttleday/shuttleday/commit/e6f5021bdcaf8d3a75d9fa98d5a4e165c2c3ac14))

## [1.5.2](https://github.com/shuttleday/shuttleday/compare/v1.5.1...v1.5.2) (2023-05-10)


### Bug Fixes

* "No sessions" component added ([be41fbf](https://github.com/shuttleday/shuttleday/commit/be41fbf86536acf48303420208ac12a3720e5cea))
* loading bug fixed for edit page ([6129a69](https://github.com/shuttleday/shuttleday/commit/6129a69b7b7442b597716334b30a02d49f8cd8e1))

## [1.5.1](https://github.com/shuttleday/shuttleday/compare/v1.5.0...v1.5.1) (2023-05-02)


### Bug Fixes

* prevent players from leaving after session end ([4e8ba9e](https://github.com/shuttleday/shuttleday/commit/4e8ba9ed757a79ab327cfb3ea8d2cfddaefda5cd))

# [1.5.0](https://github.com/shuttleday/shuttleday/compare/v1.4.7...v1.5.0) (2023-05-02)


### Bug Fixes

* added 2 day restriction for bailing ([3fcfb9e](https://github.com/shuttleday/shuttleday/commit/3fcfb9e0afbf2d2564c922c6eb2eb17b2277cdc6))
* ensure game session end date is after start date ([09c5409](https://github.com/shuttleday/shuttleday/commit/09c5409cf92ad9c95b66a9af38cd1b7b1e70686e))


### Features

* deny session exit 48 hours before start date ([dd95811](https://github.com/shuttleday/shuttleday/commit/dd95811a9c47d763b7122256793abcae428937b9))

## [1.4.7](https://github.com/shuttleday/shuttleday/compare/v1.4.6...v1.4.7) (2023-05-01)


### Bug Fixes

* add admin check to patch game sessions ([3953243](https://github.com/shuttleday/shuttleday/commit/3953243275d6787bc61326e7c9fd7b4f56893fd4))
* added disclaimer for login page ([b832158](https://github.com/shuttleday/shuttleday/commit/b83215850df34c87873298ac5a2a55674838a67a))

## [1.4.6](https://github.com/shuttleday/shuttleday/compare/v1.4.5...v1.4.6) (2023-05-01)


### Bug Fixes

* **ci:** correct expression syntax ([059703b](https://github.com/shuttleday/shuttleday/commit/059703b4c560bfc32830e101f799bb404a5c9f50))
* **ci:** correct syntax for if condition ([a034455](https://github.com/shuttleday/shuttleday/commit/a03445511a4385f4abfa568bd45082eb537388d4))
* **ci:** move provenence flag to build and push action ([e7c15a5](https://github.com/shuttleday/shuttleday/commit/e7c15a52bfc402ed3b043d6e7aa8b425569ec2bc))
* **ci:** prevent publishing unknown OS/Arch ([7b0d189](https://github.com/shuttleday/shuttleday/commit/7b0d189a05deb21650cf7026e2e7897865a44926)), closes [/github.com/docker/build-push-action/issues/820#issuecomment-1486849546](https://github.com//github.com/docker/build-push-action/issues/820/issues/issuecomment-1486849546)
* **ci:** use correct syntax for job outputs ([7d8d6bb](https://github.com/shuttleday/shuttleday/commit/7d8d6bb68c637a3938e6f5d884ee80fbf641ca1c))

## [1.4.5](https://github.com/shuttleday/shuttleday/compare/v1.4.4...v1.4.5) (2023-04-30)


### Bug Fixes

* **infra:** redirect 404 errors to index.html ([811f02b](https://github.com/shuttleday/shuttleday/commit/811f02b1388cb7c9c468a1dadcfea0718be57a6c))

## [1.4.4](https://github.com/shuttleday/shuttleday/compare/v1.4.3...v1.4.4) (2023-04-29)


### Bug Fixes

* **ci:** move env vars to correct step ([953f140](https://github.com/shuttleday/shuttleday/commit/953f140746c18b44b95babf28facbaa238f768a2))

## [1.4.3](https://github.com/shuttleday/shuttleday/compare/v1.4.2...v1.4.3) (2023-04-29)


### Bug Fixes

* **ci:** inject frontend envvars at build time ([8c01693](https://github.com/shuttleday/shuttleday/commit/8c01693f90a933dff9363cd66a1ad8ad586cc109))

## [1.4.2](https://github.com/shuttleday/shuttleday/compare/v1.4.1...v1.4.2) (2023-04-29)


### Bug Fixes

* add nginx conf for dockerfile ([fa8e2f8](https://github.com/shuttleday/shuttleday/commit/fa8e2f8904d9123710d309d87a7015b421ae9e50))

## [1.4.1](https://github.com/shuttleday/shuttleday/compare/v1.4.0...v1.4.1) (2023-04-29)


### Bug Fixes

* **ci:** expose port 80 on frontend docker image ([85b026e](https://github.com/shuttleday/shuttleday/commit/85b026ed0f0a7b339a75bbdee24dfe18f3581f6b))

# [1.4.0](https://github.com/shuttleday/shuttleday/compare/v1.3.5...v1.4.0) (2023-04-29)


### Bug Fixes

* **ci:** allow dry runs on staging branch ([1a51e60](https://github.com/shuttleday/shuttleday/commit/1a51e604506b9c9bc4669cecd92344d529425587))
* **ci:** only use {{version}} for rc tags ([08dbe92](https://github.com/shuttleday/shuttleday/commit/08dbe9242c07102a4236011dd16fae37d157e3ea))
* **ci:** remove env vars from npm build ([454a2ec](https://github.com/shuttleday/shuttleday/commit/454a2ec4eed4ed419d6cbf0aebb8535567bc52f5))
* **ci:** rename deploy stage ([cdac8c5](https://github.com/shuttleday/shuttleday/commit/cdac8c5999cbc87718fcb3db4ea1989dafebcf7a))
* **ci:** run semantic-release only after deploy job ([ffd5f85](https://github.com/shuttleday/shuttleday/commit/ffd5f8512bec2dba62ebcc10d0a5e18e75952731))
* **ci:** use pnpm for get-next-version ([d7609c7](https://github.com/shuttleday/shuttleday/commit/d7609c7e160e5eaf484ae0ecdd0c3b1e9ef8f297))
* **ci:** use pnpm get-next-version in release workflow ([ca59948](https://github.com/shuttleday/shuttleday/commit/ca59948ffff3d2a7f38f77f2dacc98d31f4d5ec3))
* **ci:** use unique ids for steps ([78c6b1c](https://github.com/shuttleday/shuttleday/commit/78c6b1c2fe1f0fcd9319d2e14bc313993975ac99))


### Features

* add origin for cors ([05de16a](https://github.com/shuttleday/shuttleday/commit/05de16a0b7d3e551212651c581637a8f227e68bf))

## [1.3.5](https://github.com/shuttleday/shuttleday/compare/v1.3.4...v1.3.5) (2023-04-28)


### Bug Fixes

* **ci:** remove typo in git tag arg ([8b9be67](https://github.com/shuttleday/shuttleday/commit/8b9be677c935b8aab504d150f66dfc16a67283ff))
* **ci:** use dynamic workflow name ([5ef5f6f](https://github.com/shuttleday/shuttleday/commit/5ef5f6f0894774df671cd0ebc55c7efb2a819c60))

## [1.3.4](https://github.com/shuttleday/shuttleday/compare/v1.3.3...v1.3.4) (2023-04-28)


### Bug Fixes

* **ci:** remove needs option ([f2031c4](https://github.com/shuttleday/shuttleday/commit/f2031c440dccb498f208d9a33afea205ba793191))

## [1.3.3](https://github.com/shuttleday/shuttleday/compare/v1.3.2...v1.3.3) (2023-04-28)


### Bug Fixes

* **ci:** remove path checking ([17fe43f](https://github.com/shuttleday/shuttleday/commit/17fe43f7f24356016c3250661e69d2d4ab858566))
* **ci:** rename main ci ([e670fc7](https://github.com/shuttleday/shuttleday/commit/e670fc7f7d8b0e7024772238bcdde5826d44a381))
* **ci:** workflow level path checks ([b1622e7](https://github.com/shuttleday/shuttleday/commit/b1622e7d8410cef16b6dc132b4b17f04b4244054))

## [1.3.2](https://github.com/shuttleday/shuttleday/compare/v1.3.1...v1.3.2) (2023-04-28)


### Bug Fixes

* creating session will auto join session ([35ecc33](https://github.com/shuttleday/shuttleday/commit/35ecc33d59cd66a7c5c5e7c6365cc113d1ae154b))
* edit qr bug fixed ([a545e53](https://github.com/shuttleday/shuttleday/commit/a545e53d4f589235a0c30973b6406e3e1665cae3))

## [1.3.1](https://github.com/shuttleday/shuttleday/compare/v1.3.0...v1.3.1) (2023-04-28)


### Bug Fixes

* use host email when retrieving qr code ([9329da5](https://github.com/shuttleday/shuttleday/commit/9329da5148f1eefe10ec77e93b560f7fc2df463d))

# [1.3.0](https://github.com/shuttleday/shuttleday/compare/v1.2.2...v1.3.0) (2023-04-28)


### Bug Fixes

* **ci:** ensure only pushes or dispatches trigger semantic release job ([9412bec](https://github.com/shuttleday/shuttleday/commit/9412becac80075f865793e1a0fe3f01f1ef106f0))
* display for host qr changed ([6dc5bc3](https://github.com/shuttleday/shuttleday/commit/6dc5bc32974ba4f3897d2c50b4a5b65457149b99))
* fixed edit page preset values ([7e7166c](https://github.com/shuttleday/shuttleday/commit/7e7166c13f3be1cc97adacfd94b8f857bd6f9a25))
* fixed user speed dial ([39166a5](https://github.com/shuttleday/shuttleday/commit/39166a5b7f669be856652aed21dd603dd4e7c024))
* user speed dial render fixed ([ba88dca](https://github.com/shuttleday/shuttleday/commit/ba88dca497d986fdf4c07d17f7ee4ead8e25b424))


### Features

* added credits and title to login page ([44d9f25](https://github.com/shuttleday/shuttleday/commit/44d9f251aed14ba6dde2cbaf3aac7bd0d43275c8))
* admin qr update completed ([5f1147c](https://github.com/shuttleday/shuttleday/commit/5f1147ce23296dd358c87706bf5d4fb4ef5e0025))
* color indicators added ([8ef2828](https://github.com/shuttleday/shuttleday/commit/8ef28281bdd333fac5b79f8ffd205bc384441cfb))
* completed [#29](https://github.com/shuttleday/shuttleday/issues/29) ([bf6daa3](https://github.com/shuttleday/shuttleday/commit/bf6daa3cd288dcefdaf8fd557d759e3118d5b4ce))
* create sessions and edit additional field ([ad7f160](https://github.com/shuttleday/shuttleday/commit/ad7f160954044d6aa963881cb88311c0fd3d9b35))
* Credits page implemented and styled ([755cb82](https://github.com/shuttleday/shuttleday/commit/755cb822ae99a294c7b46e2c7572f2dd028ab645))
* display version number for [#21](https://github.com/shuttleday/shuttleday/issues/21) completed ([996dd7e](https://github.com/shuttleday/shuttleday/commit/996dd7e56d33c3f2b325a4ffc802a576f825fdfb))
* implemented logout feature ([4bf9285](https://github.com/shuttleday/shuttleday/commit/4bf9285be87d514c2759ae32605fe757c015eb6e))
* QR upload page completed ([4aafc97](https://github.com/shuttleday/shuttleday/commit/4aafc9703efb2e031fdbba9fe0122ba79e823c62))
* receipt page moved into homepage ([be0ea2e](https://github.com/shuttleday/shuttleday/commit/be0ea2e550735ef60b665a0e5e9adc9db42a49e6))

## [1.2.2](https://github.com/shuttleday/shuttleday/compare/v1.2.1...v1.2.2) (2023-04-28)


### Bug Fixes

* **ci:** reference git tag correctly for deploy job ([e68dcf9](https://github.com/shuttleday/shuttleday/commit/e68dcf94ce1b1a9f0ca9461f34b133d23e7fa4b8))

## [1.2.1](https://github.com/shuttleday/shuttleday/compare/v1.2.0...v1.2.1) (2023-04-28)


### Bug Fixes

* **ci:** add checkout step for k8s trigger job ([0566912](https://github.com/shuttleday/shuttleday/commit/056691253d225d8df1870e81c41162cffb9af6c4))

# [1.2.0](https://github.com/shuttleday/shuttleday/compare/v1.1.14...v1.2.0) (2023-04-28)


### Features

* add comments for git tag steps ([ce3542b](https://github.com/shuttleday/shuttleday/commit/ce3542b996f7bcff78663bb9502ad584b0e70110))

## [1.1.14](https://github.com/shuttleday/shuttleday/compare/v1.1.13...v1.1.14) (2023-04-28)


### Bug Fixes

* **ci:** add git fetch prune unshallow to get tag ([6f25f4d](https://github.com/shuttleday/shuttleday/commit/6f25f4d2b8a9c4bee462770b2824bc96d1b463eb))

## [1.1.13](https://github.com/shuttleday/shuttleday/compare/v1.1.12...v1.1.13) (2023-04-28)


### Bug Fixes

* **ci:** update git ref to origin ([55f171d](https://github.com/shuttleday/shuttleday/commit/55f171d20b99e5a5298877edc047e37caeb22d6d))

## [1.1.12](https://github.com/shuttleday/shuttleday/compare/v1.1.11...v1.1.12) (2023-04-28)


### Bug Fixes

* **ci:** manually git pull semantic release commit ([258791e](https://github.com/shuttleday/shuttleday/commit/258791eba59c433d75fec3fafd707c0e67eda18c))

## [1.1.11](https://github.com/shuttleday/shuttleday/compare/v1.1.10...v1.1.11) (2023-04-28)


### Bug Fixes

* **ci:** remove fetch depth for dockerize checkout ([f6a13a8](https://github.com/shuttleday/shuttleday/commit/f6a13a8126d95a872149077f33da088f0846d2b2))

## [1.1.10](https://github.com/shuttleday/shuttleday/compare/v1.1.9...v1.1.10) (2023-04-28)


### Bug Fixes

* **ci:** remove fetch depth option for checkout ([41c0c70](https://github.com/shuttleday/shuttleday/commit/41c0c70e8c54e5b7ed311c083484bd9e299bfac5))
* **ci:** rename transpile step ([eea4d22](https://github.com/shuttleday/shuttleday/commit/eea4d229560eb37a4d3865f63573eef96908be82))

## [1.1.9](https://github.com/shuttleday/shuttleday/compare/v1.1.8...v1.1.9) (2023-04-28)


### Bug Fixes

* **ci:** fetch tags after sem release ([6a9f75f](https://github.com/shuttleday/shuttleday/commit/6a9f75fd14cd5ca2658248d1ddaddc19e366bfe1))

## [1.1.8](https://github.com/shuttleday/shuttleday/compare/v1.1.7...v1.1.8) (2023-04-27)


### Bug Fixes

* **ci:** fetch latest tag ([ef7614f](https://github.com/shuttleday/shuttleday/commit/ef7614ff1e65489052716f722543c736744b1186))


### Reverts

* Revert "fix(ci): remove skip ci for release commits" ([593d40f](https://github.com/shuttleday/shuttleday/commit/593d40f7434b92fdfc89a37f279b691db000b484))

## [1.1.7](https://github.com/shuttleday/shuttleday/compare/v1.1.6...v1.1.7) (2023-04-27)


### Bug Fixes

* **ci:** update docker tags ([cca8747](https://github.com/shuttleday/shuttleday/commit/cca8747de029e40fc0e0c67b99875eb893d27629))
* **ci:** use value ([f55062b](https://github.com/shuttleday/shuttleday/commit/f55062b53f113636c1a6bf2e2c3d6aba7360139a))

## [1.1.6](https://github.com/shuttleday/shuttleday/compare/v1.1.5...v1.1.6) (2023-04-27)


### Bug Fixes

* **ci:** revert changes and reference semver var ([4eb7769](https://github.com/shuttleday/shuttleday/commit/4eb7769a3eabd8c06be739a443bdf77afed79278))


### Reverts

* Revert "test docker push" ([9a559c9](https://github.com/shuttleday/shuttleday/commit/9a559c9a52c6d30b0e8666b9d352f33124d846ce))

## [1.1.5](https://github.com/shuttleday/shuttleday/compare/v1.1.4...v1.1.5) (2023-04-27)


### Reverts

* Revert "chore(release): 1.1.4" ([2505d6b](https://github.com/shuttleday/shuttleday/commit/2505d6b46639106c8e79363392dbdff56604992d))

## [1.1.3](https://github.com/shuttleday/shuttleday/compare/v1.1.2...v1.1.3) (2023-04-27)


### Bug Fixes

* **ci:** change package name ([05100cb](https://github.com/shuttleday/shuttleday/commit/05100cb353a21e9e804a2593b71cfcb90bc10ab8))
* **ci:** correct input field name ([c8e8dcb](https://github.com/shuttleday/shuttleday/commit/c8e8dcb248a679c4fcc1f2aa53a0aaad9ddc67d9))

## [1.1.2](https://github.com/shuttleday/shuttleday/compare/v1.1.1...v1.1.2) (2023-04-27)


### Bug Fixes

* **ci:** correct syntax for paths trigger ([923d701](https://github.com/shuttleday/shuttleday/commit/923d701da0713abc6ccec57c3a8a2e6a472ba3b6))
* **ci:** strip v from git tag ([323530b](https://github.com/shuttleday/shuttleday/commit/323530bc73beabdd48b1a669db55d4e2a6230f37))

## [1.1.1](https://github.com/shuttleday/shuttleday/compare/v1.1.0...v1.1.1) (2023-04-27)


### Bug Fixes

* **ci:** prevent semantic-release hitting secondary rate limit ([639802d](https://github.com/shuttleday/shuttleday/commit/639802dee26877dc61991ec4c82c24e86d9d4fa7)), closes [/github.com/semantic-release/semantic-release/issues/2204#issuecomment-1486299917](https://github.com//github.com/semantic-release/semantic-release/issues/2204/issues/issuecomment-1486299917)


### Performance Improvements

* run processUploadedFiles at middleware level ([f0dd353](https://github.com/shuttleday/shuttleday/commit/f0dd35327e16b1db8f27b635649b357fd843adbf))

# [1.1.0](https://github.com/shuttleday/shuttleday/compare/v1.0.5...v1.1.0) (2023-04-27)


### Bug Fixes

* **ci:** complete backend pipeline logic ([7adcae7](https://github.com/shuttleday/shuttleday/commit/7adcae736aeb4069b0b91d1e22f9207376bc2ff6))
* **ci:** correct syntax for paths ([8f80bb4](https://github.com/shuttleday/shuttleday/commit/8f80bb42a79083ea6fa89d3f612d8d724777ec71))
* **ci:** correct syntax for paths ([c67d899](https://github.com/shuttleday/shuttleday/commit/c67d8992c45e2b8f5645dc4c8d69b724861cce37))
* **ci:** remove v from git tag ([22f7aee](https://github.com/shuttleday/shuttleday/commit/22f7aee542c98caf491a2bc212c0b4f7ef9ae403))


### Features

* add fileExt to file upload routes ([f5babbb](https://github.com/shuttleday/shuttleday/commit/f5babbb588e6147af20e367d88349e8af462e694))
* add support for pdf uploads ([373a3f9](https://github.com/shuttleday/shuttleday/commit/373a3f95dfdf6889d54a1fd4082b11b9639db130)), closes [#33](https://github.com/shuttleday/shuttleday/issues/33)

## [1.0.5](https://github.com/shuttleday/shuttleday/compare/v1.0.4...v1.0.5) (2023-04-26)


### Performance Improvements

* **ci:** remove checkout step ([7e54a4e](https://github.com/shuttleday/shuttleday/commit/7e54a4eb4569a6161e41348999787aa4c454c1e7))

## [1.0.4](https://github.com/shuttleday/shuttleday/compare/v1.0.3...v1.0.4) (2023-04-26)


### Bug Fixes

* check mimetype from bytes ([5bb4bf0](https://github.com/shuttleday/shuttleday/commit/5bb4bf0de6bf7da40d7ad579a5a7f8fc37c1d64a))

## [1.0.3](https://github.com/shuttleday/shuttleday/compare/v1.0.2...v1.0.3) (2023-04-26)


### Bug Fixes

* **ci:** use correct Dockerfile path ([4bfd537](https://github.com/shuttleday/shuttleday/commit/4bfd537ddd53023f6db69dd043ed429bd7b4ea21))

## [1.0.2](https://github.com/shuttleday/shuttleday/compare/v1.0.1...v1.0.2) (2023-04-26)


### Bug Fixes

* **ci:** correct reusable workflow syntax ([1cf5d39](https://github.com/shuttleday/shuttleday/commit/1cf5d3983dd7766a5b5a2df297e87eff95de4b3d))
* **ci:** install frontend deps ([4ea2f53](https://github.com/shuttleday/shuttleday/commit/4ea2f534c18ab4b2b26fcf0802185f20b4d0fac6))
* **ci:** provide perms for semantic release ([70cea19](https://github.com/shuttleday/shuttleday/commit/70cea1979f50de8ce1b77d88b4be7a40a68837b5))
* **ci:** remove recursive flag ([bac33c4](https://github.com/shuttleday/shuttleday/commit/bac33c42ae70b33279233d90ca3b78c709ae6713))
* **ci:** use correct target path for aws s3 sync ([4af0f5f](https://github.com/shuttleday/shuttleday/commit/4af0f5f516e860aace14a7361706d9520630d36f))
* **ci:** use updated OIDC role ([66022f3](https://github.com/shuttleday/shuttleday/commit/66022f3635343fb8bcf31316de03392c6df77cfc))
* use more verbose mongodb conn logging ([ee9da93](https://github.com/shuttleday/shuttleday/commit/ee9da9318c0c61aa4449e9b1c8d24b8e65182378))

## [1.0.1](https://github.com/shuttleday/shuttleday/compare/v1.0.0...v1.0.1) (2023-04-25)


### Bug Fixes

* add argument to script ([887f6a2](https://github.com/shuttleday/shuttleday/commit/887f6a2d406dc026a02d777c47131d84d677d060))
* if condition syntax ([33d9484](https://github.com/shuttleday/shuttleday/commit/33d948475f73f27e8658af39c0f714bfe211a45c))
* specify path for backend package.json ([7bc3210](https://github.com/shuttleday/shuttleday/commit/7bc3210b17b319cd330a145db221f73ade1fd9da))
* use absolute path for npm ([227c04e](https://github.com/shuttleday/shuttleday/commit/227c04e110687f7967ec849f363c4248a84dc736))
* use pnpm action ([8c594ca](https://github.com/shuttleday/shuttleday/commit/8c594ca076ae5245f4a7ff538db389ea29cc3aef))


### Reverts

* Revert "ci: conditionally run dockerize step" ([53d1baa](https://github.com/shuttleday/shuttleday/commit/53d1baa8cf8eb52bdcd0d45e1ee7ce2f22dc5144))
* Revert "fix: escape $ in jenkinsfile" ([4ce16d8](https://github.com/shuttleday/shuttleday/commit/4ce16d84c42a8b553f18663c848eac62dcadd09e))
