/**
 * Bluetooth 탭 콘텐츠 — Classic/BLE, 버전, 채널, 토폴로지, HW 함의
 * content.js 다음에 로드. window.KB_CONTENT.tabs 에 Bluetooth 탭 추가.
 *
 * ※ 출력·채널 규제는 지역별로 다르고 개정된다. 수치는 개략값 — 최신 규정 확인.
 */
(function () {
  if (!window.KB_CONTENT || !window.KB_CONTENT.tabs) return;

  window.KB_CONTENT.tabs.push({
    id: "bt",
    label: "Bluetooth",
    icon: "🔵",
    chapters: [
      /* ───────────── B0. 개요 ───────────── */
      {
        id: "bt-intro",
        icon: "📘",
        title: "B0. Bluetooth 개요",
        sections: [
          {
            id: "bt-overview",
            title: "Bluetooth Classic vs Low Energy (BLE)",
            blocks: [
              { t: "p", html: "Bluetooth는 2.4GHz 근거리 무선 표준(Bluetooth SIG)입니다. 크게 <b>Classic(BR/EDR)</b>과 <b>Low Energy(BLE)</b> 두 갈래가 있고, 용도가 완전히 다릅니다. 가전·IoT는 거의 <b>BLE</b>를 씁니다." },
              { t: "note", kind: "info", title: "비유로 먼저", html: "Classic은 <b>전화 통화선</b>(연결을 계속 유지하며 스트리밍 — 오디오·헤드셋), BLE는 <b>문자 메시지</b>(필요할 때 짧게 깨어나 작은 데이터를 주고받고 다시 잠듦 — 센서·비콘)입니다. BLE는 거의 안 자는 시간이 없어 코인셀로 수년을 갑니다." },
              { t: "fig",
                caption: "Bluetooth의 두 갈래. Classic은 연속 스트리밍(오디오)에, BLE는 저전력 간헐 통신(센서·제어)에 쓰인다. 가전·IoT는 BLE 중심.",
                svg: '<svg viewBox="0 0 620 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bluetooth Classic과 BLE 비교">'
                  + '<rect x="40" y="40" width="250" height="120" rx="10" fill="#4aa3ff" fill-opacity="0.10" stroke="#4aa3ff" stroke-opacity="0.5"/>'
                  + '<text x="165" y="66" text-anchor="middle" class="fig-label" style="fill:#4aa3ff">Classic (BR/EDR)</text>'
                  + '<text x="165" y="92" text-anchor="middle" class="fig-sub">연속 스트리밍·고대역</text>'
                  + '<text x="165" y="112" text-anchor="middle" class="fig-sub">79채널 · 1600홉/s</text>'
                  + '<text x="165" y="132" text-anchor="middle" class="fig-sub" fill="#7a8694">헤드셋·스피커·차량오디오</text>'
                  + '<rect x="330" y="40" width="250" height="120" rx="10" fill="#2ea043" fill-opacity="0.10" stroke="#2ea043" stroke-opacity="0.5"/>'
                  + '<text x="455" y="66" text-anchor="middle" class="fig-label" style="fill:#2ea043">Low Energy (BLE)</text>'
                  + '<text x="455" y="92" text-anchor="middle" class="fig-sub">저전력 간헐 통신</text>'
                  + '<text x="455" y="112" text-anchor="middle" class="fig-sub">40채널 · 광고/연결</text>'
                  + '<text x="455" y="132" text-anchor="middle" class="fig-sub" fill="#7a8694">센서·비콘·가전·웨어러블</text>'
                  + '</svg>'
              },
              { t: "table",
                head: ["구분", "Classic (BR/EDR)", "Low Energy (BLE)"],
                rows: [
                  ["용도", "오디오 스트리밍·연속 연결", "센서·제어·비콘·저전력"],
                  ["전류", "상대적으로 큼", "매우 작음(코인셀 수년)"],
                  ["채널", "79개(1MHz)", "40개(2MHz)"],
                  ["변조", "GFSK / π4-DQPSK / 8DPSK", "GFSK (1M/2M/Coded PHY)"],
                  ["대표 속도", "1~3 Mbps (EDR)", "125kbps~2Mbps(PHY)"],
                  ["가전 채택", "낮음", "<b>높음</b>"],
                ]
              },
              { t: "note", kind: "warn", title: "규제 주의", html: "Bluetooth는 전세계 2.4GHz ISM을 쓰지만, <b>출력(EIRP) 한계는 지역별로 다릅니다</b>(예: 유럽 100mW EIRP). 출력 클래스·AFH 채널 운용은 인증 항목입니다. 수치는 개략값이며 최신 규정 확인." },
            ]
          }
        ]
      },

      /* ───────────── B1. 버전별 특징 ───────────── */
      {
        id: "bt-versions",
        icon: "🚀",
        title: "B1. 버전별 특징",
        sections: [
          {
            id: "bt-version-timeline",
            title: "버전 발전 (4.0 → 6.0)",
            blocks: [
              { t: "p", html: "BLE는 <b>Bluetooth 4.0(2010)</b>에서 도입된 뒤, 5.x에서 속도·거리·오디오·측위가 크게 강화됐습니다. 가전·IoT 설계 시 <b>지원 버전 = 사용 가능한 기능</b>이므로 칩 선정의 핵심입니다." },
              { t: "fig",
                caption: "Bluetooth 주요 버전. 4.0에서 BLE 도입, 5.0에서 속도·거리·광고 확장, 5.2 LE Audio, 6.0 채널 사운딩(정밀 거리측정). 화살표는 시간 흐름.",
                svg: '<svg viewBox="0 0 620 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bluetooth 버전 타임라인">'
                  + '<line class="kb-flow" x1="40" y1="120" x2="585" y2="120" stroke="#4aa3ff" stroke-width="2"/>'
                  + (function(){
                      var g=[['4.0','2010','BLE 도입','#9aa7b4'],['4.2','2014','보안·처리량','#9aa7b4'],['5.0','2016','2배속·4배거리·8배광고','#4aa3ff'],['5.1','2019','방향탐지(AoA/AoD)','#2ea043'],['5.2','2020','LE Audio·LC3','#2ea043'],['5.4','2023','PAwR·ESL','#a371f7'],['6.0','2024','채널 사운딩(거리측정)','#a371f7']];
                      var out='';var x0=78, dx=80;
                      g.forEach(function(s,i){
                        var x=x0+i*dx; var up=(i%2===0);
                        var by=up?54:138;
                        out+='<circle cx="'+x+'" cy="120" r="5" fill="'+s[3]+'"/>';
                        out+='<line x1="'+x+'" y1="120" x2="'+x+'" y2="'+(up?by+30:by)+'" stroke="'+s[3]+'" stroke-width="1.2" opacity="0.5"/>';
                        out+='<rect x="'+(x-38)+'" y="'+by+'" width="76" height="30" rx="5" fill="'+s[3]+'" fill-opacity="0.14" stroke="'+s[3]+'" stroke-opacity="0.5"/>';
                        out+='<text x="'+x+'" y="'+(by+13)+'" text-anchor="middle" class="fig-label" style="fill:'+s[3]+';font-size:12px">BT '+s[0]+'</text>';
                        out+='<text x="'+x+'" y="'+(by+25)+'" text-anchor="middle" class="fig-sub" style="font-size:9.5px">'+s[2]+'</text>';
                        out+='<text x="'+x+'" y="'+(up?44:200)+'" text-anchor="middle" class="fig-sub" fill="#7a8694">'+s[1]+'</text>';
                      });
                      return out;
                    })()
                  + '</svg>'
              },
              { t: "table",
                head: ["버전", "출시", "핵심 추가"],
                rows: [
                  ["4.0", "2010", "BLE(Low Energy) 도입"],
                  ["4.2", "2014", "보안(LE Secure Connections), 처리량 개선"],
                  ["5.0", "2016", "2M PHY(2배속), Coded PHY(4배 거리), 광고 8배 확장"],
                  ["5.1", "2019", "방향 탐지(AoA/AoD) — 실내 측위"],
                  ["5.2", "2020", "LE Audio, LC3 코덱, Isochronous 채널, Auracast 기반"],
                  ["5.3 / 5.4", "2021/23", "효율·보안, PAwR(주기적 광고 응답), 전자가격표(ESL)"],
                  ["6.0", "2024", "Channel Sounding — 정밀 거리 측정(보안 측위)"],
                ]
              },
              { t: "note", kind: "tip", title: "BT 5.0의 의미 (가전 핵심)", html: "BT 5.0의 <b>2M PHY</b>는 같은 데이터를 빨리 보내 <b>송신 시간을 줄여 전력을 더 아끼고</b>, <b>Coded PHY</b>는 속도를 희생해 <b>거리를 늘립니다</b>. 가전은 보통 1M(표준) 또는 Coded(원거리)를 상황에 맞게 씁니다." },
            ]
          }
        ]
      },

      /* ───────────── B2. 주파수·채널 ───────────── */
      {
        id: "bt-channel",
        icon: "📡",
        title: "B2. 주파수·채널 운용",
        sections: [
          {
            id: "bt-ble-channels",
            title: "BLE 40채널 — 광고 3 + 데이터 37",
            blocks: [
              { t: "p", html: "BLE는 2.4GHz(2402–2480MHz)를 <b>2MHz 간격 40채널</b>로 나눕니다. 그중 <b>3개(37·38·39)는 광고(advertising) 채널</b>로, 기기를 처음 발견·연결할 때 씁니다. 나머지 <b>37개는 데이터 채널</b>로 연결 후 주파수 호핑하며 통신합니다." },
              { t: "fig",
                caption: "BLE 채널 배치. 광고 채널 37(2402)·38(2426)·39(2480)는 Wi-Fi 1·6·11 사이 틈에 놓여 간섭을 피한다. 연결되면 37개 데이터 채널을 적응적으로 호핑(AFH)한다.",
                svg: '<svg viewBox="0 0 620 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="BLE 채널 배치와 광고 채널">'
                  + '<text x="40" y="24" class="fig-sub" fill="#7a8694">2402 MHz ──────────────── 2.4GHz 대역 ──────────────── 2480 MHz</text>'
                  + (function(){
                      var out='';
                      // WiFi blocks (faint)
                      var wifi=[[60,'1'],[250,'6'],[440,'11']];
                      wifi.forEach(function(w){out+='<rect x="'+w[0]+'" y="60" width="120" height="40" rx="3" fill="#4aa3ff" fill-opacity="0.08" stroke="#4aa3ff" stroke-opacity="0.3" stroke-dasharray="3 3"/><text x="'+(w[0]+60)+'" y="84" text-anchor="middle" class="fig-sub" fill="#4aa3ff" opacity="0.6">WiFi '+w[1]+'</text>';});
                      // data channels (small ticks)
                      for(var i=0;i<37;i++){var x=46+i*14.5; out+='<rect x="'+x+'" y="110" width="9" height="18" rx="1" fill="#7a8694" fill-opacity="0.35"/>';}
                      // advertising channels
                      var adv=[[40,'37'],[300,'38'],[565,'39']];
                      adv.forEach(function(a){out+='<rect class="kb-pulse" x="'+(a[0]-7)+'" y="105" width="16" height="28" rx="2" fill="#2ea043" fill-opacity="0.45" stroke="#2ea043"/><text x="'+a[0]+'" y="150" text-anchor="middle" class="fig-sub" fill="#2ea043">'+a[1]+'</text>';});
                      return out;
                    })()
                  + '<text x="120" y="172" class="fig-sub" fill="#7a8694">회색=데이터 37채널(호핑)</text>'
                  + '<text x="430" y="172" class="fig-sub" fill="#2ea043">초록=광고 채널 37·38·39</text>'
                  + '<text x="310" y="192" text-anchor="middle" class="fig-sub">광고 채널은 WiFi 1·6·11 틈에 배치되어 간섭 회피</text>'
                  + '</svg>'
              },
              { t: "note", kind: "why", title: "왜 광고 채널이 3개·그 위치인가", html: "연결 전엔 호핑을 못 하므로(서로 약속이 없음), 발견용 광고 채널은 <b>고정</b>이어야 합니다. 그래서 단 3개만 두고, <b>Wi-Fi 비중첩 채널(1·6·11) 사이 빈틈</b>에 배치해 가장 흔한 간섭원인 Wi-Fi를 피하도록 설계했습니다." },
              { t: "h", text: "AFH — 적응형 주파수 호핑" },
              { t: "p", html: "연결 후 BLE/Classic은 <b>채널을 빠르게 바꿔가며(호핑)</b> 통신합니다. <b>AFH(Adaptive Frequency Hopping)</b>는 간섭이 심한 채널(예: Wi-Fi가 쓰는 대역)을 <b>호핑 목록에서 빼서</b> 회피합니다. 공존의 핵심 기술입니다." },
              { t: "note", kind: "tip", title: "Classic 채널", html: "Classic(BR/EDR)은 <b>1MHz 간격 79채널</b>을 초당 1600회 호핑합니다. BLE보다 채널이 촘촘하고 빠르게 호핑하지만 전력은 더 큽니다. 둘 다 AFH로 공존을 개선합니다." },
            ]
          },
          {
            id: "bt-phy",
            title: "BLE PHY — 1M / 2M / Coded",
            blocks: [
              { t: "p", html: "BT 5.0부터 BLE는 용도별로 <b>물리계층(PHY)</b>을 고를 수 있습니다. 속도·거리·전력의 trade-off입니다." },
              { t: "table",
                head: ["PHY", "속도", "특징", "용도"],
                rows: [
                  ["LE 1M", "1 Mbps", "표준(BT4 호환)", "일반 연결"],
                  ["LE 2M", "2 Mbps", "2배속, 송신시간↓→전력↓·근거리", "데이터량 많은 기기"],
                  ["LE Coded (S=2)", "500 kbps", "오류정정으로 거리↑", "중거리"],
                  ["LE Coded (S=8)", "125 kbps", "최대 ~4배 거리", "장거리·저속"],
                ]
              },
              { t: "note", kind: "why", title: "Coded PHY = 거리와 속도의 교환", html: "Coded PHY는 같은 비트를 여러 번 반복(코딩)해 보내 잡음에 강해져 <b>거리를 늘립니다</b>. 대신 실효 속도가 떨어집니다. 출력을 키우지 않고도(=전력·인증 부담 없이) 도달거리를 버는 방법입니다." },
            ]
          }
        ]
      },

      /* ───────────── B3. 토폴로지·프로파일 ───────────── */
      {
        id: "bt-topology",
        icon: "🕸️",
        title: "B3. 토폴로지·프로파일",
        sections: [
          {
            id: "bt-topo",
            title: "연결·광고·메시 토폴로지",
            blocks: [
              { t: "p", html: "BLE는 1:1 연결뿐 아니라 <b>일방 방송(비콘)·다대다 메시</b>까지 다양한 구조를 지원합니다. 가전이 '어떻게 연결되는가'를 결정합니다." },
              { t: "fig",
                caption: "세 가지 대표 구조. 연결(스타): 허브가 여러 기기와 1:1. 방송: 비콘이 일방적으로 뿌림(연결 없음). 메시: 기기들이 서로 중계해 범위를 넓힘.",
                svg: '<svg viewBox="0 0 620 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="BLE 토폴로지 연결 방송 메시">'
                  + '<text x="105" y="28" text-anchor="middle" class="fig-label" style="fill:#4aa3ff">연결 (스타)</text>'
                  + '<circle cx="105" cy="110" r="16" fill="#4aa3ff" fill-opacity="0.25" stroke="#4aa3ff"/><text x="105" y="114" text-anchor="middle" class="fig-sub" fill="#4aa3ff">허브</text>'
                  + (function(){var out='';var pts=[[50,60],[160,60],[45,150],[165,150]];pts.forEach(function(p){out+='<line class="kb-flow" x1="105" y1="110" x2="'+p[0]+'" y2="'+p[1]+'" stroke="#4aa3ff" stroke-width="1.5"/><circle cx="'+p[0]+'" cy="'+p[1]+'" r="8" fill="#4aa3ff" fill-opacity="0.4"/>';});return out;})()
                  + '<line x1="215" y1="30" x2="215" y2="185" stroke="#7a8694" stroke-dasharray="4 4" opacity="0.3"/>'
                  + '<text x="320" y="28" text-anchor="middle" class="fig-label" style="fill:#e3b341">방송 (비콘)</text>'
                  + '<rect x="305" y="98" width="30" height="24" rx="4" fill="#e3b341" fill-opacity="0.3" stroke="#e3b341"/>'
                  + '<circle class="kb-grow" cx="320" cy="110" r="30" fill="none" stroke="#e3b341" stroke-width="2"/>'
                  + '<circle class="kb-grow kb-d3" cx="320" cy="110" r="30" fill="none" stroke="#e3b341" stroke-width="2"/>'
                  + '<text x="320" y="160" text-anchor="middle" class="fig-sub" fill="#e3b341">일방 송출(연결 없음)</text>'
                  + '<line x1="425" y1="30" x2="425" y2="185" stroke="#7a8694" stroke-dasharray="4 4" opacity="0.3"/>'
                  + '<text x="520" y="28" text-anchor="middle" class="fig-label" style="fill:#2ea043">메시</text>'
                  + (function(){var out='';var n=[[470,70],[570,70],[450,130],[590,130],[520,170]];n.forEach(function(p){out+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="9" fill="#2ea043" fill-opacity="0.4"/>';});var e=[[0,1],[0,2],[1,3],[2,4],[3,4],[0,4]];e.forEach(function(pair){out+='<line class="kb-flow" x1="'+n[pair[0]][0]+'" y1="'+n[pair[0]][1]+'" x2="'+n[pair[1]][0]+'" y2="'+n[pair[1]][1]+'" stroke="#2ea043" stroke-width="1.3"/>';});return out;})()
                  + '<text x="520" y="195" text-anchor="middle" class="fig-sub" fill="#2ea043">중계로 범위 확장</text>'
                  + '</svg>'
              },
              { t: "kv", rows: [
                ["Central / Peripheral", "BLE 연결 역할: 허브(폰·게이트웨이)=Central, 기기(센서)=Peripheral"],
                ["Advertising / Scanning", "Peripheral이 광고 → Central이 스캔해 발견·연결"],
                ["Broadcaster / Observer", "연결 없이 일방 송출(비콘)·수신"],
                ["BLE Mesh", "기기들이 메시지를 중계해 넓은 범위 커버(스마트홈 조명 등)"],
              ]},
            ]
          },
          {
            id: "bt-gatt",
            title: "GAP / GATT / 프로파일",
            blocks: [
              { t: "kv", rows: [
                ["GAP", "기기 발견·연결·역할 정의(누가 광고/스캔/연결)"],
                ["GATT", "데이터 구조(Service·Characteristic)로 값을 주고받는 규칙"],
                ["프로파일", "용도별 표준 묶음(심박·배터리·HID 등). 상호운용성 보장"],
              ]},
              { t: "note", kind: "info", title: "HW 관점", html: "GAP/GATT·프로파일은 주로 <b>펌웨어/SW 영역</b>입니다. HW 설계자는 이들이 요구하는 <b>전류 프로파일(광고 주기·연결 간격)</b>과 안테나 효율을 만족시키면 됩니다. 광고가 잦을수록 평균 전류가 커집니다." },
            ]
          }
        ]
      },

      /* ───────────── B4. LE Audio·신기능 ───────────── */
      {
        id: "bt-features",
        icon: "🎧",
        title: "B4. LE Audio·신기능",
        sections: [
          {
            id: "bt-le-audio",
            title: "LE Audio · 방향탐지 · 채널 사운딩",
            blocks: [
              { t: "kv", rows: [
                ["LE Audio (5.2~)", "BLE 기반 오디오. <b>LC3</b> 코덱으로 저전력·고품질, 다중 스트림(좌우 이어버드 독립)"],
                ["Auracast", "한 송신원이 <b>다수에게 동시 오디오 방송</b>(공항 안내·공유 청취)"],
                ["방향 탐지(5.1)", "AoA/AoD — 안테나 배열로 방향 추정 → 실내 측위"],
                ["Channel Sounding(6.0)", "양 기기 간 <b>정밀·보안 거리 측정</b>(디지털 키·자산 추적)"],
              ]},
              { t: "note", kind: "warn", title: "방향탐지·사운딩 = 다중 안테나 HW", html: "AoA(도래각)나 일부 측위는 <b>안테나 배열(여러 안테나 + RF 스위치)</b>을 요구합니다. 단일 안테나 가전엔 해당 없지만, 측위 제품을 한다면 안테나 배열 배치·격리·스위칭이 새 HW 과제가 됩니다." },
              { t: "note", kind: "tip", title: "가전에서의 활용", html: "대부분의 가전은 LE Audio·측위까지 가지 않고 <b>제어·상태 알림용 BLE</b>면 충분합니다. 단 디지털 키(도어록)·실내 위치 기반 기능을 기획하면 6.0 채널 사운딩 같은 신기능이 칩 선정 기준이 됩니다." },
            ]
          }
        ]
      },

      /* ───────────── B5. HW 설계 함의 ───────────── */
      {
        id: "bt-hw",
        icon: "🛠️",
        title: "B5. HW 설계 함의",
        sections: [
          {
            id: "bt-power-class",
            title: "출력 클래스와 저전력 설계",
            blocks: [
              { t: "p", html: "Bluetooth는 <b>출력 클래스</b>로 도달거리를 나눕니다. BLE는 보통 저출력이지만 BT5에서 고출력 옵션이 생겼습니다." },
              { t: "table",
                head: ["클래스", "최대 출력(개략)", "도달", "용도"],
                rows: [
                  ["Class 1", "~20 dBm (100 mW)", "~100 m", "장거리(외장 PA 흔함)"],
                  ["Class 2", "~4 dBm (2.5 mW)", "~10 m", "일반 BLE 기기"],
                  ["Class 3", "~0 dBm (1 mW)", "~1 m", "초근거리"],
                  ["BT5 고출력", "최대 ~20 dBm", "확장", "원거리 BLE(규제 한도 내)"],
                ]
              },
              { t: "note", kind: "why", title: "BLE가 저전력인 이유 (HW 포인트)", html: "BLE는 <b>대부분 잠들어 있다가</b> 짧게 깨어나 통신하고 다시 잡니다. 그래서 ①<b>Sleep 전류(µA)</b>와 ②<b>송수신 피크 전류</b>·③<b>깨어나는 빈도(광고/연결 간격)</b>가 배터리 수명을 좌우합니다. HW는 누설 경로 차단·효율적 전원(DC-DC vs LDO)·짧은 부팅이 중요합니다." },
              { t: "note", kind: "warn", title: "출력 작을수록 안테나 효율이 체감", html: "BLE는 출력이 작아 <b>안테나 효율·매칭 손실 1dB가 통신거리에 그대로</b> 나타납니다. 근접 금속·배터리로 인한 detune을 특히 조심해야 합니다. (설계탭 안테나 참조)" },
              { t: "h", text: "Wi-Fi와의 공존 (콤보)" },
              { t: "note", kind: "info", title: "WiFi+BT 콤보", html: "많은 가전이 한 칩/보드에 <b>Wi-Fi + BT</b>를 함께 둡니다. 같은 2.4GHz라 서로 막으므로 <b>PTA(시간 중재)·안테나 격리·필터</b>로 공존 설계가 필요합니다. AFH가 Wi-Fi 채널을 피하지만, 같은 보드 근접 간섭은 HW 대책이 필수입니다." },
              { t: "note", kind: "info", title: "HW 설계 과정으로", html: "구체 설계는 <b>HW 설계 과정</b> 탭: 저전력 전원(<a href='#ckt-pdn'>PDN</a>), 안테나 효율(<a href='#ant-types'>안테나</a>·<a href='#ant-placement'>배치</a>), 공존(<a href='#ckt-filter-coex'>필터·공존</a>), 출력 목표(<a href='#proc-targets'>Target</a>), 인증(<a href='#ver-cert'>인증</a>)." },
            ]
          }
        ]
      }
    ]
  });
})();
