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
