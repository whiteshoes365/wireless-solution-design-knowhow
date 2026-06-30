/**
 * 무선모듈 HW 설계 지식 베이스 — 콘텐츠 데이터
 *
 * 구조(계층):
 *   chapter (대분류)
 *     └─ section (중분류)
 *          └─ blocks[] (실제 콘텐츠 단위)
 *
 * blocks 타입:
 *   { t:'p',     html }                      문단 (HTML 허용)
 *   { t:'h',     text }                      소제목
 *   { t:'list',  items:[], ordered:false }   목록
 *   { t:'table', head:[], rows:[[]] }        표
 *   { t:'note',  kind:'tip|warn|why|info', title, html }  강조 박스
 *   { t:'check', items:[] }                  체크리스트
 *   { t:'kv',    rows:[[k,v]] }              용어/정의 표
 *
 * 지식을 추가할 때: 해당 section.blocks 에 블록을 덧붙이거나,
 * 새 section / 새 chapter 를 추가하면 사이드바·검색에 자동 반영됩니다.
 */

window.KB_CONTENT = {
  meta: {
    title: "무선모듈 HW 설계 지식 베이스",
    subtitle: "WiFi · BT/BLE · Zigbee/Thread · NFC · Wi-Fi HaLow 하드웨어 개발 노하우",
    version: "0.1",
    updated: "2026-06-30"
  },

  chapters: [
    /* ───────────────────────── 0. 시작하기 ───────────────────────── */
    {
      id: "intro",
      icon: "🧭",
      title: "0. 시작하기",
      sections: [
        {
          id: "intro-overview",
          title: "이 문서의 목적과 사용법",
          blocks: [
            { t: "p", html: "이 지식 베이스는 가전·IoT 제품에 들어가는 <b>무선통신 모듈(RF 모듈)</b>의 하드웨어를 처음부터 끝까지 설계·검증·양산하는 전 과정을 다룹니다. RF 설계를 한 번도 해보지 않은 사람도 <b>고려해야 할 항목을 빠뜨리지 않고</b> 순서대로 따라갈 수 있도록 계층적으로 구성했습니다." },
            { t: "note", kind: "why", title: "왜 '계층형'인가", html: "RF 설계는 한 곳(예: 안테나)만 잘해도 다른 곳(예: 그라운드, 전원)이 무너지면 전체 성능이 나옵니다. 그래서 <b>기초 개념 → 프로토콜 특성 → 설계 프로세스 → 세부 기술(전원/매칭/PCB/안테나) → 검증/인증 → 양산</b> 순으로 층을 쌓습니다. 아래층을 모르면 위층에서 반드시 사고가 납니다." },
            { t: "h", text: "읽는 순서 추천" },
            { t: "list", items: [
              "<b>처음이라면</b>: 1장(RF 기초) → 3장(설계 프로세스) 흐름부터 잡으세요.",
              "<b>특정 프로토콜 과제</b>: 2장에서 해당 규격 특성 → 4·5·6장 세부 설계로.",
              "<b>문제 해결 중</b>: 7장(검증/디버깅) 또는 8장(양산/이원화)으로 바로.",
            ]},
            { t: "note", kind: "tip", title: "기여(업데이트) 방법", html: "콘텐츠는 <code>assets/data/content.js</code> 한 파일에 트리로 정리돼 있습니다. 블록을 추가하면 사이드바·검색에 자동 반영됩니다. 측정값·디버깅 사례 같은 '노하우'는 해당 섹션 맨 아래에 <code>note(kind:'tip')</code>로 누적하세요." },
          ]
        },
        {
          id: "intro-bigpicture",
          title: "무선모듈 HW 개발 전체 그림",
          blocks: [
            { t: "p", html: "하나의 무선모듈이 제품에 탑재되기까지의 큰 흐름입니다. 각 단계 박스를 누르면 해당 장으로 이동합니다." },
            { t: "fig",
              caption: "무선모듈 HW 개발 흐름. 각 단계는 앞 단계의 결정에 의존하므로 순서대로 따라가되, 인증 지역·전류 예산처럼 초기에 확정해야 할 항목을 놓치지 마세요. 박스 클릭 시 해당 장으로 이동.",
              svg: '<svg viewBox="0 0 620 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="무선모듈 HW 개발 단계 흐름도">'
                + '<defs><marker id="flw" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#4aa3ff"/></marker></defs>'
                + (function(){
                    var steps=[
                      {t:'요구사항',h:'#proc-requirements'},{t:'솔루션 선정',h:'#proc-selection'},
                      {t:'회로 설계',h:'#ckt-power'},{t:'PCB 설계',h:'#pcb-stackup'},
                      {t:'안테나',h:'#ant-types'},{t:'검증',h:'#ver-measure'},
                      {t:'인증',h:'#ver-cert'},{t:'양산',h:'#prod-gates'}
                    ];
                    var bw=130,bh=38,gapx=20,gapy=40,perRow=4,sx=40,sy=44;
                    var out='';
                    steps.forEach(function(s,k){
                      var row=Math.floor(k/perRow), col=k%perRow;
                      var x=sx+col*(bw+gapx), y=sy+row*(bh+gapy);
                      out+='<a href="'+s.h+'">'
                        +'<rect x="'+x+'" y="'+y+'" width="'+bw+'" height="'+bh+'" rx="8" fill="#4aa3ff" fill-opacity="0.14" stroke="#4aa3ff" stroke-opacity="0.6"/>'
                        +'<text x="'+(x+bw/2)+'" y="'+(y+bh/2+5)+'" text-anchor="middle" class="fig-label" style="fill:#4aa3ff">'+(k+1)+'. '+s.t+'</text>'
                        +'</a>';
                      if(col<perRow-1 && k<steps.length-1){
                        var ax=x+bw, ay=y+bh/2;
                        out+='<line class="kb-flow" x1="'+ax+'" y1="'+ay+'" x2="'+(ax+gapx)+'" y2="'+ay+'" stroke="#4aa3ff" stroke-width="2" marker-end="url(#flw)"/>';
                      }
                    });
                    var rx=sx+(perRow-1)*(bw+gapx)+bw/2, ry1=sy+bh, ry2=sy+bh+gapy;
                    out+='<path class="kb-flow" d="M'+rx+','+ry1+' C '+rx+','+(ry1+18)+' '+(sx+bw/2)+','+(ry2-18)+' '+(sx+bw/2)+','+ry2+'" fill="none" stroke="#4aa3ff" stroke-width="2" marker-end="url(#flw)"/>';
                    out+='<text x="310" y="240" text-anchor="middle" class="fig-sub">각 단계는 게이트 리뷰로 누락을 점검 (EVT → DVT → PVT)</text>';
                    return out;
                  })()
                + '</svg>'
            },
            { t: "table",
              head: ["단계", "핵심 활동", "산출물", "흔한 함정"],
              rows: [
                ["요구사항 정의", "통신거리·전류·인증 지역·폼팩터 확정", "요구사항 명세", "전류 예산/인증 지역 누락"],
                ["솔루션 선정", "RF SoC/모듈 후보 비교·수배", "BOM 초안, 칩 선정서", "재고/EOL/이원화 미고려"],
                ["회로 설계", "전원·RF FE·매칭·필터·MCU IF", "회로도(schematic)", "디커플링/매칭 토폴로지 누락"],
                ["PCB 설계", "스택업·임피던스·그라운드·배치", "Gerber, 스택업표", "RF 라인 임피던스/리턴패스 오류"],
                ["안테나", "종류 선정·배치·튜닝", "안테나 BOM, 튜닝값", "근접 금속/배터리 영향 무시"],
                ["검증", "도전(導電)/방사 측정, EMC, OTA", "측정 리포트", "치구·교정 오류로 오판"],
                ["인증", "지역별 규제 인증(전파/안전)", "인증서", "지역별 채널/출력 차이 누락"],
                ["양산", "EVT/DVT/PVT, 수율, 이원화", "양산 승인", "양산 산포·벤더 편차"],
              ]
            },
            { t: "note", kind: "warn", title: "초심자가 가장 많이 놓치는 3가지", html: "①<b>리턴 패스(귀환 전류 경로)</b> — 신호선만 그리고 그라운드를 신경 안 씀. ②<b>전류 예산</b> — 평균 전류만 보고 송신 순간 피크 전류를 놓침. ③<b>인증 지역</b> — 미국(FCC)/유럽(CE/RED)/한국(KC)마다 허용 채널·출력이 달라 설계 후반에 재작업." },
          ]
        }
      ]
    },

    /* ───────────────────────── 1. RF 기초 ───────────────────────── */
    {
      id: "rf-basics",
      icon: "📡",
      title: "1. RF·무선통신 기초",
      sections: [
        {
          id: "rf-fundamentals",
          title: "꼭 알아야 할 RF 기본 개념",
          blocks: [
            { t: "note", kind: "info", title: "비유로 먼저", html: "RF 신호 전송은 <b>수도 배관</b>과 같습니다. 송신기(펌프)에서 안테나(분수)까지 물(전력)을 흘리는데, 배관 굵기(임피던스)가 중간에 바뀌면 물이 튕겨 되돌아옵니다(반사). 50Ω은 '표준 배관 굵기' 약속입니다." },
            { t: "fig",
              caption: "같은 시간 동안 2.4GHz와 5GHz가 진행하는 모습. 주파수가 높을수록 파장(λ)이 짧다 — 5GHz는 같은 거리에 더 많은 파동이 들어간다. 안테나 크기·라인 손실이 주파수에 따라 달라지는 이유.",
              svg: '<svg viewBox="0 0 620 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="2.4GHz와 5GHz 파장 비교 애니메이션">'
                + (function(){
                    function wave(y0,hp,amp,count,x0,cls){
                      var d='M'+x0+','+y0+' q '+(hp/2)+',-'+amp+' '+hp+',0';
                      for(var i=1;i<count;i++){ d+=' t '+hp+',0'; }
                      return '<path class="'+cls+'" d="'+d+'" fill="none" stroke="#4aa3ff" stroke-width="3"/>';
                    }
                    var out='';
                    out+='<text x="40" y="40" class="fig-label" style="fill:#4aa3ff">2.4 GHz — 긴 파장 (λ ≈ 12.5cm)</text>';
                    out+=wave(72,64,20,9,40,'kb-flow-slow');
                    out+='<text x="40" y="130" class="fig-label" style="fill:#a371f7">5 GHz — 짧은 파장 (λ ≈ 6cm)</text>';
                    out+=wave(162,30,20,18,40,'kb-flow-slow').replace('#4aa3ff','#a371f7');
                    out+='<text x="310" y="198" text-anchor="middle" class="fig-sub">λ = c / f · 주파수↑ → 파장↓ → 안테나 작아짐, 라인 손실↑</text>';
                    return out;
                  })()
                + '</svg>'
            },
            { t: "kv", rows: [
              ["주파수(f)", "초당 진동 수. 2.4GHz = 초당 24억 번. 높을수록 직진성↑, 회절·투과↓"],
              ["파장(λ)", "λ = c/f. 2.4GHz ≈ 12.5cm, 5GHz ≈ 6cm. 안테나 크기의 기준"],
              ["임피던스(Z₀)", "RF 표준은 50Ω. 소스·전송선·부하가 모두 50Ω이어야 반사 최소"],
              ["반사계수(Γ)", "임피던스 불일치로 되돌아오는 비율. 0이 이상적"],
              ["VSWR", "정재파비. 1:1이 완벽, 2:1이면 약 11% 전력 반사. 보통 ≤2 목표"],
              ["리턴로스(S11)", "반사 손실(dB). -10dB면 90% 전달(반사 10%), -20dB면 99% 전달"],
              ["삽입손실(S21)", "통과 손실(dB). 필터·전송선 통과 시 잃는 전력"],
            ]},
            { t: "h", text: "dB(데시벨) — 반드시 손에 익혀야 함" },
            { t: "p", html: "RF는 신호가 µW~W로 범위가 넓어 로그 단위 dB를 씁니다. 곱셈이 덧셈이 되어 링크 버짓 계산이 쉬워집니다." },
            { t: "table",
              head: ["dB 변화", "전력 배율", "암기 포인트"],
              rows: [
                ["+3 dB", "×2", "전력 2배"],
                ["-3 dB", "×0.5", "전력 절반 (필터 차단점 기준)"],
                ["+10 dB", "×10", "10배"],
                ["+20 dB", "×100", "20dB마다 100배"],
                ["0 dBm", "1 mW", "dBm은 1mW 기준 절대 전력"],
                ["+20 dBm", "100 mW", "WiFi 일반 최대 출력 수준"],
              ]
            },
            { t: "note", kind: "tip", title: "현장 노하우", html: "링크 버짓은 단순 덧셈/뺄셈입니다. <b>Tx출력(dBm) − 케이블/매칭손실(dB) + 안테나이득(dBi) − 경로손실(dB) + Rx안테나이득 − Rx손실 = 수신전력(dBm)</b>. 이 값이 수신 감도(sensitivity)보다 여유(margin)를 두고 커야 통신이 됩니다. 앞쪽 <b>Tx출력 − 손실 + 안테나이득 = EIRP</b>이며, 규제는 이 EIRP에 한계를 둡니다. (설계 목표값은 3장 <a href='#proc-targets'>Target 정의</a> 참조)" },
          ]
        },
        {
          id: "rf-impedance-matching",
          title: "50Ω·임피던스 매칭이 핵심인 이유",
          blocks: [
            { t: "p", html: "RF에서 전력은 <b>임피던스가 일치할 때만 최대로 전달</b>됩니다. 불일치하면 반사되어 ①출력 저하 ②발열 ③칩 손상 ④방사 성능 저하가 발생합니다." },
            { t: "note", kind: "why", title: "왜 하필 50Ω?", html: "전력 전달이 최대인 임피던스(≈30Ω)와 손실이 최소인 임피던스(≈77Ω)의 절충값이 50Ω입니다. 업계 표준이라 칩·커넥터·측정장비가 모두 50Ω 기준으로 만들어집니다." },
            { t: "fig",
              caption: "정합(좌): 신호가 부하로 100% 전달되어 반사가 없다. 부정합(우): 임피던스 불일치 지점에서 일부가 되튕겨 돌아온다 → 출력 저하·발열·VSWR↑. 화살표 방향이 전력 흐름이다.",
              svg: '<svg viewBox="0 0 620 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="임피던스 정합과 부정합에서의 반사 비교">'
                + '<defs>'
                + '<marker id="rfF" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#2ea043"/></marker>'
                + '<marker id="rfB" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#e5534b"/></marker>'
                + '</defs>'
                + '<text x="155" y="26" text-anchor="middle" class="fig-label">정합 (50Ω = 50Ω)</text>'
                + '<rect x="40" y="56" width="60" height="44" rx="6" fill="#4aa3ff" fill-opacity="0.15" stroke="#4aa3ff" stroke-opacity="0.6"/><text x="70" y="82" text-anchor="middle" class="fig-sub" fill="#4aa3ff">소스</text>'
                + '<rect x="210" y="56" width="60" height="44" rx="6" fill="#2ea043" fill-opacity="0.15" stroke="#2ea043" stroke-opacity="0.6"/><text x="240" y="78" text-anchor="middle" class="fig-sub" fill="#2ea043">부하</text><text x="240" y="92" text-anchor="middle" class="fig-sub" fill="#2ea043">50Ω</text>'
                + '<line class="kb-flow" x1="105" y1="78" x2="205" y2="78" stroke="#2ea043" stroke-width="3" marker-end="url(#rfF)"/>'
                + '<text x="155" y="128" text-anchor="middle" class="fig-sub" fill="#2ea043">반사 없음 · 전력 100% 전달</text>'
                + '<line x1="310" y1="30" x2="310" y2="170" stroke="#7a8694" stroke-dasharray="4 4" opacity="0.4"/>'
                + '<text x="465" y="26" text-anchor="middle" class="fig-label" style="fill:#e5534b">부정합 (50Ω ≠ 부하)</text>'
                + '<rect x="350" y="56" width="60" height="44" rx="6" fill="#4aa3ff" fill-opacity="0.15" stroke="#4aa3ff" stroke-opacity="0.6"/><text x="380" y="82" text-anchor="middle" class="fig-sub" fill="#4aa3ff">소스</text>'
                + '<rect x="520" y="56" width="60" height="44" rx="6" fill="#e5534b" fill-opacity="0.15" stroke="#e5534b" stroke-opacity="0.6"/><text x="550" y="82" text-anchor="middle" class="fig-sub" fill="#e5534b">부하 ≠50Ω</text>'
                + '<line class="kb-flow" x1="415" y1="70" x2="515" y2="70" stroke="#2ea043" stroke-width="3" marker-end="url(#rfF)"/>'
                + '<line class="kb-flow-rev" x1="515" y1="90" x2="415" y2="90" stroke="#e5534b" stroke-width="2.5" marker-end="url(#rfB)"/>'
                + '<text x="465" y="128" text-anchor="middle" class="fig-sub" fill="#e5534b">일부 반사 → 출력↓·발열·VSWR↑</text>'
                + '<text x="310" y="200" text-anchor="middle" class="fig-sub">매칭 = 부하를 50Ω으로 보이게 만들어 반사를 0으로</text>'
                + '</svg>'
            },
            { t: "h", text: "어디서 매칭이 필요한가" },
            { t: "list", items: [
              "<b>RF 출력 핀 → 안테나</b>: π/L형 매칭 회로(직렬 L, 병렬 C 등)",
              "<b>발룬(Balun)</b>: 칩의 차동(differential) 출력 ↔ 안테나의 단동(single-ended) 변환",
              "<b>안테나 급전점</b>: 안테나 자체 임피던스를 50Ω으로 맞추는 매칭 패드(보통 π형 3소자 자리 확보)",
            ]},
            { t: "note", kind: "warn", title: "초심자 필수 — 매칭 자리 미리 확보", html: "설계 초기에 안테나 급전선에 <b>π형 매칭(3소자: shunt-series-shunt) 패드를 반드시 비워두세요</b>. 시제품에서 측정 후 부품값을 바꿔야 하는데, 자리가 없으면 PCB를 다시 떠야 합니다. 0Ω/NM(Not Mounted)로 깔아두는 것이 정석입니다." },
            { t: "note", kind: "tip", title: "스미스 차트", html: "매칭은 스미스 차트로 직관화합니다. 직렬 L은 시계방향, 직렬 C는 반시계방향, 병렬 소자는 어드미턴스 원을 따라 이동. VNA로 S11을 보며 중심(50Ω)으로 끌어오는 작업입니다. 자세한 절차는 다음 섹션에서 딥다이브합니다." },
          ]
        },
        {
          id: "rf-smith",
          title: "딥다이브 — 스미스 차트와 매칭 실전",
          blocks: [
            { t: "p", html: "<b>스미스 차트</b>는 복소 임피던스를 원 안의 한 점으로 표현해, L·C 소자를 추가할 때 임피던스가 어디로 움직이는지 <b>눈으로 따라가며</b> 50Ω(차트 중심)으로 끌어오게 해 주는 도구입니다. VNA의 S11을 보며 매칭하는 모든 작업의 언어입니다." },
            { t: "note", kind: "info", title: "비유로 먼저", html: "스미스 차트는 임피던스 세계의 <b>지하철 노선도</b>입니다. 목적지는 항상 한 곳 — 중심(50Ω). 직렬 소자는 '저항/리액턴스 노선', 병렬 소자는 '어드미턴스 노선'을 타고 이동합니다. 어떤 노선을 어느 방향으로 탈지(L이냐 C냐)를 정해 중심역까지 환승하는 게 매칭입니다." },

            { t: "h", text: "차트 읽는 법 — 좌표의 의미" },
            { t: "kv", rows: [
              ["중심점", "50Ω(정합 완료). 모든 매칭의 목표 지점. 여기선 반사 0(S11 = -∞)"],
              ["가로축", "순저항(real). 왼쪽 끝 0Ω(단락), 오른쪽 끝 ∞(개방)"],
              ["원 둘레", "순리액턴스(저항 0). 둘레에 가까울수록 반사↑. 둘레=전반사"],
              ["위쪽 반", "유도성(+jX, 인덕터 영역)"],
              ["아래쪽 반", "용량성(−jX, 커패시터 영역)"],
              ["등(等)VSWR 원", "중심을 둘러싼 원. 반지름이 클수록 VSWR·반사↑ (예: VSWR 2 원)"],
            ]},

            { t: "h", text: "소자별 이동 방향 (핵심 규칙)" },
            { t: "table",
              head: ["추가 소자", "보는 평면", "이동 방향", "비고"],
              rows: [
                ["직렬 인덕터 (L)", "임피던스(Z)", "저항원 따라 시계방향 ↻", "리액턴스 +"],
                ["직렬 커패시터 (C)", "임피던스(Z)", "저항원 따라 반시계 ↺", "리액턴스 −"],
                ["병렬 인덕터 (L)", "어드미턴스(Y)", "컨덕턴스원 따라 반시계 ↺", "서셉턴스 −"],
                ["병렬 커패시터 (C)", "어드미턴스(Y)", "컨덕턴스원 따라 시계 ↻", "서셉턴스 +"],
              ]
            },
            { t: "note", kind: "tip", title: "직렬↔병렬 = Z↔Y 평면 전환", html: "직렬 소자는 <b>임피던스(Z) 원</b>을 따라, 병렬 소자는 <b>어드미턴스(Y) 원</b>을 따라 움직입니다. 그래서 실무에선 Z와 Y 격자가 겹쳐진 <b>이미턴스(immittance) 차트</b>를 씁니다. '직렬을 넣었다 → Z원 / 병렬을 넣었다 → Y원'으로 평면을 갈아탄다고 기억하세요." },

            { t: "h", text: "L형 vs π형 매칭" },
            { t: "table",
              head: ["토폴로지", "소자 수", "장점", "단점/용도"],
              rows: [
                ["L형", "2 (직렬+병렬)", "최소 부품, 단순", "Q·대역폭을 자유 조정 불가. 임피던스 한 쌍 정합"],
                ["π형", "3 (병렬-직렬-병렬)", "Q·대역폭 조정 가능, 튜닝 자유도↑", "부품 1개 더. <b>안테나 급전부 표준</b>"],
                ["T형", "3 (직렬-병렬-직렬)", "특정 변환비에 유리", "DC 통과 등 용도별"],
              ]
            },
            { t: "note", kind: "warn", title: "왜 안테나엔 π형 자리를 비워두나", html: "안테나는 케이스·주변 금속으로 임피던스가 <b>실측 전엔 모릅니다</b>. π형(shunt-series-shunt) 3소자 패드를 0Ω/NM으로 깔아두면, 측정 후 L형으로 쓸지(한 자리 NM) π형 전체를 쓸지, 어느 소자를 L/C로 채울지 <b>보드 재제작 없이</b> 정할 수 있습니다. 이것이 양산 RF의 생명선입니다." },

            { t: "h", text: "매칭 실전 절차 (VNA 사용)" },
            { t: "list", ordered: true, items: [
              "VNA를 측정면(매칭 패드 위치)까지 <b>교정(cal)</b> — de-embedding으로 케이블·치구 손실 제거",
              "매칭 전 S11을 스미스 차트에 띄워 <b>현재 임피던스 점</b> 확인 (중심에서 얼마나·어느 방향으로 벗어났나)",
              "병렬 소자로 먼저 컨덕턴스원(g=1, 중심 지나는 원)에 올린 뒤, 직렬 소자로 중심까지 — 또는 그 반대 순서 결정",
              "레퍼런스 디자인 값을 시작점으로 부품을 바꿔가며 점이 중심으로 오는지 확인",
              "동작 대역 전체에서 S11 ≤ -10dB(VSWR ≤ 2) 만족하는지 — 대역폭(Q) 확인",
              "최종값으로 여러 샘플 산포 점검 (부품·조립 편차)",
            ]},
            { t: "note", kind: "tip", title: "Q와 대역폭", html: "매칭점이 차트 중심에서 멀수록(큰 변환비) 좁은 대역만 정합되고 <b>Q가 높아 대역폭이 좁아집니다</b>. WiFi처럼 넓은 대역(2.4G 전체, 5G 전체)을 정합하려면 한 번에 멀리 끌지 말고 <b>여러 소자로 나눠</b> 완만히 이동시켜 대역폭을 확보합니다." },
            { t: "note", kind: "info", title: "연결", html: "이 절은 1장 <a href='#rf-impedance-matching'>임피던스 매칭</a>의 실전편이며, 4장 <a href='#ckt-matching'>매칭·발룬 회로 배치</a>와 6장 <a href='#ant-tuning'>안테나 튜닝</a>에서 실제 부품으로 구현됩니다." },
          ]
        },
        {
          id: "rf-spectrum",
          title: "ISM 밴드와 주파수 배치",
          blocks: [
            { t: "p", html: "대부분의 가전 무선모듈은 <b>비면허(license-free) ISM 밴드</b>를 씁니다. 누구나 쓸 수 있어 간섭이 많고, 지역별 규제가 다릅니다." },
            { t: "table",
              head: ["밴드", "주파수", "주 용도", "특징"],
              rows: [
                ["Sub-GHz", "868/915 MHz 등", "Zigbee Sub-G, HaLow, 일부 IoT", "투과·도달거리↑, 안테나 큼, 지역별 주파수 상이"],
                ["2.4 GHz", "2400–2483.5 MHz", "WiFi, BT/BLE, Zigbee, Thread", "전세계 공통, 가장 혼잡"],
                ["5 GHz", "5150–5850 MHz", "WiFi 5/6", "대역폭↑·간섭↓, 직진성↑, DFS 규제"],
                ["6 GHz", "5925–7125 MHz", "WiFi 6E/7", "넓은 대역, AFC/저전력 규제"],
                ["NFC", "13.56 MHz", "NFC/RFID", "근접(수cm), 자기결합 방식"],
              ]
            },
            { t: "note", kind: "warn", title: "지역별 채널 차이", html: "2.4GHz도 채널 수가 다릅니다(미국 1–11, 유럽 1–13, 일본 14 포함). 5GHz는 DFS(기상레이더 회피)·실내전용 대역 규제가 지역마다 달라 <b>인증 지역을 설계 초기에 확정</b>해야 합니다." },
          ]
        }
      ]
    },

    /* ───────────────────────── 2. 프로토콜별 특성 ───────────────────────── */
    {
      id: "protocols",
      icon: "🔌",
      title: "2. 프로토콜별 HW 특성",
      sections: [
        {
          id: "proto-compare",
          title: "한눈에 비교",
          blocks: [
            { t: "table",
              head: ["규격", "밴드", "전형 출력", "거리", "전류 특성", "HW 포인트"],
              rows: [
                ["WiFi", "2.4/5/6G", "15–20 dBm", "수십 m", "Tx 피크 전류 큼(수백 mA~A)", "전원 강건성, 5G 매칭, 발열"],
                ["BT/BLE", "2.4G", "0–10 dBm", "10–30 m", "저전력, 버스트", "코인셀 가능, 안테나 효율 민감"],
                ["Zigbee/Thread", "2.4G(Sub-G)", "0–8 dBm", "10–100 m", "초저전력, 메시", "메시로 거리 확장, 공존성"],
                ["NFC", "13.56M", "—", "<10 cm", "리더 구동 전류", "코일 안테나·Q값·튜닝 콘덴서"],
                ["Wi-Fi HaLow", "Sub-G(900M대)", "지역별", "수백 m~km", "저전력 장거리", "Sub-G 안테나 크기, 지역 주파수"],
              ]
            },
            { t: "fig",
              caption: "송신기(좌)에서 나가는 신호가 규격별로 도달하는 거리(개략). 출력·주파수·메시 여부에 따라 도달 범위가 다르다. 파동이 퍼지는 모습은 방사를 나타낸다.",
              svg: '<svg viewBox="0 0 620 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="규격별 도달거리 비교">'
                + '<circle cx="60" cy="115" r="9" fill="#4aa3ff"/>'
                + '<circle class="kb-grow" cx="60" cy="115" r="16" fill="none" stroke="#4aa3ff" stroke-width="2"/>'
                + '<circle class="kb-grow kb-d2" cx="60" cy="115" r="16" fill="none" stroke="#4aa3ff" stroke-width="2"/>'
                + '<text x="60" y="150" text-anchor="middle" class="fig-sub" fill="#4aa3ff">송신기</text>'
                + (function(){
                    var rows=[['NFC','<10cm',95,'#e5534b'],['BLE','~10–30m',150,'#a371f7'],['Zigbee(메시)','~10–100m',230,'#2ea043'],['WiFi','수십 m',300,'#4aa3ff'],['Wi-Fi HaLow','수백 m–km',520,'#e3b341']];
                    var out='';var y=42;
                    rows.forEach(function(r,i){
                      var yy=y+i*34;
                      out+='<line x1="78" y1="'+yy+'" x2="'+(78+r[2]*0.9)+'" y2="'+yy+'" stroke="'+r[3]+'" stroke-width="6" stroke-linecap="round" opacity="0.85"/>';
                      out+='<text x="'+(78+r[2]*0.9+8)+'" y="'+(yy+4)+'" class="fig-sub" fill="'+r[3]+'">'+r[0]+' · '+r[1]+'</text>';
                    });
                    return out;
                  })()
                + '<text x="310" y="222" text-anchor="middle" class="fig-sub">도달거리: NFC ≪ BLE &lt; Zigbee ≈ WiFi ≪ HaLow (개략·환경 의존)</text>'
                + '</svg>'
            },
            { t: "note", kind: "info", title: "공존(Coexistence)", html: "WiFi와 BT/Zigbee는 같은 2.4GHz를 씁니다. 한 모듈/한 보드에 함께 있으면 서로 간섭하므로 <b>PTA(Packet Traffic Arbitration) 신호, 안테나 격리, 필터</b>로 공존 설계가 필요합니다. 다음 섹션에서 실전 딥다이브." },
          ]
        },
        {
          id: "proto-coex",
          title: "딥다이브 — 2.4GHz 공존·간섭 실전",
          blocks: [
            { t: "p", html: "2.4GHz는 WiFi·BT·Zigbee가 모두 몰리는 데다 전자레인지·이웃 AP까지 더해져 <b>가장 혼잡한 대역</b>입니다. 같은 제품 안에 여러 무선이 있으면(예: WiFi+BT 콤보) 서로를 막는 <b>자기 공존(in-device coexistence)</b> 문제가, 외부에는 환경 간섭이 발생합니다. 이 섹션은 '무엇이 왜 깨지는지'를 프로토콜 관점에서 봅니다(HW 구현은 4장 <a href='#ckt-filter-coex'>필터·공존</a>)." },
            { t: "note", kind: "info", title: "비유로 먼저", html: "2.4GHz는 <b>붐비는 카페</b>입니다. 옆 테이블(이웃 AP)·주방 소음(전자레인지)에, 내 일행끼리도 동시에 말하면(WiFi+BT 동시 송신) 아무도 못 알아듣습니다. 해결은 ①조용한 자리로(채널 선택) ②번갈아 말하기(시간 분할, PTA) ③귀 기울일 사람만(필터/격리)." },

            { t: "h", text: "2.4GHz 채널 지형" },
            { t: "list", items: [
              "WiFi 2.4G는 20MHz 폭 채널이 겹쳐 있어 <b>비중첩 채널은 1·6·11</b> 3개뿐",
              "BLE는 40개 채널(2MHz), 그중 <b>3개 광고채널(37/38/39)</b>은 WiFi 1·6·11 사이 틈에 배치되어 회피 설계됨",
              "Zigbee는 16개 채널(2MHz 간격) — WiFi와 겹치지 않는 채널 선택이 권장",
              "BLE/802.15.4는 <b>주파수 호핑·채널 회피</b>로 간섭을 피함",
            ]},
            { t: "fig",
              caption: "2.4GHz 대역에서 WiFi 비중첩 채널 1·6·11이 넓게 자리를 차지(깜빡임=점유). BLE는 작은 채널을 그 틈으로 옮겨다니며(호핑) 충돌을 회피한다. 같은 대역을 시간·주파수로 나눠 쓰는 모습.",
              svg: '<svg viewBox="0 0 620 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="2.4GHz WiFi 채널 점유와 BLE 호핑">'
                + '<text x="40" y="24" class="fig-label">2.4 GHz 대역 (2400–2483 MHz)</text>'
                + '<rect class="kb-pulse" x="60" y="62" width="120" height="78" rx="4" fill="#4aa3ff" fill-opacity="0.18" stroke="#4aa3ff" stroke-opacity="0.55"/><text x="120" y="106" text-anchor="middle" class="fig-sub" fill="#4aa3ff">WiFi ch1</text>'
                + '<rect class="kb-pulse kb-d2" x="250" y="62" width="120" height="78" rx="4" fill="#4aa3ff" fill-opacity="0.18" stroke="#4aa3ff" stroke-opacity="0.55"/><text x="310" y="106" text-anchor="middle" class="fig-sub" fill="#4aa3ff">WiFi ch6</text>'
                + '<rect class="kb-pulse kb-d4" x="440" y="62" width="120" height="78" rx="4" fill="#4aa3ff" fill-opacity="0.18" stroke="#4aa3ff" stroke-opacity="0.55"/><text x="500" y="106" text-anchor="middle" class="fig-sub" fill="#4aa3ff">WiFi ch11</text>'
                + '<line x1="40" y1="150" x2="580" y2="150" stroke="#7a8694" stroke-width="1.5"/>'
                + '<text x="40" y="168" class="fig-sub">2400</text><text x="580" y="168" text-anchor="end" class="fig-sub">2483</text>'
                + '<g><circle r="8" cy="44" fill="#a371f7"><animate attributeName="cx" values="50;215;560;405;215;50" dur="3.2s" calcMode="discrete" repeatCount="indefinite"/></circle>'
                + '<text x="50" y="40" class="fig-sub" fill="#a371f7"><animate attributeName="x" values="62;227;530;417;227;62" dur="3.2s" calcMode="discrete" repeatCount="indefinite"/>BLE</text></g>'
                + '<text x="310" y="192" text-anchor="middle" class="fig-sub" fill="#a371f7">BLE 광고채널(37·38·39)은 WiFi 틈으로 회피 · 주파수 호핑</text>'
                + '</svg>'
            },
            { t: "h", text: "간섭의 두 종류" },
            { t: "kv", rows: [
              ["자기 공존(in-device)", "한 제품의 WiFi↔BT가 서로의 수신기를 막음. 가까워서(수 cm) 강력 — PTA·필터·격리로 대응"],
              ["환경 간섭(external)", "이웃 AP·전자레인지·다른 IoT. 채널 선택·재전송·호핑으로 견딤"],
            ]},
            { t: "note", kind: "why", title: "왜 '내 안의 간섭'이 더 무서운가", html: "외부 간섭원은 거리만큼 약해지지만(경로손실), 같은 보드의 다른 무선은 <b>수 cm 거리라 신호가 매우 강해</b> 상대 수신기를 포화시킵니다. 그래서 colocation 간섭은 안테나 격리(isolation, dB)와 시간 분할(PTA), 필터로 적극 설계해야 합니다." },
            { t: "h", text: "공존 3대 기법 (프로토콜 관점)" },
            { t: "table",
              head: ["기법", "프로토콜 동작", "HW 의존"],
              rows: [
                ["시간 분할", "PTA가 송수신 시점 중재(콤보칩)", "PTA/coex GPIO 라인 연결"],
                ["주파수 회피", "채널 선택·호핑·AFH(적응 호핑)", "필터로 인접대역 보강"],
                ["공간 분리", "—", "안테나 이격·직교로 격리(isolation) 확보"],
              ]
            },
            { t: "note", kind: "tip", title: "검증 포인트", html: "공존 성능은 '동작한다'가 아니라 <b>동시 동작 시 throughput·PER 저하량</b>으로 봅니다. WiFi 다운로드 중 BT 오디오를 틀어 끊김·속도저하를 측정하는 식. 7장 <a href='#ver-emc'>EMC·공존</a> 시험과 연계." },
            { t: "note", kind: "info", title: "연결", html: "HW 구현(PTA 라인·필터·격리)은 4장 <a href='#ckt-filter-coex'>필터·공존 설계</a>, 안테나 격리는 6장 <a href='#ant-placement'>배치</a>, 측정은 7장 <a href='#ver-emc'>EMC·공존</a> 참조." },
          ]
        },
        {
          id: "proto-wifi",
          title: "WiFi — 전원·발열이 승부처",
          blocks: [
            { t: "p", html: "WiFi는 송신 순간 전류가 크게 튀어(피크 수백 mA~A) <b>전원 설계가 가장 중요</b>합니다. 전원이 약하면 송신 시 전압이 출렁여(droop) 재부팅·통신 끊김이 발생합니다." },
            { t: "check", items: [
              "전원: 송신 피크 전류를 견디는 LDO/DC-DC 용량 + 충분한 벌크/디커플링 커패시터",
              "5GHz/6GHz: 고주파일수록 PCB 전송선 손실 큼 → 라인 최단화, 저손실 기판 검토",
              "발열: PA 발열 경로(thermal via, 동박 면적) 확보",
              "안테나 2개 이상(MIMO/다이버시티) 시 격리(isolation) 확보",
            ]},
            { t: "note", kind: "tip", title: "노하우 누적란", html: "(여기에 실제 프로젝트에서 겪은 droop, 발열, 매칭 측정값 등을 기록)" },
          ]
        },
        {
          id: "proto-ble",
          title: "BT/BLE — 저전력·안테나 효율",
          blocks: [
            { t: "p", html: "BLE는 코인셀로도 동작할 만큼 저전력이지만, 그만큼 <b>안테나 효율과 매칭이 통신거리를 좌우</b>합니다. 출력이 작아 손실 1dB가 체감됩니다." },
            { t: "list", items: [
              "안테나 효율 저하 요인: 근접 금속/배터리, 작은 그라운드, 케이스 유전체",
              "DC-DC vs LDO: 코인셀 수명엔 DC-DC, 노이즈엔 LDO 트레이드오프",
              "Sleep 전류(µA 수준)까지 관리 — 누설 경로 점검",
            ]},
          ]
        },
        {
          id: "proto-zigbee",
          title: "Zigbee / Thread — 메시·공존",
          blocks: [
            { t: "p", html: "둘 다 IEEE 802.15.4(2.4GHz) 물리계층을 공유합니다. HW 관점에선 BLE와 유사한 저전력 설계 + <b>메시 네트워크</b>로 거리를 확장하는 점이 특징입니다." },
            { t: "note", kind: "info", title: "HW 공통점", html: "802.15.4 기반이라 안테나·매칭·전원 설계 원칙은 BLE와 거의 같습니다. 칩에 따라 BLE/Zigbee/Thread 멀티프로토콜 동시 지원(802.15.4 + BLE) SoC가 많습니다." },
          ]
        },
        {
          id: "proto-nfc",
          title: "NFC — 13.56MHz 코일 설계",
          blocks: [
            { t: "p", html: "NFC는 RF라기보다 <b>근거리 자기 결합(트랜스포머)</b>에 가깝습니다. 50Ω 전송선 개념 대신 <b>코일 인덕턴스·Q값·공진 튜닝</b>이 핵심입니다." },
            { t: "list", items: [
              "안테나 = PCB 코일(턴 수로 인덕턴스 결정)",
              "13.56MHz 공진을 위한 튜닝 커패시터 + EMC 필터",
              "Q값: 높으면 도달거리↑이나 대역폭↓(데이터율↓) — 절충 필요",
              "주변 금속이 인덕턴스를 떨어뜨림 → 페라이트 시트로 차폐",
            ]},
          ]
        },
        {
          id: "proto-halow",
          title: "Wi-Fi HaLow — Sub-GHz 장거리",
          blocks: [
            { t: "p", html: "Wi-Fi HaLow(802.11ah)는 900MHz대를 써서 <b>장거리·저전력·다수 노드</b>에 강합니다. 가전·IoT 확장에 주목받습니다." },
            { t: "note", kind: "warn", title: "Sub-GHz 주의", html: "주파수가 낮아 <b>파장이 길고 안테나가 큽니다</b>(λ≈33cm@900M). 소형 제품에선 안테나 효율 확보가 어렵고, <b>지역별 허용 주파수(미국 902–928, 유럽 863–868 등)가 달라</b> 안테나·매칭을 지역별로 분리해야 할 수 있습니다." },
          ]
        }
      ]
    },

    /* ───────────────────────── 3. 설계 프로세스 ───────────────────────── */
    {
      id: "process",
      icon: "🗺️",
      title: "3. HW 설계 프로세스",
      sections: [
        {
          id: "proc-requirements",
          title: "1단계 — 요구사항 정의",
          blocks: [
            { t: "p", html: "설계 전에 반드시 확정해야 할 항목들입니다. 후반에 바뀌면 재설계 비용이 큽니다." },
            { t: "check", items: [
              "통신 규격·동시지원 여부 (WiFi only? WiFi+BLE 콤보?)",
              "인증 지역 (KC/FCC/CE/...) — 채널·출력·인증항목 결정",
              "전원 조건 (입력 전압, 배터리 여부, 허용 전류 예산)",
              "통신거리·처리량(throughput) 목표",
              "<b>RF 설계 목표값</b> — 출력(EIRP/도전), EVM, 수신감도 등 (규격·지역 한계 기반, 다음 섹션)",
              "폼팩터(모듈 크기), 안테나 형태(내장 PCB/칩/외장)",
              "온도·환경 조건 (가전은 고온/습도/EMI 환경)",
              "원가 목표(BOM cost), 생산 수량",
            ]},
            { t: "note", kind: "warn", title: "전류 예산은 '피크'까지", html: "WiFi Tx 순간 피크는 평균의 수 배입니다. 평균 전류만 보고 전원을 설계하면 송신 시 전압 droop으로 재부팅합니다." },
          ]
        },
        {
          id: "proc-targets",
          title: "1.5단계 — 무선규격 설계 목표값(Target) 정의",
          blocks: [
            { t: "p", html: "요구사항이 정해지면, 다음은 <b>무선규격과 지역 규제가 강제하는 설계 목표값(target)</b>을 확정하는 단계입니다. <b>target power</b>가 대표적이며, 이 목표값들이 이후 칩 선정·PA·필터·안테나·검증을 모두 결정합니다. '얼마나 세게 쏠 수 있는가'와 '얼마나 깨끗하게 쏴야 하는가'가 규격으로 묶여 있습니다." },
            { t: "note", kind: "info", title: "비유로 먼저", html: "무선규격은 <b>도로 교통법</b>입니다. 차(신호)를 얼마나 빨리 몰 수 있는지(<b>최대 출력</b>)도 정하고, 차선을 넘지 말 것(<b>스펙트럼 마스크</b>), 매연 기준(<b>스퓨리어스·하모닉</b>)도 정합니다. 지역(국가)마다 제한속도가 다르듯 출력 한계도 지역마다 다릅니다." },

            { t: "h", text: "Target Power — 도전 출력 vs EIRP" },
            { t: "note", kind: "why", title: "EIRP = 도전출력 − 손실 + 안테나이득", html: "규제는 보통 <b>EIRP(등가등방복사전력)</b> 또는 'conducted + 안테나 이득'에 한계를 둡니다.<br><b>EIRP(dBm) = P<sub>conducted</sub>(dBm) − 경로/매칭/필터 손실(dB) + 안테나 이득(dBi)</b><br>즉 안테나 이득이 크면 칩 출력을 낮춰도 같은 EIRP가 나오고, 규제 한계를 넘기지 않으려면 <b>출력·이득·손실을 함께</b> 봐야 합니다. 'target power 정의 = 이 식의 각 항을 배분하는 일'입니다." },
            { t: "kv", rows: [
              ["도전 출력(Conducted)", "칩/PA 핀에서의 출력. 데이터시트·양산 테스트 기준"],
              ["방사 출력(Radiated)", "안테나에서 실제 나간 전력 (효율 반영)"],
              ["EIRP", "도전출력 − 손실 + 안테나이득. <b>규제·링크버짓의 기준</b>"],
              ["Target power", "규제 한계 − 마진 안에서, 전류·발열·EVM을 고려해 정한 설계 목표 출력"],
            ]},

            { t: "h", text: "지역·규격별 대표 출력 한계 (개략)" },
            { t: "table",
              head: ["대역/규격", "지역", "대표 한계(개략)", "비고"],
              rows: [
                ["2.4G WiFi/BT", "유럽(ETSI)", "20 dBm EIRP (100mW)", "전력밀도 제한 동반"],
                ["2.4G", "미국(FCC)", "도전 ~30dBm급, EIRP는 안테나이득 따라", "Part 15 규칙"],
                ["5G UNII", "지역·서브밴드별", "밴드마다 상이(일부 실내전용·DFS)", "UNII-1~4 구분"],
                ["Sub-G 868", "유럽", "대역별 ~14~27 dBm ERP", "<b>듀티사이클·LBT</b> 제약"],
                ["Sub-G 902–928", "미국", "FHSS/DTS 규칙별", "확산·호핑 요건"],
              ]
            },
            { t: "note", kind: "warn", title: "정확한 값은 반드시 최신 규정 확인", html: "위 표는 <b>개략값(설계 감 잡기용)</b>입니다. 실제 한계는 대역·변조·안테나이득·측정방식에 따라 달라지고 규정이 개정됩니다. 설계 목표는 <b>FCC Part 15, ETSI EN 300 328/440, KC 고시</b> 등 해당 지역 최신 규정과 인증기관 확인으로 확정하세요. (7장 <a href='#ver-cert'>인증</a>)" },

            { t: "h", text: "규격이 정하는 설계 파라미터 → 어디로 흐르나" },
            { t: "table",
              head: ["규격 파라미터", "의미", "설계에 미치는 영향(장)"],
              rows: [
                ["최대 출력 / EIRP", "지역별 송신 한계", "PA 선정·출력설정, 안테나이득 배분 → <a href='#ckt-frontend'>4장</a>·<a href='#ant-ota'>6장</a>"],
                ["EVM", "변조 품질 한계(MCS별)", "PA 선형성·전원무결성·클럭 위상잡음 → <a href='#ckt-pdn'>PDN</a>·<a href='#ckt-clock'>클럭</a>"],
                ["스펙트럼 마스크(SEM)/OBW", "점유 대역·인접 누설 한계", "변조·필터·출력 백오프 → <a href='#ckt-filter-coex'>필터</a>"],
                ["ACPR/ACLR", "인접 채널 누설", "PA 선형성·필터"],
                ["스퓨리어스/하모닉", "대역 외 방출 한계", "하모닉 필터·차폐·리턴경로 → <a href='#ver-emc-design'>EMC</a>"],
                ["수신 감도", "데이터율별 최소 수신", "LNA NF·안테나효율·desense → <a href='#ant-ota'>OTA</a>"],
                ["주파수 정확도(ppm)", "기준 클럭 허용 오차", "XTAL/TCXO → <a href='#ckt-clock'>클럭</a>"],
                ["듀티사이클 / LBT", "Sub-G·유럽 송신 제약", "펌웨어·공존 → <a href='#proto-coex'>공존</a>"],
              ]
            },
            { t: "note", kind: "why", title: "Power Back-off — 출력과 EVM은 상충", html: "PA를 한계까지 밀면(높은 출력) 비선형이 커져 <b>EVM·스펙트럼 마스크가 악화</b>됩니다. 그래서 고차변조(예: WiFi 256-QAM, 높은 MCS)는 <b>출력을 일부 줄여(back-off)</b> 품질을 맞춥니다. 즉 'target power'는 단일 숫자가 아니라 <b>변조/MCS별로 달라지는 곡선</b>입니다. 데이터시트의 MCS별 출력·EVM 표를 함께 보세요." },
            { t: "h", text: "목표값 정의 체크리스트" },
            { t: "check", items: [
              "지역별 <b>최대 EIRP/출력 한계</b> 확정 → 안테나이득·손실 배분으로 도전출력 목표 도출",
              "<b>MCS/변조별 target power</b>(back-off 포함)와 EVM 목표 정의",
              "스펙트럼 마스크·OBW·ACPR·스퓨리어스·하모닉 한계 목록화",
              "데이터율별 <b>수신 감도 목표</b> 정의 (통신거리 ↔ 링크버짓)",
              "주파수 정확도(ppm) 목표 → 클럭 부품 선정 근거",
              "Sub-G/유럽이면 <b>듀티사이클·LBT</b> 요건 펌웨어 반영",
              "모든 목표값에 <b>양산 산포·온도 마진</b> 반영",
            ]},
            { t: "note", kind: "info", title: "연결", html: "출력↔이득↔손실 계산은 1장 <a href='#rf-fundamentals'>링크 버짓</a>, 한계의 근거는 7장 <a href='#ver-cert'>인증</a>, 측정·검증은 7장 <a href='#ver-measure'>측정 항목</a>, 규격별 특성은 2장 <a href='#proto-compare'>프로토콜 비교</a> 참조." },
          ]
        },
        {
          id: "proc-selection",
          title: "2단계 — RF SoC/모듈 선정",
          blocks: [
            { t: "p", html: "칩(SoC) 직접 설계 vs 인증된 모듈(module) 사용을 먼저 결정합니다." },
            { t: "table",
              head: ["구분", "SoC 직접 설계", "기성 모듈"],
              rows: [
                ["원가", "양산 시 저렴", "단가 높음"],
                ["개발난이도/기간", "높음(RF·인증 직접)", "낮음(모듈 인증 활용)"],
                ["크기 최적화", "자유로움", "제약"],
                ["인증", "직접 전체 인증", "모듈 인증 승계로 단축"],
                ["적합", "대량·원가민감 가전", "소량·빠른 출시"],
              ]
            },
            { t: "h", text: "칩 선정 시 검토 항목" },
            { t: "check", items: [
              "RF 성능: 출력, 수신감도, 지원 대역/규격",
              "전류: Tx/Rx/Sleep 각 모드 소비전류",
              "패키지·핀맵·외부 부품 수(BOM 영향)",
              "공급 안정성: 재고·리드타임·EOL(단종) 위험 → 이원화 가능성",
              "레퍼런스 디자인·평가보드(EVK) 제공 여부",
              "인증 지원: pre-certified 모듈/레퍼런스 유무",
              "SW 지원: 드라이버·SDK·OS(가전 RTOS/Linux) 호환",
            ]},
            { t: "note", kind: "tip", title: "이원화(Second Source)", html: "단일 벤더 의존은 공급 리스크입니다. 핀 호환/소프트 호환 대체 칩을 처음부터 검토하고, PCB에 <b>양쪽 풋프린트 호환 레이아웃</b>을 고려하면 이원화가 쉬워집니다. (8장 참조)" },
          ]
        },
        {
          id: "proc-datasheet",
          title: "딥다이브 — RF SoC 데이터시트 읽는 법",
          blocks: [
            { t: "p", html: "칩 선정·설계의 출발점은 데이터시트입니다. 하지만 수백 페이지 중 <b>HW 설계와 BOM·인증에 직결되는 항목</b>은 정해져 있습니다. 어디를 어떤 눈으로 봐야 하는지 정리했습니다." },
            { t: "note", kind: "info", title: "비유로 먼저", html: "데이터시트는 <b>자동차 카탈로그</b>입니다. 최고 출력(PA)·연비(소비전류)·정원(지원 규격)만 보면 안 되고, <b>실측 조건(어느 온도·전압에서)</b>과 '※단서(typical, 특정 조건)'를 읽어야 진짜 성능을 압니다. 'typical'만 보고 설계하면 양산 worst-case에서 떨어집니다." },

            { t: "h", text: "꼭 확인할 핵심 파라미터" },
            { t: "kv", rows: [
              ["Tx 출력 / 정확도", "규격별 최대 출력(dBm), 변조별 차이, 온도·전압 변동"],
              ["Rx 감도(Sensitivity)", "규격·데이터율별 dBm. 통신거리 직결. 낮을수록 좋음"],
              ["EVM / 마스크", "변조 품질. 출력 높일수록 악화 — 어느 출력까지 규격 만족하나"],
              ["소비전류", "Tx 피크/평균·Rx·Sleep 각각. 전원·배터리 설계 근거"],
              ["전원 요구", "레일별 전압·허용 리플·시퀀싱. PDN 설계 입력값"],
              ["기준 클럭", "XTAL/TCXO 주파수·정확도(ppm)·load cap 요구"],
              ["RF 임피던스", "출력 차동/단동 임피던스 → 발룬·매칭 결정"],
              ["호스트 IF", "SDIO/SPI/USB/PCIe 등 — 호스트 연결·SI"],
              ["패키지/핀맵", "크기·핀수·열패드 — 풋프린트·방열"],
            ]},
            { t: "note", kind: "warn", title: "'Typical'의 함정 — 조건을 읽어라", html: "데이터시트 수치는 대부분 <b>typical(상온·권장전압·특정 조건)</b>입니다. min/max와 측정 조건(온도·전압·채널)을 확인하고, 양산 산포·온도 범위까지 견디는지 <b>마진</b>을 두세요. 출력·감도는 특히 온도·전압에 민감합니다." },

            { t: "h", text: "데이터시트 외에 반드시 볼 문서" },
            { t: "list", items: [
              "<b>레퍼런스 디자인/평가보드(EVK)</b>: 검증된 회로·발룬·매칭·레이아웃의 출발점",
              "<b>레이아웃 가이드라인</b>: 전원·GND·RF 라인·안테나 배치 규칙(칩사 권고)",
              "<b>인증/규제 노트</b>: pre-certified 여부, 지역별 설정",
              "<b>에라타(Errata)</b>: 알려진 버그·제약 — 놓치면 디버깅 지옥",
              "<b>EOL/PCN 이력</b>: 단종·변경 공지 → 공급 안정성·이원화 판단",
            ]},
            { t: "note", kind: "tip", title: "칩사 문의(메일) 포인트", html: "데이터시트에 없는 값(특정 온도 출력, 미지원 채널, 양산 산포, 대체품 호환)은 <b>FAE에게 조건을 명시해 문의</b>하세요. '몇 dBm@어느 조건/온도/규격'처럼 측정 조건을 못 박아야 답이 정확합니다. (사내 <code>/datasheet</code> 스킬 활용)" },
            { t: "note", kind: "info", title: "연결", html: "여기서 읽은 임피던스→<a href='#ckt-balun'>발룬</a>, 전원요구→<a href='#ckt-pdn'>PDN</a>, 클럭→<a href='#ckt-clock'>클럭·위상잡음</a>, 공급/EOL→<a href='#prod-secondsource'>이원화</a>로 이어집니다." },
          ]
        },
        {
          id: "proc-flow",
          title: "3~8단계 흐름과 게이트",
          blocks: [
            { t: "p", html: "회로→PCB→안테나→검증→인증→양산으로 이어지며, 각 단계는 다음 장에서 상세히 다룹니다. 단계 전환 시 <b>게이트 리뷰</b>로 누락을 점검합니다." },
            { t: "kv", rows: [
              ["EVT", "Engineering Validation Test — 설계 기능 검증 (동작하는가)"],
              ["DVT", "Design Validation Test — 규격·신뢰성·성능 검증 (스펙 만족하는가)"],
              ["PVT", "Production Validation Test — 양산성 검증 (대량 생산 가능한가)"],
            ]},
          ]
        }
      ]
    },

    /* ───────────────────────── 4. 회로 설계 ───────────────────────── */
    {
      id: "circuit",
      icon: "⚡",
      title: "4. 회로 설계",
      sections: [
        {
          id: "ckt-power",
          title: "전원 설계 — 가장 중요",
          blocks: [
            { t: "note", kind: "why", title: "왜 전원이 1순위인가", html: "RF 칩은 깨끗하고 강한 전원을 요구합니다. 전원이 흔들리면 ①주파수 안정도(위상잡음)↓ ②송신 출력↓ ③스퓨리어스(잡음 방사)↑ ④재부팅. RF 문제의 상당수는 사실 전원/그라운드 문제입니다." },
            { t: "check", items: [
              "Tx 피크 전류를 견디는 레귤레이터 용량 선정",
              "벌크 커패시터(에너지 저장) + 디커플링 커패시터(고주파 노이즈 제거) 조합",
              "디커플링: 큰 값(µF)~작은 값(nF/pF)을 칩 전원핀에 가깝게 병렬 배치",
              "LDO vs DC-DC: 노이즈(LDO 유리) vs 효율(DC-DC 유리) 트레이드오프",
              "DC-DC 사용 시 스위칭 노이즈가 RF 대역에 안 들어오게 주파수/필터 관리",
              "전원 페라이트 비드/π필터로 디지털↔RF 전원 분리",
            ]},
            { t: "note", kind: "warn", title: "디커플링 배치 = 레이아웃 문제", html: "디커플링 커패시터는 '값'보다 '<b>칩 핀에 얼마나 가깝고 짧은 비아로 그라운드에 연결됐는가</b>'가 중요합니다. 회로도에 그려도 레이아웃에서 멀면 효과가 없습니다. (5장 연계)" },
          ]
        },
        {
          id: "ckt-pdn",
          title: "딥다이브 — 전원 무결성(PDN)과 디커플링",
          blocks: [
            { t: "p", html: "<b>PDN(Power Distribution Network, 전원 분배망)</b>은 레귤레이터에서 칩 전원핀까지 전기를 나르는 경로 전체(레일·평면·비아·커패시터)입니다. RF 칩이 순간적으로 전류를 당길 때 <b>전압이 흔들리지 않게(낮은 임피던스)</b> 받쳐주는 것이 PDN 설계의 목표입니다." },
            { t: "note", kind: "info", title: "비유로 먼저", html: "PDN은 <b>도시 상수도</b>입니다. 정수장(레귤레이터)에서 멀리 떨어진 집(칩)이 수도를 확 틀면(Tx 피크 전류), 정수장 물이 도착하기 전 순간엔 <b>동네 물탱크(디커플링 커패시터)</b>가 먼저 물을 댑니다. 물탱크가 작거나 멀면 수압(전압)이 푹 꺼집니다(droop)." },

            { t: "h", text: "핵심 개념 — 목표 임피던스(Target Impedance)" },
            { t: "note", kind: "why", title: "Z_target = ΔV_허용 / ΔI", html: "PDN이 만족해야 할 임피던스는 <b>허용 전압변동 ÷ 과도 전류</b>입니다. 예: 1.8V 레일에서 5% 변동 허용(0.09V), 과도전류 0.5A면 <b>Z_target ≈ 0.18Ω</b>. 관심 주파수 전 대역에서 PDN 임피던스를 이 값 아래로 유지해야 droop이 스펙 안에 듭니다. RF는 빠른 전류변동이 많아 <b>넓은 주파수에서</b> 낮은 임피던스가 필요합니다." },

            { t: "h", text: "주파수대별로 누가 전류를 대는가" },
            { t: "table",
              head: ["주파수 영역", "공급원", "이유"],
              rows: [
                ["DC~수 kHz", "레귤레이터(LDO/DC-DC)", "피드백 루프가 따라잡는 느린 영역"],
                ["수 kHz~수 MHz", "벌크 커패시터(µF급)", "레귤레이터가 못 따라가는 과도 전류 흡수"],
                ["수 MHz~수백 MHz", "디커플링 커패시터(nF급)", "고속 스위칭 전류 공급"],
                ["수백 MHz↑", "패키지/온칩 커패시턴스 + 평면", "외부 부품은 인덕턴스 때문에 이미 무력"],
              ]
            },
            { t: "note", kind: "warn", title: "커패시터는 고주파에서 '인덕터'가 된다 (ESL)", html: "실제 커패시터는 <b>자기공진주파수(SRF)</b> 위에서는 기생 인덕턴스(ESL) 때문에 인덕터처럼 동작해 임피던스가 다시 올라갑니다. 그래서 <b>큰 값 1개로는 넓은 대역을 못 막습니다</b>. µF·nF·pF를 병렬로 둬 각자 다른 주파수를 담당하게 합니다(다만 과한 다종 병렬은 안티공진 주의)." },

            { t: "h", text: "디커플링 배치 — 값보다 인덕턴스" },
            { t: "note", kind: "why", title: "왜 '핀에 가깝게'가 절대규칙인가", html: "커패시터의 효과는 <b>루프 인덕턴스(L_loop)</b>가 좌우합니다. 핀에서 멀거나 비아가 길면 L_loop↑ → 고주파에서 전류를 못 댑니다. 같은 부품이라도 <b>배치·비아가 성능을 10배 바꿉니다</b>. 작은 값(고주파 담당) 커패시터일수록 핀에 가장 가깝게." },
            { t: "check", items: [
              "작은 값(nF/pF)을 전원핀에 <b>가장 가깝게</b>, 큰 값(µF)은 그 바깥에",
              "커패시터 패드 → GND/전원 평면까지 <b>비아 최단·다수</b>(루프 인덕턴스↓)",
              "전원핀–커패시터–비아가 만드는 <b>루프 면적 최소화</b>",
              "RF 전원 레일은 <b>페라이트 비드/π필터</b>로 디지털·DC-DC 노이즈와 분리",
              "VDD 평면–GND 평면을 가깝게(평면 커패시턴스 활용)",
              "데이터시트 권장 디커플링 BOM·배치를 출발점으로",
            ]},

            { t: "h", text: "LDO vs DC-DC (RF 관점)" },
            { t: "table",
              head: ["항목", "LDO", "DC-DC(스위칭)"],
              rows: [
                ["노이즈", "<b>낮음(RF 유리)</b>", "스위칭 리플·고조파 발생"],
                ["효율", "낮음(전압차×전류 = 열)", "<b>높음(배터리 유리)</b>"],
                ["RF 적용", "민감 RF/PLL/VCO 레일에 선호", "디지털·고전류 레일, 단 필터링 필수"],
                ["주의", "드롭아웃·발열", "스위칭 주파수·고조파가 RF 대역 침범 금지"],
              ]
            },
            { t: "note", kind: "tip", title: "실전 노하우 — droop 디버깅", html: "Tx 시 재부팅·출력저하가 나면, 전원핀에 <b>광대역 오실로스코프 프로브(짧은 GND 스프링)</b>를 대고 Tx 버스트 순간의 droop·리플을 직접 봅니다. droop이 크면 → 벌크 부족/레귤레이터 약함, 고주파 리플이 크면 → 디커플링 배치·비아 문제. 측정 없이 부품만 늘리는 건 추측입니다(증거 기반)." },
            { t: "note", kind: "info", title: "연결", html: "디커플링 '배치'는 5장 <a href='#pcb-placement'>부품 배치</a>·<a href='#pcb-ground'>그라운드</a>와 직결됩니다. DC-DC 노이즈가 RF·수신감도에 미치는 영향은 7장 <a href='#ver-emc'>EMC·공존</a> 참조." },
          ]
        },
        {
          id: "ckt-frontend",
          title: "RF 프론트엔드 — PA/LNA/스위치/필터",
          blocks: [
            { t: "p", html: "안테나와 칩 사이의 신호 경로 구성 요소입니다. 칩에 내장된 경우도 있고 외장하는 경우도 있습니다." },
            { t: "kv", rows: [
              ["PA (전력증폭기)", "송신 출력 증폭. 발열·선형성·전류 관건"],
              ["LNA (저잡음증폭기)", "수신 미약신호 증폭. 잡음지수(NF)가 수신감도 좌우"],
              ["T/R 스위치", "송수신 경로 전환 (한 안테나 공유 시)"],
              ["BPF/SAW 필터", "대역 외 잡음 제거, 간섭/공존 개선"],
              ["Balun", "차동↔단동 변환 + 임피던스 변환"],
              ["Diplexer/FEM", "여러 기능 통합 모듈(Front-End Module)"],
            ]},
            { t: "note", kind: "tip", title: "공존 필터", html: "WiFi+BT 콤보나 셀룰러 근접 환경에서는 BPF/SAW로 인접 대역 간섭을 막습니다. 단, 필터 삽입손실(insertion loss)만큼 출력/감도가 깎이므로 trade-off." },
          ]
        },
        {
          id: "ckt-matching",
          title: "매칭·발룬 회로 배치",
          blocks: [
            { t: "p", html: "1장 매칭 개념의 실제 회로 적용입니다. 칩 출력 → 발룬/매칭 → 필터 → 안테나 순으로 임피던스를 50Ω으로 유지합니다." },
            { t: "check", items: [
              "안테나 급전부에 π형 매칭 패드(3소자) 자리 확보 (0Ω/NM)",
              "레퍼런스 디자인의 매칭값을 시작점으로, 실측 후 튜닝",
              "발룬은 데이터시트 권장 부품·레이아웃을 그대로 따를 것",
              "매칭 소자는 RF급(고Q, 정밀) 부품 사용, 0402/0201 등 소형",
            ]},
          ]
        },
        {
          id: "ckt-balun",
          title: "딥다이브 — 발룬(Balun)",
          blocks: [
            { t: "p", html: "<b>발룬(Balun = Balanced–Unbalanced)</b>은 칩의 <b>차동(differential, 균형) 출력</b>을 안테나의 <b>단동(single-ended, 불균형) 신호</b>로 변환하는 부품입니다. 동시에 <b>임피던스 변환</b>과 일부 <b>대역 필터링</b>도 겸할 수 있어 RF 프론트엔드의 길목 역할을 합니다." },
            { t: "note", kind: "info", title: "비유로 먼저", html: "차동 신호는 <b>두 사람이 마주 들고 가는 들것</b>(서로 반대로 움직임)이고, 단동 신호는 <b>한 사람이 어깨에 멘 짐</b>(기준은 땅=GND)입니다. 발룬은 '들것을 어깨짐으로' 바꿔주는 변환기입니다. 변환하면서 무게 비율(임피던스)도 조정할 수 있습니다." },

            { t: "h", text: "왜 차동→단동 변환이 필요한가" },
            { t: "list", items: [
              "RF SoC 송수신 핀은 <b>차동(2핀)</b>인 경우가 많다 — 잡음·짝수고조파에 강하고 칩 설계에 유리",
              "안테나·전송선은 보통 <b>단동(50Ω, GND 기준)</b> — 발룬이 둘을 잇는다",
              "차동을 그대로 두 라인으로 빼면 불균형·방사 문제 → 발룬으로 깔끔히 단동화",
            ]},

            { t: "h", text: "발룬의 3가지 기능" },
            { t: "kv", rows: [
              ["① 모드 변환", "차동 ↔ 단동(GND 기준)"],
              ["② 임피던스 변환", "칩측 차동 임피던스(예: 100Ω 등) → 50Ω 단동. 변환비가 스펙에 명시됨"],
              ["③ 대역 필터링", "타입에 따라 LC 공진으로 일부 고조파 억제(필터 발룬)"],
            ]},
            { t: "table",
              head: ["종류", "특징", "용도"],
              rows: [
                ["칩(적층) 발룬", "초소형, 저가, 양산 표준", "2.4G/5G 모듈 대부분"],
                ["이산 LC 발룬", "L·C로 구성, 튜닝 자유", "특수 임피던스·미세조정"],
                ["트랜스포머/코어", "광대역, 저주파", "Sub-G·광대역"],
                ["필터 발룬", "발룬+필터 통합", "부품수·면적 절감(고조파 억제 겸)"],
              ]
            },
            { t: "note", kind: "warn", title: "발룬은 데이터시트를 '그대로' 따르라", html: "발룬은 칩의 차동 출력 임피던스에 맞춰 설계됩니다. <b>임의로 다른 발룬·다른 레이아웃을 쓰면 변환비·위상이 어긋나</b> 출력·감도가 급락합니다. 칩 레퍼런스 디자인의 발룬 부품번호·풋프린트·주변 매칭값·그라운드 패턴을 <b>그대로</b> 가져오고, 변경은 측정으로 검증하세요." },
            { t: "check", items: [
              "칩 데이터시트의 권장 발룬·매칭·레이아웃을 그대로 적용",
              "발룬 GND 패드는 짧은 비아로 메인 GND에(불균형·손실 방지)",
              "차동 라인 2개는 <b>대칭·등길이</b>로 발룬까지 라우팅",
              "발룬 후단(단동)부터 50Ω 전송선 규칙 적용",
              "이원화 시 대체 발룬의 변환비·삽입손실 동등성 검증",
            ]},
            { t: "note", kind: "info", title: "연결", html: "발룬 뒤로는 <a href='#ckt-frontend'>RF 프론트엔드</a>·<a href='#ckt-matching'>매칭</a>이 이어지고, 단동 50Ω 라인은 5장 <a href='#pcb-impedance'>전송선</a>·<a href='#pcb-cpwg'>CPWG</a> 규칙을 따릅니다." },
          ]
        },
        {
          id: "ckt-filter-coex",
          title: "딥다이브 — RF 필터·공존(Coexistence) 설계",
          blocks: [
            { t: "p", html: "한 제품에 WiFi·BT·Zigbee가 같이 들어가거나 셀룰러·외부 간섭원이 가까우면, <b>서로의 신호가 상대 수신기를 막습니다</b>. 이를 막는 것이 <b>필터(BPF/SAW)</b>와 <b>공존(coexistence) 설계</b>입니다." },
            { t: "note", kind: "info", title: "비유로 먼저", html: "좁은 방(2.4GHz 대역)에서 여러 사람(WiFi·BT·Zigbee)이 동시에 말하면 알아듣기 어렵습니다. <b>필터</b>는 '내 목소리 주파수만 통과시키는 귀마개', <b>공존(PTA)</b>은 '한 명씩 말하자고 정하는 교통정리'입니다." },

            { t: "h", text: "필터의 역할과 대가" },
            { t: "kv", rows: [
              ["BPF (대역통과)", "원하는 대역만 통과, 대역 외(간섭·고조파) 차단"],
              ["SAW 필터", "급격한 차단특성(높은 선택도). 인접대역 간섭 제거에 강함"],
              ["하모닉 필터(LPF)", "2·3차 고조파 억제 → EMC·스퓨리어스 규제 통과"],
              ["삽입손실(IL)", "필터를 넣으면 통과 대역도 일부 손실 — 출력·감도 깎임"],
            ]},
            { t: "note", kind: "warn", title: "필터는 공짜가 아니다 (삽입손실 trade-off)", html: "필터의 차단 성능과 삽입손실은 <b>상충</b>합니다. 강하게 막을수록 통과대역 손실(IL)이 커져 송신출력·수신감도가 떨어집니다. '간섭 제거 이득'과 'IL 손실'을 저울질해 <b>꼭 필요한 만큼만</b> 넣으세요. 링크 버짓에 IL을 반드시 반영." },

            { t: "h", text: "공존(Coexistence) 3대 기법" },
            { t: "table",
              head: ["기법", "방식", "비고"],
              rows: [
                ["주파수(필터)", "BPF/SAW로 대역 분리", "고정 간섭원에 효과, IL 대가"],
                ["시간(PTA)", "PTA 신호로 송수신 시점 중재", "콤보칩이 한 안테나·시간 공유 시"],
                ["공간(격리)", "안테나 이격·직교, 차폐", "다중 안테나 isolation 확보"],
              ]
            },
            { t: "note", kind: "why", title: "PTA(Packet Traffic Arbitration)란", html: "WiFi와 BT가 같은 2.4GHz·같은 안테나/시간을 공유할 때, 누가 언제 송수신할지 <b>중재 신호(PTA/coex GPIO)</b>로 교통정리합니다. HW 설계자는 이 <b>PTA 신호 라인을 칩 간에 연결</b>하고 펌웨어가 쓸 수 있게 해 둬야 합니다. 빠뜨리면 콤보 동작 시 throughput이 급락합니다." },
            { t: "check", items: [
              "콤보(WiFi+BT) 칩은 <b>PTA/coex 신호 라인</b> 연결 확인",
              "고정 간섭원(셀룰러 등) 인접 시 BPF/SAW로 대역 보호 — IL 반영",
              "송신단 하모닉 필터로 2·3차 고조파 억제(EMC 대비)",
              "다중 안테나 <b>격리(isolation)</b> 확보 — 이격·직교 배치",
              "필터·발룬·매칭 순서와 임피던스 연속성 점검",
            ]},
            { t: "note", kind: "info", title: "연결", html: "2장 <a href='#proto-compare'>공존</a> 개요의 HW 구현편입니다. 고조파·스퓨리어스 억제는 7장 <a href='#ver-emc'>EMC</a>, 안테나 격리는 6장 <a href='#ant-placement'>안테나 배치</a> 참조." },
          ]
        },
        {
          id: "ckt-mcu-if",
          title: "MCU/호스트 인터페이스·주변 회로",
          blocks: [
            { t: "list", items: [
              "호스트 IF: SDIO/SPI/UART/USB/PCIe 등 — 신호 무결성(SI) 고려",
              "클럭: 기준 크리스털(XTAL)/TCXO — 주파수 정확도·위상잡음 영향",
              "리셋·부팅 스트랩 핀 처리, 펌웨어 다운로드 경로",
              "ESD 보호: 외부 노출 라인(USB, 안테나 커넥터)에 TVS/ESD 소자",
              "GPIO/제어: PTA(공존), 전원 시퀀싱",
            ]},
            { t: "note", kind: "warn", title: "클럭은 RF 성능의 뿌리", html: "기준 클럭의 정확도/위상잡음이 나쁘면 주파수 오차·EVM 악화로 통신 품질이 떨어집니다. 부하 커패시터(load cap) 값과 배치도 RF만큼 신경 써야 합니다. 다음 섹션에서 딥다이브합니다." },
          ]
        },
        {
          id: "ckt-clock",
          title: "딥다이브 — 기준 클럭·위상잡음(XTAL/TCXO)",
          blocks: [
            { t: "p", html: "RF 칩의 모든 주파수는 <b>기준 클럭(reference clock)</b>에서 만들어집니다. 기준이 흔들리면 송수신 주파수가 틀어지고 변조 품질(EVM)이 무너집니다. 기준 클럭은 <b>RF 성능의 뿌리</b>입니다." },
            { t: "note", kind: "info", title: "비유로 먼저", html: "기준 클럭은 오케스트라의 <b>지휘자 박자</b>입니다. 지휘자 박자가 미세하게 빨라졌다 느려졌다 하면(위상잡음/지터), 모든 연주자(주파수 합성기)가 흔들려 합주(통신)가 엉킵니다. 박자가 정확한 평균값에서 벗어나면(주파수 오차) 아예 다른 곡이 됩니다." },

            { t: "h", text: "두 가지 핵심 지표" },
            { t: "kv", rows: [
              ["주파수 정확도(ppm)", "기준 주파수가 규격값에서 벗어난 평균 오차. 규격마다 허용 ppm 존재(예: WiFi ±20~25ppm). 온도·노화로 변동"],
              ["위상잡음 / 지터", "주파수의 순간적 흔들림(스펙트럼상 캐리어 주변 잡음). EVM·인접채널 성능·수신 감도에 직접 영향"],
            ]},
            { t: "note", kind: "why", title: "왜 위상잡음이 EVM을 망가뜨리나", html: "위상잡음은 캐리어의 위상을 미세하게 떨리게 합니다. 고차 변조(예: WiFi의 64/256-QAM)는 위상으로 데이터를 싣기 때문에, 위상이 떨리면 <b>심볼 점(constellation)이 번져 EVM이 악화</b>되고 데이터율(MCS)이 떨어집니다. 고속·고차변조일수록 위상잡음 요구가 엄격합니다." },

            { t: "h", text: "XTAL vs TCXO" },
            { t: "table",
              head: ["항목", "XTAL(크리스털)", "TCXO(온도보상)"],
              rows: [
                ["정확도", "보통(±10~30ppm), 온도 변동 큼", "<b>높음</b>(±0.5~2ppm), 온도 보상"],
                ["원가/크기", "저가·소형", "고가·큼"],
                ["전류", "거의 없음(수동)", "능동 소자라 소비전류 있음"],
                ["용도", "온도범위 좁고 ppm 여유 큰 경우", "정확도 빡센 규격·넓은 온도(가전 고온)"],
              ]
            },
            { t: "note", kind: "tip", title: "load cap이 주파수를 당긴다", html: "크리스털은 지정된 <b>부하 커패시턴스(CL)</b>에서 정확한 주파수를 냅니다. 보드의 load cap 값·기생용량이 어긋나면 주파수가 당겨져(pulling) ppm 오차가 납니다. <b>CL에 맞는 cap 선정 + 측정으로 미세조정(frequency calibration)</b>이 필요합니다. 가전은 온도범위가 넓어 ppm 마진을 특히 크게." },
            { t: "check", items: [
              "규격 허용 ppm을 온도·노화·load cap 오차까지 포함해 만족하는지",
              "크리스털 CL에 맞는 load cap 선정, 배치는 핀에 가깝게·대칭",
              "클럭 라인은 짧게·노이즈원(DC-DC) 격리, GND 가드",
              "위상잡음 요구가 빡센 고차변조(5/6G high-MCS)면 TCXO 검토",
              "양산 주파수 캘리브레이션 공정 계획",
            ]},
            { t: "note", kind: "info", title: "연결", html: "ppm·load cap 요구는 <a href='#proc-datasheet'>데이터시트</a>에서 확인하고, 클럭 배치·격리는 5장 <a href='#pcb-placement'>부품 배치</a>, EVM 측정은 7장 <a href='#ver-measure'>측정 항목</a> 참조." },
          ]
        }
      ]
    },

    /* ───────────────────────── 5. PCB 레이아웃 ───────────────────────── */
    {
      id: "pcb",
      icon: "🧩",
      title: "5. PCB 레이아웃",
      sections: [
        {
          id: "pcb-stackup",
          title: "스택업·기판 재료 — 기초",
          blocks: [
            { t: "p", html: "PCB 적층 구조(스택업)는 <b>임피던스·그라운드·노이즈·재료비</b>를 동시에 결정하는 RF 설계의 토대입니다. RF는 <b>RF 신호층 바로 아래 연속 그라운드층</b>을 두는 것이 대원칙입니다. 이 섹션은 재료 기초를, 이어지는 섹션에서 층수·대역별 선택·원가를 다룹니다." },
            { t: "note", kind: "info", title: "비유로 먼저", html: "기판은 RF 신호가 달리는 <b>도로의 노면(路面)</b>입니다. 노면 재질(유전율 Dk)이 고르지 않으면 차선폭(임피던스)이 흔들리고, 노면이 거칠면(손실 Df↑) 차가 에너지를 잃습니다(전력 손실). 2.4GHz는 평범한 도로로 충분하지만, 5/6GHz는 고속도로라 노면 품질이 성능을 좌우합니다." },
            { t: "h", text: "기판을 정하는 4대 파라미터" },
            { t: "kv", rows: [
              ["Dk (Dielectric constant, εr)", "유전율. 라인폭·임피던스 결정. FR-4 ≈ 4.2~4.6(주파수·로트 변동), RF 전용재 3.0~3.5. <b>높을수록 같은 임피던스에 라인폭이 좁아짐</b>"],
              ["Df (Dissipation factor, tanδ)", "손실 탄젠트. <b>유전체 손실의 핵심 지표</b>. FR-4 ≈ 0.02, 중급재 ≈ 0.004, 고급 RF재 ≤ 0.002. 낮을수록 고주파 손실↓"],
              ["동박 거칠기 (Cu roughness)", "표면조도. 고주파일수록 표피효과로 신호가 표면을 흐르므로, 거친 동박(HTE)은 도체손실↑. 5/6G는 평활동박(VLP/HVLP) 유리"],
              ["두께·동박두께", "유전체 두께(prepreg/core)와 동박두께(½oz/1oz)가 50Ω 라인폭과 비아 형상을 결정"],
            ]},
            { t: "note", kind: "warn", title: "FR-4의 진짜 약점은 '산포'", html: "FR-4는 단순히 손실만 큰 게 아니라 <b>Dk가 로트·주파수·유리직조(glass weave)에 따라 변동</b>합니다. 같은 설계라도 양산 로트마다 임피던스가 흔들려 RF 성능 산포가 생깁니다. 2.4GHz는 마진이 커서 대체로 OK지만, 5/6GHz·장거리에서는 이 산포가 수율을 깎습니다." },
            { t: "note", kind: "tip", title: "유리직조(Glass Weave) 효과", html: "FR-4의 유리섬유는 격자로 짜여 있어, 신호선이 '유리 위'를 지나는지 '수지(resin) 위'를 지나는지에 따라 국부 Dk가 달라집니다(skew). 저가 설계에서 5G 라인을 둘 때는 <b>라인을 직조 격자에 대해 비스듬히(zig-zag) 라우팅</b>하거나 mechanical-spread glass 재료를 쓰면 완화됩니다." },
            { t: "check", items: [
              "RF 라인 바로 아래 끊김 없는(solid) GND 레퍼런스",
              "임피던스는 '머리로'가 아니라 <b>제조사 스택업 표 + 임피던스 계산기(2D field solver)</b>로 확정",
              "데이터시트 레퍼런스 스택업의 두께·Dk를 출발점으로",
              "양산 전 임피던스 쿠폰(coupon)으로 TDR 실측 권장",
            ]},
          ]
        },
        {
          id: "pcb-layers",
          title: "층수 구성 — 2층 / 4층 / 6층+ 장단점",
          blocks: [
            { t: "p", html: "층수는 <b>RF 성능 ↔ 원가</b>의 가장 큰 트레이드오프 변수입니다. 핵심 질문은 단 하나: <b>\"RF 신호선 바로 아래에 끊김 없는 연속 GND 레퍼런스를 줄 수 있는가?\"</b> — 이것이 안 되면 층수가 부족한 것입니다." },
            { t: "note", kind: "why", title: "왜 RF는 4층을 기본으로 보는가", html: "RF 라인은 <b>바로 아래에 솔리드 GND</b>가 있어야 임피던스가 안정되고 리턴 전류가 신호선 밑으로 흐릅니다(EMI↓). 2층은 GND를 통째로 한 면에 깔기 어려워(전원·신호가 GND를 갉아먹음) RF 레퍼런스가 깨지기 쉽습니다. 4층은 <b>L1(신호/RF) → L2(솔리드 GND) → L3(전원/신호) → L4(신호)</b> 구성으로 RF 바로 밑에 깨끗한 GND를 보장합니다." },
            { t: "table",
              head: ["구성", "전형 스택업", "장점", "단점", "적합"],
              rows: [
                ["2층", "L1 신호+부분GND / L2 GND+전원", "최저가, 단납기, 단순", "솔리드 GND 확보難, 임피던스 산포↑, EMI 취약, 전원/RF 분리 어려움", "단순 Sub-G/BLE, 큰 보드, 극원가 제품"],
                ["4층", "신호 / <b>GND</b> / 전원 / 신호", "RF 바로밑 솔리드 GND, 전원면 분리, EMI 양호, 가성비 최고", "2층 대비 원가↑", "<b>대부분의 WiFi/BLE 모듈 표준</b>"],
                ["6층+", "신호 / GND / 신호 / 전원 / GND / 신호", "RF·고속선 다중 레퍼런스, 격리 우수, 고밀도 라우팅", "원가·납기 큼, HDI 필요할 수도", "다중안테나 WiFi, 5/6G 고성능, 고밀도 모듈"],
              ]
            },
            { t: "h", text: "2층으로도 RF를 할 수 있나?" },
            { t: "p", html: "가능하지만 조건부입니다. <b>CPWG(코플래너 웨이브가이드)</b>로 RF 라인 양옆·아랫면 GND를 비아로 촘촘히 묶어 레퍼런스를 만들고, 박형 기판으로 라인폭을 관리하면 2.4G/Sub-G BLE급은 양산됩니다. 단 임피던스 산포·EMI 마진이 작아 <b>안테나 매칭과 디커플링에 더 의존</b>하게 됩니다." },
            { t: "note", kind: "tip", title: "층수 결정 체크리스트", html: "①RF 바로 밑 솔리드 GND 필요 → 최소 4층 ②전원 레일 2개 이상·디지털 노이즈 큼 → 4층+ ③다중 안테나·5/6G·고속 호스트(SDIO/PCIe) → 6층 검토 ④극단적 원가·단순 BLE·여유 공간 → 2층(CPWG) 도전" },
            { t: "note", kind: "warn", title: "층수를 줄여 절감한 비용이 RF 재작업으로 사라진다", html: "2층으로 시작했다가 EMI·임피던스 문제로 4층 재설계하면, 절감액보다 재설계·일정 손실이 훨씬 큽니다. <b>의심되면 4층으로 시작</b>하는 것이 총비용(TCO) 관점에서 안전합니다." },
          ]
        },
        {
          id: "pcb-freq-material",
          title: "대역별 선택 기준 — 2.4GHz vs 5GHz(6GHz)",
          blocks: [
            { t: "p", html: "같은 RF라도 <b>주파수가 높아질수록 손실·산포에 민감</b>해집니다. 2.4GHz와 5/6GHz는 재료·스택업 선택 기준이 다릅니다." },
            { t: "note", kind: "why", title: "왜 고주파일수록 까다로운가 (3가지 손실)", html: "①<b>유전체 손실</b>: Df × 주파수에 비례 → 5G는 2.4G의 2배 이상. ②<b>도체 손실(표피효과)</b>: 주파수 √에 비례, 동박 거칠기가 증폭. ③<b>임피던스 산포 영향</b>: 파장이 짧아(5G λ≈6cm) 같은 물리 오차가 전기적으로 더 크게 작용. 즉 2.4G에서 묻히던 결함이 5G에서 드러납니다." },
            { t: "table",
              head: ["항목", "2.4 GHz", "5 GHz (6 GHz)"],
              rows: [
                ["허용 재료", "표준 FR-4로 대체로 충분", "중손실(mid-loss) FR-4 또는 RF 전용재 권장"],
                ["Df 목표", "0.02 수준 OK", "≤ 0.004 (가능하면 더 낮게)"],
                ["동박", "HTE(거친) 무난", "VLP/HVLP 평활동박 권장"],
                ["라인 길이", "다소 길어도 손실 작음", "<b>최단화 필수</b> (손실 dB/cm 큼)"],
                ["임피던스 관리", "마진 큼", "TDR 쿠폰·tight tolerance 필요"],
                ["글래스위브 skew", "거의 무시", "라우팅 각도·스프레드 글래스 고려"],
                ["층수", "2~4층 가능", "4~6층 권장(다중 레퍼런스)"],
              ]
            },
            { t: "h", text: "선택 의사결정 흐름" },
            { t: "list", ordered: true, items: [
              "<b>2.4G 전용(BLE/Zigbee/2.4G WiFi)</b>: 표준 FR-4 + 4층. 라인 짧으면 2층 CPWG도 가능. 재료 고민 최소.",
              "<b>2.4G + 5G 듀얼밴드 WiFi</b>: mid-loss FR-4 또는 하이브리드(아래 참고) + 4층 이상. 5G 라인만 길이·임피던스 집중 관리.",
              "<b>5/6G 고성능·고처리량</b>: 저손실 RF재(또는 RF재를 표층에만 쓰는 하이브리드) + 6층. 평활동박, TDR 실측.",
            ]},
            { t: "note", kind: "tip", title: "하이브리드 스택업(원가 절충의 핵심)", html: "보드 전체를 비싼 RF재로 만들 필요 없습니다. <b>RF 신호가 지나는 표층(L1)과 그 아래 prepreg에만 저손실재를 쓰고, 나머지는 FR-4 코어</b>로 채우는 하이브리드 구성이 일반적입니다. 5G 성능은 챙기고 재료비는 크게 아낍니다. (다음 섹션 참조)" },
          ]
        },
        {
          id: "pcb-cost",
          title: "재료비 절감 관점 — 싸게 설계하는 법",
          blocks: [
            { t: "p", html: "RF 성능을 지키면서 BOM·기판 단가를 낮추는 실전 아이디어입니다. <b>원칙: 비싼 자원(층·고급재)을 RF가 실제로 필요한 곳에만 국소 투입</b>하라." },
            { t: "h", text: "① 재료 — 필요한 만큼만 비싸게" },
            { t: "list", items: [
              "<b>하이브리드 스택업</b>: RF 표층 1~2층만 저손실재, 나머지 FR-4. 5G도 챙기고 재료비 절감(가장 효과 큼)",
              "<b>대역에 맞는 등급</b>: 2.4G 전용이면 RF 전용재 불필요 — 표준 FR-4로 충분. 과사양은 돈 낭비",
              "<b>mid-loss FR-4 활용</b>: 고가 RF재까지 안 가도 되는 5G 보급형은 중손실 FR-4(Df~0.01)로 절충",
              "표준 두께(0.8/1.0/1.6mm)·표준 동박(½/1oz) 사용 — 비표준은 단가·납기 상승",
            ]},
            { t: "h", text: "② 층수·공정 — 단순할수록 싸다" },
            { t: "list", items: [
              "꼭 필요한 최소 층수 (단 RF 솔리드 GND는 양보 금지 — 2층 재작업이 더 비쌈)",
              "<b>HDI/레이저비아·블라인드/베리드 비아 회피</b>: 관통(through) 비아만 쓰면 공정 단순·저가. 필요한 곳만 국소 HDI",
              "표준 PCB 제조 규칙(min trace/space, 비아 크기) 준수 → 양산성↑·단가↓·수율↑",
              "층수 줄일 때 CPWG로 2층 RF를 검토(공간 여유 있을 때)",
            ]},
            { t: "h", text: "③ 부품·BOM — RF FE 통합과 표준화" },
            { t: "list", items: [
              "<b>매칭/필터 통합</b>: 개별 L·C·발룬 대신 통합 패시브(IPD)·FEM으로 부품수·면적·실장비 절감",
              "<b>0402/0201 표준 RF 부품</b> 표준화 — 특수 부품·소량 부품은 단가·재고 부담",
              "안테나: 외장/칩 안테나 대신 <b>PCB 패턴 안테나</b>면 안테나 BOM = 0 (공간·GND 확보 시)",
              "공용 BOM·이원화 부품 우선 채택 — 수량 통합으로 단가 협상력↑ (8장 이원화 연계)",
            ]},
            { t: "h", text: "④ 패널·수율 — 보이지 않는 원가" },
            { t: "list", items: [
              "<b>패널 이용률(panel utilization)</b> 최적화: 보드 외형을 패널에 빈틈없이 배치하면 장당 단가↓",
              "임피던스 마진·표준 설계로 <b>수율↑</b> — 수율 1%가 양산 수만 대에선 큰 금액",
              "테스트 치구·쿠폰 공용화로 검사 비용 절감",
            ]},
            { t: "note", kind: "warn", title: "절감하면 안 되는 곳 (이건 아끼면 손해)", html: "①<b>RF 바로 밑 솔리드 GND</b> ②<b>디커플링/매칭 패드 자리</b>(NM이라도 비워둘 것) ③<b>5G 라인의 임피던스 관리</b>. 여기서 아낀 돈은 재작업·수율·필드 불량으로 몇 배가 되어 돌아옵니다." },
            { t: "note", kind: "tip", title: "원가 절감 우선순위 (효과 大→小)", html: "1) 하이브리드 스택업 + 대역 맞는 재료등급 → 2) 최소 층수(RF GND 유지) + 관통비아만 → 3) FEM/IPD로 BOM 통합 → 4) 패널 이용률·수율 → 5) 부품 표준화·이원화. <b>설계 초기에 결정할수록 절감폭이 큽니다.</b>" },
          ]
        },
        {
          id: "pcb-impedance",
          title: "50Ω 전송선(임피던스 컨트롤)",
          blocks: [
            { t: "p", html: "RF 신호선은 정해진 폭/이격으로 50Ω을 유지해야 합니다. 대표 토폴로지: 마이크로스트립(표층), 코플래너 웨이브가이드(CPWG, 양옆 GND)." },
            { t: "check", items: [
              "라인폭은 제조사 스택업 기준 임피던스 계산으로 확정",
              "CPWG 사용 시 신호선 양옆 GND에 stitching via 촘촘히",
              "RF 라인은 최단·직선, 급격한 직각 꺾임 금지(45°/라운드)",
              "비아 전환 최소화(비아는 임피던스 불연속·손실 발생)",
              "RF 라인 아래 GND 레퍼런스가 중간에 끊기지 않게",
            ]},
            { t: "note", kind: "why", title: "직각 코너를 피하는 이유", html: "직각 코너는 국부적으로 선폭이 넓어져 임피던스가 떨어지고 반사가 생깁니다. 45° 또는 라운드 처리하거나 코너를 깎습니다(chamfer)." },
            { t: "note", kind: "info", title: "대표 토폴로지 2가지", html: "①<b>마이크로스트립</b>: 표층 신호선 + 바로 아래 GND 플레인(가장 단순). ②<b>CPWG(접지 코플래너 웨이브가이드)</b>: 신호선 양옆에도 GND를 두고 아래에도 GND. 차폐·제어성이 좋아 RF에서 널리 쓰임 — 다음 섹션에서 딥다이브." },
          ]
        },
        {
          id: "pcb-cpwg",
          title: "딥다이브 — CPWG(접지 코플래너 웨이브가이드)",
          blocks: [
            { t: "p", html: "<b>CPWG(Grounded/Conductor-backed Coplanar Waveguide, GCPW)</b>는 신호선 <b>양옆에 GND</b>를 두고 <b>아래에도 GND 플레인</b>을 두는 전송선 구조입니다. 신호선이 좌우·하단 GND에 둘러싸여 <b>차폐가 좋고 방사가 적으며 임피던스 제어가 쉬워</b> RF 설계에서 마이크로스트립과 함께 가장 많이 쓰입니다." },
            { t: "note", kind: "info", title: "비유로 먼저", html: "마이크로스트립이 '바닥(GND)만 있는 도로'라면, CPWG는 '바닥 + 양옆 가드레일(GND)이 있는 도로'입니다. 신호(차)가 옆으로 새거나 옆 차선과 부딪히지(간섭·방사) 않도록 가드레일이 가둬줍니다. 단, 가드레일이 바닥에 단단히 고정(스티칭 비아)돼 있어야 제 역할을 합니다." },

            { t: "h", text: "구조 단면" },
            { t: "fig",
              caption: "CPWG 단면: 신호선(W) 양옆에 간격 G를 두고 코플래너 GND, 그 아래 유전체(높이 H)를 사이에 두고 하단 GND 플레인. 좌우 코플래너 GND는 스티칭 비아로 하단 GND에 연결돼야 한다. 전기력선은 신호선에서 양옆 GND와 하단 GND로 동시에 향한다.",
              svg: '<svg viewBox="0 0 620 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="CPWG 단면 구조">'
                + '<defs><marker id="cwD" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,4 L8,4" stroke="#9aa7b4"/></marker></defs>'
                + '<text x="310" y="20" text-anchor="middle" class="fig-label">CPWG 단면 구조</text>'
                + '<rect x="40" y="200" width="540" height="20" rx="2" fill="#2ea043" fill-opacity="0.30" stroke="#2ea043" stroke-opacity="0.55"/>'
                + '<text x="310" y="238" text-anchor="middle" class="fig-sub" fill="#2ea043">하단 GND 플레인</text>'
                + '<rect x="60" y="96" width="190" height="16" fill="#2ea043" fill-opacity="0.30" stroke="#2ea043" stroke-opacity="0.55"/>'
                + '<rect x="370" y="96" width="190" height="16" fill="#2ea043" fill-opacity="0.30" stroke="#2ea043" stroke-opacity="0.55"/>'
                + '<text x="155" y="90" text-anchor="middle" class="fig-sub" fill="#2ea043">코플래너 GND</text>'
                + '<text x="465" y="90" text-anchor="middle" class="fig-sub" fill="#2ea043">코플래너 GND</text>'
                + '<rect x="290" y="96" width="40" height="16" rx="1" fill="#4aa3ff"/>'
                + '<text x="310" y="90" text-anchor="middle" class="fig-sub" fill="#4aa3ff">신호선</text>'
                + '<g stroke="#2ea043" stroke-width="3">'
                + '<line x1="100" y1="112" x2="100" y2="200"/><line x1="160" y1="112" x2="160" y2="200"/><line x1="220" y1="112" x2="220" y2="200"/>'
                + '<line x1="400" y1="112" x2="400" y2="200"/><line x1="460" y1="112" x2="460" y2="200"/><line x1="520" y1="112" x2="520" y2="200"/></g>'
                + '<text x="220" y="160" class="fig-sub" fill="#2ea043" dx="6">스티칭 비아</text>'
                + '<g stroke="#e3b341" stroke-width="1.3" stroke-dasharray="3 2" fill="none">'
                + '<path d="M292,104 C 275,104 262,104 252,104"/><path d="M328,104 C 345,104 358,104 368,104"/>'
                + '<path d="M300,113 C 300,150 300,170 300,198"/><path d="M320,113 C 320,150 320,170 320,198"/></g>'
                + '<text x="455" y="160" class="fig-sub" fill="#e3b341">전기력선</text>'
                + '<line x1="290" y1="128" x2="330" y2="128" stroke="#9aa7b4" marker-start="url(#cwD)" marker-end="url(#cwD)"/>'
                + '<text x="310" y="142" text-anchor="middle" class="fig-sub">W</text>'
                + '<line x1="250" y1="128" x2="290" y2="128" stroke="#9aa7b4" marker-start="url(#cwD)" marker-end="url(#cwD)"/>'
                + '<text x="270" y="142" text-anchor="middle" class="fig-sub">G</text>'
                + '<line x1="600" y1="104" x2="600" y2="200" stroke="#9aa7b4" marker-start="url(#cwD)" marker-end="url(#cwD)"/>'
                + '<text x="590" y="155" text-anchor="end" class="fig-sub">H</text>'
                + '</svg>'
            },

            { t: "h", text: "마이크로스트립 vs CPWG — 언제 무엇을" },
            { t: "table",
              head: ["항목", "마이크로스트립", "CPWG (접지 코플래너)"],
              rows: [
                ["구조", "신호선 + 하단 GND", "신호선 + 양옆 GND + 하단 GND"],
                ["차폐/방사", "보통 (위·옆 개방)", "<b>우수</b> (옆이 GND로 둘러싸임)"],
                ["임피던스 제어", "선폭 W로 결정", "선폭 W + <b>간격 G</b>로 결정(자유도↑)"],
                ["두꺼운 유전체", "라인폭이 매우 넓어짐", "<b>G로 보정 가능</b> — 두꺼운 기판에 유리"],
                ["고주파(5/6G)", "방사·손실 불리할 수 있음", "<b>유리</b> (모드 가둠)"],
                ["2층 보드", "하단 솔리드 GND 확보 어려움", "<b>표층 GND로 레퍼런스 보강 가능</b>"],
                ["주의점", "단순, 비아 부담 적음", "<b>스티칭 비아 필수</b>, 가공 정밀도"],
              ]
            },
            { t: "note", kind: "tip", title: "핵심 차이 — 임피던스 자유도", html: "마이크로스트립은 임피던스를 거의 선폭 W로만 맞춥니다. CPWG는 <b>W와 옆 간격 G의 조합</b>으로 맞춰, 같은 50Ω이라도 선폭을 더 좁게(또는 넓게) 둘 수 있습니다. 특히 <b>유전체가 두꺼워(H↑) 마이크로스트립 선폭이 비현실적으로 넓어질 때</b>, CPWG는 G를 좁혀 현실적 선폭으로 50Ω을 만듭니다." },

            { t: "h", text: "설계 파라미터와 규칙" },
            { t: "kv", rows: [
              ["W (신호선 폭)", "임피던스의 1차 결정 인자"],
              ["G (신호↔옆 GND 간격)", "좁을수록 임피던스↓. W와 함께 50Ω 튜닝. 단 제조 공차 한계(보통 ≥0.1mm급) 고려"],
              ["H (유전체 높이)", "하단 GND까지 거리. 클수록 마이크로스트립은 불리, CPWG는 G로 보정"],
              ["εr (유전율)", "재료에 따라 W·G가 달라짐 — 제조사 스택업 기준 계산"],
              ["스티칭 비아 피치", "<b>λ/10~λ/20</b> (5G에서 ~1~2mm). 옆 GND를 하단 GND에 묶어 모드 안정"],
            ]},
            { t: "note", kind: "warn", title: "가장 흔한 실수 — '떠 있는' 코플래너 GND", html: "양옆 GND를 두고도 <b>스티칭 비아로 하단 GND에 연결하지 않으면</b>, 옆 GND가 전기적으로 떠서(floating) ①차폐 효과가 사라지고 ②원치 않는 <b>슬롯라인 모드/평행판 모드</b>가 생겨 손실·방사·임피던스 교란이 발생합니다. CPWG에서 스티칭 비아는 선택이 아니라 <b>필수</b>입니다. (앞 <a href='#pcb-stitching'>스티칭 비아</a> 섹션 참조)" },
            { t: "check", items: [
              "임피던스(W·G)는 <b>2D field solver/제조사 계산</b>으로 확정 — 손으로 추정 금지",
              "양옆 GND를 따라 <b>λ/10~λ/20 피치 스티칭 비아</b> 배치(필수)",
              "신호↔옆 GND 간격 G를 라인 전 구간 <b>일정하게</b> 유지",
              "코너·벤드에서도 옆 GND·비아 간격 유지(불연속 방지)",
              "간격 G·선폭 W가 제조 공차 안에 드는지 확인(너무 좁으면 산포↑)",
              "발룬·매칭·커넥터 천이부에서 GND·비아 연속성 유지",
            ]},
            { t: "note", kind: "tip", title: "언제 CPWG를 고를까 (요약)", html: "①<b>5/6GHz 등 고주파</b>로 차폐·저방사가 필요할 때 ②<b>두꺼운 유전체</b>라 마이크로스트립 선폭이 비현실적일 때 ③<b>2층 보드</b>에서 표층 GND로 레퍼런스를 보강하고 싶을 때 ④인접 회로와 <b>격리</b>가 필요할 때. 반대로 단순 2.4G·박형 기판·비아 부담을 줄이고 싶으면 마이크로스트립으로 충분합니다." },
          ]
        },
        {
          id: "pcb-ground",
          title: "그라운드·리턴 패스 (초심자 최대 함정)",
          blocks: [
            { t: "note", kind: "why", title: "비유로 먼저", html: "전류는 '갔으면 반드시 돌아온다'. 신호선이 '가는 길'이면 그라운드는 '돌아오는 길'입니다. 돌아오는 길(리턴 패스)이 막히거나 멀리 돌면, 고주파에선 큰 루프가 생겨 <b>방사(EMI)·간섭·성능저하</b>가 발생합니다." },

            { t: "h", text: "그림 1 — 연속 GND: 리턴전류가 신호선 바로 아래로 흐른다" },
            { t: "fig",
              caption: "정방향 전류(파랑)가 신호선을 흐르면, 같은 크기의 리턴전류(초록)가 바로 아래 GND를 반대 방향으로 흐른다. 고주파에서 리턴전류는 신호선 바로 밑으로 집중되어 신호-리턴 루프 면적이 최소가 된다.",
              svg: '<svg viewBox="0 0 620 235" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="연속 GND에서의 리턴전류 경로">'
                + '<defs>'
                + '<marker id="fAf" markerWidth="10" markerHeight="10" refX="7" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#4aa3ff"/></marker>'
                + '<marker id="fAr" markerWidth="10" markerHeight="10" refX="7" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#2ea043"/></marker>'
                + '</defs>'
                + '<text x="310" y="20" text-anchor="middle" class="fig-label">연속 GND (정상)</text>'
                + '<rect x="80" y="52" width="460" height="12" rx="2" fill="#4aa3ff"/>'
                + '<text x="310" y="44" text-anchor="middle" class="fig-sub" fill="#4aa3ff">RF 신호선 (마이크로스트립)</text>'
                + '<line x1="160" y1="82" x2="460" y2="82" stroke="#4aa3ff" stroke-width="2.5" marker-end="url(#fAf)"/>'
                + '<text x="140" y="86" text-anchor="end" class="fig-sub" fill="#4aa3ff">정방향 I →</text>'
                + '<g stroke="#7a8694" stroke-dasharray="3 3" stroke-width="1" opacity="0.7">'
                + '<line x1="160" y1="64" x2="160" y2="150"/><line x1="235" y1="64" x2="235" y2="150"/>'
                + '<line x1="310" y1="64" x2="310" y2="150"/><line x1="385" y1="64" x2="385" y2="150"/>'
                + '<line x1="460" y1="64" x2="460" y2="150"/></g>'
                + '<text x="568" y="110" text-anchor="end" class="fig-sub">유전체</text>'
                + '<path d="M175,152 C 255,152 272,110 310,110 C 348,110 365,152 445,152 Z" fill="#2ea043" fill-opacity="0.20"/>'
                + '<text x="310" y="128" text-anchor="middle" class="fig-sub" fill="#2ea043">전류밀도 집중</text>'
                + '<rect x="50" y="152" width="520" height="24" rx="2" fill="#2ea043" fill-opacity="0.28" stroke="#2ea043" stroke-opacity="0.55"/>'
                + '<line x1="460" y1="164" x2="160" y2="164" stroke="#2ea043" stroke-width="2.5" marker-end="url(#fAr)"/>'
                + '<text x="500" y="168" class="fig-sub" fill="#2ea043">← 리턴 I</text>'
                + '<text x="310" y="200" text-anchor="middle" class="fig-sub" fill="#2ea043">연속 GND 플레인</text>'
                + '<text x="310" y="224" text-anchor="middle" class="fig-sub">루프 면적 최소 → 임피던스 안정 · EMI 최소</text>'
                + '</svg>'
            },

            { t: "h", text: "그림 2 — GND 슬릿: 리턴전류가 우회하며 큰 루프를 만든다" },
            { t: "fig",
              caption: "GND에 슬릿(갈라짐)이 신호선을 가로지르면, 리턴전류는 슬릿을 건너지 못하고 끝을 돌아 우회한다. 신호-리턴 사이에 큰 루프가 생겨 EMI를 방사하고 임피던스가 불연속이 되어 반사·통신불량이 발생한다.",
              svg: '<svg viewBox="0 0 620 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="GND 슬릿에서 리턴전류 우회">'
                + '<defs>'
                + '<marker id="fBf" markerWidth="10" markerHeight="10" refX="7" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#4aa3ff"/></marker>'
                + '<marker id="fBr" markerWidth="10" markerHeight="10" refX="7" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#2ea043"/></marker>'
                + '<marker id="fBe" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#e5534b"/></marker>'
                + '</defs>'
                + '<text x="310" y="20" text-anchor="middle" class="fig-label" style="fill:#e5534b">GND 슬릿 (문제)</text>'
                + '<rect x="80" y="56" width="460" height="12" rx="2" fill="#4aa3ff"/>'
                + '<text x="310" y="48" text-anchor="middle" class="fig-sub" fill="#4aa3ff">RF 신호선</text>'
                + '<line x1="160" y1="86" x2="460" y2="86" stroke="#4aa3ff" stroke-width="2.5" marker-end="url(#fBf)"/>'
                + '<text x="140" y="90" text-anchor="end" class="fig-sub" fill="#4aa3ff">정방향 I →</text>'
                + '<rect x="50" y="150" width="520" height="64" rx="2" fill="#2ea043" fill-opacity="0.28" stroke="#2ea043" stroke-opacity="0.55"/>'
                + '<rect x="298" y="150" width="24" height="46" fill="var(--card)" stroke="#e5534b" stroke-dasharray="4 3" stroke-width="1.5"/>'
                + '<text x="310" y="240" text-anchor="middle" class="fig-sub" fill="#e5534b">GND 슬릿/갈라짐</text>'
                + '<rect x="285" y="158" width="50" height="52" rx="4" fill="#e5534b" fill-opacity="0.10"/>'
                + '<path d="M460,170 L322,170 L322,204 L298,204 L298,170 L160,170" fill="none" stroke="#2ea043" stroke-width="2.5" marker-end="url(#fBr)"/>'
                + '<text x="500" y="174" class="fig-sub" fill="#2ea043">← 리턴 I (우회)</text>'
                + '<text x="355" y="208" class="fig-sub" fill="#e5534b">루프 면적 ↑↑</text>'
                + '<g stroke="#e5534b" stroke-width="1.6" fill="none">'
                + '<path d="M300,150 C 292,132 308,126 300,108" marker-end="url(#fBe)"/>'
                + '<path d="M320,150 C 330,134 318,126 330,110" marker-end="url(#fBe)"/></g>'
                + '<text x="360" y="118" class="fig-sub" fill="#e5534b">EMI 방사 ↑</text>'
                + '<text x="310" y="262" text-anchor="middle" class="fig-sub">큰 루프 → EMI 방사 · 임피던스 불연속 · 반사/통신불량</text>'
                + '</svg>'
            },

            { t: "h", text: "리턴전류의 공학적 의미 — 왜 중요한가" },
            { t: "note", kind: "why", title: "핵심 원리: 고주파 리턴은 '최소 저항'이 아니라 '최소 인덕턴스'를 따른다", html: "DC·저주파에서 리턴전류는 GND에서 가장 저항이 작은 경로(넓게 퍼짐)로 흐릅니다. 하지만 <b>고주파(수십 MHz↑, RF)에서는 인덕턴스가 지배</b>하여, 리턴전류는 <b>루프 면적을 최소화하는 경로 = 신호선 바로 아래</b>로 집중됩니다. 이 사실 하나가 아래 모든 결과를 만듭니다." },
            { t: "kv", rows: [
              ["① 특성 임피던스(50Ω)를 만든다", "신호선과 리턴경로 사이의 루프 인덕턴스 + 커패시턴스가 Z₀를 결정. 리턴이 멀어지면(GND 단절) 인덕턴스↑ → 임피던스 상승·불연속 → 반사(S11 악화)"],
              ["② EMI 방사를 좌우한다", "신호+리턴이 이루는 루프는 곧 '루프 안테나'. 방사는 루프 면적에 비례. 바로 아래로 흐르면 면적≈0이라 방사 최소, 우회하면 면적 급증 → EMI 폭증"],
              ["③ 신호 무결성(SI)", "리턴경로 불연속 = 임피던스 불연속 = 반사·링잉·지터. RF에선 출력 저하·EVM 악화로 나타남"],
              ["④ 크로스토크·노이즈 결합", "여러 신호가 리턴경로를 공유하면 공통 임피던스를 통해 서로 결합(간섭). 우회 경로는 다른 회로 영역을 침범"],
              ["⑤ 수신 감도(노이즈 유입)", "큰 리턴 루프는 방사뿐 아니라 외부 노이즈를 '수신'하는 안테나도 됨 → 수신 감도 저하"],
            ]},
            { t: "note", kind: "tip", title: "설계로 옮기면", html: "①RF 라인 아래 GND를 <b>절대 가르지 말 것</b>(슬릿·플레인 split이 RF 라인을 가로지르면 안 됨). ②층을 바꾸는 비아 옆에는 <b>리턴 비아(GND via)를 붙여</b> 리턴전류가 따라갈 길을 줄 것. ③전원/타 신호가 RF 리턴 GND를 침범하지 않게 영역 분리. ④커넥터·안테나 급전부 주변 GND를 비아 스티칭으로 강하게 묶을 것." },
            { t: "note", kind: "warn", title: "기억할 한 문장", html: "<b>\"신호선을 그릴 때마다 '이 전류의 리턴은 어디로 돌아오는가'를 동시에 그려라.\"</b> RF 문제의 상당수는 신호선이 아니라 보이지 않는 리턴 경로에서 시작됩니다." },

            { t: "h", text: "FAQ — GND를 'RF 영역 밑에만' 깔아도 EMI가 줄까?" },
            { t: "p", html: "<b>질문</b>: L1(표층)에 RF 신호라인 영역과, RF와 무관한 GPIO 등 아트워크 영역이 함께 있을 때, 아래 GND를 <b>RF 영역 밑에만</b> 확보해도 리턴전류 EMI를 줄일 수 있나?" },
            { t: "p", html: "<b>결론</b>: 부분적으로만 맞다. RF 라인 <i>자체</i>의 리턴 EMI는 줄지만, 전체 EMI 대책으로는 권장하지 않으며 오히려 악화될 수 있다. 결정적으로 <b>GND 동박 채움(pour)은 원가가 들지 않으므로</b>, L1 전체 아래 <b>하나의 연속 GND</b>를 까는 것이 정석이다." },
            { t: "note", kind: "why", title: "왜 부분 GND가 위험한가", html: "①<b>GPIO·디지털도 리턴전류가 있다</b> — 엣지가 빨라 di/dt가 크고 고조파가 수백MHz~GHz까지 뻗는다. 그 영역 밑 GND를 비우면 리턴이 우회해 방사하고, 고조파가 2.4/5G 대역에 떨어지면 <b>바로 옆 내 라디오 수신기를 desense(감도 저하)</b>시킨다. ②<b>GND 경계(edge) 자체가 불연속</b> — 경계 근처 리턴전류·경계를 가로지르는 신호·모서리 엣지전류가 모두 방사원이 된다. ③<b>self-desense</b> — 외부 EMI 시험을 통과해도 GPIO 고조파가 근처에서 방사돼 자기 수신 감도를 깎는 건 별개 문제다." },
            { t: "table",
              head: ["항목", "L1 전체 연속 GND", "RF 영역 밑에만 GND"],
              rows: [
                ["RF 라인 리턴", "✅ 양호", "✅ 양호"],
                ["GPIO/디지털 리턴", "✅ 양호", "❌ 우회 → 방사·desense"],
                ["영역 경계", "없음", "⚠️ 불연속·방사 모서리"],
                ["원가", "동일 (동박은 공짜)", "동일 (절감 없음)"],
                ["권장도", "정석", "✗ 비권장"],
              ]
            },
            { t: "note", kind: "tip", title: "올바른 접근 — \"플레인을 자르지 말고, 부품을 떼어놓아라\"", html: "①L1 전체 아래 <b>하나의 솔리드 GND</b>(원가 동일·위험 최소). ②영역 분리는 GND를 자르는 게 아니라 <b>배치(placement)로</b> — RF 블록과 노이즈원(DC-DC·고속 디지털)을 물리적으로 이격. ③경계·층전환에 <b>스티칭 비아</b>로 리턴경로 보강(다음 섹션 참조). ④노이즈원이 정말 세면 그 부품만 <b>국소 가드링/쉴드캔</b>으로 가둔다. <br>※ '민감 아날로그를 위한 의도적 GND split'은 고급 혼합신호 기법이나, 현대 EMC 가이드(Henry Ott 등)는 <b>단일 솔리드 GND + 배치 분리</b>를 더 권장한다. RF 모듈에선 plane을 자르는 것이 거의 항상 손해다." },

            { t: "check", items: [
              "신호 바로 아래 연속 GND — 리턴 전류가 신호선 바로 밑으로 흐르게",
              "GND 플레인에 split/슬릿이 RF 라인을 가로지르지 않게",
              "비아 스티칭으로 GND 층 간 연결 강화(특히 RF·안테나 주변)",
              "디커플링 커패시터의 GND는 짧은 비아로 메인 GND에",
              "안테나 클리어런스 영역의 GND 경계 처리(안테나 종류별 규칙 준수)",
            ]},
            { t: "note", kind: "warn", title: "가장 흔한 사고", html: "고속/RF 신호선 아래 GND가 다른 신호/전원으로 쪼개져 있어 리턴 전류가 우회 → EMI 폭증·통신 불량. 배치 전에 '이 신호의 리턴 전류는 어디로 흐르나'를 항상 자문하세요." },
          ]
        },
        {
          id: "pcb-emi-loop",
          title: "딥다이브 — 우회 리턴전류가 EMI를 방사하는 원리",
          blocks: [
            { t: "p", html: "앞 섹션에서 '리턴전류가 우회하면 큰 루프가 생겨 EMI를 방사한다'고 했습니다. 여기서는 <b>왜·어떻게 방사가 일어나는지</b>를 안테나 이론으로 설명합니다. 핵심은 세 가지: ①<b>전류 루프는 자기 쌍극자 안테나</b>다 ②<b>방사는 주파수의 4제곱</b>으로 커진다 ③진짜 주범은 <b>커먼모드(common-mode) 전류로의 변환</b>이다." },

            { t: "note", kind: "info", title: "비유로 먼저", html: "회전문(폐루프)을 빠르게 돌리면(고주파 전류) 주변에 바람(전자기파)이 일어납니다. 문이 클수록(루프 면적↑), 더 빨리 돌릴수록(주파수↑) 바람이 셉니다. 신호선과 리턴이 딱 붙어 있으면 '문틈'이 거의 없어 바람이 안 일지만, 리턴이 멀리 우회하면 '거대한 회전문'이 되어 사방으로 바람을 뿜습니다." },

            { t: "h", text: "① 전류 루프 = 자기 쌍극자(magnetic dipole) 안테나" },
            { t: "p", html: "시변(時變) 전류가 흐르는 닫힌 루프는 그 자체가 <b>소형 루프 안테나</b>로 동작합니다. 안테나 이론에서 작은 루프가 만드는 원거리(far-field) 방사 전계는 다음에 비례합니다:" },
            { t: "note", kind: "why", title: "방사 공식 (작은 루프)", html: "<b>E<sub>far</sub> ∝ ( I × A × f² ) / r</b>, &nbsp; 방사 전력 <b>P<sub>rad</sub> ∝ I² × A² × f⁴</b><br>여기서 <b>I</b>=루프 전류, <b>A</b>=루프가 감싸는 면적, <b>f</b>=주파수, <b>r</b>=거리.<br>→ 방사는 <b>면적의 제곱</b>, <b>주파수의 4제곱</b>에 비례합니다. 신호선 바로 아래로 리턴이 흐르면 A≈0이라 방사가 거의 없지만, 우회로 A가 커지면 제곱으로 폭증합니다." },

            { t: "h", text: "② 주파수 4제곱 법칙 — 왜 RF에서 치명적인가" },
            { t: "p", html: "P<sub>rad</sub> ∝ f⁴ 때문에 같은 루프라도 주파수가 오르면 방사가 폭발적으로 커집니다. 2.4GHz·5GHz 같은 RF 대역에서 작은 슬릿 우회조차 위험한 이유입니다." },
            { t: "table",
              head: ["조건 변화", "방사 전력 변화", "의미"],
              rows: [
                ["루프 면적 2배", "× 4", "A² 비례 — 우회 거리 조금만 늘어도 급증"],
                ["주파수 2배 (2.4G→~5G)", "× 16", "f⁴ 비례 — 고주파일수록 치명적"],
                ["면적 2배 + 주파수 2배", "× 64", "두 효과가 곱해짐"],
                ["저속 디지털(예: 수 MHz)", "거의 무시", "같은 루프라도 f⁴이 작아 방사 미미"],
              ]
            },
            { t: "note", kind: "tip", title: "역설적 통찰", html: "저주파에서는 GND 슬릿이 있어도 EMI가 잘 안 보입니다(f⁴이 작아서). 그래서 '2.4G에선 괜찮던 레이아웃'이 5/6G로 가면 갑자기 EMI 불합격이 납니다. <b>주파수가 오르면 리턴 경로 규율이 비선형적으로 엄격해진다</b>는 점을 기억하세요." },

            { t: "h", text: "③ 슬릿 양단 전압 — 슬롯 안테나로 동작" },
            { t: "p", html: "리턴전류가 슬릿을 만나 우회할 때, 우회 경로의 <b>부분 인덕턴스(partial inductance)</b>가 늘어납니다. 고주파 전류는 변화율(di/dt)이 크므로 인덕턴스 양단에 전압이 생깁니다:" },
            { t: "note", kind: "why", title: "V = L · (di/dt)", html: "우회로 늘어난 인덕턴스 <b>L</b>과 RF의 큰 <b>di/dt</b>가 곱해져 <b>슬릿 양단에 RF 전압</b>이 걸립니다. 전압이 걸린 틈(슬릿)은 곧 <b>슬롯 안테나(slot antenna)</b>가 되어 효율적으로 방사합니다. 즉 우회는 ①큰 루프(자기 다이폴) ②전압 걸린 슬롯(슬롯 안테나) <b>두 가지 방사원</b>을 동시에 만듭니다." },

            { t: "h", text: "④ 진짜 주범 — 커먼모드(common-mode) 전류 변환" },
            { t: "p", html: "정상 상태에서 신호전류(→)와 리턴전류(←)는 크기가 같고 방향이 반대라, 멀리서 보면 자기장이 상쇄됩니다(차동/differential 모드 → 방사 거의 0). 그런데 리턴이 우회해 <b>신호와 리턴의 전류 '무게중심'이 어긋나면</b> 상쇄가 깨집니다." },
            { t: "fig",
              caption: "차동모드(좌): 신호·리턴이 겹쳐 자기장 상쇄 → 방사 거의 없음. 우회 시(우): 상쇄가 깨진 불평형분이 커먼모드 전류로 전환되어 케이블·금속 구조물을 타고 흘러 방사한다. 실제 제품 EMI 불합격의 대부분이 이 커먼모드 방사다.",
              svg: '<svg viewBox="0 0 620 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="차동모드와 커먼모드 전류">'
                + '<defs>'
                + '<marker id="cmB" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#4aa3ff"/></marker>'
                + '<marker id="cmG" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#2ea043"/></marker>'
                + '<marker id="cmR" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#e5534b"/></marker>'
                + '</defs>'
                + '<text x="155" y="22" text-anchor="middle" class="fig-label">차동모드 (정상)</text>'
                + '<line x1="60" y1="60" x2="250" y2="60" stroke="#4aa3ff" stroke-width="3" marker-end="url(#cmB)"/>'
                + '<text x="60" y="50" class="fig-sub" fill="#4aa3ff">신호 I →</text>'
                + '<line x1="250" y1="80" x2="60" y2="80" stroke="#2ea043" stroke-width="3" marker-end="url(#cmG)"/>'
                + '<text x="250" y="98" text-anchor="end" class="fig-sub" fill="#2ea043">← 리턴 I (바로 아래)</text>'
                + '<text x="155" y="130" text-anchor="middle" class="fig-sub">자기장 상쇄 (+I, −I 겹침) → 방사 ≈ 0</text>'
                + '<line x1="310" y1="30" x2="310" y2="200" stroke="#7a8694" stroke-dasharray="4 4" opacity="0.5"/>'
                + '<text x="465" y="22" text-anchor="middle" class="fig-label" style="fill:#e5534b">커먼모드 (우회 시)</text>'
                + '<line x1="360" y1="60" x2="560" y2="60" stroke="#4aa3ff" stroke-width="3" marker-end="url(#cmB)"/>'
                + '<text x="360" y="50" class="fig-sub" fill="#4aa3ff">신호 I →</text>'
                + '<path d="M555,82 L420,82 L420,110 L470,110" fill="none" stroke="#2ea043" stroke-width="3" marker-end="url(#cmG)"/>'
                + '<text x="560" y="78" text-anchor="end" class="fig-sub" fill="#2ea043">리턴 우회</text>'
                + '<g stroke="#e5534b" stroke-width="2.2" fill="none">'
                + '<path d="M470,140 L560,140" marker-end="url(#cmR)"/>'
                + '<path d="M470,158 L560,158" marker-end="url(#cmR)"/></g>'
                + '<text x="415" y="150" text-anchor="end" class="fig-sub" fill="#e5534b">불평형분 →</text>'
                + '<text x="465" y="185" text-anchor="middle" class="fig-sub" fill="#e5534b">커먼모드 전류 → 케이블·구조물 타고 방사</text>'
                + '</svg>'
            },
            { t: "note", kind: "warn", title: "커먼모드가 무서운 이유", html: "차동모드 방사는 루프가 작으면 자연히 작지만, <b>커먼모드 전류는 케이블·하네스·금속 샤시 전체를 안테나로 만들어</b> 수십 cm~m 길이로 방사합니다. 작은 슬릿이 만든 작은 불평형도 긴 케이블을 만나면 강한 방사가 됩니다. 가전처럼 모터·하네스·금속 구조가 많은 환경에서 특히 위험합니다." },

            { t: "h", text: "⑤ 정리 — 우회 한 번이 만드는 3중 방사" },
            { t: "kv", rows: [
              ["자기 쌍극자 방사", "커진 루프 면적 A → P ∝ A²·f⁴ 로 직접 방사"],
              ["슬롯 안테나 방사", "우회 인덕턴스 × di/dt → 슬릿 양단 전압 → 틈이 방사"],
              ["커먼모드 방사", "신호·리턴 불평형 → CM 전류 → 케이블·구조물이 대형 안테나로"],
            ]},
            { t: "note", kind: "tip", title: "설계 대응 (원리에서 도출)", html: "①<b>루프 면적을 0에 수렴</b>시켜라 — RF 라인 바로 아래 연속 GND, 리턴이 따라올 길 보장(자기 다이폴 억제). ②<b>슬릿을 만들지 마라</b> — 불가피하면 RF 라인이 슬릿을 가로지르지 않게(슬롯 안테나 억제). ③<b>커먼모드 차단</b> — 외부 케이블에 커먼모드 초크/페라이트, RF 블록 쉴드캔, 안정된 GND 기준. ④고주파일수록(f⁴) 위 규율을 더 엄격히 적용." },

            { t: "note", kind: "info", title: "더 알아보기", html: "이 원리는 7장 <a href='#ver-emc'>EMC·공존</a>의 방사 방출 시험과 직결됩니다. 또한 5장 <a href='#pcb-ground'>그라운드·리턴 패스</a>의 그림 1·2가 이 절의 출발점입니다." },
          ]
        },
        {
          id: "pcb-stitching",
          title: "스티칭 비아(Stitching/Return Via) — 리턴경로를 잇는 못",
          blocks: [
            { t: "p", html: "<b>스티칭 비아</b>는 서로 다른 층의 GND(또는 같은 GND의 떨어진 영역)를 비아로 '꿰매어(stitch)' 하나의 전위로 묶고, <b>리턴전류가 따라갈 길을 물리적으로 만들어 주는</b> 비아입니다. 리턴 패스 규율을 실제 보드에 구현하는 핵심 도구입니다." },
            { t: "note", kind: "info", title: "비유로 먼저", html: "여러 층의 GND는 '여러 층짜리 주차장 바닥'입니다. 차(리턴전류)가 위층에서 아래층으로 내려가려면 <b>경사로(비아)</b>가 있어야 합니다. 신호가 층을 바꾸는 지점 옆에 경사로가 없으면, 차는 멀리 있는 다른 경사로까지 돌아가야 하고(=큰 루프=EMI), 가까이 있으면 바로 따라 내려갑니다." },

            { t: "h", text: "어디에·왜 쓰는가 (4가지 용도)" },
            { t: "kv", rows: [
              ["① 리턴 비아 (Return Via)", "신호가 비아로 층을 바꿀 때, <b>그 신호 비아 바로 옆</b>에 GND 비아를 둬서 리턴전류가 같은 지점에서 층을 따라 내려가게 함. 없으면 리턴이 우회 → 임피던스 불연속·방사"],
              ["② 플레인 본딩", "여러 GND 플레인을 곳곳에서 묶어 <b>같은 전위</b> 유지. 안 묶으면 플레인 사이가 공진 캐비티가 되어 노이즈가 갇히고 방사"],
              ["③ CPWG 측면 GND 연결", "표층 코플래너 GND를 아래 메인 GND 플레인에 비아로 연결해야 진짜 50Ω·차폐 효과. 비아 없으면 표층 GND가 '떠서' 무의미"],
              ["④ 비아 펜스(Via Fence)", "RF 라인·보드 가장자리·블록 경계를 따라 비아를 줄지어 박아 <b>전자기 울타리</b>를 만듦. 모서리 방사 억제·블록 간 격리"],
            ]},

            { t: "h", text: "간격 규칙 — λ/10~λ/20 (가장 중요)" },
            { t: "p", html: "비아 간격이 너무 넓으면 그 틈으로 전자기파가 새어 나갑니다(슬롯처럼 동작). 경험칙은 <b>관심 최고 주파수에서 유전체 내 파장의 1/10(보수적으로 1/20) 이하 간격</b>입니다. 유전체 내 파장은 <b>λ<sub>g</sub> = c / (f·√ε<sub>r</sub>)</b> 로 줄어듭니다(FR-4 ε<sub>r</sub>≈4.3)." },
            { t: "table",
              head: ["주파수", "유전체 내 파장 λg (FR-4)", "λ/10 (권장 상한)", "λ/20 (보수적)"],
              rows: [
                ["2.4 GHz", "≈ 60 mm", "≈ 6 mm", "≈ 3 mm"],
                ["5 GHz", "≈ 29 mm", "≈ 2.9 mm", "≈ 1.5 mm"],
                ["6 GHz", "≈ 24 mm", "≈ 2.4 mm", "≈ 1.2 mm"],
              ]
            },
            { t: "note", kind: "tip", title: "고조파까지 고려", html: "방사 억제가 목적이라면 기본 주파수가 아니라 <b>억제하려는 최고 고조파</b> 기준으로 간격을 정하세요. 예: 5GHz의 2·3차 고조파(10/15GHz)를 막으려면 그 주파수의 λ/10(약 1mm 안팎)으로 더 촘촘히. 실무에선 RF 라인 주변·안테나 급전부는 <b>약 1~2mm 피치</b>로 박는 경우가 많습니다." },

            { t: "h", text: "리턴 비아 — 신호 비아 옆에 짝으로" },
            { t: "fig",
              caption: "신호가 비아로 층을 바꿀 때(파랑), 바로 옆에 리턴 비아(초록)가 있으면 리턴전류가 같은 지점에서 층을 따라 내려가 루프가 작다. 리턴 비아가 없으면(우) 리턴은 가장 가까운 먼 GND 연결까지 우회해 큰 루프·방사를 만든다.",
              svg: '<svg viewBox="0 0 620 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="리턴 비아 유무 비교">'
                + '<defs>'
                + '<marker id="svS" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#4aa3ff"/></marker>'
                + '<marker id="svR" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#2ea043"/></marker>'
                + '<marker id="svX" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#e5534b"/></marker>'
                + '</defs>'
                + '<text x="155" y="20" text-anchor="middle" class="fig-label">리턴 비아 있음 (정상)</text>'
                + '<rect x="40" y="150" width="230" height="14" fill="#2ea043" fill-opacity="0.28" stroke="#2ea043" stroke-opacity="0.5"/>'
                + '<rect x="40" y="56" width="230" height="14" fill="#2ea043" fill-opacity="0.18" stroke="#2ea043" stroke-opacity="0.4"/>'
                + '<text x="278" y="50" text-anchor="end" class="fig-sub">상층 GND</text>'
                + '<line x1="150" y1="63" x2="150" y2="150" stroke="#4aa3ff" stroke-width="4" marker-end="url(#svS)"/>'
                + '<text x="150" y="100" class="fig-sub" fill="#4aa3ff" dx="8">신호 비아</text>'
                + '<line x1="170" y1="150" x2="170" y2="63" stroke="#2ea043" stroke-width="4" marker-end="url(#svR)"/>'
                + '<text x="180" y="135" class="fig-sub" fill="#2ea043">리턴 비아</text>'
                + '<text x="155" y="188" text-anchor="middle" class="fig-sub">루프 작음 → EMI 최소</text>'
                + '<line x1="310" y1="20" x2="310" y2="200" stroke="#7a8694" stroke-dasharray="4 4" opacity="0.5"/>'
                + '<text x="465" y="20" text-anchor="middle" class="fig-label" style="fill:#e5534b">리턴 비아 없음</text>'
                + '<rect x="350" y="150" width="230" height="14" fill="#2ea043" fill-opacity="0.28" stroke="#2ea043" stroke-opacity="0.5"/>'
                + '<rect x="350" y="56" width="230" height="14" fill="#2ea043" fill-opacity="0.18" stroke="#2ea043" stroke-opacity="0.4"/>'
                + '<line x1="430" y1="63" x2="430" y2="150" stroke="#4aa3ff" stroke-width="4" marker-end="url(#svS)"/>'
                + '<text x="430" y="100" class="fig-sub" fill="#4aa3ff" dx="8">신호 비아</text>'
                + '<path d="M430,150 L560,150 L560,70 L430,70" fill="none" stroke="#e5534b" stroke-width="2.5" stroke-dasharray="5 3" marker-end="url(#svX)"/>'
                + '<text x="555" y="115" text-anchor="end" class="fig-sub" fill="#e5534b">리턴 우회 (먼 비아까지)</text>'
                + '<text x="465" y="188" text-anchor="middle" class="fig-sub" fill="#e5534b">큰 루프 → 방사·임피던스 불연속</text>'
                + '</svg>'
            },

            { t: "h", text: "실무 적용·체크리스트" },
            { t: "check", items: [
              "RF 라인이 층을 바꾸는 모든 비아 옆에 <b>리턴 GND 비아를 1개 이상</b> 인접 배치",
              "RF 라인·CPWG를 따라 양옆에 <b>1~2mm 피치 비아 펜스</b>",
              "보드 가장자리에 <b>가드 비아(via guard ring)</b>로 모서리 방사 억제",
              "여러 GND 플레인은 보드 전역에 걸쳐 <b>격자(grid)로 스티칭</b>(빈 영역도)",
              "안테나 급전부·커넥터·쉴드캔 풋프린트 GND는 특히 촘촘히",
              "디커플링 커패시터 GND 패드는 짧은 비아로 즉시 GND 플레인에",
            ]},
            { t: "note", kind: "warn", title: "흔한 실수", html: "①CPWG 표층 GND에 비아를 안 박아 '떠 있는 GND'가 됨(차폐·임피던스 무효). ②리턴 비아 없이 신호만 층을 바꿔 리턴이 우회. ③간격을 λ/10보다 넓게 둬 비아 펜스가 새는 울타리가 됨. ④비아 안티패드가 인접 RF 라인 임피던스를 흩뜨림 — 비아 배치 후 임피던스 재확인." },
            { t: "note", kind: "tip", title: "비용·제조 관점", html: "스티칭 비아는 <b>관통(through) 비아</b>면 추가 공정비가 거의 없습니다(이미 뚫는 드릴 공정). 단 비아 수가 과하면 드릴 시간·기판 강도에 영향을 줄 수 있으니 <b>필요한 곳에 규칙적 격자</b>로. 4장 <a href='#pcb-cost'>재료비 절감</a>의 '관통비아만 사용' 원칙과도 부합합니다." },
          ]
        },
        {
          id: "pcb-placement",
          title: "부품 배치·RF 영역 격리",
          blocks: [
            { t: "list", items: [
              "RF 경로(칩→매칭→안테나)는 최단 직선, 다른 회로와 분리",
              "디커플링 커패시터는 전원핀 바로 옆",
              "노이즈원(DC-DC, 디지털 고속선)은 RF·안테나에서 멀리",
              "안테나 주변 키프아웃(keep-out): 금속·부품·GND 규칙 준수",
              "필요시 쉴드캔(차폐 케이스)으로 RF 블록 격리",
            ]},
          ]
        }
      ]
    },

    /* ───────────────────────── 6. 안테나 ───────────────────────── */
    {
      id: "antenna",
      icon: "📶",
      title: "6. 안테나 설계·배치",
      sections: [
        {
          id: "ant-types",
          title: "안테나 종류 선택",
          blocks: [
            { t: "table",
              head: ["종류", "장점", "단점", "용도"],
              rows: [
                ["PCB 패턴 안테나", "원가 0(동박), 박형", "공간·튜닝 필요, GND 의존 큼", "원가 민감 양산"],
                ["칩 안테나", "초소형, 배치 쉬움", "효율 낮을 수 있음, 단가", "공간 제약 소형기기"],
                ["FPC/외장 안테나", "효율 높음, 배치 자유", "조립·원가, 케이블 손실", "고성능·금속 케이스"],
                ["코일(NFC)", "근접 자기결합", "RF용 아님", "NFC 전용"],
              ]
            },
            { t: "note", kind: "tip", title: "선택 기준", html: "①공간 ②요구 효율/거리 ③원가 ④케이스 재질(금속이면 외장/FPC 유리) 순으로 좁혀갑니다. PCB 안테나는 공짜처럼 보여도 <b>그라운드 크기와 클리어런스</b>를 확보 못 하면 효율이 안 나옵니다. 종류별 설계 상세는 다음 섹션 참조." },
          ]
        },
        {
          id: "ant-types-deep",
          title: "딥다이브 — PCB 패턴 안테나(IFA/모노폴) 설계",
          blocks: [
            { t: "p", html: "PCB 패턴 안테나는 동박만으로 만들어 <b>BOM 원가 0</b>이라 가전 양산에 널리 쓰입니다. 단 '공짜'의 대가로 <b>그라운드·클리어런스·튜닝</b>을 정확히 설계해야 효율이 나옵니다. 대표 타입과 설계 규칙을 정리했습니다." },
            { t: "note", kind: "info", title: "비유로 먼저", html: "PCB 안테나는 <b>악기의 울림통</b>과 같습니다. 줄(방사 패턴)만 있다고 소리가 나지 않고, 울림통(그라운드 플레인)이 함께 공명해야 소리가 큽니다. 그래서 안테나 패턴만큼 <b>그라운드 크기와 주변 비움(클리어런스)</b>이 성능을 좌우합니다." },

            { t: "h", text: "대표 PCB 안테나 타입" },
            { t: "table",
              head: ["타입", "크기", "특징", "비고"],
              rows: [
                ["모노폴(λ/4)", "λ/4 (2.4G ≈ 31mm)", "단순·광대역 경향, GND 필요", "공간 있으면 무난"],
                ["IFA (역F형)", "작음(접힌 모노폴)", "급전+단락으로 임피던스 조정 용이", "소형기기 표준"],
                ["메안더(meander)", "매우 작음", "선을 접어 길이 확보", "효율·대역폭 희생"],
                ["루프", "중간", "근접 금속에 덜 민감", "특정 환경 유리"],
                ["PIFA", "작음+면적", "평면 역F, GND판 활용", "면적 여유 시"],
              ]
            },
            { t: "note", kind: "why", title: "안테나에 왜 GND가 '부품'인가", html: "모노폴·IFA는 <b>그라운드 플레인을 안테나의 일부(카운터포이즈)로</b> 사용합니다. GND가 너무 작으면(특히 λ에 비해) 방사 효율과 대역폭이 급락합니다. 그래서 '안테나 패턴 설계'는 사실 '안테나+GND 시스템 설계'입니다." },

            { t: "h", text: "설계 핵심 규칙" },
            { t: "check", items: [
              "안테나는 보드 <b>가장자리·모서리</b>에, 패턴 영역 아래·옆 GND를 <b>비움(클리어런스/keep-out)</b>",
              "그라운드 플레인 크기를 충분히(λ/4급 이상 권장) — 소형보드는 효율 한계 인지",
              "급전선에 <b>π형 매칭 패드(3소자, 0Ω/NM)</b> 필수 확보",
              "안테나 근처 금속·부품·배선 금지(detune·흡수)",
              "<b>케이스 씌운 최종 상태</b>로 튜닝(케이스 유전체가 주파수 당김)",
              "칩사/안테나 벤더의 <b>레이아웃 가이드(클리어런스 치수)</b> 준수",
            ]},
            { t: "note", kind: "warn", title: "소형 가전의 현실 — 효율 한계", html: "공간이 작아 GND·클리어런스가 부족하면 PCB 안테나 효율이 크게 떨어집니다. 이때는 ①FPC/외장 안테나로 변경 ②안테나 영역 확보를 위한 기구 협의 ③Sub-G면 더 큰 안테나 필요를 일정·구조 초기에 반영해야 합니다." },
            { t: "note", kind: "info", title: "연결", html: "선정은 <a href='#ant-types'>종류 선택</a>, 배치 환경은 <a href='#ant-placement'>배치</a>, 매칭은 <a href='#rf-smith'>스미스 차트</a>, 검증은 <a href='#ant-ota'>OTA 측정</a> 참조." },
          ]
        },
        {
          id: "ant-subg",
          title: "딥다이브 — Sub-GHz / Wi-Fi HaLow 안테나의 난점",
          blocks: [
            { t: "p", html: "Sub-GHz(868/915MHz, Wi-Fi HaLow 등)는 <b>장거리·투과·저전력</b>이 강점이지만, 주파수가 낮은 만큼 <b>안테나가 커지고 지역별 주파수가 달라</b> 소형 가전에서 설계가 까다롭습니다." },
            { t: "note", kind: "info", title: "비유로 먼저", html: "주파수가 낮다 = 파장이 길다 = <b>악기가 커진다</b>입니다. 저음(낮은 주파수)을 내려면 큰 울림통(콘트라베이스)이 필요하듯, Sub-G 안테나는 2.4G보다 훨씬 큰 물리 크기와 그라운드를 요구합니다." },

            { t: "h", text: "왜 어려운가 — 파장과 크기" },
            { t: "kv", rows: [
              ["파장", "900MHz ≈ 33cm (λ/4 ≈ 8cm). 2.4G(λ/4 ≈ 3cm)의 2~3배"],
              ["안테나 크기", "효율적 모노폴/IFA가 커짐 — 소형 제품엔 물리적으로 안 들어감"],
              ["그라운드 의존", "큰 안테나만큼 <b>큰 그라운드(카운터포이즈)</b> 필요 — 작은 보드는 효율 급락"],
              ["대역폭", "소형화(메안더 등)할수록 대역폭·효율 희생 — 지역 주파수 폭을 못 덮을 위험"],
            ]},
            { t: "note", kind: "warn", title: "지역별 주파수 분리 — 단일 안테나로 다 못 덮을 수 있다", html: "Sub-G 허용 대역이 지역마다 다릅니다(미국 902–928MHz, 유럽 863–870MHz, 그 외 상이). 대역 간격이 커서 <b>하나의 좁은 Sub-G 안테나로 전 지역을 못 덮을 수</b> 있습니다. 이 경우 지역별 매칭/안테나 분리, 또는 광대역 설계가 필요해 <b>인증 지역을 설계 초기에 확정</b>해야 합니다(3장 요구사항)." },

            { t: "h", text: "설계 대응" },
            { t: "check", items: [
              "초기 단계에 <b>안테나 공간·그라운드 크기</b>를 기구와 협의(나중엔 못 늘림)",
              "공간 부족 시 메안더/칩/외장 안테나 검토 — 효율 trade-off 인지",
              "<b>지역별 주파수</b>를 요구사항에서 확정 → 단일/분리 안테나 전략 결정",
              "큰 그라운드 확보 — Sub-G는 GND 부족에 2.4G보다 훨씬 민감",
              "매칭 패드(π형) 확보, 케이스 포함 상태로 튜닝·OTA 검증",
            ]},
            { t: "note", kind: "tip", title: "장점은 살리되 기대치 조정", html: "Sub-G는 <b>벽 투과·장거리</b>가 진짜 강점입니다. 소형 가전에서 안테나가 작아 효율이 낮더라도, 낮은 경로손실·우수한 투과로 2.4G보다 멀리 가는 경우가 많습니다. 다만 '작은 안테나로도 풀 효율'을 기대하면 안 됩니다." },
            { t: "note", kind: "info", title: "연결", html: "프로토콜 특성은 2장 <a href='#proto-halow'>Wi-Fi HaLow</a>·<a href='#proto-zigbee'>Zigbee Sub-G</a>, 주파수 지역차는 1장 <a href='#rf-spectrum'>ISM 밴드</a>, 검증은 <a href='#ant-ota'>OTA</a> 참조." },
          ]
        },
        {
          id: "ant-placement",
          title: "배치 — 성능을 좌우하는 핵심",
          blocks: [
            { t: "note", kind: "why", title: "왜 배치가 결정적인가", html: "안테나는 주변 환경(그라운드, 금속, 배터리, 케이스)과 함께 동작하는 부품입니다. 회로/매칭이 완벽해도 배치가 나쁘면 효율이 절반 이하로 떨어집니다." },
            { t: "check", items: [
              "보드 가장자리/모서리에 배치, 안테나 영역 GND 비움(클리어런스)",
              "금속(배터리, 쉴드캔, 스피커, 카메라)·LCD에서 최대한 이격",
              "사람 손/신체 접촉(detuning, 흡수) 고려 — 핸드헬드는 특히",
              "케이스 유전체 영향 → 케이스 씌운 상태로 튜닝/측정",
              "다중 안테나는 격리(isolation) 위해 이격·직교 배치",
            ]},
            { t: "note", kind: "warn", title: "근접 금속·배터리", html: "안테나 바로 옆 금속은 공진 주파수를 틀어버리고(detune) 효율을 죽입니다. 가전은 모터·금속 샤시가 많아 안테나 위치 선정과 방사 검증이 특히 중요합니다." },
          ]
        },
        {
          id: "ant-tuning",
          title: "튜닝·매칭·측정",
          blocks: [
            { t: "p", html: "안테나는 <b>최종 조립 상태(케이스 포함)</b>에서 측정·튜닝해야 합니다. 맨 보드에서 맞춰도 케이스 씌우면 틀어집니다." },
            { t: "check", items: [
              "VNA로 S11(리턴로스) 측정 → π 매칭 소자값 조정으로 목표 대역 중심 맞춤",
              "목표: 동작 대역에서 S11 ≤ -10dB (VSWR ≤ 2) 권장",
              "효율/이득은 챔버(OTA)에서 측정 — S11 좋아도 효율 나쁠 수 있음",
              "여러 샘플로 산포 확인(부품·조립 편차)",
            ]},
            { t: "note", kind: "warn", title: "S11 좋다 ≠ 안테나 좋다", html: "S11은 '반사가 적다'만 말합니다. 전력이 안테나 손실(열)로 사라져도 S11은 좋게 나올 수 있습니다. 진짜 성능은 <b>방사효율·총방사전력(TRP)·수신감도(TIS)</b>로 봅니다. 이 '진짜 성능'을 재는 OTA 측정을 다음 섹션에서 딥다이브합니다." },
          ]
        },
        {
          id: "ant-ota",
          title: "딥다이브 — OTA 측정(TRP / TIS / 효율·패턴)",
          blocks: [
            { t: "p", html: "<b>OTA(Over-The-Air) 측정</b>은 안테나가 실제로 공기 중에 <b>얼마나 잘 쏘고(TRP) 얼마나 잘 듣는지(TIS)</b>를 전파 무반사 챔버에서 재는 시험입니다. VNA의 S11이 '반사'만 본다면, OTA는 케이블이 아닌 <b>전체 시스템(칩+매칭+안테나+케이스+손실)</b>의 실제 무선 성능을 봅니다." },
            { t: "note", kind: "why", title: "왜 S11만으로 부족한가", html: "S11이 -20dB로 완벽해도, 전력이 안테나 도체·유전체 손실로 <b>열로 사라지면</b> 공기 중으로 안 나갑니다. S11은 이걸 구분 못 합니다. <b>방사효율 = 방사된 전력 / 입력 전력</b>이며, OTA만이 이 효율과 실제 도달거리를 알려줍니다." },

            { t: "h", text: "핵심 지표" },
            { t: "kv", rows: [
              ["TRP", "Total Radiated Power — 송신: 전 방향으로 실제 방사된 총 전력. 송신 거리/품질의 지표"],
              ["TIS / TRS", "Total Isotropic Sensitivity — 수신: 전 방향 평균 수신 감도. 낮을수록(음수 큰 값) 멀리 듣는다"],
              ["방사효율", "입력 대비 방사된 비율(%). 안테나+매칭 손실 반영. dB로도 표기"],
              ["피크/평균 이득", "dBi. 방향성. 등방성(isotropic) 대비"],
              ["방사 패턴", "방향별 방사 세기 3D 분포. 널(null)·사각지대 확인"],
              ["효율 대역폭", "효율이 기준 이상인 주파수 범위(S11 대역폭과 다를 수 있음)"],
            ]},
            { t: "note", kind: "warn", title: "TRP/TIS는 시스템 지표 — desense를 잡아낸다", html: "TIS는 안테나뿐 아니라 <b>보드 자체 노이즈(DC-DC·디지털 고조파)가 수신기를 깎는 desense까지</b> 포함해 측정됩니다. S11·효율은 좋은데 TIS가 나쁘면 자기간섭(self-desense)을 의심하세요. (7장 <a href='#ver-emc'>EMC·공존</a> 연계)" },

            { t: "h", text: "측정 환경(챔버) 종류" },
            { t: "table",
              head: ["챔버", "원리", "특징"],
              rows: [
                ["Anechoic (무반사)", "흡수체로 반사 제거, far-field 직접 측정", "방사패턴·이득 정밀, 큼·고가"],
                ["CTIA OTA", "원거리/조합 측정, TRP·TIS 표준 절차", "단말 인증용 표준"],
                ["Reverberation (잔향)", "모드 교반으로 등방 환경, 효율·TRP 빠름", "패턴은 못 봄, 효율·TRP에 강점"],
                ["Near-field", "근거리 측정 후 far-field 변환", "작은 챔버로 패턴 산출"],
              ]
            },

            { t: "h", text: "측정 시 반드시 지킬 것" },
            { t: "check", items: [
              "<b>최종 조립 상태</b>(케이스·배터리·내부 부품 포함)로 측정 — 맨 보드 무의미",
              "실제 동작 모드(채널·출력·변조)로, 펌웨어 정상 상태에서",
              "교정(reference 안테나)·치구 손실 보정 — 미보정 시 절대값 오류",
              "여러 채널/대역(2.4G 저·중·고, 5G 밴드별) 모두 측정",
              "거치 방향·케이블 라우팅 표준화(케이블이 패턴 왜곡)",
              "여러 샘플로 산포 — 조립·부품 편차가 효율에 직접 반영",
            ]},
            { t: "note", kind: "tip", title: "S11과 OTA를 함께 읽기", html: "①S11 나쁨 + 효율 나쁨 → <b>매칭/주파수 문제</b>(튜닝으로 개선). ②S11 좋음 + 효율 나쁨 → <b>손실 문제</b>(근접 금속·도체손실·케이스 흡수, 배치 재검토). ③효율 좋음 + TIS 나쁨 → <b>desense</b>(보드 노이즈). 세 지표를 교차해 원인을 좁힙니다." },
            { t: "note", kind: "warn", title: "가전 특유의 함정", html: "냉장고·세탁기 등은 <b>금속 샤시·모터·도어</b>가 안테나 근처에 많아 효율·패턴이 크게 왜곡됩니다. 또 설치 환경(벽 안, 금속 인접)이 챔버와 달라, <b>실측 환경(in-situ) 검증</b>을 병행해야 합니다." },
            { t: "note", kind: "info", title: "연결", html: "OTA 결과는 6장 <a href='#ant-placement'>안테나 배치</a>·<a href='#ant-tuning'>튜닝</a>의 검증이며, 7장 <a href='#ver-measure'>측정 항목</a>·<a href='#ver-cert'>인증</a>의 핵심 데이터입니다." },
          ]
        }
      ]
    },

    /* ───────────────────────── 7. 검증·디버깅·인증 ───────────────────────── */
    {
      id: "verify",
      icon: "🔬",
      title: "7. 검증·디버깅·인증",
      sections: [
        {
          id: "ver-measure",
          title: "측정 항목·장비",
          blocks: [
            { t: "kv", rows: [
              ["VNA", "S파라미터(S11/S21) — 매칭·필터·전송선 검증"],
              ["스펙트럼 분석기", "출력·스퓨리어스·하모닉·점유대역폭"],
              ["신호분석기(VSA)", "EVM, 변조품질, 마스크"],
              ["챔버(OTA)", "방사효율, TRP(송신)/TIS(수신), 방사패턴"],
              ["전류 측정", "Tx/Rx/Sleep 소비전류, 피크 전류"],
            ]},
            { t: "note", kind: "warn", title: "치구·교정이 결과를 바꾼다", html: "RF 측정은 케이블 손실·커넥터·교정(calibration)에 매우 민감합니다. 교정을 안 하거나 치구가 나쁘면 '문제 없는데 문제 있게' 나옵니다. 측정 전 교정·de-embedding 필수." },
          ]
        },
        {
          id: "ver-debug",
          title: "디버깅 사고 흐름",
          blocks: [
            { t: "p", html: "RF 문제는 증상→원인이 1:1이 아닙니다. 계층을 따라 내려가며 분리합니다." },
            { t: "list", ordered: true, items: [
              "전원부터: Tx 시 전압 droop/리플 확인 (오실로스코프)",
              "클럭: 기준 주파수·위상잡음 정상인가",
              "매칭/안테나: VNA로 S11 — 대역 어긋남/반사 확인",
              "그라운드/리턴: 레이아웃에서 GND split, 디커플링 거리 점검",
              "공존/간섭: 다른 무선·DC-DC 노이즈가 대역에 들어오나",
              "SW/펌웨어: 설정(출력·채널·캘리값) 확인 — HW로 단정 전 분리",
            ]},
            { t: "note", kind: "tip", title: "노하우 누적란", html: "(실제 디버깅 사례: 증상 / 측정값 / 원인 / 해결 / 교훈 형식으로 누적)" },
          ]
        },
        {
          id: "ver-debug-cases",
          title: "딥다이브 — RF 디버깅 사례집(증상→원인 매핑)",
          blocks: [
            { t: "p", html: "RF 문제는 증상이 같아도 원인이 다릅니다. 자주 나오는 증상별로 <b>의심 순서·측정 방법·전형 원인</b>을 정리했습니다. 공통 원칙: <b>추측으로 부품을 바꾸지 말고, 측정으로 계층을 분리</b>하라(증거 기반)." },
            { t: "note", kind: "info", title: "비유로 먼저", html: "RF 디버깅은 <b>의사 진료</b>와 같습니다. '열이 난다(통신 불량)'는 증상 하나에 원인은 수십 가지. 청진(오실로스코프)·혈액검사(VNA)·X-ray(스펙트럼)로 <b>한 계통씩 배제</b>하며 좁혀야지, 증상만 보고 약(부품)을 바꾸면 낫지 않습니다." },

            { t: "h", text: "증상 → 의심 → 측정 → 원인" },
            { t: "table",
              head: ["증상", "먼저 의심", "측정 방법", "전형 원인"],
              rows: [
                ["송신 시 재부팅/먹통", "전원(droop)", "오실로스코프로 Tx 버스트 순간 전압", "벌크/디커플링 부족, 레귤레이터 용량 부족"],
                ["출력은 정상인데 거리 짧음", "안테나 효율", "OTA(TRP)·VNA S11", "근접 금속·케이스 흡수, 매칭 어긋남"],
                ["수신 감도만 나쁨", "desense(자기간섭)", "TIS, 무선 끈 채 노이즈 스펙트럼", "DC-DC·디지털 고조파가 RX 대역 침범"],
                ["주파수가 틀어짐/EVM 악화", "기준 클럭", "주파수 카운터·위상잡음", "XTAL load cap·배치, TCXO 불량"],
                ["EMC 방사 초과", "고조파·리턴경로", "스펙트럼+근접 프로브", "하모닉 필터 부재, GND 슬릿 우회"],
                ["특정 채널만 불량", "매칭 대역폭", "VNA 대역별 S11", "Q 과대로 대역 끝 정합 실패"],
                ["샘플마다 들쭉날쭉", "산포", "다수 샘플 측정", "부품 공차·조립 편차, 임피던스 산포"],
              ]
            },
            { t: "note", kind: "tip", title: "측정 도구별 '보는 것'", html: "<b>오실로스코프</b>=시간축 전원/디지털, <b>VNA</b>=반사/매칭(S11), <b>스펙트럼분석기</b>=출력·고조파·스퓨리어스, <b>근접 프로브(near-field)</b>=어디서 노이즈가 새는지 위치 추적, <b>OTA 챔버</b>=실제 방사효율·TRP/TIS. 증상에 맞는 도구를 골라야 헛고생을 안 합니다." },
            { t: "note", kind: "warn", title: "교정·치구를 먼저 의심하라", html: "'문제 없는데 문제로 나오는' 경우의 상당수는 <b>측정 오류</b>입니다. VNA 교정 안 함, 케이블 손실 미보정, GND 스프링 없는 긴 프로브, 치구 접촉 불량. 이상한 결과가 나오면 DUT를 의심하기 전에 <b>측정계를 먼저 검증</b>하세요." },
            { t: "note", kind: "tip", title: "사례 누적란", html: "(실제 프로젝트 사례를 '증상 / 측정값 / 원인 / 해결 / 교훈' 형식으로 이 표 아래에 계속 추가)" },
            { t: "note", kind: "info", title: "연결", html: "계층적 사고 흐름은 <a href='#ver-debug'>디버깅 사고 흐름</a>, 도구는 <a href='#ver-measure'>측정 항목·장비</a>, desense 원인은 <a href='#ver-emc'>EMC</a>·<a href='#ckt-pdn'>PDN</a> 참조." },
          ]
        },
        {
          id: "ver-emc",
          title: "EMC·공존",
          blocks: [
            { t: "list", items: [
              "방사 방출(Radiated Emission): 규제 한계 이하로 (하모닉·스퓨리어스)",
              "전도 방출/내성, ESD, EFT/Surge 등 가전 환경 시험",
              "자기 간섭(self-interference): DC-DC·디지털 클럭 하모닉이 RF 대역에",
              "공존: WiFi/BT/Zigbee 동시 동작 시 throughput 저하 점검",
            ]},
          ]
        },
        {
          id: "ver-emc-design",
          title: "딥다이브 — EMC 사전대책 설계(고조파·스퓨리어스·차폐)",
          blocks: [
            { t: "p", html: "EMC는 시험장에서 잡는 게 아니라 <b>설계 단계에서 예방</b>하는 것입니다. 방사 방출 초과로 인증에 떨어지면 보드를 다시 떠야 하므로, 처음부터 <b>발생원을 줄이고(source) 경로를 막는(path)</b> 설계를 합니다." },
            { t: "note", kind: "info", title: "비유로 먼저", html: "EMC 대책은 <b>소음 관리</b>와 같습니다. ①소음원을 조용하게(발생원 억제: 느린 엣지·필터) ②벽으로 막고(차폐) ③새는 틈을 없앤다(리턴경로·접지). 시험 전날 귀마개(임시 대책)는 한계가 있어, 건물 설계 때부터 방음을 넣어야 합니다." },

            { t: "h", text: "방사의 두 발생원" },
            { t: "kv", rows: [
              ["하모닉(고조파)", "송신 기본파의 정수배(2f·3f…). PA 비선형성에서 발생. 하모닉 필터(LPF)로 억제"],
              ["스퓨리어스", "의도치 않은 주파수 방출(혼변조·클럭 누설 등). 차폐·필터·배치로 억제"],
              ["디지털 고조파", "고속 디지털·DC-DC의 빠른 엣지가 만드는 광대역 고조파 — RF 대역 침범 시 desense"],
            ]},

            { t: "h", text: "발생원(Source) 억제" },
            { t: "list", items: [
              "송신단에 <b>하모닉 LPF</b>(또는 필터발룬)로 2·3차 고조파 차단",
              "DC-DC <b>스위칭 주파수·확산스펙트럼(SSC)</b> 선택으로 RF 대역 회피",
              "디지털 신호 <b>엣지 레이트 완화</b>(직렬 저항·드라이브 세기 조정) — 불필요하게 빠른 엣지 금지",
              "클럭·고조파가 풍부한 신호의 <b>주파수 계획</b>(채널과 겹치지 않게)",
            ]},
            { t: "h", text: "경로(Path) 차단" },
            { t: "list", items: [
              "<b>리턴경로 연속성</b> — GND 슬릿 금지, 스티칭 비아(5장 핵심)",
              "<b>쉴드캔</b>으로 RF/노이즈 블록 차폐 (캔 GND 비아 촘촘히)",
              "외부 케이블에 <b>커먼모드 초크·페라이트 비드</b>",
              "전원 입구 <b>π/LC 필터</b>로 전도 방출 차단",
              "I/O·커넥터에 <b>ESD/필터</b> 소자",
            ]},
            { t: "note", kind: "warn", title: "커먼모드가 방사 챔피언", html: "차동(정상) 신호는 루프가 작으면 거의 안 방사하지만, 리턴 불균형이 만든 <b>커먼모드 전류는 케이블·금속 샤시를 안테나로 만들어</b> 방사합니다. 5장 <a href='#pcb-emi-loop'>EMI 방사 원리</a>에서 설명한 메커니즘이 그대로 EMC 결과로 나타납니다. 리턴경로 설계가 곧 EMC 대책입니다." },
            { t: "h", text: "사전대책 체크리스트" },
            { t: "check", items: [
              "송신 하모닉 필터 자리 확보(NM 포함)",
              "RF·노이즈 블록 쉴드캔 풋프린트와 GND 비아",
              "DC-DC 배치·필터·스위칭 주파수가 RF 대역과 분리",
              "외부 케이블 커먼모드 대책(초크/페라이트) 위치 확보",
              "전 신호 리턴경로 연속성 사전 검토(GND split 없음)",
              "pre-scan(사내 근접 프로브)로 양산 전 방사 핫스팟 확인",
            ]},
            { t: "note", kind: "info", title: "연결", html: "방사 메커니즘은 5장 <a href='#pcb-emi-loop'>EMI 방사 원리</a>·<a href='#pcb-stitching'>스티칭 비아</a>, desense 측정은 <a href='#ant-ota'>OTA(TIS)</a>·<a href='#ver-debug-cases'>디버깅 사례집</a>, 규제 한계는 <a href='#ver-cert'>인증</a> 참조." },
          ]
        },
        {
          id: "ver-cert",
          title: "규제 인증 (지역별)",
          blocks: [
            { t: "table",
              head: ["지역", "규제/마크", "포인트"],
              rows: [
                ["한국", "KC (전파인증)", "RRA, 적합성평가"],
                ["미국", "FCC", "Part 15, 채널/출력 제한, DFS"],
                ["유럽", "CE / RED", "RED 지침, 863–868 Sub-G"],
                ["일본", "MIC / 技適(기적)", "Telec"],
              ]
            },
            { t: "note", kind: "tip", title: "모듈 인증 승계", html: "Pre-certified 모듈을 쓰면 시스템 인증 범위를 줄일 수 있습니다(조건 준수 시). 칩 직접 설계는 전체 인증을 직접 받아야 하므로 일정·비용에 반영하세요." },
            { t: "note", kind: "warn", title: "지역 = 설계 변수", html: "허용 주파수·출력·채널이 지역마다 달라 안테나/매칭/펌웨어 설정이 달라질 수 있습니다. 인증 지역을 1단계(요구사항)에서 확정해야 재작업을 막습니다." },
          ]
        }
      ]
    },

    /* ───────────────────────── 8. 양산·공급망 ───────────────────────── */
    {
      id: "production",
      icon: "🏭",
      title: "8. 양산·공급망·이원화",
      sections: [
        {
          id: "prod-gates",
          title: "양산 검증 단계 (EVT/DVT/PVT)",
          blocks: [
            { t: "table",
              head: ["단계", "목적", "주요 점검"],
              rows: [
                ["EVT", "기능 검증", "동작·기본 RF 성능, 설계 오류 수정"],
                ["DVT", "설계 검증", "전 규격/신뢰성/환경/인증 사전 시험"],
                ["PVT", "양산 검증", "양산 라인·치구·수율·산포 검증"],
              ]
            },
          ]
        },
        {
          id: "prod-yield",
          title: "양산성·산포 관리",
          blocks: [
            { t: "list", items: [
              "RF 부품 산포(매칭 소자 ±, 안테나 조립 편차)로 성능 산포 발생",
              "양산 RF 테스트: 출력·주파수·전류 자동 측정 치구",
              "캘리브레이션: 칩별 RF 캘값 기록·기입 공정",
              "조립 변수: 케이스·실드캔·안테나 부착 위치 산포 관리",
            ]},
            { t: "note", kind: "warn", title: "설계 마진", html: "시제품 1대가 통과해도 양산 1만 대 중 꼬리(worst case)가 떨어질 수 있습니다. 스펙 대비 충분한 마진(예: S11, 출력, 감도)을 두고 설계하세요." },
          ]
        },
        {
          id: "prod-rftest",
          title: "딥다이브 — 양산 RF 테스트·캘리브레이션",
          blocks: [
            { t: "p", html: "설계가 좋아도 <b>양산 라인에서 한 대씩 측정·보정</b>하지 못하면 불량이 출하됩니다. 양산 RF 테스트는 ①성능을 빠르게 검증하고 ②칩별 편차를 보정(캘리브레이션)하는 두 축으로 구성됩니다." },
            { t: "note", kind: "info", title: "비유로 먼저", html: "양산 캘리브레이션은 <b>안경 맞춤</b>과 같습니다. 같은 모델 안경테(설계)라도 사람마다 시력(칩 편차)이 달라, <b>한 명씩 도수를 측정해 렌즈를 맞춰야</b> 잘 보입니다. RF도 칩마다 출력·주파수가 조금씩 달라, 개체별로 측정해 보정값을 칩에 써넣습니다." },

            { t: "h", text: "양산 RF 테스트 — 무엇을 재나" },
            { t: "kv", rows: [
              ["출력(Tx Power)", "규격별 출력이 한계 내·목표 부근인지"],
              ["주파수 오차", "기준 클럭 ppm — 캘리브레이션으로 보정"],
              ["EVM/변조 품질", "고차변조 동작 가능한지(샘플/풀테스트)"],
              ["수신(간이)", "기준 신호 수신·패킷 에러율(PER) 확인"],
              ["전류", "Tx/Sleep 전류로 조립·부품 이상 검출"],
            ]},
            { t: "note", kind: "why", title: "왜 캘리브레이션이 필요한가", html: "반도체·부품은 공정 산포로 개체마다 출력·주파수가 다릅니다. 캘리브레이션은 개체를 측정해 <b>보정값(파워 인덱스·주파수 오프셋 등)을 칩의 NV메모리에 기록</b>해, 모든 제품이 동일 규격 성능을 내게 합니다. 안 하면 산포가 그대로 필드 불량이 됩니다." },

            { t: "h", text: "양산 테스트 설계 시 고려" },
            { t: "check", items: [
              "<b>테스트 치구(jig)</b>: 도전(導電) 결합(RF 커넥터/프로브) 또는 결합 안테나 — 반복성·교정 관리",
              "<b>택트 타임</b>: 한 대당 측정 시간이 라인 생산속도를 결정 — 풀테스트 vs 샘플링 균형",
              "<b>측정기 교정·상관성</b>: 라인 측정기와 기준 챔버 결과의 상관(correlation) 확보",
              "<b>한계값(limit) 설정</b>: 설계 마진 안에서 양산 산포를 거를 합격선",
              "<b>데이터 수집</b>: 측정값 로깅으로 산포·수율 추세 모니터링(공정 이상 조기 발견)",
              "조립 후 변수(케이스·실드캔·안테나) 포함 상태로 최종 검증",
            ]},
            { t: "note", kind: "warn", title: "치구가 곧 수율", html: "양산 RF 측정은 치구 접촉·결합 반복성에 매우 민감합니다. 치구가 불안정하면 <b>양품을 불량으로(과검출) 버려 수율이 떨어지거나</b>, 반대로 불량을 통과시킵니다. 치구 교정·점검 주기를 공정에 포함하세요." },
            { t: "note", kind: "tip", title: "수율·산포는 돈이다", html: "수율 1%는 양산 수만 대에서 큰 금액입니다. 설계 마진(<a href='#prod-yield'>산포 관리</a>)·임피던스 산포(<a href='#pcb-stackup'>스택업</a>)·매칭 산포를 줄이면 양산 수율이 오릅니다. 측정 데이터를 모아 <b>산포 추세를 보는 것</b>이 선제 품질관리입니다." },
            { t: "note", kind: "info", title: "연결", html: "검증 단계는 <a href='#prod-gates'>EVT/DVT/PVT</a>, 측정 항목·교정은 7장 <a href='#ver-measure'>측정 항목·장비</a>, 산포 근원은 <a href='#pcb-stackup'>기판</a>·<a href='#ckt-clock'>클럭</a> 참조." },
          ]
        },
        {
          id: "prod-secondsource",
          title: "이원화(Second Source)·EOL 대응",
          blocks: [
            { t: "note", kind: "why", title: "왜 이원화인가", html: "단일 칩/벤더 의존은 단종(EOL)·공급난·가격 협상력 약화의 리스크입니다. 가전은 제품 수명이 길어 부품 공급 지속성이 특히 중요합니다." },
            { t: "check", items: [
              "선정 단계에서 핀/기능 호환 대체 칩 후보 확보",
              "PCB에 양쪽 풋프린트/매칭 호환 레이아웃 반영",
              "대체 칩으로도 RF 성능·인증 재검증 계획",
              "벤더별 단가·리드타임·재고 모니터링",
            ]},
            { t: "note", kind: "tip", title: "단가 모니터링", html: "주요 RF 부품 단가·재고·리드타임을 주기적으로 추적해 EOL/가격 변동에 선제 대응. (반복 수작업은 자동화 대상)" },
          ]
        }
      ]
    },

    /* ───────────────────────── 9. 종합 체크리스트 ───────────────────────── */
    {
      id: "checklist",
      icon: "✅",
      title: "9. 종합 설계 체크리스트",
      sections: [
        {
          id: "checklist-master",
          title: "단계별 마스터 체크리스트",
          blocks: [
            { t: "p", html: "이 페이지는 문서 전체에 흩어진 <b>모든 체크 항목을 장(단계)별로 자동 수집</b>한 마스터 체크리스트입니다. 새 체크 항목을 어느 섹션에 추가하든 여기에 자동 반영됩니다. 설계 게이트 리뷰에서 <b>빠진 것이 없는지</b> 위에서 아래로 훑어 내려가세요." },
            { t: "note", kind: "tip", title: "사용법", html: "각 항목 끝의 <b>↗</b>를 누르면 그 항목을 설명하는 원본 섹션으로 이동합니다. 인쇄가 필요하면 좌측 <b>🖨️ 전체 인쇄 / PDF</b>로 문서 전체를 출력할 수 있습니다." },
            { t: "autocheck" },
          ]
        }
      ]
    },

    /* ───────────────────────── 10. 용어집 ───────────────────────── */
    {
      id: "glossary",
      icon: "📖",
      title: "10. 용어집",
      sections: [
        {
          id: "gloss-main",
          title: "약어·용어 사전",
          blocks: [
            { t: "kv", rows: [
              ["RF SoC", "RF 기능 통합 칩 (System-on-Chip)"],
              ["PA / LNA", "Power Amplifier / Low Noise Amplifier"],
              ["FEM", "Front-End Module (PA+LNA+스위치 통합)"],
              ["Balun", "Balanced-Unbalanced 변환기"],
              ["VSWR", "Voltage Standing Wave Ratio (정재파비)"],
              ["S11 / S21", "반사계수 / 전달계수 (S-파라미터)"],
              ["VNA", "Vector Network Analyzer"],
              ["EVM", "Error Vector Magnitude (변조품질)"],
              ["EIRP", "Equivalent Isotropically Radiated Power (등가등방복사전력) = 도전출력 − 손실 + 안테나이득. 규제 기준"],
              ["ERP", "Effective Radiated Power (다이폴 기준 복사전력). EIRP보다 2.15dB 작음"],
              ["Conducted Power", "도전 출력 — 칩/PA 핀에서 측정한 출력"],
              ["Back-off", "선형성·EVM·마스크 만족 위해 PA 출력을 한계보다 낮추는 것"],
              ["SEM / Mask", "Spectrum Emission Mask (스펙트럼 방출 마스크 한계)"],
              ["OBW", "Occupied Bandwidth (점유 대역폭)"],
              ["ACPR / ACLR", "Adjacent Channel Power/Leakage Ratio (인접채널 누설)"],
              ["Spurious", "스퓨리어스 — 의도치 않은 대역 외 방출"],
              ["Sensitivity", "수신 감도 — 통신 가능한 최소 수신전력(dBm), 낮을수록 좋음"],
              ["Duty Cycle / LBT", "송신 점유율 제한 / Listen-Before-Talk (Sub-G·유럽 규제)"],
              ["TRP / TIS", "Total Radiated Power / Total Isotropic Sensitivity"],
              ["OTA", "Over-The-Air (무선 방사 측정)"],
              ["DFS", "Dynamic Frequency Selection (5GHz 레이더 회피)"],
              ["AFC", "Automated Frequency Coordination (6GHz)"],
              ["PTA", "Packet Traffic Arbitration (공존 중재)"],
              ["CPWG", "Coplanar Waveguide with Ground"],
              ["ISM", "Industrial/Scientific/Medical 비면허 밴드"],
              ["EOL", "End Of Life (부품 단종)"],
              ["EVT/DVT/PVT", "Engineering/Design/Production Validation Test"],
              ["NRE", "Non-Recurring Engineering (초기 개발비)"],
              ["ESD", "Electrostatic Discharge (정전기 방전)"],
            ]},
          ]
        }
      ]
    }
  ]
};
