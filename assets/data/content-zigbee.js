/**
 * Zigbee 탭 콘텐츠 — IEEE 802.15.4 기반, 계층·채널·메시·Thread/Matter·HW 함의
 * content.js 다음에 로드. window.KB_CONTENT.tabs 에 Zigbee 탭 추가.
 *
 * ※ 채널·출력 규제는 지역별로 다르다. 수치는 개략값 — 최신 규정 확인.
 */
(function () {
  if (!window.KB_CONTENT || !window.KB_CONTENT.tabs) return;

  window.KB_CONTENT.tabs.push({
    id: "zigbee",
    label: "Zigbee",
    icon: "🟢",
    chapters: [
      /* ───────────── Z0. 개요 ───────────── */
      {
        id: "zb-intro",
        icon: "📘",
        title: "Z0. Zigbee 개요",
        sections: [
          {
            id: "zb-overview",
            title: "Zigbee와 IEEE 802.15.4 — 무엇이 다른가",
            blocks: [
              { t: "p", html: "Zigbee는 <b>저전력·메시</b> 스마트홈/IoT 표준(CSA, 옛 Zigbee Alliance)입니다. 물리·MAC 계층은 <b>IEEE 802.15.4</b>를 그대로 쓰고, 그 위에 <b>네트워크·애플리케이션 계층</b>을 얹은 것이 Zigbee입니다. 즉 '802.15.4 = 토대, Zigbee = 그 위의 집'입니다." },
              { t: "note", kind: "info", title: "비유로 먼저", html: "802.15.4는 <b>도로와 차량 규격</b>(어떻게 신호를 실어 보내는지), Zigbee는 그 위에서 도는 <b>택배 시스템</b>(주소·중계·물건 규격)입니다. 같은 도로(802.15.4) 위에 Zigbee 택배도, Thread 택배도 다닐 수 있습니다." },
              { t: "table",
                head: ["구분", "내용"],
                rows: [
                  ["용도", "스마트홈(조명·센서·도어·플러그), 빌딩 자동화"],
                  ["기반", "IEEE 802.15.4 PHY/MAC (2.4GHz O-QPSK 등)"],
                  ["속도", "2.4GHz 250 kbps (저속·저전력 지향)"],
                  ["강점", "<b>메시</b>로 범위 확장·자가복구, 저전력, 다수 노드"],
                  ["경쟁/형제", "Thread(같은 802.15.4), BLE Mesh, Wi-Fi"],
                ]
              },
              { t: "note", kind: "warn", title: "규제 주의", html: "2.4GHz Zigbee는 전세계 ISM을 쓰지만 출력 한계는 지역별로 다르고, Sub-G(868/915MHz)는 <b>지역별 주파수 자체가 다릅니다</b>(유럽 868 vs 미국 915). 수치는 개략값 — 최신 규정 확인." },
            ]
          }
        ]
      },

      /* ───────────── Z1. 표준 구조 ───────────── */
      {
        id: "zb-stack",
        icon: "🧱",
        title: "Z1. 표준 계층 구조",
        sections: [
          {
            id: "zb-layers",
            title: "802.15.4 + Zigbee 계층",
            blocks: [
              { t: "p", html: "Zigbee는 여러 계층이 층층이 쌓인 구조입니다. 아래 두 층(PHY·MAC)은 802.15.4 표준, 위는 Zigbee가 정의합니다. <b>HW(RF)는 맨 아래 PHY와 직결</b>됩니다." },
              { t: "fig",
                caption: "프로토콜 스택. 맨 아래 802.15.4 PHY/MAC(=RF HW 영역) 위에 Zigbee 네트워크·애플리케이션 계층이 쌓인다. 같은 802.15.4 위에 Thread도 올라간다.",
                svg: '<svg viewBox="0 0 620 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Zigbee 프로토콜 스택">'
                  + (function(){
                      var layers=[
                        ['애플리케이션 (ZCL · 디바이스 프로파일)','#a371f7','Zigbee'],
                        ['APS (애플리케이션 지원)','#a371f7','Zigbee'],
                        ['NWK (네트워크 · 메시 라우팅)','#2ea043','Zigbee'],
                        ['MAC (802.15.4 매체접근)','#4aa3ff','IEEE 802.15.4'],
                        ['PHY (802.15.4 물리계층 = RF HW)','#e3b341','IEEE 802.15.4']
                      ];
                      var out='';var y=20;
                      layers.forEach(function(l,i){
                        var yy=y+i*44;
                        out+='<rect x="120" y="'+yy+'" width="380" height="36" rx="6" fill="'+l[1]+'" fill-opacity="0.15" stroke="'+l[1]+'" stroke-opacity="0.6"/>';
                        out+='<text x="310" y="'+(yy+23)+'" text-anchor="middle" class="fig-label" style="fill:'+l[1]+'">'+l[0]+'</text>';
                        out+='<text x="510" y="'+(yy+23)+'" class="fig-sub" fill="#7a8694">'+l[2]+'</text>';
                      });
                      return out;
                    })()
                  + '<text x="60" y="120" text-anchor="middle" class="fig-sub" fill="#7a8694" transform="rotate(-90 60 130)">상위 ← → 하위(RF)</text>'
                  + '</svg>'
              },
              { t: "kv", rows: [
                ["PHY (802.15.4)", "주파수·변조·송수신. <b>RF HW가 구현</b>하는 계층"],
                ["MAC (802.15.4)", "채널 접근(CSMA/CA), 주소, ACK"],
                ["NWK (Zigbee)", "메시 라우팅, 네트워크 형성·관리"],
                ["APS / ZCL", "애플리케이션 데이터·표준 클러스터(켜기/밝기/온도 등)"],
              ]},
              { t: "note", kind: "tip", title: "멀티프로토콜 SoC", html: "PHY가 802.15.4로 같기 때문에, 많은 칩이 <b>Zigbee·Thread·BLE를 한 칩(멀티프로토콜)</b>으로 지원합니다(같은 2.4GHz O-QPSK/GFSK 라디오 공유). HW 설계는 BLE와 거의 동일한 2.4GHz RF 설계 원칙을 따릅니다." },
            ]
          }
        ]
      },

      /* ───────────── Z1.5 표준 상세 장표 ───────────── */
      {
        id: "zb-spec",
        icon: "📋",
        title: "Z1.5 표준 상세 장표 — PHY·확산·프레임·채널·RF 시험·전력",
        sections: [
          {
            id: "zb-spec-sheet",
            title: "802.15.4 PHY 상세 장표 — 2.4 GHz O-QPSK vs Sub-GHz",
            blocks: [
              { t: "p", html: "Zigbee와 Thread의 RF는 둘 다 <b>IEEE 802.15.4 PHY</b>입니다. 핵심은 <b>확산(DSSS)</b>입니다. 2.4GHz에서는 4비트를 32개의 '칩'으로 늘려 보내므로 칩 속도는 2Mchip/s인데 데이터는 250kbps에 그칩니다. 대신 칩 몇 개가 틀려도 원래 4비트를 복원할 수 있어서, 느린 속도를 <b>견고함과 감도</b>로 바꾼 PHY입니다. 아래 장표는 2.4GHz와 Sub-GHz 변형을 BLE 1M과 나란히 놓은 것입니다." },
              { t: "note", kind: "info", title: "비유로 먼저", html: "시끄러운 공장에서 숫자 하나를 전할 때, 한 글자로 말하면 잘못 듣기 쉽습니다. 그래서 숫자마다 <b>32글자짜리 정해진 암호 문장</b>을 약속해 두고 그 문장을 말합니다. 듣는 쪽은 몇 글자를 놓쳐도 16개 후보 문장 중 <b>가장 비슷한 것</b>을 고르면 됩니다. 말은 느려지지만 거의 틀리지 않습니다 — 이것이 DSSS 확산입니다." },
              { t: "fig",
                caption: "2.4GHz 802.15.4의 확산과 변조. 데이터 4비트(심볼)를 정해진 32칩 시퀀스 16개 중 하나로 바꾸고(그림은 심볼 0의 실제 시퀀스), 짝수 칩은 I, 홀수 칩은 Q로 반 칩 어긋나게 보낸다(O-QPSK). 반사인 펄스를 쓰므로 진폭이 일정하다. 비트당 8칩이라 약 9dB의 확산 이득이 생긴다.",
                svg: '<svg viewBox="0 0 620 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="802.15.4 DSSS 확산과 O-QPSK 변조">'
                  + '<defs><marker id="zsA" markerWidth="8" markerHeight="8" refX="5.5" refY="3" orient="auto"><path d="M0,0 L5.5,3 L0,6 Z" fill="#7a8694"/></marker></defs>'
                  + '<rect x="24" y="88" width="96" height="64" rx="8" fill="#e3b341" fill-opacity="0.15" stroke="#e3b341" stroke-opacity="0.7"/>'
                  + '<text x="72" y="112" text-anchor="middle" class="fig-sub" fill="#e3b341">데이터 4비트</text><text x="72" y="134" text-anchor="middle" class="fig-label" style="fill:#e3b341">0000</text>'
                  + '<line class="kb-flow" x1="124" y1="120" x2="158" y2="120" stroke="#7a8694" stroke-width="2" marker-end="url(#zsA)"/>'
                  + (function(){
                      var seq='11011001110000110101001000101110';var o='';
                      for(var i=0;i<32;i++){var x=164+i*8;var one=seq.charAt(i)==='1';var col=(i%2===0)?'#4aa3ff':'#2ea043';
                        o+='<rect class="kb-pulse kb-d'+((i%7)+1)+'" x="'+x+'" y="'+(one?96:120)+'" width="6" height="24" rx="1" fill="'+col+'" fill-opacity="0.55"/>';}
                      o+='<line x1="162" y1="120" x2="420" y2="120" stroke="#7a8694" stroke-width="1"/>';
                      o+='<text x="291" y="80" text-anchor="middle" class="fig-sub">심볼 0의 32칩 시퀀스 (16개 중 하나)</text>';
                      o+='<text x="291" y="164" text-anchor="middle" class="fig-sub"><tspan fill="#4aa3ff">파랑 = 짝수 칩(I)</tspan> · <tspan fill="#2ea043">초록 = 홀수 칩(Q)</tspan></text>';
                      return o;
                    })()
                  + '<line class="kb-flow" x1="426" y1="120" x2="458" y2="120" stroke="#7a8694" stroke-width="2" marker-end="url(#zsA)"/>'
                  + '<rect x="464" y="72" width="136" height="96" rx="8" fill="#a371f7" fill-opacity="0.12" stroke="#a371f7" stroke-opacity="0.7"/>'
                  + '<text x="532" y="96" text-anchor="middle" class="fig-label" style="fill:#a371f7">O-QPSK</text>'
                  + '<text x="532" y="118" text-anchor="middle" class="fig-sub">I·Q 반 칩 지연</text>'
                  + '<text x="532" y="138" text-anchor="middle" class="fig-sub">반사인 펄스</text>'
                  + '<text x="532" y="158" text-anchor="middle" class="fig-sub" fill="#2ea043">진폭 일정 (MSK와 등가)</text>'
                  + '<text x="310" y="200" text-anchor="middle" class="fig-sub">2 Mchip/s ÷ 32칩 = 62.5 ksym/s × 4비트 = 250 kbps</text>'
                  + '<text x="310" y="220" text-anchor="middle" class="fig-sub">비트당 8칩 → 확산 이득 10·log₁₀(8) ≈ 9 dB</text>'
                  + '</svg>'
              },
              { t: "table",
                head: ["항목", "2.4 GHz O-QPSK", "915 MHz BPSK", "868 MHz BPSK", "915 MHz O-QPSK", "868 MHz O-QPSK", "(비교) BLE 1M"],
                rows: [
                  ["주파수", "2400–2483.5 MHz", "902–928 MHz", "868.0–868.6 MHz", "902–928 MHz", "868.0–868.6 MHz", "2400–2483.5 MHz"],
                  ["채널", "16개 (11–26) · 5 MHz 간격", "10개 (1–10) · 2 MHz 간격", "1개 (0)", "10개 (1–10)", "1개 (0)", "40개 · 2 MHz 간격"],
                  ["칩률", "2,000 kchip/s", "600 kchip/s", "300 kchip/s", "1,000 kchip/s", "400 kchip/s", "— (확산 없음)"],
                  ["변조", "O-QPSK (반사인 펄스)", "BPSK", "BPSK", "O-QPSK", "O-QPSK", "GFSK"],
                  ["확산", "4비트 → 32칩", "1비트 → 15칩", "1비트 → 15칩", "4비트 → 16칩", "4비트 → 16칩", "없음"],
                  ["심볼률", "62.5 ksym/s", "40 kbaud", "20 kbaud", "62.5 ksym/s", "25 ksym/s", "1 Msym/s"],
                  ["비트율", "<b>250 kbps</b>", "40 kbps", "20 kbps", "250 kbps", "100 kbps", "1 Mbps"],
                  ["비트당 칩 / 확산 이득", "8칩 / 약 9 dB", "15칩 / 약 12 dB", "15칩 / 약 12 dB", "4칩 / 약 6 dB", "4칩 / 약 6 dB", "—"],
                  ["규격 최소 감도", "−85 dBm (PER 1%, 20 B)", "−92 dBm", "−92 dBm", "−85 dBm", "−85 dBm", "−70 dBm (PER 30.8%)"],
                  ["상용 칩 감도 (대략)", "−100~−106 dBm", "칩별 확인", "칩별 확인", "칩별 확인", "칩별 확인", "−95~−99 dBm"],
                  ["송신 능력 (규격)", "−3 dBm 이상", "−3 dBm 이상", "−3 dBm 이상", "−3 dBm 이상", "−3 dBm 이상", "−20 ~ +20 dBm"],
                  ["주파수 허용 오차", "±40 ppm", "±40 ppm", "±40 ppm", "±40 ppm", "±40 ppm", "±50 ppm (동작 클럭)"],
                  ["최대 PHY 페이로드", "127 B", "127 B", "127 B", "127 B", "127 B", "251 B (+ 헤더)"],
                  ["지역", "전세계", "미주", "유럽", "미주", "유럽", "전세계"],
                  ["가전에서", "<b>Zigbee·Thread·Matter 사실상 표준</b>", "드묾", "드묾", "드묾", "드묾", "커미셔닝·폰 연결"],
                ]
              },
              { t: "p", html: "<b>표 기준</b>: Sub-GHz BPSK와 O-QPSK는 IEEE 802.15.4-2006에 정의된 변형입니다. 스마트미터·Wi-SUN 같은 장거리 Sub-GHz는 별도 개정(802.15.4g SUN PHY)을 쓰므로 이 표와 다릅니다. '상용 칩 감도'는 주요 2.4GHz 멀티프로토콜 SoC 데이터시트의 대략적인 범위입니다." },
              { t: "note", kind: "why", title: "O-QPSK는 사실상 '진폭이 일정한' 변조다", html: "I와 Q를 반 칩 어긋나게 보내고 펄스를 반사인 모양으로 만들면, 802.15.4의 O-QPSK는 수학적으로 <b>MSK(최소 편이 FSK)와 같아져 진폭이 일정</b>해집니다. BLE의 GFSK와 같은 이유로 PA를 효율적으로 돌릴 수 있습니다(→ <a href='#bt-spec-sheet'>BLE GFSK의 전력 이점</a>). 그래서 802.15.4와 BLE는 한 칩의 같은 무선부로 함께 구현하기 쉽고, 멀티프로토콜 SoC가 흔한 것입니다." },
              { t: "note", kind: "warn", title: "흔한 오해 — \"데이터시트 감도 숫자로 Zigbee와 BLE를 바로 비교할 수 있다?\"", html: "판정 기준이 다릅니다. 802.15.4 감도는 <b>PER 1%(20바이트 패킷)</b>, BLE 감도는 <b>PER 30.8%(37바이트 패킷)</b> 기준입니다. Zigbee 쪽 기준이 훨씬 엄격하므로, 같은 칩의 \"Zigbee −102 dBm\"과 \"BLE −97 dBm\"이 5dB 차이를 뜻하지 않습니다. 비교하려면 같은 PER 기준으로 다시 재야 합니다. 또 '250 kbps라 BLE 1M보다 열등하다'도 오해입니다. 센서·제어 데이터에는 충분하고, 확산 덕에 링크 마진은 대등하거나 더 좋으며, 메시가 범위를 넓힙니다." },
              { t: "note", kind: "tip", title: "현장 노하우 — 가전에서의 802.15.4", html: "가전·스마트홈에서는 <b>2.4 GHz O-QPSK 하나</b>만 보면 됩니다. Zigbee, Thread, Matter-over-Thread가 모두 이 PHY 위에서 돌고, 멀티프로토콜 SoC 한 개로 BLE(커미셔닝)와 함께 처리합니다. 칩을 고를 때는 802.15.4 감도의 <b>PER·패킷 길이 조건</b>, 802.15.4 모드의 최대 출력, 그리고 BLE와 동시 동작(동적 멀티프로토콜)의 지원 여부를 함께 확인하세요." },
            ]
          },
          {
            id: "zb-frame",
            title: "프레임 구조·MAC 타이밍·실효 처리량 — 250 kbps는 얼마나 남나",
            blocks: [
              { t: "p", html: "802.15.4는 Bluetooth처럼 호핑하지 않고 <b>한 채널에 머물며 '말하기 전에 듣는'(CSMA/CA)</b> 방식으로 채널을 나눠 씁니다. 그래서 패킷 하나를 보낼 때마다 무작위 대기·채널 확인·전환 시간·ACK가 붙고, 250kbps 중 실제로 남는 몫은 그보다 훨씬 작습니다." },
              { t: "fig",
                caption: "위: 802.15.4 프레임 구조(2.4GHz, 1바이트 = 32µs). PHY 페이로드(PSDU)는 최대 127바이트다. 아래: 최대 프레임 하나를 ACK와 함께 보내는 한 주기(평균 백오프 기준). 프레임 자체는 4,256µs인데 주기는 6,880µs라 MAC 효율이 약 62%다.",
                svg: '<svg viewBox="0 0 620 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="802.15.4 프레임 구조와 CSMA/CA 송신 타이밍">'
                  + (function(){
                      var f=[['Preamble','4 B',70,'#9aa7b4'],['SFD','1 B',40,'#9aa7b4'],['PHR','1 B',40,'#e3b341'],['MAC 헤더','3~23 B',100,'#a371f7'],['MAC 페이로드','나머지',230,'#4aa3ff'],['FCS','2 B',50,'#2ea043']];
                      var o='<text x="40" y="22" class="fig-label">프레임 구조 (2.4 GHz · 1 B = 32 µs)</text>';var x=40;var psduStart=0;
                      f.forEach(function(r,i){
                        if(i===3) psduStart=x;
                        o+='<rect x="'+x+'" y="34" width="'+(r[2]-3)+'" height="36" rx="4" fill="'+r[3]+'" fill-opacity="0.2" stroke="'+r[3]+'" stroke-opacity="0.7"/>';
                        o+='<text x="'+(x+(r[2]-3)/2)+'" y="57" text-anchor="middle" class="fig-sub" fill="'+r[3]+'">'+r[0]+'</text>';
                        o+='<text x="'+(x+(r[2]-3)/2)+'" y="86" text-anchor="middle" class="fig-sub">'+r[1]+'</text>';
                        x+=r[2];
                      });
                      o+='<path d="M'+psduStart+',96 V102 H'+(x-3)+' V96" stroke="#4aa3ff" fill="none"/><text x="'+((psduStart+x)/2)+'" y="116" text-anchor="middle" class="fig-sub" fill="#4aa3ff">PSDU ≤ 127 B</text>';
                      var seq=[['백오프',1120,'#7a8694'],['CCA',128,'#e3b341'],['TA',192,'#7a8694'],['데이터 프레임 4,256µs',4256,'#4aa3ff'],['TA',192,'#7a8694'],['ACK',352,'#2ea043'],['LIFS',640,'#7a8694']];
                      var W=540/6880;var t=40;
                      o+='<text x="40" y="146" class="fig-label">한 주기 6,880 µs → 127 B × 8 ÷ 6,880 µs ≈ 148 kbps</text>';
                      seq.forEach(function(s,i){var w=s[1]*W;
                        o+='<rect class="kb-pulse kb-d'+(i+1)+'" x="'+t.toFixed(1)+'" y="158" width="'+(w-1).toFixed(1)+'" height="28" rx="3" fill="'+s[2]+'" fill-opacity="'+(s[2]==='#7a8694'?0.14:0.26)+'" stroke="'+s[2]+'" stroke-opacity="0.7"/>';
                        if(i===3) o+='<text x="'+(t+w/2).toFixed(1)+'" y="177" text-anchor="middle" class="fig-sub" fill="#4aa3ff">'+s[0]+'</text>';
                        t+=w;});
                      o+='<text x="40" y="206" class="fig-sub">백오프 평균 1,120 · CCA 128 · 전환(TA) 192</text>';
                      o+='<text x="580" y="206" text-anchor="end" class="fig-sub">TA 192 · ACK 352 · LIFS 640 (µs)</text>';
                      o+='<text x="310" y="230" text-anchor="middle" class="fig-sub">데이터 자체는 주기의 62% — 나머지는 ‘말하기 전에 듣기’와 확인 응답의 비용</text>';
                      return o;
                    })()
                  + '</svg>'
              },
              { t: "table",
                head: ["항목", "값 (2.4 GHz)", "의미"],
                rows: [
                  ["1 심볼 / 1 바이트", "16 µs / 32 µs", "모든 MAC 시간이 심볼 단위로 정의됨"],
                  ["백오프 단위", "20 심볼 = 320 µs", "보내기 전 0 ~ (2^BE − 1) 단위 중 무작위 대기 (BE 3→최대 5)"],
                  ["CCA (채널 확인)", "8 심볼 = 128 µs", "채널이 비어 있는지 에너지·신호로 판단"],
                  ["송수신 전환 (TA)", "12 심볼 = 192 µs", "수신↔송신 모드 전환 시간"],
                  ["ACK 프레임", "11 B = 352 µs", "수신 성공 확인. 대기 한도 54 심볼 = 864 µs"],
                  ["재시도", "CSMA 백오프 최대 4회 · 프레임 재전송 최대 3회", "실패 시 상위층(NWK)이 경로 변경 등 처리"],
                  ["최대 프레임 한 주기", "6,880 µs (평균 백오프)", "MAC 처리량 약 148 kbps · 앱 데이터 100 B 기준 약 116 kbps"],
                ]
              },
              { t: "note", kind: "warn", title: "흔한 오해 — \"메시로 멀리 가도 속도는 같다?\"", html: "메시의 각 홉은 <b>같은 채널에서 차례로</b> 다시 보냅니다. 앞 노드가 보내는 동안 다음 노드는 기다려야 하므로, 홉이 늘수록 처리량은 대략 반씩 줄고 지연은 홉 수만큼 늘어납니다. 위 표의 116kbps는 단일 홉·간섭 없음 기준의 상한이고, 실제 앱 처리량은 수십 kbps가 흔합니다. Zigbee로 펌웨어 OTA를 하면 수 분에서 수십 분이 걸리는 이유입니다." },
              { t: "note", kind: "tip", title: "현장 노하우 — 설계에 반영할 것", html: "①명령 응답이 느리다는 불만은 대개 <b>홉 수·재전송·슬리피 기기의 폴링 주기</b>에서 옵니다(→ <a href='#zb-power'>End Device 전력</a>). ②OTA 이미지가 크면 Zigbee보다 BLE나 Wi-Fi 경로로 업데이트하는 방안을 처음부터 검토하세요. ③CCA 판정은 수신 세기 임계값으로 이뤄지므로, 같은 보드의 Wi-Fi가 강하게 새어 들어오면 Zigbee가 '채널 사용 중'으로 판단해 계속 기다립니다 — 격리가 처리량 문제로 나타나는 경우입니다(→ <a href='#zb-channel-detail'>채널·공존 상세</a>)." },
            ]
          },
          {
            id: "zb-channel-detail",
            title: "채널 번호·Wi-Fi 겹침·공존 상세",
            blocks: [
              { t: "p", html: "802.15.4는 호핑하지 않으므로 <b>어느 채널에 머무느냐가 공존의 거의 전부</b>입니다. 네트워크를 만들 때 코디네이터(또는 Thread 리더)가 채널들의 잡음 에너지를 훑어(energy scan) 가장 조용한 채널을 고르고, 그 뒤로는 그 채널에 머뭅니다." },
              { t: "kv", rows: [
                ["2.4 GHz 번호↔주파수", "f = 2405 + 5·(k − 11) MHz (k = 11 ~ 26). 신호 폭은 약 2 MHz, 채널 간격은 5 MHz"],
                ["915 MHz", "f = 906 + 2·(k − 1) MHz (k = 1 ~ 10)"],
                ["868 MHz", "채널 0 = 868.3 MHz"],
              ]},
              { t: "table",
                head: ["Zigbee 채널", "중심 주파수", "겹치는 Wi-Fi 20 MHz 채널", "권장"],
                rows: [
                  ["11 · 12 · 13 · 14", "2405 · 2410 · 2415 · 2420", "Wi-Fi 1 (2402–2422)", "Wi-Fi 1을 쓰는 집에선 피함"],
                  ["<b>15</b>", "2425", "1과 6 사이 틈", "<b>권장</b>"],
                  ["16 · 17 · 18 · 19", "2430 · 2435 · 2440 · 2445", "Wi-Fi 6 (2427–2447)", "Wi-Fi 6을 쓰는 집에선 피함"],
                  ["<b>20</b>", "2450", "6과 11 사이 틈", "<b>권장</b>"],
                  ["21 · 22 · 23 · 24", "2455 · 2460 · 2465 · 2470", "Wi-Fi 11 (2452–2472)", "Wi-Fi 11을 쓰는 집에선 피함"],
                  ["<b>25</b>", "2475", "11 위쪽", "<b>권장</b>"],
                  ["26", "2480", "대역 끝", "조건부 — 대역 경계 규제로 출력을 낮추는 제품이 흔함"],
                ]
              },
              { t: "note", kind: "why", title: "틈 채널도 '완전히 깨끗'하지는 않다", html: "Wi-Fi 20MHz 신호는 표의 범위 밖으로도 스펙트럼 치마(인접 채널 누설)가 퍼지고, 집에서는 Wi-Fi가 40MHz로 묶이거나 2.4GHz 전체를 오가기도 합니다. 그래서 15·20·25는 '가장 덜 겹치는' 채널이지 무간섭 채널이 아닙니다. 그리고 같은 보드 위 Wi-Fi처럼 <b>가까이 있는 강한 송신기</b>는 채널이 달라도 수신기 앞단을 포화시켜 Zigbee 감도를 떨어뜨립니다(desense)." },
              { t: "note", kind: "tip", title: "현장 노하우 — 콤보 보드의 공존 순서", html: "①채널: 제품이 정할 수 있다면 Wi-Fi와 떨어진 15·20·25로 형성. ②시간: 멀티프로토콜 칩의 <b>PTA(우선순위 중재)</b>로 Wi-Fi와 802.15.4 송신 시점이 겹치지 않게. ③공간: 두 안테나의 격리를 확보하고 OTA로 측정. ④주파수: 그래도 부족하면 필터. 채널 분리만 믿고 ②~④를 빼면, 시험실에선 멀쩡하고 실제 가정에서 Zigbee가 끊기는 문제가 생깁니다(→ <a href='#ckt-filter-coex'>필터·공존</a>, <a href='#proto-coex'>2.4GHz 공존 실전</a>)." },
            ]
          },
          {
            id: "zb-rf-test",
            title: "RF 시험 항목·규격 요구치 — 무엇을 재고 HW 어디와 연결되나",
            blocks: [
              { t: "p", html: "802.15.4 송수신기가 만족해야 하는 규격 요구치와, 각 항목이 가리키는 HW 부품입니다. 수치는 2.4GHz O-QPSK 기준입니다. Zigbee·Thread 제품 인증은 이 RF 요구에 더해 각 표준 단체(CSA, Thread Group)의 상호운용 시험이 별도로 있고, 전파 인증은 지역 규제(→ <a href='#ver-cert'>규제 인증</a>)를 따릅니다." },
              { t: "table",
                head: ["구분", "항목", "규격 요구 (2.4 GHz)", "관련 HW"],
                rows: [
                  ["송신", "출력 전력", "−3 dBm 이상을 낼 수 있을 것 (상한은 지역 규제)", "PA·매칭·안테나 (→ <a href='#proc-targets'>Target</a>)"],
                  ["송신", "EVM", "<b>35% 이하</b> (≈ −9 dB)", "PLL 위상잡음·PA·전원 노이즈"],
                  ["송신", "중심 주파수 오차", "±40 ppm 이내", "<b>크리스탈 ppm·부하용량</b> (→ <a href='#ckt-xtal-select'>XTAL</a>)"],
                  ["송신", "스펙트럼 마스크", "중심에서 3.5 MHz 이상 떨어진 곳: 상대 −20 dB 이하 그리고 절대 −30 dBm 이하", "PA 선형성·필터"],
                  ["수신", "감도", "−85 dBm 이하에서 PER 1% 미만 (PSDU 20 B)", "LNA 앞단 손실·NF·자체 잡음"],
                  ["수신", "인접 채널 제거", "±5 MHz 간섭이 원하는 신호와 같은 세기(0 dB)여도 수신", "수신 선택도·필터"],
                  ["수신", "대체 채널 제거", "±10 MHz 간섭이 30 dB 강해도 수신", "수신 선택도"],
                  ["수신", "최대 입력", "−20 dBm 이상", "LNA 포화·AGC"],
                  ["수신", "에너지 검출(ED)", "40 dB 이상 범위 · ±6 dB 정확도", "RSSI 회로 — 채널 선택·CCA 판정 근거"],
                ]
              },
              { t: "note", kind: "why", title: "EVM 35%가 이렇게 느슨한 이유", html: "Wi-Fi 고차 QAM은 EVM −25~−38 dB(5.6%~1.3%)를 요구하는데(→ <a href='#wifi-mcs-table'>Wi-Fi MCS 표</a>), 802.15.4는 35%(약 −9 dB)를 허용합니다. 수신기가 칩 하나하나를 정확히 맞힐 필요 없이 <b>32칩 전체를 16개 후보와 비교(상관)</b>해 가장 가까운 것을 고르기 때문입니다. 확산 이득이 신호 품질의 여유로 쓰이는 것입니다. 그래서 802.15.4 송신기는 저가·저전력 설계로도 규격을 쉽게 맞추고, 실제 양산 불량은 EVM보다 <b>출력·주파수 오차·감도</b>에서 주로 납니다." },
              { t: "note", kind: "tip", title: "현장 노하우 — 시험 계획", html: "①멀티프로토콜 SoC라도 802.15.4 모드와 BLE 모드는 <b>각각 따로</b> 출력·주파수·감도를 시험해야 합니다(변조·필터 설정이 다름). ②양산은 대표 채널(11·18·26 등 저·중·고)에서 출력·주파수 오차·PER 세 가지가 최소 세트입니다. ③채널 26은 대역 경계 규제 때문에 출력을 따로 낮춘 경우가 많으니, 그 설정이 양산 펌웨어에 들어갔는지 시험 항목으로 확인하세요(→ <a href='#prod-rftest'>양산 RF 테스트</a>)." },
            ]
          },
          {
            id: "zb-power",
            title: "역할별 전력 — 왜 Router는 잠들 수 없고, End Device는 몇 년을 가나",
            blocks: [
              { t: "p", html: "Zigbee·Thread의 전력은 <b>역할</b>이 정합니다. 다른 노드의 메시지를 받아 넘겨야 하는 Router는 수신기를 계속 켜 둬야 하고(수 mA 상시), 잠드는 End Device는 부모(Router)에게 주기적으로 \"나에게 온 메시지 있나요?\"라고 묻는 <b>폴링</b>으로만 깨어납니다. 부모는 그동안 도착한 메시지를 보관해 둡니다." },
              { t: "note", kind: "info", title: "비유로 먼저", html: "Router는 <b>24시간 열려 있는 우체국</b>입니다. 언제 편지가 올지 모르니 문을 닫을 수 없습니다. End Device는 <b>사서함</b>을 쓰는 사람입니다. 평소엔 집에서 쉬다가 정해진 주기로 우체국에 들러 \"내 우편물 있나요?\" 묻고 돌아옵니다. 자주 들르면 편지를 빨리 받지만 발품(전력)이 듭니다." },
              { t: "table",
                head: ["폴링 주기", "Q_poll ÷ T", "+ I_sleep", "= 평균 전류", "CR2032 (225 mAh) 수명 (이론)", "명령 반영 지연 (최대)"],
                rows: [
                  ["1 s", "30 µA", "1.5 µA", "<b>31.5 µA</b>", "약 298일", "약 1 s"],
                  ["7.5 s", "4 µA", "1.5 µA", "<b>5.5 µA</b>", "약 4.7년", "약 7.5 s"],
                ]
              },
              { t: "p", html: "<b>계산 가정</b>: 폴링 한 번(기동·CCA·요청 송신·ACK·짧은 수신 창)의 전하 30 µC, sleep 1.5 µA. 칩·출력·주변 회로마다 다르므로 실제 설계에서는 전류 프로브로 실측해야 합니다. 식은 BLE와 같은 <b>I_avg ≈ Q ÷ T + I_sleep</b>입니다(→ <a href='#bt-power-budget'>BLE 전력 계산</a>). 핵심은 폴링 주기가 <b>배터리 수명과 응답 지연을 맞바꾼다</b>는 점입니다 — 문 센서처럼 보고만 하는 기기는 길게, 원격 제어를 받는 기기는 짧게 잡습니다." },
              { t: "kv", rows: [
                ["Router (상시 전원)", "수신기 상시 ON — 수 mA 상시 소모. 메시의 중계·부모 역할. 콘센트 전원 기기에 적합"],
                ["Sleepy End Device", "폴링으로만 깨어남 — 수 µA 평균. 문·온습도 센서, 리모컨"],
                ["Thread의 SSED (1.2~)", "부모와 수신 시각을 미리 맞춰(CSL) 짧게만 깨어남 — 폴링보다 지연이 짧고 효율적"],
                ["Zigbee Green Power", "배터리 없이 버튼을 누르는 기계 에너지로 한 번 송신하는 초저전력 기기(스위치 등)를 위한 규격"],
              ]},
              { t: "note", kind: "warn", title: "흔한 오해 — \"End Device를 많이 붙이면 메시가 튼튼해진다?\"", html: "End Device는 잠들어 있어 <b>중계를 하지 않습니다</b>. 메시의 범위와 자가복구는 Router 수와 배치가 정합니다. 배터리 센서만 잔뜩 있고 Router가 적은 집은 한 Router가 꺼지면 그 아래 기기들이 고립됩니다. 그리고 한 Router가 맡을 수 있는 자식 수와 보관 메시지 수에는 한계가 있습니다." },
              { t: "note", kind: "tip", title: "현장 노하우 — 가전이 Router여야 하는 이유", html: "냉장고·에어컨·세탁기는 <b>항상 콘센트에 꽂혀 있고 집 곳곳에 놓인</b> 기기라, Zigbee·Thread 메시의 Router(Thread에선 Router 자격 기기)로 동작하기에 이상적입니다. 가전이 Router로서 주변 배터리 센서들의 부모가 되면 집 전체 메시가 튼튼해지고, 이것이 스마트홈 생태계에서 가전의 가치가 됩니다. 반대로 Router는 상시 수신이므로 <b>대기 전력 규제·발열</b>을 설계 초기에 반영하고, 안테나를 금속 함체 안쪽 깊숙이 넣지 않도록 배치해야 합니다(→ <a href='#ant-placement'>안테나 배치</a>, <a href='#ckt-power'>전원 설계</a>)." },
              { t: "note", kind: "info", title: "연결", html: "역할과 메시 구조 요약은 <a href='#zb-roles'>Coordinator · Router · End Device</a>, Zigbee·Thread·Matter 관계는 <a href='#zb-thread'>Thread · Matter</a>를 보세요." },
            ]
          }
        ]
      },

      /* ───────────── Z2. 주파수·채널 ───────────── */
      {
        id: "zb-channel",
        icon: "📡",
        title: "Z2. 주파수·채널 운용",
        sections: [
          {
            id: "zb-channels",
            title: "2.4GHz 16채널 · Sub-G",
            blocks: [
              { t: "p", html: "802.15.4는 세 대역을 정의합니다. 가장 널리 쓰는 <b>2.4GHz는 채널 11–26(16개, 5MHz 간격)</b>이고, Sub-G(868/915MHz)는 지역별로 다릅니다." },
              { t: "table",
                head: ["대역", "채널", "속도", "지역"],
                rows: [
                  ["2.4 GHz", "11 – 26 (16개)", "250 kbps", "전세계"],
                  ["915 MHz", "1 – 10 (10개)", "40 / 250 kbps", "미주(미국 등)"],
                  ["868 MHz", "0 (1개)", "20 / 100 kbps", "유럽"],
                ]
              },
              { t: "fig",
                caption: "2.4GHz Zigbee 채널 11–26과 Wi-Fi의 관계. 일부 Zigbee 채널(15·20·25·26)이 Wi-Fi 1·6·11 사이 틈에 놓여 간섭이 적다 → 공존을 위해 이 채널들을 권장.",
                svg: '<svg viewBox="0 0 620 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Zigbee 2.4GHz 채널과 WiFi 공존">'
                  + '<text x="40" y="22" class="fig-sub" fill="#7a8694">2405 ──────────────── 2.4GHz ──────────────── 2480 MHz</text>'
                  + (function(){
                      var out='';
                      var wifi=[[55,'1'],[245,'6'],[435,'11']];
                      wifi.forEach(function(w){out+='<rect x="'+w[0]+'" y="50" width="120" height="38" rx="3" fill="#4aa3ff" fill-opacity="0.10" stroke="#4aa3ff" stroke-opacity="0.35" stroke-dasharray="3 3"/><text x="'+(w[0]+60)+'" y="73" text-anchor="middle" class="fig-sub" fill="#4aa3ff" opacity="0.6">WiFi '+w[1]+'</text>';});
                      var pref=[15,20,25,26];
                      for(var ch=11;ch<=26;ch++){
                        var x=46+(ch-11)*35;
                        var good=pref.indexOf(ch)>=0;
                        var col=good?'#2ea043':'#7a8694';
                        out+='<rect class="'+(good?'kb-pulse':'')+'" x="'+x+'" y="100" width="22" height="26" rx="2" fill="'+col+'" fill-opacity="'+(good?0.4:0.25)+'" stroke="'+col+'" stroke-opacity="0.6"/>';
                        out+='<text x="'+(x+11)+'" y="142" text-anchor="middle" class="fig-sub" fill="'+col+'" style="font-size:9px">'+ch+'</text>';
                      }
                      return out;
                    })()
                  + '<text x="310" y="178" text-anchor="middle" class="fig-sub" fill="#2ea043">초록(15·20·25·26) = WiFi 틈 → 공존 권장 채널</text>'
                  + '</svg>'
              },
              { t: "note", kind: "why", title: "변조 — O-QPSK + DSSS", html: "2.4GHz 802.15.4는 <b>O-QPSK(오프셋 QPSK)에 DSSS(직접확산)</b>를 씁니다. 확산 덕에 간섭·잡음에 강하고 저전력에서도 견고합니다. RF HW 관점에서는 BLE(GFSK)와 유사한 2.4GHz 설계지만 변조가 달라 칩이 처리합니다. 칩률·확산 이득·감도·Sub-GHz 변형 비교는 <a href='#zb-spec-sheet'>Z1.5 PHY 상세 장표</a>를 보세요." },
              { t: "note", kind: "tip", title: "공존 설계 포인트", html: "Wi-Fi와 같은 집/보드에서 쓰면 간섭하므로, <b>Wi-Fi가 쓰지 않는 채널(예: 15·20·25·26)로 Zigbee를 운용</b>하는 것이 권장됩니다. 같은 보드 콤보면 안테나 격리·필터도 함께. 채널별 Wi-Fi 겹침 표와 공존 순서는 <a href='#zb-channel-detail'>채널·공존 상세</a>에 있습니다." },
            ]
          }
        ]
      },

      /* ───────────── Z3. 네트워크 토폴로지 ───────────── */
      {
        id: "zb-topology",
        icon: "🕸️",
        title: "Z3. 네트워크 토폴로지",
        sections: [
          {
            id: "zb-roles",
            title: "Coordinator · Router · End Device · 메시",
            blocks: [
              { t: "p", html: "Zigbee 네트워크는 세 가지 역할로 구성되고, <b>메시</b>로 연결됩니다. 역할에 따라 <b>전원·전류 설계</b>가 달라집니다." },
              { t: "fig",
                caption: "Zigbee 메시. Coordinator(하나, 네트워크 형성)와 Router(상시전원, 중계)가 메시를 이루고, End Device(배터리, 잠듦)는 한 부모에 매달린다. 라우터 중계로 범위가 넓어지고 경로가 자가복구된다.",
                svg: '<svg viewBox="0 0 620 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Zigbee 메시 토폴로지">'
                  + '<circle cx="310" cy="60" r="22" fill="#a371f7" fill-opacity="0.3" stroke="#a371f7" stroke-width="2"/><text x="310" y="64" text-anchor="middle" class="fig-sub" fill="#a371f7">C</text>'
                  + '<text x="310" y="30" text-anchor="middle" class="fig-sub" fill="#a371f7">Coordinator</text>'
                  + (function(){
                      var routers=[[170,130],[450,130],[310,150]];
                      var out='';
                      routers.forEach(function(p){out+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="16" fill="#2ea043" fill-opacity="0.3" stroke="#2ea043" stroke-width="1.5"/><text x="'+p[0]+'" y="'+(p[1]+4)+'" text-anchor="middle" class="fig-sub" fill="#2ea043">R</text>';});
                      // mesh links among C and routers
                      var links=[[310,60,170,130],[310,60,450,130],[310,60,310,150],[170,130,310,150],[450,130,310,150],[170,130,450,130]];
                      var lines='';links.forEach(function(l){lines+='<line class="kb-flow" x1="'+l[0]+'" y1="'+l[1]+'" x2="'+l[2]+'" y2="'+l[3]+'" stroke="#2ea043" stroke-width="1.3" opacity="0.8"/>';});
                      // end devices
                      var eds=[[110,190,170,130],[230,200,170,130],[400,200,450,130],[510,190,450,130]];
                      var edstr='';eds.forEach(function(e){edstr+='<line x1="'+e[0]+'" y1="'+e[1]+'" x2="'+e[2]+'" y2="'+e[3]+'" stroke="#4aa3ff" stroke-width="1" stroke-dasharray="3 3" opacity="0.6"/><circle cx="'+e[0]+'" cy="'+e[1]+'" r="9" fill="#4aa3ff" fill-opacity="0.35"/><text x="'+e[0]+'" y="'+(e[1]+3)+'" text-anchor="middle" class="fig-sub" fill="#4aa3ff" style="font-size:9px">E</text>';});
                      return lines+out+edstr;
                    })()
                  + '<text x="40" y="222" class="fig-sub" fill="#a371f7">C=Coordinator</text><text x="230" y="222" class="fig-sub" fill="#2ea043">R=Router(상시전원·중계)</text><text x="470" y="222" class="fig-sub" fill="#4aa3ff">E=End(배터리)</text>'
                  + '</svg>'
              },
              { t: "table",
                head: ["역할", "전원", "기능"],
                rows: [
                  ["Coordinator", "상시", "네트워크 1개 형성·관리(루트). 네트워크당 하나"],
                  ["Router", "상시(보통)", "데이터 중계·메시 확장. 잠들지 않음"],
                  ["End Device", "배터리", "센서/액추에이터. 잠들 수 있음(저전력), 부모(라우터) 경유"],
                ]
              },
              { t: "note", kind: "why", title: "메시가 주는 것 — 범위와 자가복구", html: "라우터들이 서로 중계하므로 <b>코디네이터에서 멀어도</b> 도달하고, 한 경로가 끊겨도 <b>다른 경로로 자동 우회(self-healing)</b>합니다. 그래서 개별 노드는 출력을 크게 하지 않아도 됩니다(저전력). 단 <b>End Device는 잠들어 중계 안 함</b> — 라우터가 충분해야 망이 튼튼합니다." },
              { t: "note", kind: "tip", title: "HW 설계 함의", html: "상시전원 Router는 전류 여유가 있어 안테나·출력에 유리하고, 배터리 End Device는 <b>Sleep 전류·광고/폴링 주기</b>가 수명을 좌우합니다. 역할에 맞춰 전원·안테나를 설계합니다. 폴링 주기별 평균 전류·수명 계산은 <a href='#zb-power'>역할별 전력</a>을 보세요." },
            ]
          }
        ]
      },

      /* ───────────── Z4. Thread / Matter ───────────── */
      {
        id: "zb-thread-matter",
        icon: "🧵",
        title: "Z4. Thread · Matter 관계",
        sections: [
          {
            id: "zb-thread",
            title: "Zigbee · Thread · Matter — 헷갈리지 않기",
            blocks: [
              { t: "p", html: "셋 다 스마트홈에 나오지만 계층이 다릅니다. <b>Zigbee·Thread는 802.15.4 위의 네트워크</b>, <b>Matter는 그 위(또는 Wi-Fi 위)에서 도는 애플리케이션 표준</b>입니다." },
              { t: "fig",
                caption: "Zigbee와 Thread는 같은 802.15.4 RF를 공유하는 '다른 네트워크 방식'. Matter는 그 위에서 도는 공통 앱 언어로, Thread·Wi-Fi·이더넷 위에서 동작하고 BLE로 초기 설정한다.",
                svg: '<svg viewBox="0 0 620 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Zigbee Thread Matter 관계">'
                  + '<rect x="120" y="30" width="380" height="40" rx="6" fill="#a371f7" fill-opacity="0.16" stroke="#a371f7" stroke-opacity="0.6"/><text x="310" y="55" text-anchor="middle" class="fig-label" style="fill:#a371f7">Matter (앱 계층 · 상호운용)</text>'
                  + '<rect x="120" y="92" width="180" height="44" rx="6" fill="#2ea043" fill-opacity="0.16" stroke="#2ea043" stroke-opacity="0.6"/><text x="210" y="112" text-anchor="middle" class="fig-label" style="fill:#2ea043">Thread</text><text x="210" y="128" text-anchor="middle" class="fig-sub">IPv6 메시</text>'
                  + '<rect x="320" y="92" width="180" height="44" rx="6" fill="#4aa3ff" fill-opacity="0.16" stroke="#4aa3ff" stroke-opacity="0.6"/><text x="410" y="112" text-anchor="middle" class="fig-label" style="fill:#4aa3ff">Wi-Fi / 이더넷</text>'
                  + '<rect x="120" y="158" width="180" height="40" rx="6" fill="#e3b341" fill-opacity="0.16" stroke="#e3b341" stroke-opacity="0.6"/><text x="210" y="183" text-anchor="middle" class="fig-label" style="fill:#e3b341">IEEE 802.15.4 (RF)</text>'
                  + '<rect x="320" y="158" width="180" height="40" rx="6" fill="#9aa7b4" fill-opacity="0.12" stroke="#9aa7b4" stroke-opacity="0.5"/><text x="410" y="183" text-anchor="middle" class="fig-sub" fill="#9aa7b4">(별도 RF)</text>'
                  + '<line x1="210" y1="136" x2="210" y2="158" stroke="#7a8694" stroke-width="1"/><line x1="410" y1="136" x2="410" y2="158" stroke="#7a8694" stroke-width="1"/>'
                  + '<text x="540" y="116" class="fig-sub" fill="#2ea043">Zigbee도</text><text x="540" y="130" class="fig-sub" fill="#2ea043">여기 RF</text><text x="540" y="144" class="fig-sub" fill="#2ea043">공유</text>'
                  + '</svg>'
              },
              { t: "kv", rows: [
                ["Zigbee", "802.15.4 위의 네트워크+앱(ZCL). 자체 생태계"],
                ["Thread", "802.15.4 위의 <b>IPv6 메시</b>(6LoWPAN). 인터넷 친화, Border Router로 IP 연결"],
                ["Matter", "Thread/Wi-Fi/이더넷 위에서 도는 <b>공통 앱 표준</b>(CSA). 브랜드 간 상호운용, BLE로 커미셔닝"],
              ]},
              { t: "note", kind: "tip", title: "HW엔 무슨 의미인가", html: "Zigbee·Thread는 <b>RF HW가 사실상 동일</b>(802.15.4 2.4GHz)합니다. 그래서 멀티프로토콜 SoC면 펌웨어로 Zigbee/Thread/Matter를 바꿔 지원할 수 있어, <b>HW 설계는 한 번 잘 해두면 여러 표준에 재사용</b>됩니다. Matter 지원은 주로 SW·인증 문제." },
              { t: "note", kind: "info", title: "HW 설계 과정으로", html: "구체 설계는 <b>HW 설계 과정</b> 탭: 저전력 전원(<a href='#ckt-pdn'>PDN</a>), 안테나(<a href='#ant-types'>안테나</a>), 공존(<a href='#ckt-filter-coex'>필터·공존</a>), 인증(<a href='#ver-cert'>인증</a>). 2.4G RF 원칙은 BLE 장과 공통." },
            ]
          }
        ]
      }
    ]
  });
})();
