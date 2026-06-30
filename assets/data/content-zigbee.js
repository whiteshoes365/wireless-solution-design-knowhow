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
                  ["868 MHz", "0 (1개)", "20 / 250 kbps", "유럽"],
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
              { t: "note", kind: "why", title: "변조 — O-QPSK + DSSS", html: "2.4GHz 802.15.4는 <b>O-QPSK(오프셋 QPSK)에 DSSS(직접확산)</b>를 씁니다. 확산 덕에 간섭·잡음에 강하고 저전력에서도 견고합니다. RF HW 관점에서는 BLE(GFSK)와 유사한 2.4GHz 설계지만 변조가 달라 칩이 처리합니다." },
              { t: "note", kind: "tip", title: "공존 설계 포인트", html: "Wi-Fi와 같은 집/보드에서 쓰면 간섭하므로, <b>Wi-Fi가 쓰지 않는 채널(예: 15·20·25·26)로 Zigbee를 운용</b>하는 것이 권장됩니다. 같은 보드 콤보면 안테나 격리·필터도 함께. (설계탭 공존 참조)" },
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
              { t: "note", kind: "tip", title: "HW 설계 함의", html: "상시전원 Router는 전류 여유가 있어 안테나·출력에 유리하고, 배터리 End Device는 <b>Sleep 전류·광고/폴링 주기</b>가 수명을 좌우합니다. 역할에 맞춰 전원·안테나를 설계합니다." },
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
