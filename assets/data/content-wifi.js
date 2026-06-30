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
              { t: "note", kind: "tip", title: "HW 관점 한 줄 요약", html: "세대가 오를수록 <b>채널이 넓어지고(광대역 매칭·저손실 기판) 변조가 촘촘해진다(엄격한 EVM·위상잡음·PA 선형성)</b>. 6GHz·MLO는 <b>새 대역 안테나·멀티 RF 체인</b>을 요구합니다. (자세히는 W4·W5)" },
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
