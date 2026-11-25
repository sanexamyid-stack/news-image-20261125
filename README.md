# news-image-20261125

[![make.fun · news-image-20261125](https://make.fun/badge/news-image-20261125.svg)](https://make.fun/bounty/news-image-20261125?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)
[![rank](https://make.fun/badge/news-image-20261125/sanexamyid-stack/news-image-20261125/rank.svg)](https://make.fun/bounty/news-image-20261125/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)
[![reward](https://make.fun/badge/news-image-20261125/sanexamyid-stack/news-image-20261125/reward.svg)](https://make.fun/bounty/news-image-20261125?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)

One picture that sums up the world news of Wednesday 25 November 2026,
built as the front page of a one-day newspaper. The hero collage — a
halftone tanker threading a mined strait between paper cliffs — carries
the day's top story, tankers hitting mines in the Strait of Hormuz.
Around it sit the rest of the day: Nvidia's 7% slide as AI doubts hit
stocks, Pakistan's first astronaut reaching China's space station aboard
Shenzhou-24, and Senegal restored as Africa Cup champions, with a ticker
of the day's remaining headlines along the bottom.

The artwork was made as a text-free paper collage (flat teal paper field,
black-and-white halftone cut-outs, cardstock accents, cream keylines) and
every letter on the page was typeset locally afterwards, so the date —
25 NOVEMBER 2026, in the masthead, impossible to miss — is exactly the
day the page reports. The finished page is stored as `entry.png` (JPEG
bytes under a .png name, which the gate allows) at 1024 × 1024 and
269,886 bytes.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` checks the stored page before it writes anything: it confirms
the PNG-or-JPEG signature, the exact recorded byte size and the
competition's 1 MiB cap, then copies the page to `entry.png` in the
output directory and reads the copy back to prove it landed whole.
Running it twice produces the same bytes both times.

The reporting behind the page — headlines, sources and one-line facts —
is kept in `news-notes.md`.
