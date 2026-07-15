# Graphock

Graphock 是 Graphock 项目的公开综合仓库，用于社区模板、公开文档、许可证/第三方声明，以及后续发行索引。

本仓库公开可读，但不等于对仓库内所有内容授予统一开源许可。复用代码、文档、模板、发行元数据或第三方声明前，请先阅读 [LICENSE_POLICY.md](LICENSE_POLICY.md)。

## 当前范围

- `community/templates/` 存放已审核的社区模板投稿。
- `schemas/` 存放从 `graphock-harness-spec` 同步的 canonical schema 公开副本，要求字节完全一致。
- `docs/` 是公开文档索引。
- `licenses/` 和 `THIRD_PARTY_NOTICES.md` 记录许可证与随发行分发的第三方材料。
- `releases/` 预留给发行元数据和校验和，不提交大型二进制文件。

## 验证

```bash
npm ci
npm run validate
```

验证脚本会检查 schema lock 与社区模板结构。空模板目录是合法状态；在 `LICENSE_POLICY.md` 明确批准模板许可 allowlist 前，外部模板投稿不会被静默接受。

## 模板投稿

社区模板通过 `community/templates/` 下的 Pull Request 投稿。请阅读 [community/templates/README.md](community/templates/README.md) 和 [CONTRIBUTING.md](CONTRIBUTING.md)。
