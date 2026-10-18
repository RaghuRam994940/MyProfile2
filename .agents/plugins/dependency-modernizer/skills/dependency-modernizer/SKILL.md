---
name: dependency-modernizer
description: Targeted operational workflow for checking outdated packages, resolving security advisories, and modernizing project dependencies deterministically.
---

# Dependency Modernizer Skill

## Operational Workflow

1. **Audit Current Dependencies**:
   - Inspect active package manifest (`package.json`, `requirements.txt`, `pyproject.toml`, etc.).
   - Check for obsolete or vulnerable packages (`npm audit`, `pip check`, or automated scanner).

2. **Compatibility & Risk Analysis**:
   - Verify breaking changes and semantic versioning (`semver`) boundaries before bumping major versions.
   - Run existing unit/integration tests before applying upgrades.

3. **Incremental Upgrade**:
   - Upgrade non-breaking patches and minor dependencies first.
   - Run build and test suites to verify system integrity.
   - Update major versions individually with regression testing.
