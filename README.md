# 무선모듈 HW 설계 지식 베이스

WiFi · BT/BLE · Zigbee/Thread · NFC · Wi-Fi HaLow **무선모듈 하드웨어**를 처음부터 끝까지 다루는 오픈 지식 베이스입니다. RF 기초부터 회로·PCB·안테나 설계, 검증·인증, 양산까지 계층적으로 정리해, 하드웨어 설계를 처음 하는 사람도 **고려해야 할 항목을 빠뜨리지 않고** 따라갈 수 있도록 만들었습니다.

## 특징

- 순수 정적 사이트 (HTML/CSS/JS, **빌드 도구·서버 불필요**)
- 반응형 (데스크톱/모바일), 다크·라이트 테마
- 전체 검색, 계층형 사이드바, 섹션 딥링크
- 전 사이트 체크 항목을 자동 집계한 **종합 설계 체크리스트**
- 전체 **인쇄 / PDF 내보내기**
- SVG 다이어그램 (리턴전류, CPWG 단면, 설계 흐름도 등)

## 로컬에서 보기

빌드가 필요 없습니다. 둘 중 하나:

```bash
# 1) 파이썬 정적 서버
python -m http.server 8765
# → http://localhost:8765

# 2) 그냥 index.html 더블클릭 (브라우저로 열기)
```

## 단일 파일로 공유하기 (standalone)

CSS·JS·콘텐츠를 한 파일에 합친 **`wireless-kb-standalone.html`** 을 만들면,
그 파일 하나만 보내도(메일 첨부·USB 등) 어디서든 브라우저로 바로 열립니다.

```bash
node build-standalone.js
# → wireless-kb-standalone.html 생성 (콘텐츠 수정 후 다시 실행하면 최신본 재생성)
```

> 온라인이면 웹폰트(Pretendard)까지 적용되고, 오프라인이면 시스템 폰트로 대체됩니다.
> 공개 배포본에서는 같은 파일을 아래에서도 받을 수 있습니다:
> `https://whiteshoes365.github.io/wireless-solution-design-knowhow/wireless-kb-standalone.html`

## GitHub Pages 배포

이 저장소는 정적 파일만 있으므로 GitHub Pages에 그대로 올라갑니다.

1. GitHub에 저장소를 만들고 푸시합니다 (아래 명령 참고).
2. 저장소 **Settings → Pages** 로 이동.
3. **Build and deployment → Source: Deploy from a branch** 선택.
4. **Branch: `main` / `/(root)`** 선택 후 Save.
5. 잠시 후 `https://<사용자명>.github.io/<저장소명>/` 에서 공개됩니다.

```bash
# 최초 1회: GitHub CLI 재인증
gh auth login

# 저장소 생성 + 푸시 (공개)
gh repo create wireless-module-kb --public --source=. --remote=origin --push
```

> 모든 경로가 상대경로라 `/<저장소명>/` 하위 경로에서도 정상 동작합니다.

## 구조

```
index.html              진입점
assets/
  data/content.js       ← 모든 콘텐츠(지식)가 트리 구조로 집중
  js/app.js             렌더링 · 검색 · 라우팅 · 인쇄 · 테마
  css/styles.css        스타일 · 반응형 · 인쇄용 CSS
  favicon.svg, og-image.svg
.nojekyll               GitHub Pages Jekyll 처리 비활성화
robots.txt
```

## 경쟁사 BM 분석기 (로컬 전용 도구)

`bm-analyzer.html` 은 브라우저에서 **Claude API를 직접 호출**해 경쟁 모듈 데이터를
비교 장표 + So-What 인사이트로 분석하는 도구입니다. 지식 사이트와 별개의 앱입니다.

- 사용: 파일을 브라우저로 열고 → Anthropic API 키 입력(브라우저에만 저장) → 데이터 붙여넣기 → 분석 실행
- ⚠️ **사내/로컬 전용.** 입력 데이터는 분석 시 Anthropic API로 전송되므로 회사 정책을 먼저 확인하고,
  API 키·경쟁 데이터·결과(`bm-output/`)는 공개 저장소에 커밋하지 마세요.

## 콘텐츠 추가/수정

지식은 전부 `assets/data/content.js` 한 파일의 트리에 있습니다.

```
chapter (대분류) → section (중분류) → blocks[] (콘텐츠 단위)
```

블록에 항목을 추가하면 사이드바·검색·체크리스트에 자동 반영됩니다.
블록 타입: `p` `h` `list` `check` `table` `kv` `note(tip|warn|why|info)` `fig(svg)` `autocheck`.

## 라이선스

문서 콘텐츠 및 코드의 이용 범위는 저장소 소유자 정책에 따릅니다.
