/**
 * Wi-Fi HaLow 탭 콘텐츠 — IEEE 802.11ah (Sub-1 GHz Wi-Fi): 개요, PHY·MCS 장표, 지역 대역, 링크 버짓, MAC, HW
 * content.js 다음에 로드. window.KB_CONTENT.tabs 에 HaLow 탭 추가.
 *
 * ※ 대역·출력 규제는 지역별로 다르고 자주 개정된다. 지역 수치는 개략값 — 판매 지역의 최신 규정 확인.
 */
(function () {
  if (!window.KB_CONTENT || !window.KB_CONTENT.tabs) return;

  window.KB_CONTENT.tabs.push({
    id: "halow",
    label: "Wi-Fi HaLow",
    icon: "🟠",
    chapters: [
      /* ───────────── H0. 개요 ───────────── */
      {
        id: "halow-intro",
        icon: "📘",
        title: "H0. Wi-Fi HaLow 개요",
        sections: [
          {
            id: "halow-overview",
            title: "HaLow는 '10배 느린 시계로 돌리는 Wi-Fi'다 — 무엇이 다르고 어디에 쓰나",
            blocks: [
              { t: "p", html: "Wi-Fi HaLow(IEEE 802.11ah)는 Wi-Fi 5(11ac)의 물리층을 <b>시계를 10배 느리게</b> 돌려 1 GHz 아래(주로 750~930 MHz) 대역에 옮긴 Wi-Fi입니다. 채널은 1~16 MHz로 좁고 심볼은 10배 길어서, <b>멀리·벽 너머로·적은 전력으로</b> 닿고 AP 하나에 수천 대가 붙을 수 있습니다. 그러면서도 Wi-Fi라 <b>IP·WPA3 보안을 그대로</b> 씁니다. 대가는 속도(수백 kbps~수십 Mbps)와, 기존 공유기에는 900 MHz 무선부가 없다는 생태계 문제입니다." },
              { t: "note", kind: "info", title: "비유로 먼저", html: "같은 노래를 <b>10배 느린 박자로, 낮은 음으로</b> 부른다고 생각하세요. 느리게 또박또박 부르면 메아리(반사파)가 섞여도 알아듣기 쉽고, 낮은 음은 벽 너머 옆방까지 잘 전해집니다. 대신 같은 시간에 부를 수 있는 가사(데이터)는 줄어듭니다. HaLow는 빠른 노래 대신 <b>집 끝까지, 마당까지 확실히 들리는 노래</b>를 고른 Wi-Fi입니다." },
              { t: "fig",
                caption: "11ac(20 MHz)와 11ah(2 MHz)의 비교. 부반송파 구조와 개수는 같고, 시계만 1/10이라 부반송파 간격이 312.5 kHz → 31.25 kHz, 심볼 길이가 4 µs → 40 µs로 바뀐다. 채널폭이 1/10이 되어 900 MHz의 좁은 대역에 들어가고, 긴 심볼과 긴 가드 인터벌(8 µs) 덕에 실외의 긴 반사 지연에도 강해진다.",
                svg: '<svg viewBox="0 0 620 235" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="11ac와 11ah의 부반송파 간격과 심볼 길이 비교">'
                  + '<text x="30" y="30" class="fig-label" style="fill:#4aa3ff">11ac · 20 MHz (2.4/5 GHz)</text>'
                  + '<text x="30" y="128" class="fig-label" style="fill:#e3b341">11ah · 2 MHz (900 MHz) = 시계 ÷ 10</text>'
                  + (function(){
                      var o='';
                      for(var i=0;i<20;i++){o+='<line x1="'+(40+i*12)+'" y1="80" x2="'+(40+i*12)+'" y2="'+(52+(i%3)*2)+'" stroke="#4aa3ff" stroke-width="2"/>';}
                      o+='<text x="155" y="98" text-anchor="middle" class="fig-sub">부반송파 간격 312.5 kHz</text>';
                      for(var j=0;j<20;j++){o+='<line x1="'+(40+j*1.2)+'" y1="178" x2="'+(40+j*1.2)+'" y2="'+(150+(j%3)*2)+'" stroke="#e3b341" stroke-width="1"/>';}
                      o+='<text x="40" y="196" class="fig-sub">간격 31.25 kHz (같은 개수가 1/10 폭에)</text>';
                      [0,1,2,3,4,5,6,7].forEach(function(k){o+='<rect class="kb-pulse kb-d'+(k%7+1)+'" x="'+(330+k*32)+'" y="56" width="28" height="24" rx="3" fill="#4aa3ff" fill-opacity="0.25" stroke="#4aa3ff" stroke-opacity="0.7"/>';});
                      o+='<text x="458" y="98" text-anchor="middle" class="fig-sub">심볼 4 µs (GI 0.8 µs) × 8개</text>';
                      o+='<rect class="kb-pulse" x="330" y="154" width="252" height="24" rx="3" fill="#e3b341" fill-opacity="0.25" stroke="#e3b341" stroke-opacity="0.7"/>';
                      o+='<text x="456" y="171" text-anchor="middle" class="fig-sub" fill="#e3b341">같은 시간에 심볼 1개 — 40 µs (GI 8 µs)</text>';
                      o+='<text x="456" y="196" text-anchor="middle" class="fig-sub">GI 8 µs = 경로차 2.4 km까지의 반사를 흡수</text>';
                      return o;
                    })()
                  + '<text x="310" y="226" text-anchor="middle" class="fig-sub">속도는 1/10, 대신 좁은 대역·긴 반사·낮은 SNR에서 살아남는다</text>'
                  + '</svg>'
              },
              { t: "table",
                head: ["항목", "Wi-Fi HaLow (11ah)", "Wi-Fi 4·6 (2.4 GHz)", "BLE", "Zigbee / Thread", "LoRaWAN"],
                rows: [
                  ["대역", "Sub-1 GHz (지역별 750~930 MHz)", "2.4 GHz", "2.4 GHz", "2.4 GHz", "Sub-1 GHz (지역별)"],
                  ["채널폭", "1 · 2 · 4 · 8 · 16 MHz", "20 / 40 MHz", "1 · 2 MHz", "2 MHz", "125~500 kHz"],
                  ["속도", "150 kbps ~ 수십 Mbps", "수십~수백 Mbps", "125 kbps ~ 2 Mbps", "250 kbps", "수백 bps ~ 수십 kbps"],
                  ["실내 도달 (대략)", "<b>집 전체·마당·지하</b>", "집 일부 (벽에 약함)", "방 몇 개", "메시로 집 전체", "건물 여러 동"],
                  ["IP 직접 연결", "<b>예</b> (Wi-Fi)", "예", "아니오 (게이트웨이)", "Thread는 IPv6 / Zigbee는 게이트웨이", "아니오 (네트워크 서버)"],
                  ["AP당 단말 수", "<b>최대 8,191</b> (규격)", "수십 대 수준", "—", "메시 수백", "게이트웨이당 다수"],
                  ["저전력", "TWT·긴 휴면 (배터리 수년 가능)", "TWT (Wi-Fi 6)", "매우 우수", "매우 우수 (End Device)", "매우 우수"],
                  ["영상 전송", "<b>가능</b> (저해상도~HD, 대역폭에 따라)", "가능", "어려움", "불가", "불가"],
                  ["생태계", "칩 공급사 소수, 전용 AP 필요", "가장 큼", "큼", "큼 (Matter)", "중간"],
                ]
              },
              { t: "note", kind: "warn", title: "흔한 오해 — \"HaLow도 Wi-Fi니까 집 공유기에 바로 붙는다?\"", html: "기존 2.4/5/6 GHz 공유기에는 <b>900 MHz 무선부가 없어서</b> HaLow 기기를 받을 수 없습니다. HaLow AP(또는 HaLow↔일반 Wi-Fi 브리지)가 따로 있어야 합니다. 그래서 가정용 단독 제품보다는 <b>AP를 함께 공급하는 시스템</b>(빌딩·단지·농장·산업·보안 카메라 키트)에서 먼저 쓰이고 있습니다. 가전에 넣는다면 '사용자 집에 HaLow AP가 있는가'를 상품 기획 단계에서 먼저 따져야 합니다." },
              { t: "note", kind: "tip", title: "현장 노하우 — 가전에서 HaLow가 의미 있는 자리", html: "①<b>2.4 GHz가 닿지 않는 곳</b>: 지하·차고·다용도실의 세탁기·건조기, 실외기, 정원·창고 기기. ②<b>배터리 + 영상</b>: 초인종·실외 카메라처럼 BLE·Zigbee로는 영상이 안 되고 2.4 GHz Wi-Fi로는 거리·전력이 부족한 기기. ③<b>대규모 단지·빌딩 관리</b>: 한 AP로 수백~수천 대를 IP로 직접 관리. 반대로 칩 공급사가 적어(→ <a href='#proc-core-arch'>코어·공급망 판단</a>) <b>수배·이원화 리스크</b>가 크고, 지역마다 대역이 달라 SKU가 갈리는 점(→ <a href='#halow-region'>지역별 대역</a>)을 함께 검토하세요." },
              { t: "note", kind: "info", title: "연결", html: "설계 탭의 <a href='#proto-halow'>HaLow 요약</a>, Sub-GHz 안테나의 난점은 <a href='#ant-subg'>Sub-GHz 안테나</a>, 일반 Wi-Fi의 MCS·채널 개념은 <a href='#wifi-mcs-table'>Wi-Fi MCS 상세</a>와 이어집니다." },
            ]
          }
        ]
      },

      /* ───────────── H1. 표준 상세 장표 ───────────── */
      {
        id: "halow-spec",
        icon: "📋",
        title: "H1. 표준 상세 장표 — PHY·MCS·지역 대역·링크·MAC·HW",
        sections: [
          {
            id: "halow-spec-sheet",
            title: "802.11ah PHY 상세 장표 — 채널폭 1~16 MHz",
            blocks: [
              { t: "p", html: "802.11ah의 2·4·8·16 MHz 채널은 11ac의 20·40·80·160 MHz 채널을 각각 1/10로 줄인 것이고, <b>1 MHz 채널</b>만 HaLow에 새로 생긴 구조입니다. 단말은 1 MHz와 2 MHz를 반드시 지원해야 하고, 넓은 채널은 선택입니다." },
              { t: "table",
                head: ["항목", "1 MHz", "2 MHz", "4 MHz", "8 MHz", "16 MHz", "(비교) 11ac 20 MHz"],
                rows: [
                  ["대응하는 11ac 구조", "신규 (32-포인트)", "11ac 20 MHz ÷ 10", "40 MHz ÷ 10", "80 MHz ÷ 10", "160 MHz ÷ 10", "—"],
                  ["FFT 크기", "32", "64", "128", "256", "512", "64"],
                  ["데이터 부반송파", "24", "52", "108", "234", "468", "52"],
                  ["부반송파 간격", "31.25 kHz", "31.25 kHz", "31.25 kHz", "31.25 kHz", "31.25 kHz", "312.5 kHz"],
                  ["심볼 길이 (긴 GI / 짧은 GI)", "40 / 36 µs", "40 / 36 µs", "40 / 36 µs", "40 / 36 µs", "40 / 36 µs", "4 / 3.6 µs"],
                  ["MCS", "0~10 (<b>10 = BPSK 1/2 ×2 반복</b>)", "0~9", "0~9", "0~9", "0~9", "0~9"],
                  ["1스트림 최저 속도", "<b>150 kbps</b> (MCS10)", "650 kbps", "1.35 Mbps", "2.925 Mbps", "5.85 Mbps", "6.5 Mbps"],
                  ["1스트림 최고 속도 (긴 GI)", "4.0 Mbps", "7.8 Mbps (MCS8)", "18.0 Mbps", "39.0 Mbps", "78.0 Mbps", "78.0 Mbps (MCS8)"],
                  ["지원 의무", "<b>필수</b>", "<b>필수</b>", "선택", "선택", "선택", "—"],
                  ["대표 용도", "최대 거리·센서", "센서·제어", "저화질 영상", "영상·백홀", "고속 (대역 넓은 지역만)", "—"],
                ]
              },
              { t: "kv", rows: [
                ["공간 스트림", "최대 4 (제품은 대개 1)"],
                ["다중 사용자", "하향 MU-MIMO 최대 4 사용자 (선택)"],
                ["이론 최고 속도", "16 MHz · 4 스트림 · MCS9 · 짧은 GI = 약 347 Mbps (1 스트림 86.7 Mbps)"],
                ["변조·부호", "BPSK ~ 256-QAM, BCC / LDPC — 11ac와 같음"],
              ]},
              { t: "note", kind: "why", title: "왜 '시계 ÷ 10'인가 — 좁은 대역과 긴 반사", html: "Sub-1 GHz는 나라마다 쓸 수 있는 폭이 5~30 MHz 정도로 좁아(유럽은 5 MHz), 20 MHz 채널은 들어갈 수 없습니다. 11ac 구조를 그대로 두고 시계만 10배 늦추면 채널이 2 MHz가 되어 들어가고, 검증된 11ac 칩 설계·부호를 재활용할 수 있습니다. 덤으로 심볼과 가드 인터벌도 10배 길어져(GI 8 µs), <b>빛이 8 µs 동안 가는 거리 2.4 km</b>만큼의 경로 차이가 나는 반사도 흡수합니다. 실외 장거리 링크에서 결정적인 이점입니다." },
              { t: "note", kind: "warn", title: "흔한 오해 — \"HaLow는 1 km를 간다?\"", html: "Wi-Fi Alliance가 말하는 약 1 km(그 이상의 시연도 있음)는 <b>시야 확보·외장 안테나·최저 MCS·높은 출력이 허용되는 지역</b> 조건입니다. 가정 실내에서는 벽·가구·사람 때문에 수십~수백 m가 현실적이고, 유럽처럼 출력 한도가 낮은 지역은 미국보다 크게 짧습니다(→ <a href='#halow-link'>링크 버짓</a>). 대신 같은 조건에서 2.4 GHz Wi-Fi보다 <b>여러 배 멀리, 벽 너머로</b> 닿는다는 상대 비교는 성립합니다." },
              { t: "note", kind: "tip", title: "현장 노하우 — 칩 데이터시트에서 볼 것", html: "①<b>1 MHz MCS10 감도</b>(최대 거리의 기준) ②<b>지원 주파수 범위</b>: 칩은 750~950 MHz를 폭넓게 지원해도 모듈의 필터·매칭·안테나는 특정 지역에 고정인 경우가 많음 ③<b>최대 출력과 외장 PA 필요 여부</b>(미국은 높은 출력 허용) ④지원 채널폭(4/8 MHz 영상 필요 시) ⑤TWT·긴 휴면 지원과 휴면 전류 ⑥호스트 인터페이스(SPI/SDIO/USB)와 리눅스·RTOS 드라이버 성숙도." },
            ]
          },
          {
            id: "halow-mcs",
            title: "MCS 상세 — 인덱스별 변조·부호율·채널폭별 속도·감도",
            blocks: [
              { t: "p", html: "HaLow의 MCS 0~9는 11ac와 변조·부호율이 같고, 속도만 채널폭과 1/10 시계에 맞춰 바뀝니다. 여기에 <b>1 MHz 전용 MCS10</b>이 추가됩니다. MCS10은 MCS0(BPSK 1/2)을 한 번 더 반복해 보내 속도를 절반으로 줄이는 대신 약 3 dB를 더 버티는, <b>최대 거리용 모드</b>입니다." },
              { t: "table",
                head: ["MCS", "변조", "부호율", "1 MHz", "2 MHz", "4 MHz", "8 MHz", "16 MHz", "최소감도 1 MHz", "최소감도 2 MHz"],
                rows: [
                  ["10", "BPSK ×2 반복", "1/2", "<b>0.15</b>", "—", "—", "—", "—", "<b>−98 dBm</b>", "—"],
                  ["0", "BPSK", "1/2", "0.30", "0.65", "1.35", "2.93", "5.85", "−95 dBm", "−92 dBm"],
                  ["1", "QPSK", "1/2", "0.60", "1.30", "2.70", "5.85", "11.7", "−92 dBm", "−89 dBm"],
                  ["2", "QPSK", "3/4", "0.90", "1.95", "4.05", "8.78", "17.6", "−90 dBm", "−87 dBm"],
                  ["3", "16‑QAM", "1/2", "1.20", "2.60", "5.40", "11.7", "23.4", "−87 dBm", "−84 dBm"],
                  ["4", "16‑QAM", "3/4", "1.80", "3.90", "8.10", "17.6", "35.1", "−83 dBm", "−80 dBm"],
                  ["5", "64‑QAM", "2/3", "2.40", "5.20", "10.8", "23.4", "46.8", "−79 dBm", "−76 dBm"],
                  ["6", "64‑QAM", "3/4", "2.70", "5.85", "12.2", "26.3", "52.7", "−78 dBm", "−75 dBm"],
                  ["7", "64‑QAM", "5/6", "3.00", "6.50", "13.5", "29.3", "58.5", "−77 dBm", "−74 dBm"],
                  ["8", "256‑QAM", "3/4", "3.60", "7.80", "16.2", "35.1", "70.2", "−72 dBm", "−69 dBm"],
                  ["9", "256‑QAM", "5/6", "4.00", "<b>무효</b> (1·2·4 스트림)", "18.0", "39.0", "78.0", "−70 dBm", "—"],
                ]
              },
              { t: "p", html: "<b>표 기준</b>: 속도(Mbps)는 1 스트림 · 긴 GI(8 µs) 기준으로, 데이터율 = 데이터 부반송파 × 부반송파당 비트 × 부호율 ÷ 40 µs로 계산했습니다(→ <a href='#wifi-datarate'>Wi-Fi 데이터율 계산식</a>). 짧은 GI는 ×10/9, 스트림 수만큼 곱합니다. 감도는 규격 최소 요구치이며 4 MHz 이상은 폭이 2배일 때마다 3 dB씩 나빠집니다. 실제 칩은 대개 이보다 수 dB 이상 좋습니다. 송신 EVM 한계는 같은 MCS의 11ac 값과 같습니다." },
              { t: "note", kind: "why", title: "2 MHz MCS9가 '무효'인 이유", html: "MCS9(256-QAM 5/6)를 2 MHz에 쓰면 심볼당 데이터 비트가 52 × 8 × 5/6 = 346.67로 정수가 되지 않아 부호화 블록을 나눌 수 없습니다. 그래서 1·2·4 스트림에서는 규격이 이 조합을 금지합니다(3 스트림은 정수가 되어 허용). 11ac의 20 MHz MCS9가 금지되는 것과 정확히 같은 이유입니다. 데이터시트의 MCS 표에 이 칸이 비어 있어도 오류가 아닙니다." },
              { t: "note", kind: "warn", title: "흔한 오해 — \"1 MHz 채널은 너무 느려서 쓸모없다?\"", html: "센서·제어 데이터는 한 번에 수십~수백 바이트라 150 kbps로도 수 ms면 끝납니다. 1 MHz MCS10의 가치는 속도가 아니라 <b>규격상 가장 낮은 감도 기준(−98 dBm)</b>, 즉 최대 거리입니다. 그리고 채널이 좁을수록 같은 대역에 채널이 많아(미국 1 MHz 26개) 이웃 네트워크와 겹치지 않게 나누기 쉽습니다. 속도가 필요한 영상 기기만 4~8 MHz를 쓰면 됩니다." },
              { t: "note", kind: "tip", title: "현장 노하우 — 커버리지 계획은 'MCS 지도'로", html: "설치 현장(집·건물)에서 위치별로 <b>실제 협상된 MCS</b>를 기록하면, 영상이 필요한 지점은 MCS 몇 이상이 나와야 하는지, 센서 지점은 MCS10이라도 연결되는지 한눈에 보입니다. 2.4 GHz Wi-Fi와 같은 위치에서 비교 측정하면 HaLow 도입 효과를 수치로 보고하기 좋습니다." },
            ]
          },
          {
            id: "halow-region",
            title: "지역별 대역·채널·출력 — HaLow 최대의 변수",
            blocks: [
              { t: "p", html: "HaLow는 나라마다 <b>쓸 수 있는 주파수 자체가 다릅니다</b>. 2.4 GHz Wi-Fi가 전 세계에서 거의 같은 대역을 쓰는 것과 대조적이고, 그래서 HaLow 제품은 안테나·필터·출력 설정이 지역별로 갈리기 쉽습니다." },
              { t: "fig",
                caption: "주요 지역의 HaLow 대역(개략). 중국은 700 MHz대, 유럽은 863~868 MHz의 5 MHz, 한국·일본은 920 MHz 부근, 미국은 902~928 MHz의 26 MHz를 쓴다. 대역 폭이 넓을수록 넓은 채널(4~16 MHz)과 많은 채널을 쓸 수 있다. 유럽과 미국 대역은 약 6% 떨어져 있어 한 안테나로 둘 다 최적화하기 어렵다.",
                svg: '<svg viewBox="0 0 620 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Wi-Fi HaLow 지역별 주파수 대역">'
                  + '<line x1="40" y1="190" x2="590" y2="190" stroke="#7a8694" stroke-width="1.5"/>'
                  + (function(){
                      var o='';function X(f){return 40+(f-750)*550/185;}
                      [750,800,850,900,935].forEach(function(f){o+='<line x1="'+X(f)+'" y1="186" x2="'+X(f)+'" y2="194" stroke="#7a8694"/><text x="'+X(f)+'" y="208" text-anchor="middle" class="fig-sub">'+f+'</text>';});
                      var r=[['중국','755–787',755,787,'#e5534b',40],['유럽','863–868',863,868,'#4aa3ff',70],['한국','917.5–923.5',917.5,923.5,'#2ea043',100],['일본','916.5–927.5',916.5,927.5,'#a371f7',130],['미국','902–928',902,928,'#e3b341',160]];
                      r.forEach(function(b,i){
                        var x1=X(b[2]),x2=X(b[3]);
                        o+='<rect class="kb-pulse kb-d'+(i+1)+'" x="'+x1.toFixed(1)+'" y="'+(b[5]-12)+'" width="'+Math.max(4,(x2-x1)).toFixed(1)+'" height="16" rx="3" fill="'+b[4]+'" fill-opacity="0.35" stroke="'+b[4]+'"/>';
                        var lx=(b[0]==='중국')?x2+8:x1-8;var anc=(b[0]==='중국')?'start':'end';
                        o+='<text x="'+lx.toFixed(1)+'" y="'+(b[5]+1)+'" text-anchor="'+anc+'" class="fig-sub" fill="'+b[4]+'">'+b[0]+' '+b[1]+' MHz</text>';
                      });
                      return o;
                    })()
                  + '<text x="315" y="226" text-anchor="middle" class="fig-sub">주파수 (MHz) · 개략 — 판매 지역의 최신 규정 확인</text>'
                  + '</svg>'
              },
              { t: "table",
                head: ["지역", "대역 (개략)", "폭", "쓸 수 있는 채널 (대략)", "출력·운용 규제 (개략)", "같은 대역의 이웃"],
                rows: [
                  ["미국 (FCC)", "902–928 MHz", "26 MHz", "1 MHz ×26 · 2 MHz ×13 · 4 MHz ×6 · 8 MHz ×3 · 16 MHz ×1", "디지털 변조 기준 높은 출력 허용 (최대 1 W급 전도)", "UHF RFID 리더, Z-Wave, LoRa, 스마트미터"],
                  ["유럽 (CEPT/ETSI)", "863–868 MHz", "5 MHz", "1 MHz ×5 · 2 MHz ×2", "낮은 출력(약 25 mW ERP 수준) + 송신 점유율(duty cycle)·LBT 제한", "LoRa, Z-Wave(868), 경보·SRD 기기"],
                  ["한국", "917.5–923.5 MHz", "6 MHz", "1 MHz ×6 · 2 MHz ×3 · 4 MHz ×1", "국내 무선설비 규칙에 따름", "RFID·LPWA 기기"],
                  ["일본", "916.5–927.5 MHz", "11 MHz", "주로 1 MHz (지역 규격에 따름)", "920 MHz대 규격(ARIB 등)에 따름", "Wi-SUN·LPWA 기기"],
                  ["중국", "755–787 MHz", "32 MHz", "1 · 2 · 4 · 8 MHz", "현지 규정에 따름", "—"],
                  ["기타", "호주·뉴질랜드 915–928, 싱가포르 866–869·920–925, 인도 865–868 등", "—", "—", "각국 규정", "—"],
                ]
              },
              { t: "kv", rows: [
                ["채널 번호↔주파수", "중심 주파수 = 지역 시작 주파수 + 0.5 MHz × 채널 번호 (11ah는 500 kHz 단위 번호). 예: 미국 시작 902 MHz → 1 MHz 채널 1 = 902.5 MHz"],
                ["국가 설정", "11d·지역 코드로 단말이 현재 국가의 허용 채널·출력을 적용 — 펌웨어·인증 항목"],
              ]},
              { t: "note", kind: "warn", title: "흔한 오해 — \"칩이 전 대역을 지원하니 모듈 하나로 전 세계 판매?\"", html: "칩은 750~950 MHz를 폭넓게 다뤄도, <b>안테나·매칭·SAW 필터는 지역 대역에 맞춰 최적화</b>됩니다. 유럽 865 MHz와 미국 915 MHz는 약 6% 떨어져 있어 Q가 높은 소형 안테나는 둘 다를 좋은 효율로 덮기 어렵고(→ <a href='#ant-subg'>Sub-GHz 안테나</a>), 필터 통과 대역도 달라집니다. 출력 한도와 송신 점유율 규칙도 달라 펌웨어 설정·인증 시험이 지역마다 따로입니다. 현실적인 전략은 <b>지역군별 SKU</b>(미주 902–928 / 한·일 920 부근 / 유럽 863–868)입니다." },
              { t: "note", kind: "tip", title: "현장 노하우 — 유럽 출력·점유율 제약을 먼저 계산", html: "유럽 863–868 MHz는 출력이 낮고 송신 시간 비율에 제한(또는 LBT 등 대체 조건)이 있어, 같은 제품이 미국보다 <b>거리와 처리량 모두 크게 줄어듭니다</b>. 영상처럼 계속 보내야 하는 기능은 유럽에서 성립하지 않을 수 있으므로, 기능 사양을 정하기 전에 판매 지역별로 허용 출력·점유율을 기준으로 링크 버짓과 처리량을 따로 계산하세요(→ <a href='#ver-cert'>규제 인증</a>)." },
            ]
          },
          {
            id: "halow-link",
            title: "왜 멀리 가나 — 2.4 GHz Wi-Fi와의 링크 버짓 비교",
            blocks: [
              { t: "p", html: "HaLow가 2.4 GHz Wi-Fi보다 멀리 가는 이유는 세 가지 dB의 합으로 설명됩니다. ①낮은 주파수의 <b>경로 손실 이점</b>, ②좁은 채널의 <b>잡음 이점</b>, ③MCS10의 <b>반복 부호 이점</b>. 같은 송신 출력이라면 합쳐서 약 24.5 dB입니다." },
              { t: "fig",
                caption: "2.4 GHz Wi-Fi(20 MHz, MCS0) 대비 HaLow(915 MHz, 1 MHz, MCS10)의 링크 버짓 이점(같은 출력·같은 안테나 이득 가정). 주파수가 낮아 같은 거리의 자유공간 손실이 8.5 dB 작고, 채널이 1/20이라 수신 잡음이 13 dB 낮으며, MCS10 반복으로 3 dB를 더 얻는다. 합계 약 24.5 dB는 자유공간에서 거리 약 16배, 실내(경로손실 지수 3 가정)에서 약 6배에 해당한다.",
                svg: '<svg viewBox="0 0 620 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="HaLow와 2.4GHz Wi-Fi 링크 버짓 차이 누적">'
                  + (function(){
                      var o='';var base=170;var k=5;var x=60;
                      var s=[['경로 손실','+8.5 dB','915 vs 2437 MHz',8.5,'#e3b341'],['잡음 대역','+13.0 dB','1 MHz vs 20 MHz',13,'#4aa3ff'],['반복 부호','+3.0 dB','MCS10',3,'#a371f7']];
                      var acc=0;
                      s.forEach(function(r,i){
                        var y=base-(acc+r[3])*k;var h=r[3]*k;
                        o+='<rect class="kb-grow kb-d'+(i*2+1)+'" x="'+x+'" y="'+y+'" width="110" height="'+h+'" rx="4" fill="'+r[4]+'" fill-opacity="0.3" stroke="'+r[4]+'"/>';
                        o+='<text x="'+(x+55)+'" y="'+(y-8)+'" text-anchor="middle" class="fig-label" style="fill:'+r[4]+'">'+r[1]+'</text>';
                        o+='<text x="'+(x+55)+'" y="'+(base+18)+'" text-anchor="middle" class="fig-sub">'+r[0]+'</text>';
                        o+='<text x="'+(x+55)+'" y="'+(base+34)+'" text-anchor="middle" class="fig-sub">'+r[2]+'</text>';
                        acc+=r[3];x+=130;
                      });
                      var y2=base-acc*k;
                      o+='<rect x="'+x+'" y="'+y2+'" width="110" height="'+(acc*k)+'" rx="4" fill="#2ea043" fill-opacity="0.3" stroke="#2ea043"/>';
                      o+='<text x="'+(x+55)+'" y="'+(y2-8)+'" text-anchor="middle" class="fig-label" style="fill:#2ea043">약 24.5 dB</text>';
                      o+='<text x="'+(x+55)+'" y="'+(base+18)+'" text-anchor="middle" class="fig-sub">합계</text>';
                      o+='<text x="'+(x+55)+'" y="'+(base+34)+'" text-anchor="middle" class="fig-sub">자유공간 ×16 · 실내 ×6</text>';
                      o+='<line x1="50" y1="'+base+'" x2="590" y2="'+base+'" stroke="#7a8694"/>';
                      return o;
                    })()
                  + '</svg>'
              },
              { t: "table",
                head: ["항목", "2.4 GHz Wi-Fi (20 MHz, MCS0)", "HaLow (1 MHz, MCS10)", "HaLow 이점"],
                rows: [
                  ["자유공간 경로 손실 (같은 거리)", "기준", "20·log₁₀(2437 / 915) 만큼 작음", "<b>+8.5 dB</b>"],
                  ["수신 잡음 (kTB)", "20 MHz 대역 잡음", "1 MHz 대역 잡음", "<b>+13.0 dB</b> (= 10·log₁₀ 20)"],
                  ["부호화", "MCS0 (BPSK 1/2)", "MCS10 (MCS0 ×2 반복)", "<b>+3.0 dB</b>"],
                  ["합계", "", "", "<b>약 24.5 dB</b>"],
                  ["거리 환산", "", "", "자유공간 약 16배 · 실내(지수 3) 약 6배"],
                ]
              },
              { t: "note", kind: "why", title: "숫자 뒤의 물리 — 벽 투과와 안테나 크기", html: "표에 넣지 않은 이점도 있습니다. 주파수가 낮을수록 콘크리트·유리·사람 몸에서 덜 흡수돼 <b>벽 투과 손실이 작습니다</b>. 반대로 손해도 있습니다. 경로 손실 이점은 '같은 이득의 안테나'를 가정한 것인데, 900 MHz 안테나는 파장(약 33 cm)이 길어 <b>소형 제품에선 효율이 떨어지기 쉽습니다</b>. 작은 기기에서는 안테나 효율 손실이 이점 일부를 깎아 먹습니다(→ <a href='#ant-subg'>Sub-GHz 안테나</a>, <a href='#ant-fields'>방사저항과 효율</a>)." },
              { t: "note", kind: "warn", title: "흔한 오해 — \"24.5 dB는 어디서나 그대로 얻는다?\"", html: "이 계산은 <b>같은 송신 출력</b>을 가정합니다. 유럽처럼 Sub-GHz 출력 한도가 2.4 GHz(100 mW EIRP)보다 낮으면 그 차이만큼 이점이 줄어듭니다. 또 900 MHz 대역에는 이웃이 많습니다. 미국 902–928 MHz에는 출력이 강한 <b>UHF RFID 리더</b>가 같은 대역에서 호핑하고, 바로 아래에는 셀룰러 대역이 있어 강한 신호가 수신기를 포화시킬 수 있습니다. 실제 이점은 현장 잡음과 규제를 반영해 다시 계산해야 합니다." },
              { t: "note", kind: "tip", title: "현장 노하우 — 보고할 때의 표현", html: "\"HaLow는 1 km\" 대신 <b>\"같은 출력에서 2.4 GHz 대비 링크 버짓 약 24 dB 유리, 우리 집 환경 실측 시 커버리지 ○배\"</b>처럼 근거와 실측을 함께 제시하세요. 비교 측정은 같은 위치·같은 높이·같은 안테나 방향에서, 2.4 GHz는 MCS0, HaLow는 MCS10 기준으로 맞춰야 공정합니다." },
            ]
          },
          {
            id: "halow-mac",
            title: "수천 대·저전력을 위한 MAC — TWT·RAW·짧은 프레임",
            blocks: [
              { t: "p", html: "PHY가 거리를 해결했다면, MAC은 <b>'AP 하나에 배터리 센서 수천 대'</b>라는 문제를 풉니다. 일반 Wi-Fi 방식 그대로라면 수천 대가 한꺼번에 깨어나 경쟁해 충돌이 폭증하고, 연결을 유지하려고 자주 깨어나 배터리가 금방 닳습니다." },
              { t: "note", kind: "info", title: "비유로 먼저", html: "수천 명이 다니는 회사의 <b>엘리베이터</b>를 생각하세요. 모두가 9시 정각에 몰리면 아무도 못 탑니다(충돌). 그래서 부서별로 출근 시간을 나누고(RAW — 그룹별 접근 창), 각자 정해진 시간에만 오게 약속합니다(TWT — 깨어날 시각 예약). 엘리베이터에 짐 없이 짧게 신호만 하는 버튼(NDP — 짧은 제어 프레임)도 만들어 둡니다." },
              { t: "fig",
                caption: "RAW와 TWT. AP는 비콘 간격을 여러 시간 창으로 나눠 단말 그룹마다 접근 시간을 따로 배정한다(RAW). 각 단말은 AP와 약속한 시각(TWT)에만 깨어나 통신하고 나머지는 잔다. 수천 대가 동시에 경쟁하지 않으므로 충돌이 줄고, 단말은 대부분의 시간을 휴면한다.",
                svg: '<svg viewBox="0 0 620 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="HaLow RAW 그룹 접근 창과 TWT 휴면">'
                  + '<line x1="40" y1="60" x2="590" y2="60" stroke="#7a8694" stroke-width="1.5"/>'
                  + '<rect x="40" y="44" width="16" height="16" fill="#e3b341" fill-opacity="0.5" stroke="#e3b341"/><text x="48" y="38" text-anchor="middle" class="fig-sub" fill="#e3b341">비콘</text>'
                  + '<rect x="574" y="44" width="16" height="16" fill="#e3b341" fill-opacity="0.5" stroke="#e3b341"/>'
                  + (function(){
                      var o='';var g=[['그룹 A','#4aa3ff',60,180],['그룹 B','#2ea043',190,310],['그룹 C','#a371f7',320,440],['그룹 D','#e5534b',450,570]];
                      g.forEach(function(r,i){
                        o+='<rect class="kb-pulse kb-d'+(i*2+1)+'" x="'+r[2]+'" y="64" width="'+(r[3]-r[2]-4)+'" height="22" rx="3" fill="'+r[1]+'" fill-opacity="0.25" stroke="'+r[1]+'" stroke-opacity="0.7"/>';
                        o+='<text x="'+((r[2]+r[3])/2)+'" y="80" text-anchor="middle" class="fig-sub" fill="'+r[1]+'">'+r[0]+' 창</text>';
                        var y=110+i*24;
                        o+='<text x="36" y="'+(y+4)+'" text-anchor="end" class="fig-sub" fill="'+r[1]+'">'+r[0].slice(-1)+'</text>';
                        o+='<line x1="40" y1="'+y+'" x2="590" y2="'+y+'" stroke="'+r[1]+'" stroke-opacity="0.25" stroke-dasharray="3 4"/>';
                        o+='<rect x="'+(r[2]+20)+'" y="'+(y-7)+'" width="26" height="14" rx="2" fill="'+r[1]+'" fill-opacity="0.6"/>';
                      });
                      return o;
                    })()
                  + '<text x="315" y="212" text-anchor="middle" class="fig-sub">각 줄 = 단말 그룹 · 진한 칸만 깨어 있음 (TWT 약속 시각), 나머지는 휴면</text>'
                  + '</svg>'
              },
              { t: "kv", rows: [
                ["TWT (Target Wake Time)", "AP와 단말이 다음에 깨어날 시각을 협상 — 그 사이엔 비콘도 안 듣고 잠. <b>11ah에서 처음 도입</b>되어 이후 Wi-Fi 6(11ax)로 확산"],
                ["RAW (Restricted Access Window)", "비콘 간격을 시간 창으로 나눠 단말 그룹별로 접근을 허용 — 수천 대의 동시 경쟁·충돌을 줄임"],
                ["계층형 AID", "단말 식별 번호를 페이지·블록·하위블록으로 나눠 AP당 <b>최대 8,191대</b>를 관리 (일반 Wi-Fi는 2,007)"],
                ["짧은 MAC 헤더 · NDP", "헤더를 줄이고, ACK 같은 제어 프레임을 PHY 헤더만으로 보내는 NDP(Null Data Packet)로 공중 시간·전력 절감"],
                ["긴 BSS Max Idle", "단말이 오래 자도(규격상 매우 긴 시간까지) AP가 연결을 끊지 않도록 해 재접속 비용을 없앰"],
                ["릴레이 · 섹터화", "중계 단말로 범위 확장, AP가 방향(섹터)별로 나눠 서비스해 숨은 노드 문제 완화"],
              ]},
              { t: "note", kind: "why", title: "긴 거리가 만드는 '숨은 노드' 문제", html: "도달 거리가 길수록 AP 반대편에 있는 단말끼리는 서로의 신호를 못 듣는 경우가 늘어납니다. 둘 다 채널이 비었다고 판단해 동시에 보내면 AP에서 충돌합니다(숨은 노드). 범위가 넓은 HaLow에서 이 문제가 특히 커서, RAW로 시간을 나누고 섹터화로 공간을 나누는 기능이 규격에 들어가 있습니다." },
              { t: "note", kind: "tip", title: "현장 노하우 — 배터리 기기 설계", html: "평균 전류는 BLE와 같은 식 <b>I_avg ≈ Q_event ÷ T + I_sleep</b>으로 계산합니다(→ <a href='#bt-power-budget'>BLE 전력 계산</a>). HaLow는 한 번 깨어날 때 Wi-Fi 연결·보안 절차가 무거워 Q_event가 크므로, <b>TWT로 연결을 유지한 채 길게 자는 것</b>이 핵심입니다. 칩의 TWT·긴 휴면 지원 여부와 AP 쪽 지원 여부를 함께 확인하세요 — AP가 TWT를 지원하지 않으면 단말 기능은 무용지물입니다." },
            ]
          },
          {
            id: "halow-hw",
            title: "HW 설계 포인트 — 2.4 GHz Wi-Fi 모듈과 무엇이 다른가",
            blocks: [
              { t: "p", html: "HaLow 모듈은 Wi-Fi 칩 구조를 공유하지만 주파수가 1/2.7로 낮아 <b>RF 설계의 어려운 곳이 옮겨 갑니다</b>. PCB 손실은 쉬워지고, 안테나·필터·지역 대응은 어려워집니다." },
              { t: "table",
                head: ["항목", "2.4 GHz Wi-Fi 대비 차이", "대책"],
                rows: [
                  ["안테나 크기", "λ/4가 915 MHz 약 8.2 cm, 868 MHz 약 8.6 cm (2.4 GHz는 약 3.1 cm)", "미앤더·헬리컬·칩 안테나 + 그라운드 확보, 외장 안테나 검토 (→ <a href='#ant-subg'>Sub-GHz 안테나</a>)"],
                  ["그라운드 플레인", "안테나의 거울 역할을 하는 그라운드도 파장에 비례해 커야 함", "소형 보드는 효율 한계를 OTA로 먼저 확인 (→ <a href='#ant-principle'>모노폴과 그라운드 거울</a>)"],
                  ["PCB·전송선 손실", "주파수가 낮아 유전체·도체 손실이 작음 — 쉬워짐", "FR-4로 충분한 경우가 많음, 대신 매칭 부품값이 커짐"],
                  ["매칭 부품", "같은 리액턴스에 필요한 L·C 값이 2.7배 정도 커짐", "SRF 여유는 넉넉해지지만 부품 공차의 영향 확인 (→ <a href='#rf-lc'>RF 관점의 L과 C</a>)"],
                  ["인접 대역 간섭", "바로 옆에 셀룰러(800·900 MHz대)·UHF RFID 등 강한 신호", "<b>SAW 필터</b>로 대역 밖 차단, 블로킹 시험 강화 (→ <a href='#ckt-filter-coex'>필터·공존</a>)"],
                  ["출력·PA", "지역별 허용 출력 차이가 매우 큼 (미국 높음, 유럽 낮음)", "고출력 지역은 외장 PA/FEM, 지역별 타겟파워·캘리브레이션 테이블 (→ <a href='#ver-cal'>타겟파워</a>)"],
                  ["크리스탈 오차의 상대 크기", "같은 ±20 ppm이라도 915 MHz에선 약 18.3 kHz로 부반송파 간격(31.25 kHz)의 약 59% — 2.4 GHz(약 16%)보다 상대적으로 큼", "칩 권장 ppm 준수, 온도 보상 여부 확인 (→ <a href='#ckt-xtal-select'>XTAL 선정</a>)"],
                  ["계측 장비", "802.11ah(S1G) 신호를 분석하는 계측기 옵션 필요", "양산 검사 장비의 HaLow 지원 여부를 초기에 확인 (→ <a href='#prod-rftest'>양산 RF 테스트</a>)"],
                ]
              },
              { t: "note", kind: "why", title: "왜 크리스탈 오차가 상대적으로 더 아픈가", html: "주파수 오차(Hz) = 반송파 × ppm이므로 900 MHz에선 2.4 GHz보다 작습니다. 하지만 HaLow는 부반송파 간격이 1/10(31.25 kHz)이라, <b>간격 대비 오차 비율</b>은 오히려 커집니다. 수신기가 이 오차를 추정·보정하지 못하면 부반송파끼리 섞여(ICI) 고차 MCS가 무너집니다. 같은 이유로 Wi-Fi 6가 부반송파를 1/4로 좁혔을 때 클럭 요구가 엄격해졌습니다(→ <a href='#wifi-spec-sheet'>Wi-Fi 장표의 '심볼 4배' 설명</a>)." },
              { t: "note", kind: "warn", title: "흔한 오해 — \"주파수가 낮으니 RF 설계가 전반적으로 쉽다?\"", html: "PCB 전송선은 쉬워지지만, 성능을 좌우하는 <b>안테나 효율·인접 대역 간섭·지역별 대역 분기</b>는 오히려 어려워집니다. 특히 소형 가전 모듈은 8 cm급 안테나와 충분한 그라운드를 넣기 어려워, 이론상 링크 버짓 이점을 안테나에서 상당 부분 잃을 수 있습니다. 개발 초기에 <b>최종 외장 상태의 OTA 효율</b>을 먼저 확인하세요." },
              { t: "note", kind: "tip", title: "현장 노하우 — 인증과 출시 준비", html: "①전파 인증은 판매 지역마다 Sub-GHz 대역 규정으로 따로(→ <a href='#ver-cert'>규제 인증</a>) ②Wi-Fi Alliance의 <b>Wi-Fi CERTIFIED HaLow</b> 인증으로 상호운용 확인 ③AP를 함께 공급하는 시스템이라면 AP의 지역 설정·TWT 지원까지 한 세트로 검증 ④칩 공급사가 적으므로 단종(EOL)·이원화 계획을 처음부터 수립(→ <a href='#prod-secondsource'>이원화·EOL</a>)." },
              { t: "note", kind: "info", title: "연결", html: "HaLow 개요는 <a href='#halow-overview'>H0</a>, 일반 Wi-Fi 표준은 <a href='#wifi-spec-sheet'>Wi-Fi 상세 장표</a>, Sub-GHz 안테나는 <a href='#ant-subg'>Sub-GHz 안테나의 난점</a>을 보세요." },
            ]
          }
        ]
      }
    ]
  });
})();
