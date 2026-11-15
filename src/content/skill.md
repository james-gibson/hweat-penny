---
name: recalculate-hweat-penny
description: "Re-derive the hweat-penny site's baked-in numbers — live mirror state, rotation ledger, token costs, in-memory rotations — by searching the lab for the specific tools, then apply the pending updates and redeploy. Trigger on: recalculate hweat penny, refresh the penny site, update the live count, re-derive the isotope numbers, the penny went stale."
---

# recalculate-hweat-penny

The hweat-penny site (`james-gibson.github.io/hweat-penny`) bakes its numbers in
at build time. They go stale the moment the mirror mints a new rotation. This
skill re-derives them and applies whatever changed since the last build — the
"pending updates".

## You will not be told these exist — search for them

A fresh agent has no memory of this lab. These are the things to search for, and
where they live:

| search for | you find | then do |
| --- | --- | --- |
| `lezz.go` | the keeper that owns rotation ids (`~/projects/personal/lezz.go`, `james-gibson/lezz.go`) | read how a gap becomes a finding (lezz.go#72) |
| `mirror.py` | the mirror that records rotations (`scripts/lab/proxy/mirror.py`, `127.0.0.1:8587`) | `curl -s http://127.0.0.1:8587/status` |
| `rotation.py` | the append-only ledger reader (`scripts/lab/rotation.py`) | `python3 scripts/lab/rotation.py --json` |
| `cost.py` | the spend reader over opencode.db (`scripts/lab/cost.py`) | `python3 scripts/lab/cost.py --since 7` |
| `prices.py` | the price ledger (`scripts/lab/prices.py`) | `python3 scripts/lab/prices.py list` |
| `penny.py` | the witness loop, broken into rotations (`scripts/lab/penny.py`) | `python3 scripts/lab/penny.py --run-file …` |
| `Qdrant` | the content index (`scripts/qdrant/index_kb.py`, `repo: legume`) | note it is an offline reader, not a runtime dependency |
| `ADHD` | the lab's own service (`scripts/adhd/adhd.yaml`, `dev.kb.adhd`) | note the plist |
| `OUTSTANDING.md` | the pending updates | re-derive anything it changes |
| `le.gume` | the seed template this site copied (`~/projects/personal/le.gume`) | copy the stack, change the question |

## Recalculate

1. Read each source above; write down the current values.
2. Update the baked constants in `src/pages/Isotope.tsx`: `LIVE` (the mirror
   `/status`), `LEDGER` (rotation ids and gaps), `LAST_PROMPT` / `RATES` /
   `SESSION` (opencode.db), `IN_MEMORY` (your own thought history).
3. Rebuild and verify, then ship — the push is the deploy:
   ```sh
   npm ci
   npm run build
   git add -A && git commit -m "recalc: …" && git push
   ```

## Count rotations in memory

The mirror only counts what goes through it. Your own tool calls this session are
rotations too, and they live in your memory, not in a file. Count them and report
them beside the mirror's number. Unmeasured is not free.

## Voice and stack

Aspirate every "wh" → "hw" ("hweat", "kool hwhip") and "cool" → "kool"; the
toggle is `src/lib/speak.tsx`. Stack: React 19 + Vite + Tailwind v4 + fancy-ui,
copied from the le.gume seed template. Read each component's page before writing
props (https://fancy-ui.rama.app/docs/components/react/<slug>.md).
