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
              { t: "note", kind: "info", title: "상세 장표", html: "BR/EDR·LE 7개 PHY의 변조·심볼률·감도·페이로드·처리량 비교는 <a href='#bt-spec-sheet'>B1.5 PHY 상세 장표</a>에 있습니다." },
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

      /* ───────────── B1.5 표준 상세 장표 ───────────── */
      {
        id: "bt-spec",
        icon: "📋",
        title: "B1.5 표준 상세 장표 — PHY·변조·패킷·호핑·RF 시험·전력",
        sections: [
          {
            id: "bt-spec-sheet",
            title: "PHY 상세 장표 — Classic(BR/EDR) 3종 vs LE 4종",
            blocks: [
              { t: "p", html: "Bluetooth의 '속도·거리·전력'은 PHY(물리계층) 선택으로 정해집니다. Classic은 <b>같은 박자(1 Msym/s)에서 심볼당 비트 수</b>를 늘려 1→2→3 Mbps로 올렸고, LE는 <b>변조는 GFSK 하나로 고정</b>한 채 박자를 2배로 하거나(2M) 오류정정을 덧붙여(Coded) 속도와 거리를 맞바꿉니다. 아래 장표는 일곱 가지 PHY를 한 표에 놓은 것입니다." },
              { t: "note", kind: "info", title: "비유로 먼저", html: "메트로놈 박자(심볼률)는 똑같이 1초에 100만 번인데, 한 박자에 <b>손을 좌우로만 흔들면(GFSK) 1비트</b>, <b>네 방향(π/4-DQPSK)이면 2비트</b>, <b>여덟 방향(8DPSK)이면 3비트</b>를 전합니다. 방향이 많을수록 빠르지만 멀리서는 방향을 헷갈리기 쉽습니다. LE Coded는 같은 손짓을 <b>여러 번 반복</b>해서 멀리서도 알아보게 하는 대신 느려집니다." },
              { t: "fig",
                caption: "Bluetooth의 세 가지 변조. GFSK는 반송파 주파수를 위(1)·아래(0)로 밀어 1비트를 싣고(진폭 일정), π/4-DQPSK와 8DPSK는 직전 심볼 대비 위상 변화량으로 2비트·3비트를 싣는다. 같은 1 Msym/s에서 1·2·3 Mbps가 되는 이유이며, 점이 촘촘할수록 잡음에 약하다.",
                svg: '<svg viewBox="0 0 620 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="GFSK, pi/4-DQPSK, 8DPSK 변조 비교">'
                  + '<text x="105" y="26" text-anchor="middle" class="fig-label">GFSK — 주파수로 1비트</text>'
                  + '<line x1="20" y1="160" x2="195" y2="160" stroke="#7a8694" stroke-width="1.5"/>'
                  + '<line x1="105" y1="60" x2="105" y2="168" stroke="#7a8694" stroke-dasharray="3 4" opacity="0.6"/>'
                  + '<text x="105" y="180" text-anchor="middle" class="fig-sub">f<tspan font-size="9">c</tspan></text>'
                  + '<path class="kb-pulse" d="M40,160 Q65,160 70,80 Q75,160 100,160" stroke="#4aa3ff" stroke-width="2.5" fill="#4aa3ff" fill-opacity="0.12"/>'
                  + '<path class="kb-pulse kb-d3" d="M110,160 Q135,160 140,80 Q145,160 170,160" stroke="#2ea043" stroke-width="2.5" fill="#2ea043" fill-opacity="0.12"/>'
                  + '<text x="70" y="72" text-anchor="middle" class="fig-sub" fill="#4aa3ff">0</text><text x="140" y="72" text-anchor="middle" class="fig-sub" fill="#2ea043">1</text>'
                  + '<text x="105" y="200" text-anchor="middle" class="fig-sub">LE 1M: ±250kHz (h≈0.5)</text>'
                  + '<text x="105" y="218" text-anchor="middle" class="fig-sub">BR: ±140~175kHz (h 0.28~0.35)</text>'
                  + '<line x1="208" y1="36" x2="208" y2="220" stroke="#7a8694" stroke-dasharray="4 4" opacity="0.35"/>'
                  + '<line x1="410" y1="36" x2="410" y2="220" stroke="#7a8694" stroke-dasharray="4 4" opacity="0.35"/>'
                  + '<text x="310" y="26" text-anchor="middle" class="fig-label">π/4-DQPSK — 위상으로 2비트</text>'
                  + '<text x="510" y="26" text-anchor="middle" class="fig-label">8DPSK — 위상으로 3비트</text>'
                  + (function(){
                      var o='';
                      function circ(cx,cy){o+='<circle cx="'+cx+'" cy="'+cy+'" r="52" fill="none" stroke="#7a8694" stroke-opacity="0.5"/><line x1="'+(cx-62)+'" y1="'+cy+'" x2="'+(cx+62)+'" y2="'+cy+'" stroke="#7a8694" stroke-opacity="0.35"/><line x1="'+cx+'" y1="'+(cy-62)+'" x2="'+cx+'" y2="'+(cy+62)+'" stroke="#7a8694" stroke-opacity="0.35"/>';}
                      circ(310,115);circ(510,115);
                      for(var i=0;i<8;i++){var a=i*Math.PI/4;var x=310+52*Math.cos(a),y=115-52*Math.sin(a);var c=(i%2===0)?'#4aa3ff':'#2ea043';o+='<circle class="kb-pulse'+(i%2===0?'':' kb-d3')+'" cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="6" fill="'+c+'"/>';}
                      for(var j=0;j<8;j++){var b=j*Math.PI/4+Math.PI/8;var x2=510+52*Math.cos(b),y2=115-52*Math.sin(b);o+='<circle cx="'+x2.toFixed(1)+'" cy="'+y2.toFixed(1)+'" r="6" fill="#a371f7"/>';}
                      return o;
                    })()
                  + '<text x="310" y="200" text-anchor="middle" class="fig-sub">두 QPSK 점 세트(파랑·초록)를</text>'
                  + '<text x="310" y="218" text-anchor="middle" class="fig-sub">번갈아 사용 → EDR 2 Mbps</text>'
                  + '<text x="510" y="200" text-anchor="middle" class="fig-sub">점 간격 45° → 잡음 여유↓</text>'
                  + '<text x="510" y="218" text-anchor="middle" class="fig-sub">EDR 3 Mbps</text>'
                  + '</svg>'
              },
              { t: "table",
                head: ["항목", "BR", "EDR 2M", "EDR 3M", "LE 1M", "LE 2M", "LE Coded S=2", "LE Coded S=8"],
                rows: [
                  ["도입", "1.0 (1999)", "2.0+EDR (2004)", "2.0+EDR (2004)", "4.0 (2010)", "5.0 (2016)", "5.0 (2016)", "5.0 (2016)"],
                  ["채널", "79 × 1 MHz", "79 × 1 MHz", "79 × 1 MHz", "40 × 2 MHz", "40 × 2 MHz", "40 × 2 MHz", "40 × 2 MHz"],
                  ["심볼률", "1 Msym/s", "1 Msym/s", "1 Msym/s", "1 Msym/s", "<b>2 Msym/s</b>", "1 Msym/s", "1 Msym/s"],
                  ["변조", "GFSK (BT 0.5)", "π/4-DQPSK", "8DPSK", "GFSK (BT 0.5)", "GFSK", "GFSK + FEC", "GFSK + FEC"],
                  ["변조 지수 h / 주파수 편이", "0.28~0.35 / 약 ±140~175 kHz", "— (위상 변조)", "— (위상 변조)", "0.45~0.55 / 약 ±250 kHz", "0.45~0.55 / 약 ±500 kHz", "약 ±250 kHz", "약 ±250 kHz"],
                  ["심볼당 정보 비트", "1", "2", "3", "1", "1", "1/2", "1/8"],
                  ["오류정정", "선택적 FEC 1/3 · 2/3", "헤더만 FEC (페이로드 없음)", "헤더만 FEC", "없음 (CRC로 검출만)", "없음 (CRC)", "컨볼루션 부호 1/2", "부호 1/2 + 패턴 매핑 ×4 (= 1/8)"],
                  ["PHY 속도", "1 Mbps", "2 Mbps", "3 Mbps", "1 Mbps", "2 Mbps", "500 kbps", "125 kbps"],
                  ["규격 최소 감도", "−70 dBm (BER 0.1%)", "−70 dBm (BER 0.01%)", "−70 dBm (BER 0.01%)", "−70 dBm (PER 30.8%)", "−70 dBm", "−75 dBm", "−82 dBm"],
                  ["상용 칩 감도 (대략)", "−90~−95 dBm", "−90~−94 dBm", "−83~−88 dBm", "−95~−99 dBm", "−92~−96 dBm", "−99~−102 dBm", "−103~−107 dBm"],
                  ["패킷당 최대 페이로드", "339 B (DH5)", "679 B (2-DH5)", "1,021 B (3-DH5)", "251 B (4.2 DLE · 4.0은 27 B)", "251 B", "251 B", "251 B"],
                  ["이론 최대 처리량", "723 kbps (비대칭)", "1.45 Mbps", "2.18 Mbps", "약 0.8 Mbps (DLE)", "약 1.4 Mbps (DLE)", "수백 kbps 이하", "100 kbps 이하"],
                  ["대표 용도", "레거시 오디오·SPP", "오디오 스트리밍(A2DP)", "고음질 A2DP", "<b>일반 BLE (호환 최우선)</b>", "대량 전송·OTA·전력 절감", "중거리", "원거리 (이론상 약 4배)"],
                ]
              },
              { t: "p", html: "<b>표 기준</b>: '규격 최소 감도'는 Bluetooth Core 규격이 요구하는 최소치이고, '상용 칩 감도'는 주요 BLE/콤보 칩 데이터시트의 대략적인 범위입니다(칩·온도·측정 조건마다 다름). 처리량은 한쪽 방향으로 최대 패킷을 연속 전송할 때의 이론치이며, 실제는 연결 간격·스마트폰 OS 제약으로 더 낮습니다(→ <a href='#bt-ble-packet'>패킷 구조와 처리량</a>)." },
              { t: "note", kind: "why", title: "왜 BLE는 GFSK만 쓰나 — '진폭이 일정한' 변조의 전력 이점", html: "GFSK는 주파수만 바꾸고 <b>진폭은 항상 일정(정포락선)</b>합니다. 그래서 PA를 비선형 포화 영역에 가깝게 효율적으로 돌려도 신호가 깨지지 않습니다. 진폭이 출렁이는 Wi-Fi OFDM이 PA 출력을 수 dB 낮춰(back-off) 써야 하는 것과 대조적입니다(→ <a href='#rf-signal-levels'>대신호와 back-off</a>). 같은 출력을 더 적은 전류로 내는 것, 그것이 BLE 저전력의 PHY 쪽 이유입니다. 반대로 EDR의 위상 변조는 진폭 변화가 생겨 PA 선형성이 필요하고 전력이 더 듭니다." },
              { t: "note", kind: "warn", title: "흔한 오해 — \"LE 2M은 손해 없이 2배 빠르다? Coded는 4배 거리 보장?\"", html: "<b>LE 2M</b>은 신호 대역이 넓어 수신 잡음이 커지므로 감도가 대략 <b>3dB 나빠집니다</b>. 대신 송신 시간이 절반이라 패킷당 에너지가 줄어 근거리에선 이득입니다. <b>Coded S=8의 '4배 거리'</b>는 1M 대비 감도 이득 약 12dB를 자유공간에서 거리로 환산한 이론치입니다. 벽과 반사가 많은 실내에선 그보다 덜 늘고, 속도는 1/8로 떨어져 송신 시간과 전력이 늘어납니다." },
              { t: "note", kind: "tip", title: "현장 노하우 — 가전 BLE의 PHY 선택", html: "①<b>기본은 LE 1M</b>입니다. 모든 스마트폰·허브와 호환되고, 광고는 대개 1M으로만 이뤄집니다. ②<b>펌웨어 OTA·로그 전송</b>처럼 데이터가 많을 때 연결 후 2M으로 전환합니다. ③실외기·창고처럼 <b>원거리</b>가 필요하면 Coded를 쓰되, 상대(폰·허브)가 Coded를 지원하는지 먼저 확인하세요. ④데이터시트 감도는 <b>PHY·PER 기준·패킷 길이</b>를 맞춰 비교해야 합니다. 같은 칩이라도 1M과 Coded의 수치는 10dB 가까이 다릅니다." },
            ]
          },
          {
            id: "bt-ble-packet",
            title: "BLE 패킷 구조와 실효 처리량 — 숫자는 어디서 나오나",
            blocks: [
              { t: "p", html: "BLE의 모든 통신은 같은 모양의 패킷으로 이뤄지고, 패킷 사이엔 반드시 <b>150µs의 쉬는 시간(T_IFS)</b>이 들어갑니다. 이 두 가지만 알면 '왜 2M인데 2배가 안 나오는지', '왜 BLE 4.0은 느렸는지'가 계산으로 설명됩니다." },
              { t: "fig",
                caption: "위: LE 1M 패킷 구조(바이트). 아래: 데이터 패킷 하나와 응답(빈 패킷) 하나가 오가는 한 주기의 시간 비율(251바이트 페이로드, LE 1M 기준). 쉬는 시간(T_IFS)과 응답 패킷이 고정 오버헤드라, 페이로드가 작을수록 효율이 떨어진다.",
                svg: '<svg viewBox="0 0 620 235" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="BLE 패킷 구조와 송수신 타이밍">'
                  + (function(){
                      var f=[['Preamble','1 B (2M: 2 B)',50,'#9aa7b4'],['Access Address','4 B',90,'#e3b341'],['Header','2 B',60,'#a371f7'],['Payload','0 ~ 251 B',230,'#4aa3ff'],['MIC','4 B (암호화 시)',50,'#a371f7'],['CRC','3 B',60,'#2ea043']];
                      var o='';var x=40;
                      f.forEach(function(r){
                        o+='<rect x="'+x+'" y="40" width="'+(r[2]-3)+'" height="40" rx="4" fill="'+r[3]+'" fill-opacity="0.2" stroke="'+r[3]+'" stroke-opacity="0.7"/>';
                        o+='<text x="'+(x+(r[2]-3)/2)+'" y="64" text-anchor="middle" class="fig-sub" fill="'+r[3]+'">'+r[0]+'</text>';
                        o+='<text x="'+(x+(r[2]-3)/2)+'" y="98" text-anchor="middle" class="fig-sub">'+r[1]+'</text>';
                        x+=r[2];
                      });
                      o+='<text x="40" y="28" class="fig-label">패킷 구조 (LE 1M · 1비트 = 1µs)</text>';
                      var W=540/2468;var t=40;
                      var seq=[['데이터 2,088µs',2088,'#4aa3ff'],['IFS',150,'#7a8694'],['응답',80,'#2ea043'],['IFS',150,'#7a8694']];
                      o+='<text x="40" y="136" class="fig-label">한 주기 = 2,468µs → 251 B × 8 ÷ 2,468µs ≈ 0.81 Mbps</text>';
                      seq.forEach(function(s,i){
                        var w=s[1]*W;
                        o+='<rect class="kb-pulse'+(i===0?'':' kb-d'+(i*2))+'" x="'+t.toFixed(1)+'" y="150" width="'+(w-1).toFixed(1)+'" height="30" rx="3" fill="'+s[2]+'" fill-opacity="'+(s[2]==='#7a8694'?0.12:0.25)+'" stroke="'+s[2]+'" stroke-opacity="0.7"/>';
                        if(i===0) o+='<text x="'+(t+w/2).toFixed(1)+'" y="170" text-anchor="middle" class="fig-sub" fill="#4aa3ff">'+s[0]+'</text>';
                        t+=w;
                      });
                      o+='<text x="'+(40+2088*W+40).toFixed(0)+'" y="200" text-anchor="middle" class="fig-sub">IFS 150µs · 응답 80µs · IFS 150µs</text>';
                      o+='<text x="310" y="226" text-anchor="middle" class="fig-sub">고정 오버헤드 380µs — 페이로드가 27 B면 이 비중이 커져 0.32 Mbps로 떨어진다</text>';
                      return o;
                    })()
                  + '</svg>'
              },
              { t: "table",
                head: ["조건", "데이터 패킷", "한 주기 (데이터+IFS+응답+IFS)", "이론 최대 (링크층)", "앱 데이터 기준 (ATT)"],
                rows: [
                  ["LE 1M · 27 B (BLE 4.0)", "296 µs", "676 µs", "0.32 Mbps", "0.24 Mbps (20 B)"],
                  ["LE 1M · 251 B (4.2 DLE)", "2,088 µs", "2,468 µs", "0.81 Mbps", "0.79 Mbps (244 B)"],
                  ["LE 2M · 27 B", "152 µs", "496 µs", "0.44 Mbps", "0.32 Mbps"],
                  ["LE 2M · 251 B", "1,048 µs", "1,392 µs", "<b>1.44 Mbps</b>", "1.40 Mbps"],
                ]
              },
              { t: "note", kind: "warn", title: "흔한 오해 — \"2M PHY면 처리량 2배?\"", html: "표에서 보듯 251바이트일 때 1M 0.81 → 2M 1.44Mbps로 <b>1.77배</b>, 27바이트일 때는 <b>1.36배</b>에 그칩니다. 쉬는 시간(150µs × 2)은 PHY와 관계없이 고정이기 때문입니다. 그래서 처리량을 올리는 순서는 <b>①DLE로 패킷을 251B로 키우기 → ②2M 전환 → ③연결 이벤트당 여러 패킷 보내기 → ④ATT MTU 247 협상</b>입니다. 실제 스마트폰 연결에선 OS가 연결 간격·이벤트 길이를 제한해 수백 kbps가 흔합니다." },
              { t: "note", kind: "why", title: "감도 기준 'PER 30.8%'는 어디서 왔나", html: "BLE 감도는 비트 오류율(BER) 0.1%를 기준으로 정의됩니다. 시험용 패킷(액세스 주소 4 + 헤더 2 + 페이로드 37 + CRC 3 = 46바이트 = 368비트)에서 비트 하나라도 틀리면 패킷 오류이므로, <b>PER = 1 − (1 − 0.001)³⁶⁸ ≈ 30.8%</b>가 됩니다. 이상해 보이는 숫자가 BER 0.1%를 패킷 단위로 옮긴 값일 뿐입니다. 그래서 데이터시트 감도를 비교할 때는 같은 PER 기준인지부터 확인합니다." },
              { t: "kv", rows: [
                ["광고 간격", "20 ms ~ 10.24 s (+ 매번 0~10 ms 랜덤 지연 — 다른 기기와 충돌 방지). 광고 1회 = 37·38·39 세 채널에 차례로 송신"],
                ["광고 페이로드", "레거시 31 B. 확장 광고(5.0)는 보조 패킷을 데이터 채널로 옮겨 PDU당 254 B, 체인으로 최대 1,650 B"],
                ["연결 간격", "7.5 ms ~ 4 s (1.25 ms 단위). 간격마다 '연결 이벤트'가 열리고 이벤트마다 채널을 호핑"],
                ["Peripheral latency", "Peripheral이 응답 없이 건너뛸 수 있는 이벤트 수 — 보낼 게 없으면 더 오래 잠"],
                ["Supervision timeout", "100 ms ~ 32 s. 이 시간 동안 패킷이 오가지 않으면 연결 끊김으로 판정"],
              ]},
              { t: "note", kind: "tip", title: "현장 노하우 — 증상별로 볼 파라미터", html: "\"앱에서 기기가 늦게 보인다\" → 광고 간격(길수록 발견 느림, 짧을수록 전류↑). \"OTA가 너무 느리다\" → DLE·2M·MTU·이벤트 길이 순으로 확인. \"가끔 연결이 끊긴다\" → supervision timeout과 간섭 환경(AFH 채널 맵)부터 확인. 이 파라미터들은 펌웨어 설정이지만, <b>전류 소모와 RF 시험 조건</b>을 바꾸므로 HW 검증 계획에 함께 적어 두세요." },
            ]
          },
          {
            id: "bt-hopping",
            title: "채널 번호·주파수·호핑 상세",
            blocks: [
              { t: "p", html: "Bluetooth는 한 채널에 머물지 않고 계속 주파수를 바꿔(호핑) 간섭과 페이딩을 평균화합니다. Classic과 LE는 채널 폭, 호핑 속도, 호핑 순서를 정하는 방식이 다릅니다." },
              { t: "kv", rows: [
                ["Classic 번호↔주파수", "f = 2402 + k MHz (k = 0 ~ 78), 1 MHz 간격 79채널"],
                ["LE 번호↔주파수", "f = 2402 + 2k MHz (RF 채널 k = 0 ~ 39), 2 MHz 간격 40채널"],
                ["LE 채널 인덱스", "광고 37 = 2402 · 38 = 2426 · 39 = 2480 MHz / 데이터 0~10 = 2404~2424 · 11~36 = 2428~2478 MHz"],
                ["왜 번호가 주파수 순서가 아닌가", "광고 채널을 Wi-Fi 1·6·11 사이 틈(양 끝과 2426)에 따로 두기 위해, 데이터 채널 번호를 먼저 매기고 광고 채널을 37~39로 뺐기 때문 (→ <a href='#bt-ble-channels'>광고 채널 배치</a>)"],
              ]},
              { t: "table",
                head: ["항목", "Classic (BR/EDR)", "LE"],
                rows: [
                  ["호핑 채널 수", "79 (AFH 시 최소 20)", "데이터 37 (채널 맵 최소 2)"],
                  ["호핑 속도", "<b>1,600회/s</b> (625 µs 슬롯마다)", "연결 이벤트마다 1회 (간격 7.5 ms ~ 4 s)"],
                  ["호핑 순서", "마스터 주소·클럭 기반 의사난수", "CSA #1 (고정 증분 5~16 순환) / <b>CSA #2</b> (5.0, 의사난수 — 간섭 분산에 유리)"],
                  ["간섭 회피", "AFH: 나쁜 채널을 맵에서 제외", "채널 맵 갱신: Central이 나쁜 채널을 빼고 Peripheral에 통보"],
                ]
              },
              { t: "note", kind: "why", title: "호핑이 공존에 주는 것과 못 주는 것", html: "호핑은 간섭을 '평균'으로 만들어 특정 채널 하나가 막혀도 통신이 이어지게 합니다. 하지만 <b>같은 보드 위의 Wi-Fi처럼 항상 켜져 있고 강한 간섭원</b>은 호핑만으로 해결되지 않습니다. 채널 맵에서 Wi-Fi 대역을 빼도 수신기 앞단이 강한 Wi-Fi 신호로 포화되면 전 채널이 영향을 받습니다(desense). 그래서 콤보 모듈은 PTA 시간 중재·안테나 격리·필터를 함께 씁니다(→ <a href='#ckt-filter-coex'>필터·공존</a>, <a href='#proto-coex'>2.4GHz 공존 실전</a>)." },
              { t: "note", kind: "tip", title: "현장 노하우 — 콤보 칩의 채널 맵 연동 확인", html: "Wi-Fi+BT 콤보 칩은 보통 펌웨어가 현재 Wi-Fi 채널을 BT 채널 맵에서 자동 제외합니다. 이 연동이 켜져 있는지, Wi-Fi 채널이 바뀔 때 맵이 따라 갱신되는지 SDK 설정과 실측(스펙트럼 분석기로 BT 호핑 분포 확인)으로 검증하세요. 연동이 꺼져 있으면 BT 재전송이 늘고 Wi-Fi 처리량도 함께 떨어집니다." },
            ]
          },
          {
            id: "bt-rf-test",
            title: "RF 시험 항목·규격 요구치 — 무엇을 재고 HW 어디와 연결되나",
            blocks: [
              { t: "p", html: "Bluetooth 인증(RF-PHY 시험)과 양산 RF 검사는 결국 아래 항목을 잽니다. 각 항목이 <b>어떤 HW 부품의 품질</b>을 보는 것인지 함께 알면, 불합격 시 어디부터 볼지가 바로 나옵니다. 수치는 LE 1M 기준의 대표값입니다." },
              { t: "table",
                head: ["구분", "항목", "무엇을 보나", "규격 요구 (LE 1M, 대표값)", "관련 HW"],
                rows: [
                  ["송신", "출력 전력", "평균·피크 출력", "선언 클래스 범위 내 (−20 ~ +20 dBm)", "PA·매칭·안테나 (→ <a href='#proc-targets'>Target</a>)"],
                  ["송신", "변조 특성", "주파수 편이 Δf1avg(00001111 패턴)·Δf2max(1010 패턴)·비율", "Δf1avg 225~275 kHz · Δf2max ≥ 185 kHz · Δf2avg/Δf1avg ≥ 0.8", "PLL·송신 필터"],
                  ["송신", "반송파 주파수 오차·드리프트", "중심 주파수 편차, 패킷 동안의 흔들림", "±150 kHz 이내 · 드리프트 ≤ 50 kHz", "<b>크리스탈 ppm·부하용량</b> (→ <a href='#ckt-xtal-select'>XTAL</a>)"],
                  ["송신", "인밴드 방출", "인접 채널로 새는 전력", "±2 MHz ≤ −20 dBm · ±3 MHz 이상 ≤ −30 dBm", "PA 선형성·전원 노이즈 (→ <a href='#ckt-pdn'>PDN</a>)"],
                  ["수신", "감도", "PER 30.8%가 되는 최소 입력 (나쁜 송신 신호로)", "≤ −70 dBm", "LNA 앞단 손실·NF·<b>자체 잡음(desense)</b>"],
                  ["수신", "C/I 성능", "간섭 신호가 있을 때 수신", "동일 채널 C/I 21 dB 등 (채널 간격별 표)", "수신 필터·선택도"],
                  ["수신", "블로킹", "대역 밖 강한 신호 속 수신", "대역 외 −30 ~ −35 dBm 간섭 (주파수 구간별 표)", "필터·공존 (→ <a href='#ckt-filter-coex'>필터</a>)"],
                  ["수신", "상호변조", "두 간섭이 만든 혼변조", "−50 dBm 간섭 쌍", "LNA 선형성"],
                  ["수신", "최대 입력", "아주 강한 신호를 받을 때", "−10 dBm에서 PER ≤ 30.8%", "LNA 포화·AGC"],
                ]
              },
              { t: "note", kind: "why", title: "감도 시험에 '나쁜 송신기(dirty transmitter)'를 쓰는 이유", html: "감도 시험에서 시험기는 일부러 <b>주파수 오차·변조 편차·드리프트를 섞은 신호</b>를 보냅니다. 실제 상대 기기(값싼 비콘, 오래된 폰)가 완벽한 신호를 보내지 않으므로, 그 조건에서도 −70 dBm을 받아내야 한다는 뜻입니다. 깨끗한 신호로 잰 데이터시트 감도보다 인증 시험 결과가 몇 dB 나쁘게 나오는 것이 정상입니다." },
              { t: "note", kind: "warn", title: "흔한 오해 — \"크리스탈은 동작만 하면 된다?\"", html: "±150 kHz는 2.48 GHz에서 <b>약 ±60 ppm</b>이고, BLE 규격은 동작 클럭에 ±50 ppm 정확도를 요구합니다. 온도·노화·부하용량 불일치가 쌓이면 주파수 오차 시험에서 떨어지거나, 상대 기기가 수신 창을 넓혀야 해서 전류가 늘어납니다. 32.768 kHz 슬립 클럭도 정확도(규격 ±500 ppm 이내)가 나쁠수록 수신 창이 넓어져 평균 전류가 커집니다(→ <a href='#bt-power-budget'>전력 계산</a>)." },
              { t: "note", kind: "tip", title: "현장 노하우 — 양산 검사 최소 세트", html: "양산에서는 시간이 비싸므로 보통 <b>출력 전력·주파수 오차·감도(PER)·변조 특성</b> 네 가지를 대표 채널(0·19·39 등 저·중·고)에서만 잽니다. 인증 시료는 전 항목을 잡지만, 양산 불량의 대부분은 이 네 가지로 걸립니다 — 출력은 조립·매칭 편차, 주파수 오차는 크리스탈 편차, 감도는 실장·쉴드 불량이 주 원인입니다(→ <a href='#prod-rftest'>양산 RF 테스트</a>)." },
            ]
          },
          {
            id: "bt-power-budget",
            title: "BLE 전력 계산 — 평균 전류와 배터리 수명은 어떻게 정해지나",
            blocks: [
              { t: "p", html: "BLE 평균 전류는 <b>I<sub>avg</sub> ≈ Q<sub>event</sub> ÷ T<sub>interval</sub> + I<sub>sleep</sub></b> 하나로 거의 설명됩니다. Q<sub>event</sub>는 한 번 깨어나 통신할 때 쓰는 전하량(µC), T<sub>interval</sub>은 광고·연결 간격, I<sub>sleep</sub>은 잠자는 동안의 누설 전류입니다." },
              { t: "note", kind: "info", title: "비유로 먼저", html: "BLE는 <b>등대</b>입니다. 대부분의 시간은 꺼져 있다가(sleep) 주기적으로 한 번 번쩍입니다(이벤트). 하루 전기 사용량은 '번쩍 한 번에 드는 전기 × 번쩍이는 횟수 + 꺼져 있을 때 새는 전기'입니다. 자주 번쩍이면 앞의 항이, 거의 안 번쩍이면 뒤의 누설 항이 수명을 정합니다." },
              { t: "fig",
                caption: "BLE 광고 기기의 전류 파형(개념도). 대부분의 시간은 수 µA의 sleep이고, 광고 간격마다 깨어나 37·38·39 채널에서 차례로 송신(사이사이 짧은 수신 창)한 뒤 다시 잠든다. 평균 전류 = 이벤트 한 번의 면적(전하) ÷ 간격 + sleep 전류.",
                svg: '<svg viewBox="0 0 620 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="BLE 광고 전류 파형과 평균 전류">'
                  + '<line x1="50" y1="170" x2="590" y2="170" stroke="#7a8694" stroke-width="1.5"/><line x1="50" y1="170" x2="50" y2="30" stroke="#7a8694" stroke-width="1.5"/>'
                  + '<text x="585" y="188" text-anchor="end" class="fig-sub">시간 →</text><text x="44" y="40" text-anchor="end" class="fig-sub">전류</text>'
                  + (function(){
                      var o='';var base=164;
                      [90,290,490].forEach(function(x0,k){
                        var p='M'+(x0-40)+','+base+' H'+x0+' V140 H'+(x0+6);
                        for(var i=0;i<3;i++){var xs=x0+6+i*16;p+=' V60 H'+(xs+8)+' V112 H'+(xs+16);}
                        p+=' V140 H'+(x0+60)+' V'+base+' H'+(x0+160);
                        o+='<path class="kb-flow-slow" d="'+p+'" stroke="#4aa3ff" stroke-width="2" fill="none"/>';
                        o+='<rect class="kb-pulse kb-d'+(k*2+1)+'" x="'+(x0-2)+'" y="52" width="66" height="114" rx="4" fill="#e3b341" fill-opacity="0.08" stroke="#e3b341" stroke-opacity="0.4" stroke-dasharray="3 3"/>';
                      });
                      return o;
                    })()
                  + '<text x="120" y="46" text-anchor="middle" class="fig-sub" fill="#e3b341">이벤트: 37·38·39 송신</text>'
                  + '<text x="210" y="156" text-anchor="middle" class="fig-sub" fill="#2ea043">sleep (수 µA)</text>'
                  + '<line x1="90" y1="196" x2="290" y2="196" stroke="#a371f7" stroke-width="1.5"/><line x1="90" y1="190" x2="90" y2="202" stroke="#a371f7"/><line x1="290" y1="190" x2="290" y2="202" stroke="#a371f7"/>'
                  + '<text x="190" y="214" text-anchor="middle" class="fig-sub" fill="#a371f7">광고 간격 T (20 ms ~ 10.24 s)</text>'
                  + '<text x="455" y="214" text-anchor="middle" class="fig-sub">I_avg ≈ Q_event ÷ T + I_sleep</text>'
                  + '</svg>'
              },
              { t: "table",
                head: ["광고 간격", "Q_event ÷ T", "+ I_sleep", "= 평균 전류", "CR2032 (225 mAh) 수명 (이론)"],
                rows: [
                  ["1 s", "12 µA", "2 µA", "<b>14 µA</b>", "약 670일 (1.8년)"],
                  ["100 ms", "120 µA", "2 µA", "<b>122 µA</b>", "약 77일"],
                ]
              },
              { t: "p", html: "<b>계산 가정</b>: 광고 이벤트 한 번의 전하 12 µC(3채널 송신·수신 창·기동 포함 예시값), sleep 2 µA. 배터리 자가방전·저온 용량 감소·펄스 전류 한계는 뺀 이론값이므로, 실제 설계에서는 칩사 전력 계산기와 <b>전류 프로브 실측</b>으로 Q_event를 확인해야 합니다. 간격을 10배 줄이면 수명도 거의 10배 줄어드는 것, 간격이 길어질수록 sleep 전류의 비중이 커지는 것이 핵심입니다." },
              { t: "kv", rows: [
                ["Q_event를 키우는 것", "송신 전류(출력 레벨·전원 방식), 이벤트 시간(PHY·패킷 길이 — 2M이면 송신 시간 절반), 기동 시간(크리스탈 안정화), 수신 창 폭(슬립 클럭 정확도)"],
                ["I_sleep을 키우는 것", "RAM 유지 범위, RTC·슬립 클럭 방식(RC vs 32 kHz XTAL), 보드 누설(풀업·LED·센서 대기 전류)"],
                ["DC-DC vs LDO", "칩 내부 DC-DC를 쓰면 같은 송신에서 배터리 전류가 LDO 대비 크게 줄어듦 — 외장 인덕터 1개의 비용으로 Q_event를 낮추는 가장 효과적인 HW 수단 (→ <a href='#ckt-power'>전원 설계</a>)"],
              ]},
              { t: "note", kind: "warn", title: "흔한 오해 — \"출력을 낮추면 배터리가 크게 는다?\"", html: "송신 전류는 이벤트의 일부 구간에만 흐릅니다. 간격이 길면 평균 전류는 <b>sleep 전류와 기동·수신 구간</b>이 지배하므로 출력을 0 dBm에서 −8 dBm으로 낮춰도 수명은 기대만큼 늘지 않고, 대신 통신 거리만 줄어듭니다. 먼저 <b>sleep µA, 간격, 이벤트 시간</b>을 줄이고, 출력은 링크 마진이 남을 때만 낮추세요." },
              { t: "note", kind: "tip", title: "현장 노하우 — 가전에서의 전력 관점", html: "가전 본체는 상시 전원이라 배터리 수명보다 <b>네트워크 대기 전력 규제·발열·전원부 노이즈</b>가 관심사입니다. 배터리 계산이 직접 필요한 것은 리모컨·도어 센서·온습도 센서 같은 액세서리입니다. 액세서리는 시제품 단계에서 반드시 전류 프로브(µA~mA 동적 범위)로 이벤트 파형을 찍어 Q_event를 실측하고, 그 값을 수명 계산에 넣으세요." },
              { t: "note", kind: "info", title: "연결", html: "출력 클래스와 저전력 설계 요약은 <a href='#bt-power-class'>출력 클래스</a>, 전원 회로는 <a href='#ckt-power'>전원 설계</a>·<a href='#ckt-pdn'>PDN</a>, 슬립 클럭과 크리스탈은 <a href='#ckt-xtal-select'>XTAL 선정</a>을 보세요." },
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
              { t: "note", kind: "info", title: "호핑 상세", html: "채널 번호↔주파수 공식, 데이터 채널 인덱스, CSA #1/#2, 콤보 칩 채널 맵 연동은 <a href='#bt-hopping'>채널 번호·호핑 상세</a>에 있습니다." },
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
              { t: "note", kind: "info", title: "PHY 상세", html: "PHY별 변조 지수·감도·실효 처리량 계산은 <a href='#bt-spec-sheet'>PHY 상세 장표</a>와 <a href='#bt-ble-packet'>패킷 구조와 처리량</a>을 보세요." },
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
              { t: "note", kind: "why", title: "BLE가 저전력인 이유 (HW 포인트)", html: "BLE는 <b>대부분 잠들어 있다가</b> 짧게 깨어나 통신하고 다시 잡니다. 그래서 ①<b>Sleep 전류(µA)</b>와 ②<b>송수신 피크 전류</b>·③<b>깨어나는 빈도(광고/연결 간격)</b>가 배터리 수명을 좌우합니다. HW는 누설 경로 차단·효율적 전원(DC-DC vs LDO)·짧은 부팅이 중요합니다. 평균 전류·배터리 수명 계산은 <a href='#bt-power-budget'>BLE 전력 계산</a>, RF 시험 항목은 <a href='#bt-rf-test'>RF 시험 항목</a>을 보세요." },
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
