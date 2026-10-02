/**
 * Wi-Fi 탭 콘텐츠 — IEEE 802.11 세대·대역·채널·PHY·HW 함의
 * content.js 다음에 로드. window.KB_CONTENT.tabs 에 Wi-Fi 탭을 추가한다.
 *
 * ※ 규제(채널·출력·DFS·6GHz 개방)는 국가별로 다르고 자주 개정된다.
 *   수치는 설계 감을 잡기 위한 개략값 — 실제는 해당 지역 최신 규정 확인.
 */
(function () {
  if (!window.KB_CONTENT || !window.KB_CONTENT.tabs) return;

  window.KB_CONTENT.tabs.push({
    id: "wifi",
    label: "Wi-Fi",
    icon: "📶",
    chapters: [
      /* ───────────── W0. 개요 ───────────── */
      {
        id: "wifi-intro",
        icon: "📘",
        title: "W0. Wi-Fi 개요",
        sections: [
          {
            id: "wifi-overview",
            title: "Wi-Fi와 IEEE 802.11 — 표준과 마케팅 이름",
            blocks: [
              { t: "p", html: "<b>Wi-Fi</b>는 IEEE <b>802.11</b> 무선랜 표준의 상표명(Wi-Fi Alliance)입니다. 엔지니어는 <b>802.11n/ac/ax/be</b> 같은 표준명을, 일반 사용자는 <b>Wi-Fi 4/5/6/7</b> 같은 세대 이름을 씁니다. 이 탭은 HW 설계 관점에서 세대별 특징·대역·채널·국가별 운용을 정리합니다." },
              { t: "note", kind: "info", title: "비유로 먼저", html: "Wi-Fi 세대는 <b>자동차 모델 연식</b>과 같습니다. 같은 도로(주파수)를 달리지만 세대가 올라갈수록 더 넓은 차선(채널폭)·더 빠른 변속(변조)·여러 차로 동시운행(MU-MIMO/OFDMA)이 가능해집니다. HW(엔진·서스펜션)는 그만큼 정교해져야 합니다." },
              { t: "h", text: "표준명 ↔ 세대 이름" },
              { t: "table",
                head: ["세대 이름", "IEEE 표준", "PHY 명칭", "비고"],
                rows: [
                  ["(레거시)", "802.11a/b/g", "—", "Wi-Fi 4 이전. 11b=2.4G/11Mbps, 11a=5G/OFDM, 11g=2.4G/OFDM"],
                  ["Wi-Fi 4", "802.11n", "HT (High Throughput)", "MIMO 도입, 2.4/5GHz"],
                  ["Wi-Fi 5", "802.11ac", "VHT (Very HT)", "5GHz 전용, MU-MIMO(하향)"],
                  ["Wi-Fi 6", "802.11ax", "HE (High Efficiency)", "OFDMA·1024-QAM, 2.4/5GHz"],
                  ["Wi-Fi 6E", "802.11ax", "HE", "Wi-Fi 6 + 6GHz 대역 확장"],
                  ["Wi-Fi 7", "802.11be", "EHT (Extremely HT)", "320MHz·4096-QAM·MLO"],
                ]
              },
              { t: "note", kind: "tip", title: "왜 '세대 이름'이 생겼나", html: "2018년 Wi-Fi Alliance가 802.11ax부터 숫자 세대명(Wi-Fi 6)을 도입했습니다. 'ac vs ax' 같은 알파벳보다 '5 vs 6'이 소비자에게 직관적이기 때문입니다. 소급해서 11n=Wi-Fi 4, 11ac=Wi-Fi 5로 명명했습니다." },
              { t: "note", kind: "warn", title: "이 탭의 수치 주의", html: "채널·출력·DFS·6GHz 개방 같은 <b>규제 항목은 국가별로 다르고 자주 개정</b>됩니다. 여기 수치는 설계 감을 잡기 위한 개략값이며, 실제 설계·인증은 해당 지역 최신 규정(FCC/ETSI/RRA/MIC 등)을 확인하세요." },
            ]
          }
        ]
      },

      /* ───────────── W1. 세대별 특징 ───────────── */
      {
        id: "wifi-gen",
        icon: "🚀",
        title: "W1. 세대별 특징",
        sections: [
          {
            id: "wifi-gen-timeline",
            title: "세대 발전 타임라인",
            blocks: [
              { t: "p", html: "Wi-Fi는 세대마다 <b>더 넓은 채널 + 더 높은 차수의 변조 + 더 많은 공간 스트림(MIMO) + 효율 기술(OFDMA·MLO)</b>로 속도와 효율을 끌어올렸습니다." },
              { t: "fig",
                caption: "Wi-Fi 표준 발전. 세대가 오를수록 채널폭·변조차수·공간스트림이 커지고, 효율 기술이 추가된다. 화살표는 시간 흐름.",
                svg: '<svg viewBox="0 0 620 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Wi-Fi 세대 발전 타임라인">'
                  + '<line class="kb-flow" x1="40" y1="120" x2="585" y2="120" stroke="#4aa3ff" stroke-width="2"/>'
                  + (function(){
                      var g=[['Wi-Fi 4','11n','2009','MIMO·40MHz','#9aa7b4'],['Wi-Fi 5','11ac','2013','MU-MIMO·160MHz','#4aa3ff'],['Wi-Fi 6/6E','11ax','2019/20','OFDMA·1024QAM·6GHz','#2ea043'],['Wi-Fi 7','11be','2024','MLO·320MHz·4K-QAM','#a371f7']];
                      var out='';var x0=90, dx=160;
                      g.forEach(function(s,i){
                        var x=x0+i*dx; var up=(i%2===0);
                        var by=up?60:140; var ty=up?52:200;
                        out+='<circle cx="'+x+'" cy="120" r="6" fill="'+s[4]+'"/>';
                        out+='<line x1="'+x+'" y1="120" x2="'+x+'" y2="'+(up?by+34:by)+'" stroke="'+s[4]+'" stroke-width="1.5" opacity="0.5"/>';
                        out+='<rect x="'+(x-58)+'" y="'+by+'" width="116" height="34" rx="6" fill="'+s[4]+'" fill-opacity="0.14" stroke="'+s[4]+'" stroke-opacity="0.6"/>';
                        out+='<text x="'+x+'" y="'+(by+15)+'" text-anchor="middle" class="fig-label" style="fill:'+s[4]+'">'+s[0]+' ('+s[1]+')</text>';
                        out+='<text x="'+x+'" y="'+(by+28)+'" text-anchor="middle" class="fig-sub">'+s[3]+'</text>';
                        out+='<text x="'+x+'" y="'+ty+'" text-anchor="middle" class="fig-sub" fill="#7a8694">'+s[2]+'</text>';
                      });
                      return out;
                    })()
                  + '</svg>'
              },
            ]
          },
          {
            id: "wifi-gen-compare",
            title: "세대별 핵심 스펙 비교",
            blocks: [
              { t: "table",
                head: ["세대", "표준", "대역", "최대 채널폭", "최대 변조", "공간스트림", "이론 최대(PHY)"],
                rows: [
                  ["Wi-Fi 4", "11n", "2.4 / 5 GHz", "40 MHz", "64-QAM", "4", "600 Mbps"],
                  ["Wi-Fi 5", "11ac", "5 GHz", "160 MHz", "256-QAM", "8", "~3.5 Gbps (8SS 이론 6.9)"],
                  ["Wi-Fi 6", "11ax", "2.4 / 5 GHz", "160 MHz", "1024-QAM", "8", "9.6 Gbps"],
                  ["Wi-Fi 6E", "11ax", "+6 GHz", "160 MHz", "1024-QAM", "8", "9.6 Gbps"],
                  ["Wi-Fi 7", "11be", "2.4 / 5 / 6 GHz", "320 MHz", "4096-QAM", "16", "~46 Gbps"],
                ]
              },
              { t: "note", kind: "warn", title: "'이론 최대'는 실제 속도가 아니다", html: "표의 PHY 속도는 <b>최대 공간스트림·최대 채널폭·최고 변조·최단 GI를 모두 만족할 때의 이론치</b>입니다. 실제 가전 모듈은 보통 1~2 스트림, 좁은 채널이라 훨씬 낮습니다. 비교는 '세대 간 상대적 향상'으로 보세요." },
              { t: "h", text: "세대별 '무엇이 추가됐나'" },
              { t: "kv", rows: [
                ["Wi-Fi 4 (11n)", "<b>MIMO</b>(다중 안테나로 공간 스트림), 채널 본딩(40MHz), 프레임 집성(A-MPDU)"],
                ["Wi-Fi 5 (11ac)", "5GHz 전용, <b>하향 MU-MIMO</b>, 256-QAM, 80/160MHz, 빔포밍 표준화"],
                ["Wi-Fi 6 (11ax)", "<b>OFDMA</b>(채널을 잘게 나눠 다중 사용자 동시), 상·하향 MU-MIMO, <b>1024-QAM</b>, <b>TWT</b>(절전), <b>BSS Color</b>(간섭 구분), 2.4G에도 적용"],
                ["Wi-Fi 6E", "Wi-Fi 6 기술을 <b>깨끗한 6GHz</b>로 확장(레거시 간섭 無, 넓은 채널 다수)"],
                ["Wi-Fi 7 (11be)", "<b>320MHz</b> 채널, <b>4096-QAM</b>, <b>MLO</b>(여러 대역 동시 사용), 16 공간스트림, Multi-RU"],
              ]},
              { t: "note", kind: "tip", title: "HW 관점 한 줄 요약", html: "세대가 오를수록 <b>채널이 넓어지고(광대역 매칭·저손실 기판) 변조가 촘촘해진다(엄격한 EVM·위상잡음·PA 선형성)</b>. 6GHz·MLO는 <b>새 대역 안테나·멀티 RF 체인</b>을 요구합니다. (자세히는 W4·W5) 세대별 파라미터 전체는 <a href='#wifi-spec-sheet'>W1.5 상세 장표</a>" },
            ]
          }
        ]
      },

      /* ───────────── W1.5 표준 상세 장표 ───────────── */
      {
        id: "wifi-spec",
        icon: "📋",
        title: "W1.5 표준 상세 장표 — 대역·채널·본딩·MCS·MIMO",
        sections: [
          {
            id: "wifi-spec-sheet",
            title: "세대별 PHY 상세 장표 (11b → 11be)",
            blocks: [
              { t: "p", html: "Wi-Fi 세대가 바뀔 때 움직이는 손잡이는 다섯 개입니다: <b>①채널폭(본딩) ②변조(QAM)와 부호율 = MCS ③공간 스트림(MIMO) ④심볼 길이·가드 인터벌 ⑤다중 사용자 방식</b>. 속도는 이 다섯의 곱이고, 아래 장표는 세대별로 각 손잡이가 어디까지 올라갔는지를 한 장에 모은 것입니다. 각 항목의 상세는 이어지는 4개 절에 있습니다." },
              { t: "note", kind: "info", title: "비유로 먼저", html: "Wi-Fi 링크를 <b>고속도로 물류</b>로 보면, <b>채널폭</b>은 차선 수, <b>변조</b>는 트럭 한 대에 짐을 얼마나 촘촘히 싣느냐, <b>부호율</b>은 짐 중 완충재(오류정정)를 뺀 실제 화물 비율, <b>공간 스트림</b>은 같은 땅 위에 겹쳐 지은 복층 도로, <b>가드 인터벌</b>은 차간 안전거리입니다. 차선을 늘리든, 적재를 촘촘히 하든, 복층을 올리든 물동량은 늘지만 각각 대가가 다릅니다." },
              { t: "table",
                head: ["항목", "802.11b", "802.11a / g", "Wi-Fi 4 (11n)", "Wi-Fi 5 (11ac)", "Wi-Fi 6 / 6E (11ax)", "Wi-Fi 7 (11be)"],
                rows: [
                  ["등장 시기", "1999", "1999 / 2003", "2009", "2013", "2019 인증 시작 (6E 2020~)", "2024"],
                  ["대역", "2.4 GHz", "a: 5 GHz · g: 2.4 GHz", "2.4 / 5 GHz", "<b>5 GHz 전용</b>", "2.4 / 5 GHz (+6 GHz = 6E)", "2.4 / 5 / 6 GHz"],
                  ["채널폭", "22 MHz", "20 MHz", "20 · 40", "20 · 40 · 80 · 160 (80+80)", "20 · 40 · 80 · 160", "20 ~ <b>320</b>"],
                  ["전송 방식", "DSSS / CCK", "OFDM", "OFDM", "OFDM", "<b>OFDMA</b>", "OFDMA + Multi-RU"],
                  ["부반송파 간격 / 심볼 길이", "—", "312.5 kHz / 3.2 µs", "312.5 kHz / 3.2 µs", "312.5 kHz / 3.2 µs", "<b>78.125 kHz / 12.8 µs</b> (4배)", "78.125 kHz / 12.8 µs"],
                  ["가드 인터벌(GI)", "—", "0.8 µs", "0.8 / 0.4 µs", "0.8 / 0.4 µs", "0.8 / 1.6 / 3.2 µs", "0.8 / 1.6 / 3.2 µs"],
                  ["최고 변조", "CCK", "64-QAM", "64-QAM", "256-QAM", "1024-QAM", "<b>4096-QAM</b>"],
                  ["MCS 표기", "1·2·5.5·11 Mbps", "6~54 Mbps (8단계)", "MCS 0–31 (<b>번호에 스트림 수 포함</b>)", "MCS 0–9 × NSS", "MCS 0–11 × NSS", "MCS 0–13 × NSS"],
                  ["최대 공간 스트림", "1 (SISO)", "1 (SISO)", "4", "8", "8", "16 (제품은 대개 2~4)"],
                  ["다중 사용자", "—", "—", "—", "하향 MU-MIMO", "상·하향 MU-MIMO + OFDMA", "+ MLO · 프리앰블 펑처링"],
                  ["1 스트림 최고 속도 (최대 폭)", "11 Mbps", "54 Mbps", "150 Mbps (40M · SGI)", "866.7 Mbps (160M)", "1,201 Mbps (160M)", "2,882 Mbps (320M)"],
                  ["이론 최대 (전 스트림)", "11 Mbps", "54 Mbps", "600 Mbps", "6.9 Gbps", "9.6 Gbps", "46 Gbps"],
                  ["<b>가전 1×1 대표값</b>", "—", "—", "72.2 Mbps (20M · MCS7 · SGI)", "5GHz 모듈에서 80M 시 433 Mbps", "86 Mbps (20M · MCS7) / 143 Mbps (MCS11)", "172 Mbps (20M · MCS13)"],
                ]
              },
              { t: "note", kind: "warn", title: "번호 체계 함정 — 11n의 MCS와 11ac 이후의 MCS는 다르다", html: "11n은 <b>MCS 번호에 스트림 수가 섞여</b> 있습니다: MCS 0–7은 1 스트림, 8–15는 2 스트림…(MCS15 = 2 스트림 64-QAM 5/6). 11ac부터는 MCS(변조·부호율)와 <b>NSS(공간 스트림 수)를 따로</b> 적습니다(예: \"MCS9, NSS2\"). 데이터시트·측정 리포트에서 \"MCS15\"를 보면 어느 세대 기준인지부터 확인하세요." },
              { t: "note", kind: "why", title: "왜 Wi-Fi 6는 심볼을 4배로 늘렸나", html: "부반송파 간격을 1/4(78.125kHz)로 줄이면 같은 채널에 부반송파가 4배 들어가고 심볼 길이는 4배(12.8µs)가 됩니다. 그러면 심볼마다 붙는 GI의 비율이 작아져 효율이 오르고, 반사 지연이 긴 환경을 위한 긴 GI(3.2µs)도 쓸 수 있습니다. 대가는 <b>부반송파 사이가 좁아져 주파수 오차·위상잡음에 더 민감</b>해진다는 점입니다 — Wi-Fi 6 이상에서 크리스탈 ppm과 클럭 품질 요구가 엄격해지는 이유입니다(→ <a href='#ckt-clock'>기준 클럭·위상잡음</a>, <a href='#ckt-xtal-select'>XTAL 선정</a>)." },
              { t: "note", kind: "tip", title: "장표를 가전 모듈 관점에서 읽는 법", html: "실제로 쓰는 줄은 <b>마지막 '가전 1×1 대표값'</b>입니다. 1 스트림·20MHz에서 Wi-Fi 6 MCS7이 86Mbps — 가전의 상태 보고·제어·OTA 업데이트에는 충분합니다. '이론 최대' 열은 세대 간 상대 비교용 마케팅 수치로만 보세요. 세대 선택은 속도보다 <b>칩 공급성·전류·SW 지원·인증 지역</b>으로 정해집니다(→ <a href='#wifi-hw-implications'>HW 설계 함의</a>)." },
            ]
          },
          {
            id: "wifi-mcs-table",
            title: "MCS 상세 — 인덱스별 변조·부호율·속도·EVM·감도",
            blocks: [
              { t: "p", html: "<b>MCS(Modulation and Coding Scheme)</b>는 '변조 방식 + 부호율' 한 쌍에 붙인 번호입니다. 송신기는 링크 상태(SNR)를 보며 MCS를 실시간으로 바꿉니다 — 가까우면 높은 MCS로 빠르게, 멀어지면 낮은 MCS로 확실하게(<b>rate adaptation</b>). 그래서 MCS 하나에는 <b>속도·필요한 신호 품질(EVM)·필요한 수신 세기(감도)</b>가 한 묶음으로 따라옵니다." },
              { t: "note", kind: "why", title: "부호율(R)이란", html: "<b>R = 실제 데이터 비트 ÷ 전송 비트</b>. 5/6이면 6비트 중 5비트가 데이터, 1비트가 오류정정(LDPC/BCC)용 여분입니다. R이 작을수록 여분이 많아 느리지만 잡음에 강합니다. 같은 64-QAM이 MCS5(2/3)·MCS6(3/4)·MCS7(5/6)로 세 단계로 나뉘는 이유가 이것입니다 — 변조를 바꾸지 않고 여분만 조절해 단계를 촘촘하게 만든 것입니다." },
              { t: "table",
                head: ["MCS", "변조", "부호율", "부반송파당 비트", "20 MHz", "40 MHz", "80 MHz", "160 MHz", "송신 EVM 한계", "수신 최소감도 (20 MHz)"],
                rows: [
                  ["0", "BPSK", "1/2", "1", "8.6", "17.2", "36.0", "72.1", "−5 dB", "−82 dBm"],
                  ["1", "QPSK", "1/2", "2", "17.2", "34.4", "72.1", "144.1", "−10 dB", "−79 dBm"],
                  ["2", "QPSK", "3/4", "2", "25.8", "51.6", "108.1", "216.2", "−13 dB", "−77 dBm"],
                  ["3", "16‑QAM", "1/2", "4", "34.4", "68.8", "144.1", "288.2", "−16 dB", "−74 dBm"],
                  ["4", "16‑QAM", "3/4", "4", "51.6", "103.2", "216.2", "432.4", "−19 dB", "−70 dBm"],
                  ["5", "64‑QAM", "2/3", "6", "68.8", "137.6", "288.2", "576.5", "−22 dB", "−66 dBm"],
                  ["6", "64‑QAM", "3/4", "6", "77.4", "154.9", "324.3", "648.5", "−25 dB", "−65 dBm"],
                  ["7", "64‑QAM", "5/6", "6", "86.0", "172.1", "360.3", "720.6", "−27 dB", "−64 dBm"],
                  ["8", "256‑QAM", "3/4", "8", "103.2", "206.5", "432.4", "864.7", "−30 dB", "−59 dBm"],
                  ["9", "256‑QAM", "5/6", "8", "114.7", "229.4", "480.4", "960.8", "−32 dB", "−57 dBm"],
                  ["10", "1024‑QAM", "3/4", "10", "129.0", "258.1", "540.4", "1,080.9", "−35 dB", "−54 dBm"],
                  ["11", "1024‑QAM", "5/6", "10", "143.4", "286.8", "600.5", "1,201.0", "−35 dB", "−52 dBm"],
                  ["12 (Wi-Fi 7)", "4096‑QAM", "3/4", "12", "154.9", "309.7", "648.5", "1,297.1", "−38 dB", "−49 dBm"],
                  ["13 (Wi-Fi 7)", "4096‑QAM", "5/6", "12", "172.1", "344.1", "720.6", "1,441.2", "−38 dB", "−46 dBm"],
                ]
              },
              { t: "p", html: "<b>표 기준</b>: 속도(Mbps)는 Wi-Fi 6/7 · <b>1 스트림</b> · GI 0.8µs. 스트림 수만큼 곱하면 됩니다. Wi-Fi 7의 320MHz 1 스트림은 MCS12 2,594 / MCS13 2,882 Mbps. 감도는 규격이 정한 <b>최소 요구치</b>이며 실제 칩은 대개 수 dB 더 좋고, 채널폭이 2배가 될 때마다 3dB씩 나빠집니다(잡음 대역 2배). EVM 한계는 규격의 송신 요구치입니다. MCS 0–9 값은 11ac와 같고, 11n MCS 0–7(20MHz, GI 0.8µs)은 6.5 · 13 · 19.5 · 26 · 39 · 52 · 58.5 · 65 Mbps입니다." },
              { t: "fig",
                caption: "Rate adaptation: 단말이 AP에서 멀어지면 SNR이 떨어지고, 송신기는 MCS를 한 계단씩 낮춰 연결을 유지한다. 높은 계단일수록 빠르지만 요구 SNR이 높아 가까운 거리에서만 성립한다. MCS11과 MCS0의 요구 감도 차이는 약 30dB다.",
                svg: '<svg viewBox="0 0 620 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="거리에 따른 MCS 계단식 하강">'
                  + '<line x1="60" y1="195" x2="590" y2="195" stroke="#7a8694" stroke-width="1.5"/><line x1="60" y1="195" x2="60" y2="30" stroke="#7a8694" stroke-width="1.5"/>'
                  + '<text x="585" y="214" text-anchor="end" class="fig-sub">AP와의 거리 → (SNR ↓)</text><text x="52" y="40" text-anchor="end" class="fig-sub">속도</text>'
                  + '<path class="kb-flow-slow" d="M70,55 H150 V80 H230 V105 H310 V130 H390 V155 H470 V180 H570" stroke="#4aa3ff" stroke-width="3" fill="none"/>'
                  + (function(){
                      var s=[['MCS11 · 1024Q','#a371f7'],['MCS9 · 256Q','#a371f7'],['MCS7 · 64Q','#4aa3ff'],['MCS5 · 64Q','#4aa3ff'],['MCS3 · 16Q','#2ea043'],['MCS0 · BPSK','#2ea043']];
                      var o='';
                      s.forEach(function(r,i){ o+='<text x="'+(110+i*80)+'" y="'+(48+i*25)+'" text-anchor="middle" class="fig-sub" fill="'+r[1]+'">'+r[0]+'</text>'; });
                      return o;
                    })()
                  + '<text x="150" y="150" text-anchor="middle" class="fig-sub" fill="#a371f7">가까이: 촘촘한 변조</text>'
                  + '<text x="470" y="88" text-anchor="middle" class="fig-sub" fill="#2ea043">멀리: 성긴 변조 + 많은 오류정정</text>'
                  + '</svg>'
              },
              { t: "note", kind: "why", title: "MCS 한 계단 = SNR 몇 dB", html: "표의 감도 열을 보면 인접 MCS 사이 요구 수신 세기 차이는 1~5dB, <b>MCS0에서 MCS11까지 약 30dB</b>입니다. 30dB는 전력으로 1,000배이고, 자유공간이라면 거리 약 30배에 해당합니다(실내는 벽·반사로 그보다 짧음). 즉 같은 모듈이라도 <b>최고 MCS는 같은 방, MCS0는 집 끝</b>에서 성립하는 서로 다른 성능입니다." },
              { t: "note", kind: "warn", title: "흔한 오해 — \"최고 MCS가 잘 나와야 좋은 모듈?\"", html: "높은 MCS는 EVM 한계가 엄격해서, 같은 칩이라도 <b>MCS가 높을수록 송신 출력을 낮춰야(back-off)</b> 합니다. 그래서 칩의 타겟파워 테이블은 MCS별로 다르고, 실사용 거리를 결정하는 것은 오히려 <b>낮은 MCS의 출력과 감도</b>입니다. 가전에서는 '먼 방에서도 끊기지 않는가'가 '가까이서 얼마나 빠른가'보다 중요합니다(→ <a href='#rf-signal-levels'>대신호와 back-off</a>, <a href='#ver-cal'>타겟파워 설정</a>, <a href='#proc-targets'>Target 정의</a>)." },
              { t: "note", kind: "tip", title: "현장 노하우 — 측정할 MCS 고르기", html: "①인증·양산 RF 시험은 대표 3점으로 커버합니다: <b>MCS0</b>(최대 출력·감도 마진), <b>MCS7</b>(64-QAM 중간), <b>최고 MCS</b>(EVM 최악 조건). ②데이터시트 감도는 반드시 <b>MCS·채널폭·PER 기준(보통 10%)·패킷 길이</b> 조건을 함께 읽으세요 — 조건이 다르면 수치 비교가 무의미합니다. ③EVM 마진은 '규격 한계 − 실측'으로 관리하고, 온도·전압 코너에서 다시 확인합니다(→ <a href='#prod-rftest'>양산 RF 테스트</a>)." },
              { t: "note", kind: "info", title: "표 수치의 근거", html: "속도는 <a href='#wifi-datarate'>데이터율 계산식</a>으로 직접 계산한 값이고, 수신 최소감도(MCS 0–13)는 IEEE 802.11be 감도 표를 정리한 <a href='https://www.rfwireless-world.com/test-and-measurement/receiver-minimum-input-sensitivity-in-wifi-7' target='_blank' rel='noopener'>RF Wireless World 정리표</a>와 대조했습니다(20MHz 기준, 채널폭 2배마다 +3dB, 320MHz는 MCS13 −34dBm). EVM 측정 조건은 <a href='https://scdn.rohde-schwarz.com/ur/pws/dl_downloads/dl_application/application_notes/1ef114/1EF114_1e_802_11be_EVM.pdf' target='_blank' rel='noopener'>Rohde &amp; Schwarz 802.11be EVM 측정 노트</a>를 참고하세요. 인증·양산 판정에는 반드시 IEEE 원문이나 시험소 기준서를 사용하세요." },
            ]
          },
          {
            id: "wifi-datarate",
            title: "데이터율 계산식 — 장표의 숫자는 어디서 나오나",
            blocks: [
              { t: "p", html: "장표의 모든 속도는 하나의 식에서 나옵니다: <b>데이터율 = N<sub>SS</sub> × N<sub>SD</sub> × N<sub>BPSCS</sub> × R ÷ (T<sub>DFT</sub> + T<sub>GI</sub>)</b>. 식을 알면 데이터시트의 속도를 직접 검산할 수 있고, 어떤 손잡이를 돌리면 HW에 무슨 부담이 오는지도 보입니다." },
              { t: "kv", rows: [
                ["N<sub>SS</sub> — 공간 스트림 수", "MIMO로 동시에 보내는 독립 데이터 흐름 수 (→ <a href='#wifi-siso-mimo'>SISO·MIMO</a>)"],
                ["N<sub>SD</sub> — 데이터 부반송파 수", "채널폭이 정함 (아래 표). 파일럿·가드 부반송파는 제외"],
                ["N<sub>BPSCS</sub> — 부반송파당 비트", "변조가 정함: BPSK 1 · QPSK 2 · 16-QAM 4 · 64-QAM 6 · 256-QAM 8 · 1024-QAM 10 · 4096-QAM 12"],
                ["R — 부호율", "1/2 · 2/3 · 3/4 · 5/6 (MCS가 정함)"],
                ["T<sub>DFT</sub> — 심볼 길이", "3.2µs (11a/g/n/ac) · 12.8µs (11ax/be)"],
                ["T<sub>GI</sub> — 가드 인터벌", "0.4 / 0.8 / 1.6 / 3.2µs (세대별)"],
              ]},
              { t: "table",
                head: ["채널폭", "11a/g · 11n · 11ac (312.5 kHz 간격)", "11ax · 11be (78.125 kHz 간격)"],
                rows: [
                  ["20 MHz", "48 (11a/g) · 52 (11n/ac)", "234"],
                  ["40 MHz", "108", "468"],
                  ["80 MHz", "234", "980"],
                  ["160 MHz", "468", "1,960"],
                  ["320 MHz", "—", "3,920"],
                ]
              },
              { t: "note", kind: "info", title: "계산 예시 3개", html: "①<b>11a 54Mbps</b> = 1 × 48 × 6 × 3/4 ÷ (3.2 + 0.8)µs = <b>54 Mbps</b><br>②<b>가전 1×1 Wi-Fi 6, 20MHz, MCS7</b> = 1 × 234 × 6 × 5/6 ÷ (12.8 + 0.8)µs = <b>86.0 Mbps</b><br>③<b>스마트폰 2×2 Wi-Fi 6, 80MHz, MCS11</b> = 2 × 980 × 10 × 5/6 ÷ 13.6µs = <b>1,201 Mbps</b> — 흔히 보는 'AX1800 공유기의 5GHz 1,201Mbps'가 이 값입니다." },
              { t: "note", kind: "why", title: "가드 인터벌(GI)이란", html: "벽에 반사된 신호는 직진 신호보다 늦게 도착해 <b>다음 심볼과 겹칩니다(심볼 간 간섭, ISI)</b>. GI는 심볼 사이에 두는 빈 시간 — 반사파가 다 도착할 때까지 기다리는 차간 거리입니다. 짧으면 빠르지만(11n/ac의 0.4µs Short GI는 약 11% 속도 증가), 반사 지연이 긴 넓은 공간·실외에선 깨집니다. Wi-Fi 6가 3.2µs GI를 둔 것은 실외·대형 공간을 위해서입니다." },
              { t: "note", kind: "warn", title: "흔한 오해 — \"PHY 속도 = 실제 전송 속도?\"", html: "식이 주는 값은 <b>공중에서 비트가 흐르는 속도(PHY rate)</b>입니다. 실제 TCP 처리량은 프리앰블·ACK·경합 대기·재전송 같은 MAC 오버헤드 때문에 대략 PHY의 절반에서 2/3 수준이고, 같은 채널을 다른 기기와 나눠 쓰면 더 줄어듭니다. 86Mbps 링크라면 실측은 수십 Mbps가 정상입니다." },
              { t: "note", kind: "tip", title: "속도를 2배로 만드는 세 가지 길 — HW 대가", html: "<b>채널폭 2배</b>: 매칭·필터가 더 넓은 대역에서 평탄해야 하고 감도는 3dB 나빠짐(→ <a href='#rf-smith'>Q와 대역폭</a>). <b>스트림 2배</b>: RF 체인·안테나 2배, 안테나 격리·체인별 캘리브레이션 필요. <b>변조 한 단계↑</b>: EVM이 엄격해져 위상잡음·PA 선형성·전원 노이즈 요구가 오르고 출력은 back-off(→ <a href='#ckt-pdn'>PDN</a>, <a href='#ckt-clock'>클럭</a>). 가전 모듈은 보통 어느 것도 끝까지 밀지 않고, 원가와 안정성의 균형점에서 멈춥니다." },
            ]
          },
          {
            id: "wifi-channel-bonding",
            title: "채널 번호·본딩 상세 — primary 채널·조합·펑처링",
            blocks: [
              { t: "p", html: "채널 본딩은 인접한 20MHz 채널을 묶어 넓은 채널을 만드는 것입니다. 단순해 보이지만 <b>어떤 채널끼리 묶을 수 있는지(정해진 조합), 묶은 채널을 언제 실제로 넓게 쓰는지(primary 채널 규칙), 일부가 막혔을 때 어떻게 하는지(펑처링)</b>가 정해져 있습니다." },
              { t: "kv", rows: [
                ["2.4 GHz 번호↔주파수", "f = 2407 + 5·n MHz (n = 1~13), ch14 = 2484 MHz. 채널 번호 간격이 5MHz라 20MHz 채널은 이웃 번호와 겹침 → <b>비중첩은 1 · 6 · 11</b>"],
                ["5 GHz 번호↔주파수", "f = 5000 + 5·n MHz (ch36 = 5180 MHz). 20MHz 채널은 번호 <b>4칸씩</b>(36, 40, 44…)이라 겹치지 않음"],
                ["6 GHz 번호↔주파수", "f = 5950 + 5·n MHz (ch1 = 5955 MHz). 20MHz 채널은 1 · 5 · 9 … 233"],
                ["표기 예", "\"ch 36, 80MHz\" = primary가 36이고 36~48(중심 42)을 묶은 80MHz 채널"],
              ]},
              { t: "fig",
                caption: "5GHz 본딩 조합(미국 등 일반적 배치, 개략). 20MHz 채널을 정해진 경계에서만 2·4·8개씩 묶는다. 빨간 칸(52~144)은 DFS 대역이라, 채널이 넓어질수록 DFS를 피하기 어렵다 — 160MHz는 두 조합 모두 DFS 채널을 포함한다.",
                svg: '<svg viewBox="0 0 620 215" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="5GHz 채널 본딩 조합과 DFS 대역">'
                  + (function(){
                      var g=[{x:40,ch:[36,40,44,48,52,56,60,64]},{x:216,ch:[100,104,108,112,116,120,124,128,132,136,140,144]},{x:468,ch:[149,153,157,161,165]}];
                      var o='';var W=19,w=17;
                      g.forEach(function(gr){
                        gr.ch.forEach(function(c,i){
                          var dfs=(c>=52&&c<=144);var col=dfs?'#e5534b':'#4aa3ff';
                          o+='<rect x="'+(gr.x+i*W)+'" y="40" width="'+w+'" height="24" rx="2" fill="'+col+'" fill-opacity="0.22" stroke="'+col+'" stroke-opacity="0.6"/>';
                        });
                      });
                      function bar(x0,i0,n,y,h,col){o+='<rect x="'+(x0+i0*W)+'" y="'+y+'" width="'+(n*W-2)+'" height="'+h+'" rx="3" fill="'+col+'" fill-opacity="0.25" stroke="'+col+'" stroke-opacity="0.7"/>';}
                      [0,2,4,6].forEach(function(i){bar(40,i,2,74,14,'#e3b341');});
                      [0,2,4,6,8,10].forEach(function(i){bar(216,i,2,74,14,'#e3b341');});
                      [0,2].forEach(function(i){bar(468,i,2,74,14,'#e3b341');});
                      [0,4].forEach(function(i){bar(40,i,4,96,14,'#2ea043');});
                      [0,4,8].forEach(function(i){bar(216,i,4,96,14,'#2ea043');});
                      bar(468,0,4,96,14,'#2ea043');
                      bar(40,0,8,118,14,'#a371f7');bar(216,0,8,118,14,'#a371f7');
                      o+='<text x="572" y="57" class="fig-sub">20</text><text x="572" y="86" class="fig-sub" fill="#e3b341">40</text><text x="572" y="108" class="fig-sub" fill="#2ea043">80</text><text x="572" y="130" class="fig-sub" fill="#a371f7">160 MHz</text>';
                      [[40,0,'36'],[40,7,'64'],[216,0,'100'],[216,11,'144'],[468,0,'149'],[468,4,'165']].forEach(function(l){o+='<text x="'+(l[0]+l[1]*W+8)+'" y="34" text-anchor="middle" class="fig-sub">'+l[2]+'</text>';});
                      o+='<text x="117" y="156" text-anchor="middle" class="fig-sub">UNII-1 · 2A</text><text x="330" y="156" text-anchor="middle" class="fig-sub">UNII-2C</text><text x="515" y="156" text-anchor="middle" class="fig-sub">UNII-3</text>';
                      return o;
                    })()
                  + '<rect x="40" y="172" width="14" height="10" fill="#e5534b" fill-opacity="0.3" stroke="#e5534b"/><text x="60" y="181" class="fig-sub">DFS 대역 (레이더 감지 시 채널 이동)</text>'
                  + '<rect x="300" y="172" width="14" height="10" fill="#4aa3ff" fill-opacity="0.3" stroke="#4aa3ff"/><text x="320" y="181" class="fig-sub">DFS 불필요</text>'
                  + '<text x="310" y="206" text-anchor="middle" class="fig-sub">넓은 채널은 정해진 경계로만 묶인다 · 165는 짝이 없어 20MHz 전용</text>'
                  + '</svg>'
              },
              { t: "table",
                head: ["채널폭", "5 GHz 조합 (중심 채널)", "5 GHz 개수(대략)", "6 GHz 개수 (1200MHz 전체 개방 시)"],
                rows: [
                  ["20 MHz", "36, 40 … 64, 100 … 144, 149 … 165", "지역별 약 20~25", "59"],
                  ["40 MHz", "38, 46, 54, 62, 102 … 142, 151, 159", "약 12", "29"],
                  ["80 MHz", "42, 58, 106, 122, 138, 155", "6", "14"],
                  ["160 MHz", "50 (36–64), 114 (100–128) · UNII-4 개방 지역은 163 추가", "2 (+1)", "7"],
                  ["320 MHz", "—", "—", "3 (Wi-Fi 7)"],
                ]
              },
              { t: "note", kind: "why", title: "primary 채널 — 본딩은 '빈 차선이 있을 때만'", html: "넓은 채널을 쓰는 네트워크도 <b>primary 20MHz 하나</b>를 정해 비콘·관리 프레임·채널 경합(CCA)을 거기서 합니다. 넓게 보내려면 전송 직전 매번 <b>secondary 채널들이 비어 있는지</b> 확인하고, 하나라도 사용 중이면 좁은 폭으로 내려서 보냅니다(dynamic bandwidth). 즉 '80MHz 설정'은 '항상 80MHz'가 아니라 '비어 있으면 80MHz까지'라는 뜻입니다. 2.4GHz의 40MHz는 primary 위(HT40+) 또는 아래(HT40−)에 secondary를 붙이며, 주변에 다른 네트워크가 있으면 공존 규칙에 따라 20MHz로 강등됩니다(→ <a href='#wifi-channels'>2.4GHz에서 40MHz 비권장</a>)." },
              { t: "note", kind: "why", title: "프리앰블 펑처링 — 막힌 칸만 비우고 나머지를 쓴다", html: "예전에는 넓은 채널 중 20MHz 하나만 간섭(이웃 네트워크·레이더)을 받아도 넓은 폭 전체를 포기하고 내려가야 했습니다. <b>펑처링</b>은 막힌 20MHz 조각만 비우고 나머지를 묶어 씁니다(Wi-Fi 6에서 선택 기능, Wi-Fi 7에서 본격화). 6GHz 320MHz처럼 채널이 넓을수록 일부가 막힐 확률이 높아 효과가 큽니다." },
              { t: "note", kind: "warn", title: "흔한 오해 — \"채널이 넓을수록 무조건 빠르다?\"", html: "같은 송신 전력을 2배 넓은 대역에 펼치면 MHz당 전력은 절반(−3dB)이 되고, 수신기가 받아들이는 잡음은 2배(+3dB)가 됩니다. 결과적으로 같은 거리에서 SNR이 떨어져 <b>MCS가 내려가고</b>, 가장자리 단말에선 좁은 채널이 오히려 빠를 수 있습니다. 또 5GHz 160MHz는 DFS 채널을 피할 수 없어 레이더가 감지되면 채널을 옮기거나 잠시 송신을 멈춰야 합니다." },
              { t: "note", kind: "tip", title: "현장 노하우 — 출력 규제는 '총량'인가 '밀도'인가", html: "일부 규제(예: 6GHz LPI)는 총 출력이 아니라 <b>전력 밀도(dBm/MHz)</b>로 제한합니다. 이 경우 채널을 넓히면 허용 총 출력이 커지고, 반대로 총 출력으로 제한하는 대역에서는 넓힐수록 MHz당 전력이 줄어듭니다. 지역·대역별 타겟파워를 채널폭마다 따로 잡아야 하는 이유입니다(→ <a href='#wifi-6g-region'>6GHz 출력 규칙</a>, <a href='#ver-cert'>규제 인증</a>). 가전은 보통 2.4GHz 20MHz, 5GHz 20~80MHz로 운용합니다." },
            ]
          },
          {
            id: "wifi-siso-mimo",
            title: "SISO · SIMO · MISO · MIMO — 안테나 수가 주는 것",
            blocks: [
              { t: "p", html: "안테나 구성은 <b>'송신 안테나 × 수신 안테나 : 공간 스트림'</b>으로 적습니다(예: 2×2:2). 안테나를 늘려 얻는 이득은 두 종류로 갈립니다 — 같은 데이터를 여러 경로로 보내 <b>신뢰성·거리를 얻는 다이버시티</b>와, 서로 다른 데이터를 동시에 보내 <b>속도를 얻는 공간 다중화</b>. 어느 쪽에 쓰느냐에 따라 같은 2×2도 전혀 다르게 동작합니다." },
              { t: "note", kind: "info", title: "비유로 먼저", html: "시끄러운 방에서의 대화로 보면 — <b>SISO</b>는 한 사람이 한 귀에 말하기. <b>SIMO</b>는 귀 두 개로 듣기(한쪽이 막혀도 다른 쪽으로 들림). <b>MISO</b>는 두 사람이 같은 말을 동시에 해서 확실히 전달하기. <b>MIMO</b>는 두 사람이 <b>서로 다른 말</b>을 동시에 하고, 듣는 사람이 목소리가 오는 방향 차이로 둘을 갈라 듣기 — 같은 시간에 정보가 2배입니다." },
              { t: "fig",
                caption: "왼쪽부터 SISO(1×1), SIMO(1×2, 수신 다이버시티), MISO(2×1, 송신 다이버시티·빔포밍), MIMO(2×2, 공간 다중화). MIMO에서는 두 송신 안테나가 서로 다른 데이터(파랑·초록)를 보내고, 각 신호가 서로 다른 경로로 두 수신 안테나에 섞여 도착하면 수신기가 이를 계산으로 분리한다.",
                svg: '<svg viewBox="0 0 620 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="SISO SIMO MISO MIMO 안테나 구성 비교">'
                  + (function(){
                      var P=[['SISO 1×1',[120],[120],[[0,0,'#4aa3ff']],'1 스트림','기본'],
                             ['SIMO 1×2',[120],[100,140],[[0,0,'#4aa3ff'],[0,1,'#4aa3ff']],'1 스트림','수신 다이버시티'],
                             ['MISO 2×1',[100,140],[120],[[0,0,'#4aa3ff'],[1,0,'#4aa3ff']],'1 스트림','송신 다이버시티·빔포밍'],
                             ['MIMO 2×2',[100,140],[100,140],[[0,0,'#4aa3ff'],[0,1,'#4aa3ff'],[1,0,'#2ea043'],[1,1,'#2ea043']],'2 스트림','속도 2배 (다중화)']];
                      var o='';
                      P.forEach(function(p,i){
                        var x=12+i*152;
                        if(i>0) o+='<line x1="'+(x-6)+'" y1="40" x2="'+(x-6)+'" y2="200" stroke="#7a8694" stroke-dasharray="4 4" opacity="0.35"/>';
                        o+='<text x="'+(x+70)+'" y="30" text-anchor="middle" class="fig-label">'+p[0]+'</text>';
                        o+='<rect x="'+(x+2)+'" y="80" width="26" height="80" rx="5" fill="#e3b341" fill-opacity="0.15" stroke="#e3b341" stroke-opacity="0.6"/><text x="'+(x+15)+'" y="176" text-anchor="middle" class="fig-sub">Tx</text>';
                        o+='<rect x="'+(x+112)+'" y="80" width="26" height="80" rx="5" fill="#9aa7b4" fill-opacity="0.15" stroke="#9aa7b4" stroke-opacity="0.6"/><text x="'+(x+125)+'" y="176" text-anchor="middle" class="fig-sub">Rx</text>';
                        p[3].forEach(function(l,k){
                          var y1=p[1][l[0]],y2=p[2][l[1]];
                          o+='<line class="kb-flow kb-d'+(k+1)+'" x1="'+(x+32)+'" y1="'+y1+'" x2="'+(x+108)+'" y2="'+y2+'" stroke="'+l[2]+'" stroke-width="2.5"/>';
                        });
                        p[1].forEach(function(y){o+='<circle cx="'+(x+31)+'" cy="'+y+'" r="4" fill="#e3b341"/>';});
                        p[2].forEach(function(y){o+='<circle cx="'+(x+109)+'" cy="'+y+'" r="4" fill="#9aa7b4"/>';});
                        o+='<text x="'+(x+70)+'" y="198" text-anchor="middle" class="fig-sub" fill="'+(i===3?'#2ea043':'#4aa3ff')+'">'+p[4]+'</text>';
                        o+='<text x="'+(x+70)+'" y="216" text-anchor="middle" class="fig-sub">'+p[5]+'</text>';
                      });
                      return o;
                    })()
                  + '</svg>'
              },
              { t: "table",
                head: ["구성", "얻는 것", "원리", "Wi-Fi에서의 이름"],
                rows: [
                  ["SISO (1×1:1)", "기본 1 스트림", "단일 경로", "11a/b/g, 대부분의 가전 모듈"],
                  ["SIMO (1×2)", "감도·안정성↑ (페이딩 완화)", "두 수신 신호를 더하거나(MRC) 좋은 쪽을 선택", "수신기 구현 (규격 기능명 없음)"],
                  ["MISO (2×1)", "수신 SNR↑ → 거리·안정성↑", "같은 데이터를 시공간 부호화(STBC)·지연(CDD)해 보내거나, 위상을 맞춰 한 방향으로 모음(빔포밍)", "11n STBC, 11ac 이후 송신 빔포밍(TxBF)"],
                  ["MIMO (N×M:S)", "<b>속도 S배</b>", "다중경로로 서로 다르게 섞인 신호를 수신기가 채널 행렬로 분리. S ≤ min(N, M)", "11n부터 (공간 다중화)"],
                  ["MU-MIMO", "AP 한 대가 여러 단말에 동시 전송 → 전체 용량↑", "빔으로 단말을 공간적으로 분리", "11ac 하향, 11ax 상·하향"],
                ]
              },
              { t: "note", kind: "why", title: "MIMO는 왜 '반사'가 있어야 하나", html: "수신기는 각 송신 안테나에서 온 신호가 <b>서로 다른 경로로 다르게 섞여</b> 도착했다는 점을 이용해, 일종의 연립방정식(채널 행렬 H)을 풀어 스트림을 분리합니다. 경로가 서로 비슷하면 — 시야가 트인 직선 경로뿐이거나, 두 안테나가 너무 가까워 같은 신호를 받으면(상관도↑) — 방정식이 풀리지 않아 <b>실제 스트림 수가 줄어듭니다</b>. 그래서 MIMO는 반사가 많은 실내에서 오히려 잘 되고, 안테나는 <b>간격을 벌리고(λ/2 이상, 2.4GHz 약 6cm) 방향·편파를 다르게</b> 배치합니다(→ <a href='#ant-fields'>편파</a>)." },
              { t: "table",
                head: ["HW 항목", "1×1", "2×2"],
                rows: [
                  ["RF 체인 (PA · LNA · 믹서)", "1", "2 (SoC 내장이라도 면적·전류 증가)"],
                  ["안테나 · 매칭", "1", "2 + <b>안테나 간 격리 확보 공간</b>"],
                  ["송신 피크 전류", "기준", "체인 수만큼 증가 → 전원 용량·PDN 재검토"],
                  ["캘리브레이션", "체인 1개", "체인별 + 체인 간 위상·이득 정합"],
                  ["인증 시험", "단일 포트", "포트별 + MIMO 출력 합산·지향성 이득 반영 규칙"],
                  ["BOM · 크기", "최소", "증가 — 가전에선 이 비용을 정당화할 속도 요구가 드묾"],
                ]
              },
              { t: "note", kind: "warn", title: "흔한 오해 — \"2×2면 거리도 2배?\"", html: "공간 다중화로 속도를 2배로 쓰는 순간 각 스트림은 전력을 나눠 가지므로, 먼 거리에선 단말이 자동으로 <b>1 스트림으로 내려갑니다</b>. 2×2가 거리에 주는 이득은 다이버시티·빔포밍 쪽의 <b>수 dB</b>이지 2배가 아닙니다. 또한 링크의 스트림 수는 <b>양쪽 중 작은 쪽</b>을 따릅니다 — 2×2 모듈이라도 공유기가 1×1 모드면 1 스트림입니다." },
              { t: "note", kind: "tip", title: "현장 노하우 — 가전에서 2×2를 고려할 때", html: "가전 Wi-Fi 모듈은 원가·공간·전류 때문에 대부분 <b>1×1</b>입니다. 2×2를 택한다면 ①안테나 격리(흔히 15dB 이상 목표)와 포락선 상관계수(ECC, 흔히 0.5 이하 목표)를 OTA로 확인 ②두 안테나의 방향·편파를 다르게 ③금속 샤시가 한쪽 안테나만 가리지 않도록 배치 ④MIMO 출력 합산 규칙을 반영해 지역별 타겟파워 재설정. 속도보다 <b>수신 다이버시티(안정성)</b>가 목적이라면 2×2 대신 1×1 + 안테나 다이버시티 스위치도 대안입니다(→ <a href='#ant-placement'>안테나 배치</a>, <a href='#ant-ota'>OTA</a>)." },
              { t: "note", kind: "info", title: "연결", html: "MLO(여러 대역 동시 사용)와 빔포밍 요약은 <a href='#wifi-mimo-mlo'>MIMO · MU-MIMO · MLO</a>, 세대별 최대 스트림 수는 <a href='#wifi-spec-sheet'>상세 장표</a>를 보세요." },
            ]
          }
        ]
      },

      /* ───────────── W2. 대역·채널 ───────────── */
      {
        id: "wifi-band",
        icon: "📡",
        title: "W2. 주파수 대역·채널",
        sections: [
          {
            id: "wifi-bands",
            title: "2.4 / 5 / 6 GHz — 세 대역의 성격",
            blocks: [
              { t: "p", html: "Wi-Fi는 비면허 대역을 씁니다. 대역마다 <b>혼잡도·채널 수·도달거리·규제</b>가 다릅니다." },
              { t: "fig",
                caption: "세 대역의 폭과 성격(개략). 주파수가 낮을수록 도달·투과가 좋지만 좁고 혼잡하고, 높을수록 넓고 깨끗하지만 도달이 짧다.",
                svg: '<svg viewBox="0 0 620 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="2.4/5/6GHz 대역 비교">'
                  + (function(){
                      var b=[['2.4 GHz','~83 MHz','#e3b341',60,80],['5 GHz','~500+ MHz(지역별)','#4aa3ff',150,300],['6 GHz','~500–1200 MHz(지역별)','#2ea043',240,470]];
                      var out='';var y=50;
                      b.forEach(function(r,i){
                        var yy=y+i*46;
                        out+='<rect x="40" y="'+yy+'" width="'+r[4]+'" height="26" rx="4" fill="'+r[2]+'" fill-opacity="0.22" stroke="'+r[2]+'" stroke-opacity="0.6"/>';
                        out+='<text x="48" y="'+(yy+18)+'" class="fig-label" style="fill:'+r[2]+'">'+r[0]+'</text>';
                        out+='<text x="'+(40+r[4]+10)+'" y="'+(yy+18)+'" class="fig-sub">'+r[1]+'</text>';
                      });
                      return out;
                    })()
                  + '<text x="40" y="196" class="fig-sub">막대 길이 = 대략적 가용 대역폭 (지역별 상이)</text>'
                  + '</svg>'
              },
              { t: "table",
                head: ["대역", "주파수", "특징", "Wi-Fi 세대"],
                rows: [
                  ["2.4 GHz", "2400–2483.5 MHz", "도달·투과 좋음, 가장 혼잡, 채널 적음(비중첩 3)", "4·6·7"],
                  ["5 GHz", "약 5150–5895 MHz", "넓은 대역·채널 많음, DFS 규제, 도달 중간", "4·5·6·7"],
                  ["6 GHz", "5925–7125 MHz", "가장 넓고 깨끗(레거시無), 도달 짧음, AFC", "6E·7"],
                ]
              },
              { t: "note", kind: "info", title: "왜 6GHz가 '깨끗한가'", html: "6GHz는 최근 Wi-Fi에 개방되어 <b>레거시(11b/g/n) 기기가 없습니다</b>. 넓은 채널(80/160/320MHz)을 간섭 없이 여러 개 쓸 수 있어 고속·저지연에 유리합니다. 단 주파수가 높아 <b>도달거리·투과가 짧고</b>, 지역별 개방 범위가 다릅니다." },
              { t: "note", kind: "info", title: "1 GHz 아래의 Wi-Fi — HaLow", html: "2.4/5/6 GHz 외에 <b>Sub-1 GHz(지역별 750~930 MHz)</b>를 쓰는 Wi-Fi도 있습니다. 802.11ah, 즉 Wi-Fi HaLow로, 거리·벽 투과·저전력이 강점이고 속도는 낮습니다. 기존 공유기로는 받을 수 없어 전용 AP가 필요합니다. 상세는 <a href='#halow-overview'>Wi-Fi HaLow 탭</a>을 보세요." },
            ]
          },
          {
            id: "wifi-channels",
            title: "채널폭과 채널 본딩 (20→320 MHz)",
            blocks: [
              { t: "p", html: "기본 채널은 <b>20MHz</b>이고, 인접 채널을 묶어(본딩) 40·80·160·320MHz로 넓힙니다. <b>채널이 넓을수록 속도↑이지만 간섭에 취약</b>하고 쓸 수 있는 채널 수가 줄어듭니다." },
              { t: "fig",
                caption: "채널 본딩: 20MHz를 묶어 더 넓은 채널을 만든다. 넓을수록 빠르지만, 들어갈 자리(비중첩 채널 수)가 줄고 간섭 확률이 커진다. 320MHz는 6GHz(Wi-Fi 7)에서만.",
                svg: '<svg viewBox="0 0 620 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="채널 본딩 20 40 80 160 320 MHz">'
                  + (function(){
                      var rows=[['20 MHz',60,'#9aa7b4'],['40 MHz',120,'#e3b341'],['80 MHz',240,'#4aa3ff'],['160 MHz',420,'#2ea043'],['320 MHz (Wi-Fi7·6GHz)',520,'#a371f7']];
                      var out='';var y=30;
                      rows.forEach(function(r,i){
                        var yy=y+i*34;
                        out+='<rect x="40" y="'+yy+'" width="'+r[1]+'" height="22" rx="3" fill="'+r[2]+'" fill-opacity="0.22" stroke="'+r[2]+'" stroke-opacity="0.6"/>';
                        out+='<text x="'+(40+r[1]+8)+'" y="'+(yy+16)+'" class="fig-sub" fill="'+r[2]+'">'+r[0]+'</text>';
                      });
                      return out;
                    })()
                  + '<text x="40" y="200" class="fig-sub">넓을수록 속도↑ · 채널 수↓ · 간섭에 취약</text>'
                  + '</svg>'
              },
              { t: "note", kind: "warn", title: "2.4GHz에서 40MHz는 비권장", html: "2.4GHz는 전체가 ~83MHz뿐이라 40MHz를 쓰면 비중첩 채널이 사실상 1개로 줄어 이웃과 충돌합니다. 2.4G는 보통 <b>20MHz</b>로 운용합니다. 넓은 채널은 5/6GHz에서." },
              { t: "note", kind: "tip", title: "가전 모듈의 현실", html: "가전 Wi-Fi 모듈은 고속이 목적이 아니라 <b>안정적 연결</b>이 목적이라 보통 20/40MHz·1 스트림으로 충분합니다. 넓은 채널·다중 스트림은 라우터/AP나 고성능 단말의 몫입니다." },
              { t: "note", kind: "info", title: "본딩 상세", html: "채널 번호↔주파수 공식, 5/6GHz 본딩 조합, primary 채널 규칙, 펑처링은 <a href='#wifi-channel-bonding'>채널 번호·본딩 상세</a>를 보세요." },
            ]
          }
        ]
      },

      /* ───────────── W3. 국가별 채널 운용 ───────────── */
      {
        id: "wifi-region",
        icon: "🌐",
        title: "W3. 국가별 채널 운용",
        sections: [
          {
            id: "wifi-region-overview",
            title: "규제 도메인과 채널 운용 방식",
            blocks: [
              { t: "p", html: "같은 Wi-Fi라도 <b>국가(규제 도메인)마다 허용 채널·출력·실내외·DFS가 다릅니다</b>. 그래서 모듈은 <b>지역 코드(regulatory domain)</b>에 따라 채널·출력을 제한해 동작합니다. 제품의 판매 지역을 설계 초기에 확정해야 합니다." },
              { t: "note", kind: "info", title: "비유로 먼저", html: "규제 도메인은 <b>나라별 교통법규</b>입니다. 같은 차(Wi-Fi 칩)라도 어느 나라에선 못 가는 길(채널)이 있고, 제한속도(출력)가 다르며, 특정 도로는 비 오면(레이더 감지) 비켜야 합니다(DFS). 차는 GPS로 나라를 알고 규칙을 바꿉니다." },
              { t: "h", text: "2.4GHz 채널 — 지역별 차이" },
              { t: "table",
                head: ["지역", "허용 채널(20MHz)", "비고"],
                rows: [
                  ["미국 (FCC)", "1 – 11", "12·13 불가"],
                  ["유럽 (ETSI)", "1 – 13", ""],
                  ["한국 (RRA)", "1 – 13", ""],
                  ["일본 (MIC)", "1 – 13 (+14)", "채널 14는 11b(DSSS) 전용"],
                ]
              },
              { t: "fig",
                caption: "2.4GHz 비중첩 채널은 1·6·11(20MHz 기준). 지역에 따라 12·13(유럽/한국/일본)까지 쓸 수 있어 13 부근에 여유가 생긴다. 미국은 11까지만.",
                svg: '<svg viewBox="0 0 620 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="2.4GHz 지역별 채널">'
                  + '<line x1="40" y1="120" x2="585" y2="120" stroke="#7a8694" stroke-width="1.5"/>'
                  + '<text x="40" y="140" class="fig-sub">ch1</text><text x="585" y="140" text-anchor="end" class="fig-sub">ch13/14</text>'
                  + (function(){
                      var nonov=[['1',70,'#2ea043'],['6',270,'#2ea043'],['11',470,'#2ea043']];
                      var out='';
                      nonov.forEach(function(c){
                        out+='<rect x="'+(c[1]-45)+'" y="70" width="90" height="46" rx="4" fill="'+c[2]+'" fill-opacity="0.18" stroke="'+c[2]+'" stroke-opacity="0.6"/>';
                        out+='<text x="'+c[1]+'" y="98" text-anchor="middle" class="fig-sub" fill="'+c[2]+'">ch'+c[0]+'</text>';
                      });
                      out+='<rect x="505" y="70" width="70" height="46" rx="4" fill="#e3b341" fill-opacity="0.16" stroke="#e3b341" stroke-dasharray="4 3"/>';
                      out+='<text x="540" y="92" text-anchor="middle" class="fig-sub" fill="#e3b341">12·13</text>';
                      out+='<text x="540" y="106" text-anchor="middle" class="fig-sub" fill="#e3b341">EU/KR/JP</text>';
                      return out;
                    })()
                  + '<text x="310" y="165" text-anchor="middle" class="fig-sub">비중첩 1·6·11 (미국 1–11) · 유럽/한국/일본은 13까지</text>'
                  + '</svg>'
              },
            ]
          },
          {
            id: "wifi-5g-dfs",
            title: "5GHz 채널·DFS·실내외",
            blocks: [
              { t: "p", html: "5GHz는 여러 <b>UNII 서브밴드</b>로 나뉘고, 일부 대역은 <b>기상·군용 레이더와 공유</b>해 <b>DFS(동적 주파수 선택)</b>가 필수입니다. 지역마다 허용 서브밴드·실내전용·출력이 다릅니다." },
              { t: "table",
                head: ["서브밴드", "주파수(개략)", "채널", "특징"],
                rows: [
                  ["UNII-1", "5150–5250 MHz", "36–48", "다수 지역 실내 위주, DFS 불필요"],
                  ["UNII-2A", "5250–5350 MHz", "52–64", "<b>DFS</b> 필요(레이더 회피)"],
                  ["UNII-2C", "5470–5725 MHz", "100–144", "<b>DFS</b> 필요, 채널 많음"],
                  ["UNII-3", "5725–5850 MHz", "149–165", "DFS 불필요(지역별), 출력 여유"],
                  ["UNII-4", "5850–5895 MHz", "169–177", "일부 지역(미국)만 최근 개방"],
                ]
              },
              { t: "note", kind: "why", title: "DFS란 — 레이더 우선", html: "DFS 대역에서 Wi-Fi는 송신 전·중에 <b>레이더 신호를 감시</b>하다가, 감지되면 즉시 그 채널을 비우고 다른 채널로 이동해야 합니다. 기상레이더 등 1차 사용자를 보호하기 위함입니다. HW가 아니라 주로 펌웨어/인증 항목이지만, <b>수신 감도·오탐(false detection)</b>이 성능에 영향을 줍니다." },
              { t: "note", kind: "warn", title: "지역별 5GHz는 매우 다양", html: "유럽은 일부 5GHz가 실내전용·TPC(송신전력제어)·DFS 의무, 일본은 W52/W53/W56 구분, 한국·미국도 세부가 다릅니다. <b>'5GHz 지원'이라도 어느 서브밴드·채널을 쓰는지는 지역 인증으로 확정</b>됩니다." },
            ]
          },
          {
            id: "wifi-6g-region",
            title: "6GHz 개방 현황 (지역별)",
            blocks: [
              { t: "p", html: "6GHz는 <b>나라마다 개방 범위가 가장 크게 다른</b> 대역입니다. 어떤 곳은 전체(1200MHz), 어떤 곳은 하위 일부만, 어떤 곳은 Wi-Fi에 아예 미개방입니다." },
              { t: "table",
                head: ["지역", "개방 범위(개략)", "비고"],
                rows: [
                  ["미국 (FCC)", "5925–7125 MHz (전체 1200MHz)", "LPI 실내 + AFC 표준전력"],
                  ["한국 (RRA)", "5925–7125 MHz (전체)", "비교적 일찍 전체 개방"],
                  ["유럽 (CEPT)", "5945–6425 MHz (하위 ~500MHz)", "상위 대역은 검토/지역별"],
                  ["일본 (MIC)", "하위 대역부터 단계 개방", "확대 진행"],
                  ["중국", "Wi-Fi 미개방(IMT 할당)", "정책 변동 가능"],
                ]
              },
              { t: "note", kind: "why", title: "AFC / LPI — 6GHz 출력 규칙", html: "6GHz엔 기존 고정·위성 링크가 있어 보호가 필요합니다. <b>LPI(Low Power Indoor)</b>는 저전력 실내 한정으로 위치제어 없이 사용, <b>표준전력(Standard Power)</b>은 <b>AFC(자동 주파수 조정)</b> 데이터베이스에 위치를 질의해 허용 채널·출력을 받아야 합니다. 6GHz 설계는 이 출력 클래스를 전제로 합니다." },
              { t: "note", kind: "warn", title: "6GHz = 지역 분기 변수", html: "6GHz 안테나·매칭·출력은 지역별 개방 범위에 따라 달라질 수 있습니다. 6E/7 제품은 <b>판매 지역의 6GHz 정책을 반드시 확인</b>하고 펌웨어 regulatory 처리를 설계에 반영해야 합니다." },
            ]
          }
        ]
      },

      /* ───────────── W4. PHY 기술 ───────────── */
      {
        id: "wifi-phy",
        icon: "🧬",
        title: "W4. 핵심 PHY 기술",
        sections: [
          {
            id: "wifi-ofdma",
            title: "OFDM vs OFDMA — 채널을 나눠 쓰기",
            blocks: [
              { t: "p", html: "Wi-Fi는 데이터를 여러 <b>부반송파(subcarrier)</b>에 실어 보내는 <b>OFDM</b>을 씁니다. Wi-Fi 6의 <b>OFDMA</b>는 한 채널을 <b>자원 단위(RU)</b>로 쪼개 <b>여러 사용자에게 동시에</b> 할당해 효율을 크게 높입니다." },
              { t: "fig",
                caption: "OFDM(위): 한 순간 한 사용자가 채널 전체를 차지. OFDMA(아래): 채널을 RU로 나눠 여러 사용자(색)가 동시에 전송 → 다수 기기 환경에서 지연·효율 개선.",
                svg: '<svg viewBox="0 0 620 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="OFDM과 OFDMA 비교">'
                  + '<text x="40" y="34" class="fig-sub" fill="#4aa3ff">OFDM (한 번에 한 사용자)</text>'
                  + '<rect class="kb-pulse" x="40" y="44" width="540" height="40" rx="4" fill="#4aa3ff" fill-opacity="0.22" stroke="#4aa3ff" stroke-opacity="0.5"/>'
                  + '<text x="310" y="69" text-anchor="middle" class="fig-sub" fill="#4aa3ff">사용자 A 가 채널 전체 점유</text>'
                  + '<text x="40" y="128" class="fig-sub" fill="#2ea043">OFDMA (채널을 RU로 분할, 동시 다중 사용자)</text>'
                  + (function(){
                      var cols=[['A','#4aa3ff',150],['B','#2ea043',120],['C','#a371f7',140],['D','#e3b341',130]];
                      var out='';var x=40;
                      cols.forEach(function(c,i){
                        out+='<rect class="kb-pulse kb-d'+(i+1)+'" x="'+x+'" y="138" width="'+(c[2]-8)+'" height="40" rx="4" fill="'+c[1]+'" fill-opacity="0.25" stroke="'+c[1]+'" stroke-opacity="0.6"/>';
                        out+='<text x="'+(x+(c[2]-8)/2)+'" y="163" text-anchor="middle" class="fig-sub" fill="'+c[1]+'">'+c[0]+'</text>';
                        x+=c[2];
                      });
                      return out;
                    })()
                  + '<text x="310" y="206" text-anchor="middle" class="fig-sub">RU 분할 → IoT·다수 단말 환경에서 효율↑·지연↓</text>'
                  + '</svg>'
              },
              { t: "note", kind: "tip", title: "가전·IoT에 OFDMA가 좋은 이유", html: "집 안에 Wi-Fi 기기가 수십 개일 때, OFDMA는 작은 데이터를 보내는 가전들을 <b>한 전송에 묶어</b> 처리해 채널 점유 시간을 줄입니다. 작은 패킷을 자주 보내는 IoT에 특히 유리합니다." },
            ]
          },
          {
            id: "wifi-qam-mcs",
            title: "변조(QAM)·MCS — 높을수록 빠르지만 까다롭다",
            blocks: [
              { t: "p", html: "<b>QAM 차수</b>가 높을수록 한 심볼에 더 많은 비트를 실어 빠르지만, 심볼 점이 촘촘해져 <b>잡음·왜곡에 민감</b>해집니다. 그래서 고차 QAM은 신호 품질(EVM)이 아주 좋아야만 성립합니다." },
              { t: "table",
                head: ["변조", "심볼당 비트", "도입 세대", "요구사항"],
                rows: [
                  ["64-QAM", "6", "Wi-Fi 4", "기본"],
                  ["256-QAM", "8", "Wi-Fi 5", "EVM·선형성 강화"],
                  ["1024-QAM", "10", "Wi-Fi 6", "매우 낮은 위상잡음·EVM"],
                  ["4096-QAM", "12", "Wi-Fi 7", "극도로 엄격(고품질 RF 필수)"],
                ]
              },
              { t: "note", kind: "why", title: "고차 QAM = HW에 가혹", html: "1024/4096-QAM은 심볼 간격이 촘촘해 <b>작은 위상잡음·EVM·비선형도 오류</b>가 됩니다. 즉 고세대 Wi-Fi는 <b>깨끗한 클럭(낮은 위상잡음), 선형적인 PA, 안정된 전원(PDN), 낮은 손실 기판</b>을 동시에 요구합니다. 출력을 한계까지 밀면 EVM이 무너지므로 <b>power back-off</b>가 필요합니다. (HW 설계 탭의 클럭·PDN·EVM 참조)" },
              { t: "note", kind: "info", title: "MCS 인덱스별 상세", html: "MCS 0–13의 변조·부호율·채널폭별 속도·EVM 한계·수신 감도는 <a href='#wifi-mcs-table'>MCS 상세 장표</a>, 속도 계산식은 <a href='#wifi-datarate'>데이터율 계산식</a>에 있습니다." },
            ]
          },
          {
            id: "wifi-mimo-mlo",
            title: "MIMO · MU-MIMO · MLO",
            blocks: [
              { t: "kv", rows: [
                ["MIMO", "여러 안테나로 <b>공간 스트림</b>을 동시 전송 → 속도 배수 (Wi-Fi 4)"],
                ["MU-MIMO", "여러 사용자에게 동시에 빔을 나눠 전송(하향 Wi-Fi5, 상·하향 Wi-Fi6)"],
                ["빔포밍", "안테나 위상 조정으로 특정 방향에 신호 집중 → 거리·품질↑"],
                ["MLO (Wi-Fi 7)", "<b>여러 대역(예: 5G+6G)을 동시에</b> 묶어 사용 → 속도·신뢰성·저지연"],
              ]},
              { t: "note", kind: "warn", title: "MIMO·MLO = RF 체인 증가", html: "공간 스트림·MLO마다 <b>독립 RF 송수신 체인과 안테나</b>가 늘어납니다. 이는 ①안테나 격리(isolation) ②체인별 캘리브레이션 ③면적·전류·발열 증가를 뜻합니다. 가전 모듈은 보통 1~2 안테나라 여기까진 잘 안 가지만, 고성능 제품은 다중 체인 설계가 핵심입니다." },
              { t: "note", kind: "info", title: "SISO·MIMO 상세", html: "SISO/SIMO/MISO/MIMO 구분, 다이버시티 vs 다중화, 1×1과 2×2의 HW 비용 비교는 <a href='#wifi-siso-mimo'>SISO · MIMO 상세</a>에 있습니다." },
            ]
          }
        ]
      },

      /* ───────────── W5. HW 설계 함의 ───────────── */
      {
        id: "wifi-hw",
        icon: "🛠️",
        title: "W5. HW 설계 함의",
        sections: [
          {
            id: "wifi-hw-implications",
            title: "세대·대역이 HW에 요구하는 것",
            blocks: [
              { t: "p", html: "Wi-Fi 세대·대역 선택은 곧 <b>RF HW 난이도</b>를 정합니다. 무엇을 지원하느냐에 따라 기판·매칭·안테나·전원·클럭 요구가 달라집니다." },
              { t: "table",
                head: ["선택", "HW에 미치는 영향", "설계 탭 연결"],
                rows: [
                  ["넓은 채널(80/160/320MHz)", "광대역 매칭·평탄한 주파수 응답, 저손실 기판", "기판·매칭"],
                  ["고차 QAM(1024/4096)", "엄격한 EVM → 위상잡음·PA 선형성·PDN", "클럭·PDN·Target"],
                  ["5GHz", "라인 손실↑(최단화), DFS 수신 성능", "대역별 선택·인증"],
                  ["6GHz(6E/7)", "새 대역 안테나·매칭, AFC/LPI 출력, 도달 짧음", "안테나·인증"],
                  ["MIMO/MLO", "다중 RF 체인·안테나 격리·캘리브레이션", "안테나·양산"],
                  ["2.4GHz 콤보(+BT)", "공존(PTA·필터·격리)", "필터/공존"],
                ]
              },
              { t: "note", kind: "tip", title: "가전 Wi-Fi 모듈 설계 출발점", html: "대부분의 가전은 <b>2.4GHz(또는 2.4/5 듀얼) · 1 스트림 · 20/40MHz · Wi-Fi 4/5/6</b>면 충분합니다. 목표는 최고속이 아니라 <b>저원가·안정 연결·넓은 지역 인증</b>입니다. 세대는 칩 공급성·SW 지원·전류로 고르고, 고차 QAM 풀성능은 요구하지 않는 경우가 많습니다." },
              { t: "note", kind: "info", title: "HW 설계 과정으로", html: "구체 설계는 <b>HW 설계 과정</b> 탭을 보세요: 전원(<a href='#ckt-pdn'>PDN</a>), 클럭/위상잡음(<a href='#ckt-clock'>클럭</a>), 출력목표(<a href='#proc-targets'>Target</a>), 기판/매칭(<a href='#pcb-stackup'>스택업</a>·<a href='#rf-smith'>스미스</a>), 안테나(<a href='#ant-types'>안테나</a>), 인증(<a href='#ver-cert'>인증</a>)." },
            ]
          }
        ]
      }
    ]
  });
})();
